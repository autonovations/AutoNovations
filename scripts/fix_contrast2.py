import glob
import os

directory = r"c:\Users\Felip\OneDrive\Escritorio\Autonovations\courses\DE"
html_files = glob.glob(os.path.join(directory, "*.html"))

for file_path in html_files:
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()

    # Fix the missing linear-gradient replacement
    content = content.replace("linear-gradient(135deg, #fff 0%, #94a3b8 60%, #3b82f6 100%)", "linear-gradient(135deg, var(--t1) 0%, var(--t2) 60%, var(--blue) 100%)")

    # Fix hardcoded black rgba values if they exist, but actually rgba(0,0,0,0.4) is fine for shadows in light and dark mode.
    # Same for rgba(59,130,246,0.3) which is blue with opacity, fine for both modes.

    with open(file_path, "w", encoding="utf-8") as f:
        f.write(content)

print("Fixed gradient.")
