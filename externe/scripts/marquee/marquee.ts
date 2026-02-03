/**
 * marquee.ts
 * Компонент бесшовной карусели/марки с горизонтальным скроллом.
 *
 * Поддерживаемые атрибуты `data-fsc-marquee-*`:
 * - data-fsc-marquee — инициализирует элемент как карусель
 * - data-fsc-marquee-speed — скорость движения в px/сек (по умолчанию 1000)
 * - data-fsc-marquee-direction — направление движения: 'left' или 'right' (по умолчанию 'left')
 * - data-fsc-marquee-start — начальное смещение в px (по умолчанию 0)
 * - data-fsc-marquee-item — отдельный элемент карусели
 */


import { MarqueeElementInterface } from "./types/plugin.interface"
import type { MarqueeDirection } from "./types/plugin.type"

const marqueeElements: MarqueeElementInterface[] = []
let 
    animationID: number | undefined = undefined

export const marqueeObserverArray = [marqueeObserver, '[data-fsc-marquee]']

export function marqueeAutoload() {
    const elements = document.querySelectorAll('[data-fsc-marquee]') as NodeListOf<HTMLElement>

    for (const root of elements) {
        if (root.getAttribute('data-fsc-marquee-initialized')) continue

        const 
            speed = root.getAttribute('data-fsc-marquee-speed') ? parseInt(root.getAttribute('data-fsc-marquee-speed')!) : 1000,
            direction = root.getAttribute('data-fsc-marquee-direction'),
            // isHorizontal = direction === 'left' || direction === 'right',
            offset = root.getAttribute('data-fsc-marquee-start') ? parseInt(root.getAttribute('data-fsc-marquee-start')!) : 0,
            childrens = root.querySelectorAll('[data-fsc-marquee-item]'),
            gap = Number.parseInt(getComputedStyle(root).columnGap)

        const
            typisiertDirection: MarqueeDirection = 
                direction === 'left' || direction === 'right' || direction === 'top' || direction === 'bottom'
                    ? direction : 'left'
        
        let childrensWidth = Array.from(childrens).reduce(
            (acc, el) => acc + (el as HTMLElement).getBoundingClientRect().width,
        0) + gap * (childrens.length - 1)

        const 
            childrenArray = Array.from(childrens) as HTMLElement[],
            rootWidth = root.getBoundingClientRect().width,
            maxIndex = childrens.length - 1
    
        let currIndex = 0
        while(childrensWidth <= rootWidth) {
            const clone = childrenArray[currIndex].cloneNode(true) as HTMLElement
            clone.setAttribute('data-fsc-marquee-clone', '')
            root.appendChild(clone)

            currIndex = currIndex === maxIndex ? 0 : ++currIndex

            childrensWidth += clone.getBoundingClientRect().width + gap
        }

        const 
            newChildrens = root.querySelectorAll('[data-fsc-marquee-item]'),
            newChildrenArray = Array.from(newChildrens) as HTMLElement[]
        
        for(const child of newChildrenArray) {
            const clone = child.cloneNode(true) as HTMLElement
            clone.setAttribute('data-fsc-marquee-clone', '')
            root.appendChild(clone)
        }
        
        marqueeElements.push({root, childrensWidth, gap, speed, offset, direction: typisiertDirection, visible: false})

        root.setAttribute('data-fsc-marquee-initialized', 'true')
    }
}

export function marqueeOnResize() {
    for (const marqueeElement of marqueeElements) { 
        const 
            root = marqueeElement.root,
            gap = Number.parseInt(getComputedStyle(root).columnGap),
            offset = root.getAttribute('data-fsc-marquee-start') ? parseInt(root.getAttribute('data-fsc-marquee-start')!) : 0,
            oldElements = root.querySelectorAll('[data-fsc-marquee-clone]')

        oldElements.forEach(e => e.remove())
            
        const 
            childrens = root.querySelectorAll('[data-fsc-marquee-item]')
        

        let childrensWidth = Array.from(childrens).reduce(
            (acc, el) => acc + (el as HTMLElement).getBoundingClientRect().width,
        0) + gap * (childrens.length - 1)

        marqueeElement.gap = gap   
        marqueeElement.offset = offset   
        marqueeElement.childrensWidth = childrensWidth  

        const 
            childrenArray = Array.from(childrens) as HTMLElement[],
            rootWidth = root.getBoundingClientRect().width,
            maxIndex = childrens.length - 1
    
        let currIndex = 0
        
        while(childrensWidth <= rootWidth) {
            const clone = childrenArray[currIndex].cloneNode(true) as HTMLElement
            clone.setAttribute('data-fsc-marquee-clone', '')
            root.appendChild(clone)

            currIndex = currIndex === maxIndex ? 0 : ++currIndex

            childrensWidth += clone.getBoundingClientRect().width + gap
        }

        const 
            newChildrens = root.querySelectorAll('[data-fsc-marquee-item]'),
            newChildrenArray = Array.from(newChildrens) as HTMLElement[]
        
        for(const child of newChildrenArray) {
            const clone = child.cloneNode(true) as HTMLElement
            clone.setAttribute('data-fsc-marquee-clone', '')
            root.appendChild(clone)
        }
    }
}

export function marqueeObserver(entry: IntersectionObserverEntry, observer: IntersectionObserver) {
    const el = entry.target as HTMLElement
    const marquee = marqueeElements.find(m => m.root === el)

    if (!marquee) return

    marquee.visible = entry.isIntersecting

    if (marquee.visible && !animationID) {
        animationID = requestAnimationFrame(step)
    }
}

function step() {
    let hasVisible = false

    for (const marqueeElement of marqueeElements) {
        if (!marqueeElement.visible) continue

        hasVisible = true

        if (marqueeElement.direction === 'left') {
            marqueeElement.offset -= marqueeElement.speed / 1000

            if (marqueeElement.offset < -marqueeElement.childrensWidth) {
                marqueeElement.offset = marqueeElement.gap
            }
        }
        else if (marqueeElement.direction === 'right') {
            marqueeElement.offset += marqueeElement.speed / 1000

            if (marqueeElement.offset >= marqueeElement.gap) {
                marqueeElement.offset = -marqueeElement.childrensWidth
            }
        }

        marqueeElement.root.style.transform =
            `translate3d(${marqueeElement.offset}px, 0, 0)`
    }

    if (hasVisible) {
        animationID = requestAnimationFrame(step)
    } else {
        animationID = undefined
    }
}

