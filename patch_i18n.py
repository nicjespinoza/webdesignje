import re

with open('lib/i18n.ts', 'r') as f:
    content = f.read()

# Add to EN
content = content.replace(
    "contact: 'Contact Me',",
    "contact: 'Contact Me',\n        openMenu: 'Open menu',\n        closeMenu: 'Close menu',"
)

# Add to ES
content = content.replace(
    "contact: 'Contacto',",
    "contact: 'Contacto',\n        openMenu: 'Abrir menú',\n        closeMenu: 'Cerrar menú',"
)

# Add to FR
content = content.replace(
    "contact: 'Contactez-moi',",
    "contact: 'Contactez-moi',\n        openMenu: 'Ouvrir le menu',\n        closeMenu: 'Fermer le menu',"
)

# Add to ZH
content = content.replace(
    "contact: '聯繫我',",
    "contact: '聯繫我',\n        openMenu: '打開選單',\n        closeMenu: '關閉選單',"
)

with open('lib/i18n.ts', 'w') as f:
    f.write(content)
