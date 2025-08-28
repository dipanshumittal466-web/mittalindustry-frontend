#!/bin/bash
# Master script to fetch all product images in batches (Linux version)

TOTAL=150
BATCH=50
DELAY=3.0

echo "⚡ Starting full image download automation..."
echo "   Total products: $TOTAL | Batch size: $BATCH | Delay: $DELAY sec"

START=1
while [ $START -le $TOTAL ]
do
  END=$((START + BATCH - 1))
  if [ $END -gt $TOTAL ]; then
    END=$TOTAL
  fi

  echo "👉 Running batch: $START to $END"
  START=$START END=$END DELAY=$DELAY HEADLESS=true python tools/fetch_amazon_images.py

  echo "✅ Finished batch: $START to $END"
  START=$((END + 1))

  echo "⏳ Cooling down for 10 seconds before next batch..."
  sleep 10
done

echo "🎉 All product images downloaded successfully into public/images/"
