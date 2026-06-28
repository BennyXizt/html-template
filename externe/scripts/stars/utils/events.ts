

export function starsHovered(target: HTMLElement, _: Event) {
    const root = target.closest('[data-fsc-stars]')

    if(!root) return

    const 
        front = root.querySelector<HTMLElement>('.stars__front')!,
        index = Number.parseInt(target.dataset.index!) + 1

    front.style.width = `${target.getBoundingClientRect().width * index}px`
}
export function starsUnhovered(target: HTMLElement, _: Event) {
     const root = target.closest('[data-fsc-stars]')

    if(!root) return

    const front = root.querySelector<HTMLElement>('.stars__front')!

    front.removeAttribute('style')
}