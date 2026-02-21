import '~/test.scss'
import '@/assets/styles/main.scss'
// @ts-ignore
import { BurgerMenu } from '~/components'
// @ts-ignore
import { autoloader } from '~/scripts/autoloader/autoloader'
import { ClickedModule } from './types/plugin.type'
import { IntersectionObserverElements } from './types/plugin.interface'

window.addEventListener('pointerdown', function(event) {
    const target = event.target

    if (!(target instanceof Element)) return

    const 
        burger: HTMLElement | null = (target as HTMLElement).closest('.burger')

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
        onClickedModules: ClickedModule[] = Array.from(loadedModules)
            .flatMap(([_, e]) =>
                Object.entries(e)
                    .filter(([key]) => key.endsWith('ClickArray'))
                    .map(([, value]) => value as ClickedModule)
            )
            
    const
        IntersectionElements: IntersectionObserverElements[] = [],
        onIntersectionModules = Object.fromEntries(
             Array.from(loadedModules)
            .filter(([k, e]) => typeof e[`${k}ObserverArray`] === 'object')
            .map(([k, e]) => {
                return [
                    k,
                    {
                        func: e[`${k}ObserverArray`][0],
                        elementSelector: e[`${k}ObserverArray`][1] || `[data-fsc-${k}]`,
                        options: e[`${k}ObserverArray`][2] || {}
                    }
                ]
            })
        )

    const
        onSubmitModules = Array.from(loadedModules)
            .filter(([k, e]) => typeof e[`${k}OnSubmit`] === 'function')
            .map(e => [e[0], e[1][`${e[0]}OnSubmit`]])

    const
        onResizeModules = Array.from(loadedModules)
            .filter(([k, e]) => typeof e[`${k}OnResize`] === 'function')
            .map(e => [e[0], e[1][`${e[0]}OnResize`]])

    const
        onKeyUpModules = Array.from(loadedModules)
            .map(([k, e]) => {
                return Object.values(e).find(el => {
                    if(Array.isArray(el) && el[0].name === `${k}OnKeyUp`)
                        return true
                    
                })
            })
            .filter(e => typeof e !== 'undefined')

    for(const element of Object.values(onIntersectionModules)) {
        let observer: IntersectionObserver | undefined  = 
            IntersectionElements
                .find(e => JSON.stringify(e.options) === JSON.stringify(element.options) )
                ?.observer
        
        if(!observer) {
            observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    const watchedModule = Array.from(entry.target.attributes)
                        .map(a => a.name)
                        .filter(name => /^data-fsc-[^-]+$/.test(name))
                        .map(name => name.slice('data-fsc-'.length))[0]
                        
                    if(onIntersectionModules[watchedModule])
                        onIntersectionModules[watchedModule].func(entry, observer)
                })
            }, element.options)

            IntersectionElements.push({
                options: element.options,
                observer
            })
        }

        document.querySelectorAll(element.elementSelector).forEach(el => observer.observe(el))
    }
    
    window.addEventListener('pointerdown', function(event) {
        const target = event.target

        if (!(target instanceof Element)) return

        onClickedModules.forEach(e => {
            const 
                DOMElement: HTMLElement | null = (target as HTMLElement).closest(e[1])
                
            if(DOMElement)
                e[0](DOMElement, event)
        })
    })
    
    window.addEventListener('resize', function(event) {
        onResizeModules.forEach(e => e[1]())
    })

    window.addEventListener('submit', function(event) {
        onSubmitModules.forEach(e => e[1](event))
    })
    
    onKeyUpModules.forEach(e => {
        if(!Array.isArray(e)) return 

        const HTMLElement = document.querySelectorAll(e[1]) 
        HTMLElement.forEach(el => el.addEventListener('keyup', function(event: KeyboardEvent) {
            e[0](event)
        }))
    })
    
})