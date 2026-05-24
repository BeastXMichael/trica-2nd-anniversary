#!/usr/bin/env python3
"""
Compress all photos in Photos/ for web:
  - Resize so longest edge <= 2000px
  - Save as JPEG (quality 80) + WebP (quality 80)
  - Mirror folder structure in Photos_optimized/
  - Skip .mov and other non-image files
"""
import os
import sys
from pathlib import Path
from PIL import Image, UnidentifiedImageError

BASE = Path(__file__).parent
SRC = BASE / "Photos"
DST = BASE / "Photos_optimized"
MAX_EDGE = 2000
QUALITY = 80
IMAGE_EXTS = {".jpg", ".jpeg", ".png", ".webp"}

failed = []
processed = 0
skipped = 0

def resize_if_needed(img):
    w, h = img.size
    longest = max(w, h)
    if longest <= MAX_EDGE:
        return img
    scale = MAX_EDGE / longest
    return img.resize((int(w * scale), int(h * scale)), Image.LANCZOS)

for src_path in sorted(SRC.rglob("*")):
    if not src_path.is_file():
        continue
    if src_path.suffix.lower() not in IMAGE_EXTS:
        skipped += 1
        continue

    rel = src_path.relative_to(SRC)
    # JPEG output — keep original stem, force .jpg extension
    dst_jpg = DST / rel.parent / (rel.stem + ".jpg")
    dst_webp = DST / rel.parent / (rel.stem + ".webp")

    dst_jpg.parent.mkdir(parents=True, exist_ok=True)

    try:
        with Image.open(src_path) as img:
            # Preserve EXIF orientation
            try:
                from PIL import ImageOps
                img = ImageOps.exif_transpose(img)
            except Exception:
                pass

            # Convert palette/transparency modes for JPEG compat
            if img.mode in ("RGBA", "P", "LA"):
                img = img.convert("RGB")
            elif img.mode != "RGB":
                img = img.convert("RGB")

            img = resize_if_needed(img)

            img.save(dst_jpg, "JPEG", quality=QUALITY, optimize=True, progressive=True)
            img.save(dst_webp, "WEBP", quality=QUALITY, method=6)

        orig_kb = src_path.stat().st_size / 1024
        jpg_kb  = dst_jpg.stat().st_size / 1024
        webp_kb = dst_webp.stat().st_size / 1024
        print(f"OK  {rel}  {orig_kb:.0f}KB -> jpg:{jpg_kb:.0f}KB  webp:{webp_kb:.0f}KB")
        processed += 1

    except (UnidentifiedImageError, Exception) as e:
        print(f"ERR {rel}: {e}", file=sys.stderr)
        failed.append(str(rel))

print(f"\n--- Done ---")
print(f"Processed: {processed} images")
print(f"Skipped (non-image): {skipped} files")
if failed:
    print(f"FAILED ({len(failed)}):")
    for f in failed:
        print(f"  {f}")
else:
    print("Failed: 0")

# Root-level special photos (Hero, Closing) — also in SRC root
for root_img in ["Hero Photo.jpg", "Closing Photo 1.jpg", "Closing photo 2.jpg"]:
    src_path = SRC / root_img
    if not src_path.exists():
        continue
    stem = Path(root_img).stem
    dst_jpg  = DST / (stem + ".jpg")
    dst_webp = DST / (stem + ".webp")
    try:
        with Image.open(src_path) as img:
            try:
                from PIL import ImageOps
                img = ImageOps.exif_transpose(img)
            except Exception:
                pass
            if img.mode != "RGB":
                img = img.convert("RGB")
            img = resize_if_needed(img)
            img.save(dst_jpg, "JPEG", quality=QUALITY, optimize=True, progressive=True)
            img.save(dst_webp, "WEBP", quality=QUALITY, method=6)
        print(f"OK  (root) {root_img}")
    except Exception as e:
        print(f"ERR (root) {root_img}: {e}", file=sys.stderr)
