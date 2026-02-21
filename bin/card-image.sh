# Commands to generate card-image.png
# Assumes ImageMagick and sips are installed (sips is macOS only)

SCRATCH=$PWD/scratch
mkdir -p "$SCRATCH"

cat > "$SCRATCH/card3.svg" << 'EOF'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 180">
  <rect x="4" y="4" width="112" height="172" rx="8" ry="8" fill="#1a0a1a" stroke="#e056a0" stroke-width="4"/>
  <text x="60" y="105" font-family="Georgia, serif" font-size="48" font-weight="bold" fill="#e056a0" text-anchor="middle">pe</text>
</svg>
EOF

cat > "$SCRATCH/card4.svg" << 'EOF'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 180">
  <rect x="4" y="4" width="112" height="172" rx="8" ry="8" fill="#1a0a1a" stroke="#e056a0" stroke-width="4"/>
  <text x="60" y="105" font-family="Georgia, serif" font-size="48" font-weight="bold" fill="#e056a0" text-anchor="middle">dia</text>
</svg>
EOF

# Convert to PNG
sips -s format png "$SCRATCH/card3.svg" --out "$SCRATCH/card3.png"
sips -s format png "$SCRATCH/card4.svg" --out "$SCRATCH/card4.png"

# Resize to 220x330
magick "$SCRATCH/card3.png" -resize 220x330 "$SCRATCH/c3.png"
magick "$SCRATCH/card4.png" -resize 220x330 "$SCRATCH/c4.png"

# Composite all cards
magick "img/Hubble_HH80_new_4Filters_V7_FINALcrop.jpg" \
  -resize 1200x630^ -gravity center -extent 1200x630 \
  "$SCRATCH/result.png"

magick "$SCRATCH/result.png" "$SCRATCH/c1.png" -gravity northwest -geometry +115+150 -composite "$SCRATCH/result.png"
magick "$SCRATCH/result.png" "$SCRATCH/c2.png" -gravity northwest -geometry +365+150 -composite "$SCRATCH/result.png"
magick "$SCRATCH/result.png" "$SCRATCH/c3.png" -gravity northwest -geometry +615+150 -composite "$SCRATCH/result.png"
magick "$SCRATCH/result.png" "$SCRATCH/c4.png" -gravity northwest -geometry +865+150 -composite img/card-image.png
