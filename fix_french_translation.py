import re

with open('lib/i18n.ts', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace("toggle_menu: 'Toggle Menu',\n        stack: 'Technologies',\n        services: 'Services',\n        ai: 'IA & Agents',", "toggle_menu: 'Basculer le Menu',\n        stack: 'Technologies',\n        services: 'Services',\n        ai: 'IA & Agents',")

with open('lib/i18n.ts', 'w', encoding='utf-8') as f:
    f.write(content)
