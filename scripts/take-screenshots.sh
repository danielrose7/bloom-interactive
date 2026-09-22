#!/bin/bash
CHROME="/Users/dan/.cache/puppeteer/chrome/mac_arm-145.0.7632.77/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing"
OUT_DIR="$(dirname "$0")/../public/images/portfolio"

screenshot() {
  local name="$1"
  local url="$2"
  echo "Screenshotting $url -> $name.png"
  "$CHROME" \
    --headless=new \
    --disable-gpu \
    --window-size=1280,800 \
    --screenshot="$OUT_DIR/$name.png" \
    --hide-scrollbars \
    "$url" 2>/dev/null
}

screenshot "plantiful" "https://plantiful.ai/"
screenshot "goji" "https://goji.health/"
screenshot "tote" "https://tote.tools/"
screenshot "arborbridge" "https://www.arborbridge.com/"
screenshot "tcs-classes" "https://www.thecodingspace.com/classes"

echo "Done!"
