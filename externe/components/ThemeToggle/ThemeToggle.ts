import { themeAttributes } from "./types/plugin.type";

export function ThemeToggle () {
    const
        root: HTMLElement = document.querySelector('html')!,
        attr = root.getAttribute('data-theme'),
        currAttr: themeAttributes = attr === 'dark' ? 'dark' : 'light',
        mapAttr = {
            'dark': 'light',
            'light': 'dark',
        }

    if(attr) {
        root.setAttribute('data-theme', mapAttr[currAttr])
    }
    else root.setAttribute('data-theme', 'dark')
    
}