
export interface CarouselElementInterface {
    carousel: HTMLElement
    carouselList: HTMLElement
    originalDirection: string
    direction: string
    dimention: number
    offset: number
    length: number
    position: number
    index: number
    timerInterval: number
    timerNext: number | undefined
    timerSeconds: number | undefined
    step: number | undefined
    visible: boolean
    animationID: number | undefined
}