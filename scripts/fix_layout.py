import os
import glob
import re

directory = r"c:\Users\Felip\OneDrive\Escritorio\Autonovations\courses\DE"
html_files = glob.glob(os.path.join(directory, "*.html"))

for file_path in html_files:
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()

    # Increase font size
    content = re.sub(r"font-size\s*:\s*1\.05rem\s*;", "font-size:1.15rem;", content)
    
    # Update max-widths to use full width
    content = content.replace("max-width:900px;", "max-width:100%;")
    content = content.replace("max-width: 1400px;", "max-width: 100%;")
    content = content.replace("max-width: 1200px;", "max-width: 100%;")

    with open(file_path, "w", encoding="utf-8") as f:
        f.write(content)

# Update update_styles.py as well
update_styles_path = os.path.join(directory, "update_styles.py")
if os.path.exists(update_styles_path):
    with open(update_styles_path, "r", encoding="utf-8") as f:
        styles_content = f.read()
    styles_content = styles_content.replace("1.05rem", "1.15rem")
    with open(update_styles_path, "w", encoding="utf-8") as f:
        f.write(styles_content)

print("Layout and font size updated successfully.")
