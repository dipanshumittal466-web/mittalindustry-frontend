Auto Scraper for Amazon - README

What's included:
- auto_scraper_amazon.py   : main script. Run locally to scrape Amazon search result pages and fetch product image URLs + download images.
- requirements.txt        : pip requirements.
- README_AUTOSCRAPER.txt  : this file.

Quick start (on your machine):
1) Create a folder and place these files in it, or extract the ZIP.
2) Create a Python virtualenv and install requirements:
     python3 -m venv venv
     source venv/bin/activate
     pip install -r requirements.txt
3) Run the scraper with queries (example):
     python3 auto_scraper_amazon.py --queries "inverter battery" "ceiling fan" --pages 2 --download-images
   Or prepare a file 'queries.txt' with one search term per line and run:
     python3 auto_scraper_amazon.py --from-file queries.txt --pages 3 --download-images

Important notes and best practices:
- This tool scrapes the public Amazon website. Amazon's Terms of Service restrict scraping. Use responsibly and limit requests.
- For heavy use, use Amazon Product Advertising API or authorized data providers.
- If Amazon blocks requests, consider adding proxies, increasing delays, or manually downloading product pages.
- The script attempts to find product links via common patterns ("/dp/ASIN") but Amazon's HTML structure can change; the script is best-effort and may need tweaks.
- This package does NOT include downloaded images. You must run the script locally to download images and then compress them into ZIP.

If you want, I can:
- Pre-fill a 'queries.txt' containing recommended search terms for electrical materials (inverter, battery 150Ah, stabilizer 2KVA, MCB 16A, 2.5 sqmm wire, LED bulb 9W, etc.).
- Or I can run a supervised curation to produce 100+ verified product links (but that requires web access and more time).


Included queries.txt: pre-filled list of recommended search queries for electrical materials (batteries, inverters, LED, fans, stabilizers, MCBs, wires, sockets, solar components). Use --from-file queries.txt to run.
