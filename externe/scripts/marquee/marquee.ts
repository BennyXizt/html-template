import { MarqueeElementInterface } from "./types/plugin.interface"

const marqueeElements: MarqueeElementInterface[] = []
let animationStarted = false

export function marquee() {
    const elements = document.querySelectorAll('[data-fsc-marquee]') as NodeListOf<HTMLElement>

    for (const root of elements) {
        if (root.getAttribute('data-fsc-marquee-initialized')) continue

        root.style.willChange = 'transform'
        const 
            speed = root.getAttribute('data-fsc-marquee-speed') ? parseInt(root.getAttribute('data-fsc-marquee-speed')!) : 1000,
            direction = root.getAttribute('data-fsc-marquee-direction') ? root.getAttribute('data-fsc-marquee-direction') : 'left',
            isVertical = direction === 'left' || direction === 'right',
            offset = root.getAttribute('data-fsc-marquee-start') ? parseInt(root.getAttribute('data-fsc-marquee-start')!) : isVertical ? root.offsetWidth : root.parentElement!.offsetHeight,
            childrens = root.querySelectorAll('[data-fsc-marquee-item]')

        let 
            childrensWidth = Array.from(childrens).reduce((acc, prev) => acc + (prev as HTMLElement).offsetWidth, 0)

        marqueeElements.push({ element: root, speed, offset, direction: (direction as MarqueeDirection)! })       
        
        if(childrens.length > 0) {
            let index = 0
            while(root.offsetWidth > childrensWidth) {
                childrensWidth += (childrens[index] as HTMLElement).offsetWidth

                root.appendChild(childrens[index].cloneNode(true))
                
                index = index + 1 < childrens.length ? index + 1 : 0
            }
        }

        root.setAttribute('data-fsc-marquee-initialized', 'true')
    }

    if (!animationStarted) {
        animationStarted = true
        requestAnimationFrame(step)
    }
}

function step() {
    for (const item of marqueeElements) {        
        if(item.direction === 'left' || item.direction === 'right') {
            if(item.direction === 'left') {
                item.offset -= item.speed / 1000

                if (item.offset < -item.element.offsetWidth) 
                    item.offset = item.element.parentElement!.offsetWidth
            }
            else {
                item.offset += item.speed / 1000

                if (item.offset > item.element.offsetWidth) 
                    item.offset = -item.element.parentElement!.offsetWidth
            
            }                
    
            item.element.style.transform = `translate3d(${item.offset}px, 0, 0)`
        }
        else {
            if(item.direction === 'top') {
                item.offset -= item.speed / 1000

                console.log(`${item.offset} < ${item.element.offsetHeight}`);
                

                if (item.offset < item.element.offsetHeight) 
                    item.offset = item.element.parentElement!.offsetHeight
            }
            else {
                item.offset += item.speed / 1000

                if (item.offset > item.element.offsetHeight) 
                    item.offset = -item.element.parentElement!.offsetHeight
            
            }                
    
            item.element.style.transform = `translate3d(0, ${item.offset}px, 0)`
        }
           
    }

    requestAnimationFrame(step)
}
