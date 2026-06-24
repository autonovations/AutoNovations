import os
import glob
import re

def refactor_html_files():
    directory = r"c:\Users\Felip\OneDrive\Escritorio\DE"
    html_files = glob.glob(os.path.join(directory, "chapter-*.html"))
    
    script_tag = '<script src="nav.js"></script>'
    
    for file_path in html_files:
        print(f"Procesando: {os.path.basename(file_path)}")
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
            
        # Remover el aside manual (si existe)
        pattern = re.compile(r'<aside class="sidebar">.*?</aside>', re.DOTALL)
        content = pattern.sub('', content)
        
        # Insertar el script antes de </body> si no está presente
        if script_tag not in content:
            content = content.replace('</body>', f'  {script_tag}\n</body>')
            
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
            
    print(f"¡{len(html_files)} archivos procesados con éxito!")

if __name__ == "__main__":
    refactor_html_files()
