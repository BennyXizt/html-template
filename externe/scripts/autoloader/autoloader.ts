const loadedModules = new Set<string>()

export function autoloader() {
    document.querySelectorAll('*').forEach(async (el) => {
        for (const attr of el.attributes) {
            if (
                attr.name.startsWith('data-fsc-') &&
                !attr.name.replace(/data-fsc-[^-]+/, '').includes('-')  
            ) {
                const moduleName = attr.name.replace('data-fsc-', '')   

                if (loadedModules.has(moduleName)) continue

                try {
                    const module = await import(`@/externe/scripts/${moduleName}/${moduleName}.ts`)
                    module[moduleName](el)
                    loadedModules.add(moduleName)
                } catch (err) {                                     
                     console.log(`@/plugins/${moduleName}/${moduleName}.ts`);   
                    console.error(`❌ Component "${moduleName}" failed to load`, err)
                   
                }            
            }
        }
    });    
}