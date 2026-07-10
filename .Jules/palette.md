## $(date +%Y-%m-%d) - Keyboard Accessibility & ARIA on Custom Selectors
**Learning:** Custom UI components like language toggle buttons and mobile hamburger menus built with non-standard generic buttons require explicit \`aria-pressed\` and \`aria-expanded\` properties for screen readers, and clear \`focus-visible\` utility classes for keyboard navigation.
**Action:** When implementing custom interactive elements, proactively add appropriate ARIA states (\`aria-pressed\`, \`aria-expanded\`, \`aria-controls\`) and ensure distinct \`focus-visible\` states are present.
