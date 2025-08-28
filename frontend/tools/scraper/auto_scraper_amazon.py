#!/usr/bin/env python3
"""
auto_scraper_amazon.py

What it does:
- For each category/search-query you provide, searches Amazon.in (or other Amazon domain you set),
  scrapes product result pages (titles, product URLs, ASINs, image URLs if present), saves them to a CSV,
  and optionally downloads product images into images/<category>/<brand_or_asin>/.
- Designed to be run locally (you must run this on your machine with internet access).
- WARNING: Amazon does not allow heavy scraping. Use responsibly, add delays, and consider using official APIs.
- This script includes polite delays, header rotation, proxy support and configurable settings.

Usage examples:
  python3 auto_scraper_amazon.py --queries "inverter battery" "ceiling fan" --pages 2 --download-images
  python3 auto_scraper_amazon.py --from-file queries.txt --pages 3

Requirements:
  pip install requests beautifulsoup4 lxml pandas

Notes & legal:
 - This script is intended for legitimate and limited personal/business use. Do NOT use to violate Amazon's Terms of Service.
 - If you need large-scale access, consider Amazon Product Advertising API or partner data providers.
"""

import argparse
import csv
import os
import re
import time
import random
import sys
from urllib.parse import quote_plus, urljoin
import requests
from bs4 import BeautifulSoup

DEFAULT_HEADERS = [
    # A small rotation of user-agents
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0 Safari/537.36",
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0 Safari/537.36",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.2 Safari/605.1.15"
]

# Common Amazon search URL template (Amazon India default)
AMAZON_SEARCH_TEMPLATE = "{domain}/s?k={query}&page={page}"

def default_sleep(min_s=1.0, max_s=3.0):
    time.sleep(random.uniform(min_s, max_s))

def sanitize_filename(s):
    return re.sub(r'[^A-Za-z0-9 _.-]', '_', s)[:120]

def extract_asin_from_url(url):
    m = re.search(r"/dp/([A-Z0-9]{10})", url)
    if m:
        return m.group(1)
    m = re.search(r"/gp/product/([A-Z0-9]{10})", url)
    if m:
        return m.group(1)
    # fallback: Amazon query param
    m = re.search(r"asin=([A-Z0-9]{10})", url)
    if m:
        return m.group(1)
    return None

def pick_header():
    return {"User-Agent": random.choice(DEFAULT_HEADERS), "Accept-Language": "en-IN,en;q=0.9"}

def get_soup(url, session, proxies=None, timeout=20):
    headers = pick_header()
    try:
        resp = session.get(url, headers=headers, timeout=timeout, proxies=proxies)
        resp.raise_for_status()
        return BeautifulSoup(resp.text, "lxml"), resp.text
    except Exception as e:
        print("  [!] Request failed:", e)
        return None, None

def find_product_cards(soup):
    # Amazon markup varies. We search for links with /dp/ within product anchors.
    anchors = soup.find_all("a", href=True)
    products = {}
    for a in anchors:
        href = a["href"]
        if "/dp/" in href or "/gp/product/" in href:
            url = href if href.startswith("http") else urljoin("https://www.amazon.in", href)
            asin = extract_asin_from_url(url)
            title = a.get_text(strip=True) or None
            if asin and asin not in products:
                products[asin] = {"asin": asin, "product_url": url, "title": title}
            elif url not in (p.get("product_url") for p in products.values()):
                # sometimes missing ASIN - include by URL key
                url_key = "url_" + sanitize_filename(url)
                products[url_key] = {"asin": None, "product_url": url, "title": title}
    return list(products.values())

def extract_image_from_product_page(session, product_url, proxies=None):
    soup, text = get_soup(product_url, session, proxies=proxies)
    if not soup:
        return None
    # Try meta og:image
    og = soup.find("meta", property="og:image")
    if og and og.get("content"):
        return og.get("content")
    # Try landingImage
    img = soup.find("img", {"id": "landingImage"})
    if img and img.get("src"):
        return img.get("src")
    # Try scripts for "large" image
    scripts = soup.find_all("script", string=True)
    for s in scripts:
        if not s.string:
            continue
        m = re.search(r'\"large\":\"(https:[^\"]+)\"', s.string)
        if m:
            return m.group(1).replace("\\u0026", "&")
    # Try first product image on page
    any_img = soup.find("img")
    if any_img and any_img.get("src"):
        return any_img.get("src")
    return None

def download_image(session, url, dest, proxies=None):
    try:
        headers = pick_header()
        with session.get(url, headers=headers, stream=True, timeout=30, proxies=proxies) as r:
            r.raise_for_status()
            with open(dest, "wb") as f:
                for chunk in r.iter_content(1024):
                    f.write(chunk)
        return True
    except Exception as e:
        print("    -> image download failed:", e)
        return False

def scrape_category(query, domain, pages, session, proxies=None, download_images=False, out_images_dir="images"):
    results = []
    for page in range(1, pages+1):
        search_url = AMAZON_SEARCH_TEMPLATE.format(domain=domain, query=quote_plus(query), page=page)
        print(f"[search] {query} page {page} -> {search_url}")
        soup, _ = get_soup(search_url, session, proxies=proxies)
        if not soup:
            print("  -> failed to fetch search page, continuing to next page")
            default_sleep(2.0, 5.0)
            continue
        cards = find_product_cards(soup)
        print(f"  -> found {len(cards)} product anchors on search page")
        for c in cards:
            prod = {
                "category_query": query,
                "title": c.get("title") or "",
                "product_url": c.get("product_url") or "",
                "asin": c.get("asin"),
                "image_url": "",
                "brand": ""
            }
            # Try to extract image and brand by visiting product page (best-effort)
            if prod["product_url"]:
                default_sleep(0.5, 1.2)
                try:
                    img = extract_image_from_product_page(session, prod["product_url"], proxies=proxies)
                    prod["image_url"] = img or ""
                    # try brand from page meta or title
                    if prod["title"]:
                        # heuristic: brand may be first token of title
                        prod["brand"] = prod["title"].split()[0]
                    else:
                        prod["brand"] = ""
                except Exception as e:
                    print("   -> error fetching product page:", e)
            results.append(prod)
            # Politeness delay between products
            default_sleep(0.4, 1.5)
        # Politeness delay between search pages
        default_sleep(1.0, 3.0)
    # Optionally download images
    if download_images:
        os.makedirs(out_images_dir, exist_ok=True)
        for p in results:
            img_url = p.get("image_url")
            if not img_url:
                continue
            brand = p.get("brand") or p.get("asin") or "unknown"
            folder = os.path.join(out_images_dir, sanitize_filename(p["category_query"]), sanitize_filename(brand))
            os.makedirs(folder, exist_ok=True)
            ext = os.path.splitext(img_url.split("?")[0])[1] or ".jpg"
            fname = sanitize_filename(p.get("title") or p.get("asin") or "product")[:80] + ext
            dest = os.path.join(folder, fname)
            if os.path.exists(dest):
                continue
            print("   -> downloading image for", p.get("asin") or p.get("title") or p.get("product_url"))
            ok = download_image(session, img_url, dest, proxies=proxies)
            if ok:
                print("      saved to", dest)
            default_sleep(0.4, 1.2)
    return results

def save_csv(filename, rows):
    import pandas as pd
    df = pd.DataFrame(rows)
    df.to_csv(filename, index=False, encoding="utf-8-sig")
    print("[saved] CSV ->", filename)

def main():
    parser = argparse.ArgumentParser(description="Auto-scraper for Amazon search results (for images + CSV)")
    parser.add_argument("--queries", nargs="*", help="Search queries / categories (e.g. 'inverter battery')")
    parser.add_argument("--from-file", help="File with one query per line")
    parser.add_argument("--pages", type=int, default=2, help="Search result pages per query to scrape (default 2)")
    parser.add_argument("--domain", default="https://www.amazon.in", help="Amazon domain (default https://www.amazon.in)")
    parser.add_argument("--download-images", action="store_true", help="Also download product images")
    parser.add_argument("--output", default="scraped_products.csv", help="CSV output filename")
    parser.add_argument("--images-dir", default="images", help="Directory to save images")
    parser.add_argument("--proxy", help="HTTP proxy (http://user:pass@host:port)")
    parser.add_argument("--delay-min", type=float, default=0.5, help="Minimum per-request delay (seconds)")
    parser.add_argument("--delay-max", type=float, default=2.0, help="Maximum per-request delay (seconds)")
    args = parser.parse_args()

    # Set global delay function if customized
    global default_sleep
    def default_sleep(min_s=args.delay_min, max_s=args.delay_max):
        time.sleep(random.uniform(min_s, max_s))

    queries = []
    if args.from_file:
        if not os.path.exists(args.from_file):
            print("from-file not found:", args.from_file)
            sys.exit(1)
        with open(args.from_file, "r", encoding="utf-8") as f:
            queries = [line.strip() for line in f if line.strip()]
    if args.queries:
        queries.extend([q.strip() for q in args.queries if q.strip()])

    if not queries:
        print("No queries provided. Use --queries or --from-file")
        sys.exit(1)

    session = requests.Session()
    proxies = {"http": args.proxy, "https": args.proxy} if args.proxy else None

    all_results = []
    for q in queries:
        print("=== Scraping query:", q)
        try:
            res = scrape_category(q, args.domain, args.pages, session, proxies=proxies, download_images=args.download_images, out_images_dir=args.images_dir)
            all_results.extend(res)
        except KeyboardInterrupt:
            print("Interrupted by user. Saving progress...")
            break
    save_csv(args.output, all_results)
    print("Done. Rows scraped:", len(all_results))
    print("Tip: Open the CSV to review rows and remove duplicates. If many image URLs are empty, try increasing pages or visiting those product URLs manually.")

if __name__ == "__main__":
    main()
