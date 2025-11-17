/**
 * scroll.ts
 * Прокручивает страницу или родительские контейнеры так, чтобы элемент стал видимым для пользователя.
 *
 * Поддерживаемые атрибуты `data-fsc-scroll-*`:
 * - data-fsc-scroll — инициализирует элемент
 * - data-fsc-scroll-to — прокрутка к элементу с селектором
 * - data-fsc-scroll-behaviour — определяет, будет ли прокрутка плавной
 * - data-fsc-scroll-block — определяет положение элемента по вертикали
 * 
 * Параметры scrollIntoView()
 *   block: определяет положение элемента по вертикали.
 *     - 'nearest' (по умолчанию): прокручивает страницу так, чтобы элемент оказался в видимой области, если он еще не виден. Это самый близкий к текущему положению вариант.
 *     - 'center': центрирует элемент в видимой области.
 *     - 'end': прокручивает страницу так, чтобы элемент оказался внизу видимой области.
 *   behavior: определяет, будет ли прокрутка плавной.
 *     - 'auto' (по умолчанию): мгновенная прокрутка.
 *     - 'smooth': плавная анимация прокрутки. 
 */

import { ScrollBehavior, ScrollLogicalPosition } from "./types/plugin.type";


export const scrollClickArray = [scrollClick, '[data-fsc-scroll]']

function scrollClick(element: HTMLElement) {
    const 
        destinationSelector = element.getAttribute('data-fsc-scroll-to') || 'main',
        destination = document.querySelector(destinationSelector!),
        scrollBehaviour = element.getAttribute('data-fsc-scroll-behaviour'),
        scrollBlock = element.getAttribute('data-fsc-scroll-block')

    if(!destination) {
        console.warn('[SCROLL]: Destination = ', destination)
        return
    }

    const
        typisiertScrollBehaviour: ScrollBehavior = 
            scrollBehaviour === 'auto' || scrollBehaviour === 'smooth' || scrollBehaviour === 'instant' 
                ?    scrollBehaviour : 'smooth',
        typisiertScrollBlock: ScrollLogicalPosition = 
            scrollBlock === 'center' || scrollBlock === 'end' || scrollBlock === 'nearest' || scrollBlock === 'start' 
                ?    scrollBlock : 'end'
                
    destination.scrollIntoView({ behavior: typisiertScrollBehaviour, block: typisiertScrollBlock });
}