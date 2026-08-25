// @ts-ignore
import '@/assets/styles/main.scss'
// @ts-ignore
import { autoloader } from '~/scripts/autoloader/autoloader'

import main from './utils/main.js'
import type { LoadedModule } from './types/plugin.type.js'

async function init() {
    const loadedModules = new Map<string, LoadedModule>()

    await autoloader({ loadedModules })

    main(loadedModules)
}

init()

// document.addEventListener('DOMContentLoaded', () => {

// })