import re

with open('lib/i18n.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# English
content = content.replace("nav: {\n        stack: 'Technologies',", "nav: {\n        toggle_menu: 'Toggle Menu',\n        stack: 'Technologies',")
# Spanish
content = content.replace("nav: {\n        stack: 'Tecnologías',", "nav: {\n        toggle_menu: 'Alternar Menú',\n        stack: 'Tecnologías',")
# French
content = content.replace("nav: {\n        stack: 'Technologies',", "nav: {\n        toggle_menu: 'Basculer le Menu',\n        stack: 'Technologies',")
# Chinese
content = content.replace("nav: {\n        stack: '技術',", "nav: {\n        toggle_menu: '切換選單',\n        stack: '技術',")

with open('lib/i18n.ts', 'w', encoding='utf-8') as f:
    f.write(content)
