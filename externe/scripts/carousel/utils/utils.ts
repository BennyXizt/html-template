import { CarouselElementInterface } from "../types/plugin.interface";

export function animate(carousel: CarouselElementInterface) {
    if(!carousel.timerNext) {
        carousel.timerNext = Date.now() + carousel.timerInterval
    }

    const now = Date.now()

    let remaining = carousel.timerNext - now

    const seconds = Math.max(0, Math.ceil(remaining / 1000))

   if(remaining <= 0) {
        step(carousel)

        carousel.timerNext = now + carousel.timerInterval
        remaining = carousel.timerNext - Date.now()
    } else if(seconds !== carousel.timerSeconds) {
        carousel.timerSeconds = seconds

        renderTimer(carousel)
    } 

    carousel.animationID = requestAnimationFrame(() => animate(carousel))
}
export function step(carousel: CarouselElementInterface) {
    if (!carousel.visible) {
        carousel.animationID = undefined
        return
    }

    if(carousel.direction == 'left') {
        carousel.position =
            carousel.position - carousel.offset < -carousel.dimention ? 
                0 : carousel.position - carousel.offset
    } else if(carousel.direction == 'right') {
        carousel.position += 
            carousel.position == 0 ? -carousel.dimention : carousel.offset
    } else if(carousel.direction == 'step') {
        carousel.position = -carousel.offset * carousel.step

        carousel.step = undefined
    }

    if(carousel.direction !== carousel.originalDirection) carousel.direction = carousel.originalDirection

    toggleDotActive(carousel)
    renderCounter(carousel)
    
    carousel.root.style.transform = `translate3d(${carousel.position}px, 0, 0)`
    
}

export function toggleDotActive(carousel) {
    const 
        slideIndex = Math.abs(carousel.position) / carousel.offset,
        slides = carousel.root.children,
        slide = Array.from(slides)[slideIndex],
        dots = carousel.carousel.querySelector('[data-fsc-carousel-dots]').children,
        dot = Array.from(dots)[slideIndex]

    for (var item of [...slides, ...dots]) {
        item.classList.remove('active')
    }

    slide.classList.toggle('active')
    dot.classList.toggle('active')
}

export function renderCounter(carousel) {
    const
        element = carousel.carousel.querySelector('[data-fsc-carousel-counter]')
   
    if(!element) return

    const
        slide = Math.abs(carousel.position) / carousel.offset + 1,
        slides = carousel.root.children

    element.innerHTML = `${slide} / ${slides.length}`
}

function renderTimer(carousel) {
    const
        element = carousel.carousel.querySelector('[data-fsc-carousel-timer]')
   
    if(!element) return

    element.innerHTML = carousel.timerSeconds
}