import { ScrollBehavior, ScrollLogicalPosition } from "./types/plugin.type";


export const scrollClickArray = [scrollClick, '[data-fsc-scroll]']

function scrollClick(element: HTMLElement) {
    const 
        destinationSelector = element.getAttribute('data-fsc-scroll-to') || 'main',
        destination = document.querySelector(destinationSelector!),
        scrollBehaviour = element.getAttribute('data-fsc-scroll-behaviour'),
        scrollBlock = element.getAttribute('data-fsc-scroll-block')

    const
        typisiertScrollBehaviour: ScrollBehavior = 
            scrollBehaviour === 'auto' || scrollBehaviour === 'smooth' || scrollBehaviour === 'instant' 
                ?    scrollBehaviour : 'smooth',
        typisiertScrollBlock: ScrollLogicalPosition = 
            scrollBlock === 'center' || scrollBlock === 'end' || scrollBlock === 'nearest' || scrollBlock === 'start' 
                ?    scrollBlock : 'end'
                
    destination!.scrollIntoView({ behavior: typisiertScrollBehaviour, block: typisiertScrollBlock });
}