import glob
import os

directory = r"c:\Users\Felip\OneDrive\Escritorio\Autonovations\courses\DE"
html_files = glob.glob(os.path.join(directory, "*.html"))

for file_path in html_files:
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()

    # Reemplazar el literal \n introducido por error en el script update_styles.py
    if r"<head>\n<script>" in content:
        content = content.replace(r"<head>\n<script>", "<head>\n<script>")

    with open(file_path, "w", encoding="utf-8") as f:
        f.write(content)

print("Saltos de linea arreglados.")
