/**
 * accordion.ts
 * Компонент аккордиона (расскрытие полного тескта при нажатии на заголовок).
 *
 * Поддерживаемые атрибуты `data-fsc-accordion-*`:
 * - data-fsc-accordion — инициализирует элемент
 * - data-fsc-accordion-summary — элемент заголовок
 * - data-fsc-accordion-body — элемент скрытого текста
 * - data-fsc-accordion-behaviour — тип поведения (default - одиночное раскрытие)
 * - data-fsc-accordion-media-query — с какого диапазона в пикселях будет работать аккордион (min- max- width/height: 30px)
 */

let tempParticle: HTMLElement[] = []

export const accordionClickArray = [accordionClick, '[data-fsc-accordion-summary]']

function accordionClick(element: HTMLElement) {
    const 
        accordion = element.closest('[data-fsc-accordion]') as HTMLElement,
        dataBehaviourType = accordion?.getAttribute('data-fsc-accordion-behaviour'),
        dataMediaVisibility = accordion?.getAttribute('data-fsc-accordion-media-query')
        
    if(dataMediaVisibility && !window.matchMedia(`(${dataMediaVisibility})`).matches) 
        return

    if(dataBehaviourType !== 'default') {
        tempParticle.forEach(e => {
            if(e.hasAttribute('style'))
                e.removeAttribute('style')
            if(!e.isSameNode(accordion) && e.hasAttribute('data-fsc-accordion-active') && !e.hasAttribute('data-fsc-accordion-behaviour'))
                e.removeAttribute('data-fsc-accordion-active')
        })
        tempParticle = []
        tempParticle.push(accordion)
    }

    const 
        hiddenPart = accordion.querySelector('[data-fsc-accordion-body]') as HTMLElement || element.querySelector('.accordion__body') as HTMLElement,
        clone = hiddenPart!.cloneNode(true) as HTMLElement
    
    
    accordion.toggleAttribute('data-fsc-accordion-active')

    clone.style.cssText = 
    `
        opacity: 1;
        visibility: visible;
        height: max-content;
    `

    accordion!.append(clone)
    const cloneHeight = window.getComputedStyle(clone).height
    clone.remove()
    

    if(accordion.hasAttribute('data-fsc-accordion-active')) {
        hiddenPart.style.height = cloneHeight

        if(dataBehaviourType !== 'default')
            tempParticle.push(hiddenPart!)
    }
    else {
        hiddenPart.removeAttribute('style')
    }
}