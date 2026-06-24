import os
import glob
import re

directory = r"c:\Users\Felip\OneDrive\Escritorio\Autonovations\courses\DE"
html_files = glob.glob(os.path.join(directory, "*.html"))

old_root_css = """:root {
  --bg: #0a0e1a; --bg2: #0f1629; --bg3: #131c35; --bg4: #1a2540;
  --blue: #3b82f6; --cyan: #06b6d4; --purple: #8b5cf6; --green: #10b981;
  --orange: #f59e0b; --pink: #ec4899; --red: #ef4444;
  --t1: #f1f5f9; --t2: #94a3b8; --t3: #64748b;
  --border: #1e2d4a;
  --sidebar-width: 280px;
}"""

new_root_css = """:root {
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

old_body_css = "body{font-family:'Inter',sans-serif;background:var(--bg);color:var(--t1);line-height:1.7;display:flex;}"
new_body_css = "body{font-family:'Inter',sans-serif;background:var(--bg);color:var(--t1);line-height:1.7;display:flex;font-size:1.15rem;}"

old_body_css_fallback = "body{font-family:'Inter',sans-serif;background:var(--bg);color:var(--t1);line-height:1.7;display:flex;"
new_body_css_fallback = "body{font-family:'Inter',sans-serif;background:var(--bg);color:var(--t1);line-height:1.7;display:flex;font-size:1.15rem;"

for file_path in html_files:
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()

    # Apply root css replacement
    if old_root_css in content:
        content = content.replace(old_root_css, new_root_css)
    else:
        # Some files might have slightly different spacing
        print(f"Warning: root CSS not exactly matched in {os.path.basename(file_path)}")
        # Fallback to regex
        pattern = re.compile(r":root\s*\{[^}]+\}", re.MULTILINE)
        if pattern.search(content):
            content = pattern.sub(new_root_css, content)
            print(f"  Applied regex fallback for root in {os.path.basename(file_path)}")

    # Apply body css replacement
    if old_body_css in content:
        content = content.replace(old_body_css, new_body_css)
    elif old_body_css_fallback in content and "font-size" not in content.split("body{")[1].split("}")[0]:
        content = content.replace(old_body_css_fallback, new_body_css_fallback)
    else:
        # Fallback to regex
        body_pattern = re.compile(r"body\s*\{([^}]+)\}", re.MULTILINE)
        match = body_pattern.search(content)
        if match:
            inner_css = match.group(1)
            if "font-size" not in inner_css:
                new_inner = inner_css + "font-size:1.15rem;"
                content = content.replace(match.group(0), f"body{{{new_inner}}}")
                print(f"  Applied regex fallback for body in {os.path.basename(file_path)}")

    # Ensure theme initialization script is at the very beginning of the <head>
    theme_script = '''<script>
    (function() {
        const savedTheme = localStorage.getItem('deCourseTheme') || 'dark';
        if (savedTheme === 'light') document.documentElement.classList.add('light');
    })();
</script>'''
    if "deCourseTheme" not in content:
        content = content.replace("<head>", f"<head>\n{theme_script}")

    with open(file_path, "w", encoding="utf-8") as f:
        f.write(content)

print("HTML files updated successfully.")
