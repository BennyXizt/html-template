import '~/test.scss'
import '@/assets/styles/main.scss'
// @ts-ignore
import { BurgerMenu } from '~/components'
// @ts-ignore
import { autoloader } from '~/scripts/autoloader/autoloader'

window.addEventListener('click', function(e) {
    const 
        burger: HTMLElement | null = (e.target as HTMLElement).closest('.burger')
    
    if(burger)
        BurgerMenu(burger)


})

document.fonts.ready.then(async() => {
    const loadedModules = new Map<string, any>()
    await autoloader(loadedModules)

    const
        autoloadedModules = Array.from(loadedModules)
            .map(([k, e]) => e?.[`${k}Autoload`])
            .filter(e => typeof e === 'function')
            .forEach(e => e())

    const
        onClickedModules = Array.from(loadedModules)
            .filter(([k, e]) => typeof e[`${k}ClickArray`] === 'object')
            .map(e => {
                return {
                        func: e[1][`${e[0]}ClickArray`][0],
                        elementSelector: e[1][`${e[0]}ClickArray`][1] || `[data-fsc-${e[0]}]`
                    }
                })
    
    const
        onResizeModules = Array.from(loadedModules)
            .filter(([k, e]) => typeof e[`${k}OnResize`] === 'function')
            .map(e => [e[0], e[1][`${e[0]}OnResize`]])

    window.addEventListener('click', function(event) {
        onClickedModules.forEach(e => {
            const 
                DOMElement: HTMLElement | null = (event.target as HTMLElement).closest(e.elementSelector)
                
            if(DOMElement)
                e.func(DOMElement)
            
        })
    })
    

    window.addEventListener('resize', function(event) {
        onResizeModules.forEach(e => e[1]())
    })
    
})