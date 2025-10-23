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
import { MarqueeDirection } from "./types/plugin.type"

const marqueeElements: MarqueeElementInterface[] = []
let animationStarted = false

export function marquee() {
    const elements = document.querySelectorAll('[data-fsc-marquee]') as NodeListOf<HTMLElement>

    for (const root of elements) {
        if (root.getAttribute('data-fsc-marquee-initialized')) continue

        const 
            speed = root.getAttribute('data-fsc-marquee-speed') ? parseInt(root.getAttribute('data-fsc-marquee-speed')!) : 1000,
            direction: MarqueeDirection  = root.getAttribute('data-fsc-marquee-direction') ? root.getAttribute('data-fsc-marquee-direction') : 'left',
            // isHorizontal = direction === 'left' || direction === 'right',
            offset = root.getAttribute('data-fsc-marquee-start') ? parseInt(root.getAttribute('data-fsc-marquee-start')!) : 0,
            childrens = root.querySelectorAll('[data-fsc-marquee-item]'),
            gap = Number.parseInt(getComputedStyle(root).columnGap)
        
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
        
        marqueeElements.push({root, childrensWidth, gap, speed, offset, direction})

        root.setAttribute('data-fsc-marquee-initialized', 'true')
    }

    if (!animationStarted) {
        animationStarted = true
        requestAnimationFrame(step)
    }
}

function step() {
    for (const marqueeElement of marqueeElements) {   
        if(marqueeElement.direction === 'left') {
            marqueeElement.offset -= marqueeElement.speed / 1000
        
            if (marqueeElement.offset < -marqueeElement.childrensWidth) {
                marqueeElement.offset = marqueeElement.gap
            }

            marqueeElement.root.style.transform = `translate3d(${marqueeElement.offset}px, 0, 0)`
        }
        else if(marqueeElement.direction === 'right') {
            marqueeElement.offset += marqueeElement.speed / 1000
        
            if (marqueeElement.offset >= marqueeElement.gap) {
                marqueeElement.offset = -marqueeElement.childrensWidth
            }

            marqueeElement.root.style.transform = `translate3d(${marqueeElement.offset}px, 0, 0)`
        }
    }

    requestAnimationFrame(step)
}
