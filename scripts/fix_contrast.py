import os
import glob
import re

directory = r"c:\Users\Felip\OneDrive\Escritorio\Autonovations\courses\DE"
html_files = glob.glob(os.path.join(directory, "*.html"))

new_vars = """:root {
  --bg: #0A0A0A; --bg2: #121212; --bg3: rgba(18, 18, 18, 0.6); --bg4: #1e1e1e;
  --blue: #00D9FF; --cyan: #00D9FF; --purple: #8b5cf6; --green: #10b981;
  --orange: #f59e0b; --pink: #ec4899; --red: #ef4444;
  --t1: #ffffff; --t2: #E0E0E0; --t3: #A0A0A0;
  --border: rgba(0, 217, 255, 0.2);
  --sidebar-width: 280px;

  --bg-primary: var(--bg);
  --bg-secondary: var(--bg2);
  --bg-card: var(--bg3);
  --bg-card-hover: var(--bg4);
  --text-primary: var(--t1);
  --text-secondary: var(--t2);
  --text-muted: var(--t3);
  --accent-cyan: var(--cyan);
  --accent-blue: var(--blue);
  --accent-green: var(--green);
  --accent-orange: var(--orange);
  --accent-purple: var(--purple);
  --gradient-hero: linear-gradient(135deg, var(--bg) 0%, var(--bg2) 100%);
  --gradient-1: linear-gradient(135deg, var(--blue), var(--cyan));
}
html.light {
  --bg: #F8FAFC; --bg2: #FFFFFF; --bg3: rgba(255, 255, 255, 0.7); --bg4: #E2E8F0;
  --blue: #0088CC; --cyan: #00D9FF; --purple: #7c3aed; --green: #059669;
  --orange: #d97706; --pink: #db2777; --red: #dc2626;
  --t1: #0F172A; --t2: #334155; --t3: #64748B;
  --border: rgba(0, 217, 255, 0.3);
}"""

for file_path in html_files:
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()

    # Replace the existing variables block with the new one
    # We look for :root { ... } html.light { ... }
    # Or just replace the whole thing using a robust regex.
    pattern = re.compile(r":root\s*\{.*?(?:html\.light\s*\{[^}]+\})?", re.DOTALL)
    
    # Let's be safer, we can just replace the specific new_root_css string from update_styles.py
    old_css_exact = """:root {
  --bg: #0A0A0A; --bg2: #121212; --bg3: rgba(18, 18, 18, 0.6); --bg4: #1e1e1e;
  --blue: #00D9FF; --cyan: #00D9FF; --purple: #8b5cf6; --green: #10b981;
  --orange: #f59e0b; --pink: #ec4899; --red: #ef4444;
  --t1: #ffffff; --t2: #E0E0E0; --t3: #A0A0A0;
  --border: rgba(0, 217, 255, 0.2);
  --sidebar-width: 280px;
}
html.light {
  --bg: #F8FAFC; --bg2: #FFFFFF; --bg3: rgba(255, 255, 255, 0.7); --bg4: #E2E8F0;
  --blue: #0088CC; --cyan: #00D9FF; --purple: #7c3aed; --green: #059669;
  --orange: #d97706; --pink: #db2777; --red: #dc2626;
  --t1: #0F172A; --t2: #334155; --t3: #64748B;
  --border: rgba(0, 217, 255, 0.3);
}"""
    if old_css_exact in content:
        content = content.replace(old_css_exact, new_vars)
    else:
        # Fallback using regex to match :root and html.light
        content = re.sub(r":root\s*\{[^}]+\}\s*html\.light\s*\{[^}]+\}", new_vars, content)

    # Replace hardcoded poor contrast colors
    content = content.replace("rgba(255,255,255,0.06)", "var(--bg4)")
    content = content.replace("rgba(255,255,255,0.05)", "var(--bg3)")
    content = content.replace("rgba(255,255,255,0.02)", "var(--bg3)")
    content = content.replace("rgba(255,255,255,0.08)", "var(--border)")
    content = content.replace("rgba(255,255,255,0.1)", "var(--border)")
    content = content.replace("linear-gradient(135deg,#fff,var(--t2))", "linear-gradient(135deg,var(--t1),var(--t2))")
    content = content.replace("linear-gradient(135deg, #fff, #94a3b8, #3b82f6)", "linear-gradient(135deg, var(--t1) 0%, var(--t2) 60%, var(--blue) 100%)")

    with open(file_path, "w", encoding="utf-8") as f:
        f.write(content)

print("Updated variables and contrast colors successfully.")
