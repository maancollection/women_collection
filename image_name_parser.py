import os
import re

# Path to your pic folder
PIC_FOLDER = "pic"
OUTPUT_JS_FILE = "image_list.txt"
VALID_EXTENSIONS = (".jpg", ".jpeg", ".png", ".webp")

# Scan and process image files
with open(OUTPUT_JS_FILE, "w") as f:
    for filename in sorted(os.listdir(PIC_FOLDER)):
        if filename.lower().endswith(VALID_EXTENSIONS):
            base_name = os.path.splitext(filename)[0]  # remove extension

            match = re.match(r"^(.*?)[ _-]?(\d+)$", base_name.strip())
            if match:
                name = match.group(1).strip()
                price = match.group(2)
                print(f"{filename} : {name} : {price}")
                f.write(f"{filename} : {name} : {price}\n")
            else:
                print(f"Skipping invalid filename: {filename}")

