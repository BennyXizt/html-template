
export interface CarouselElementInterface {
    carousel: HTMLElement
    carouselList: HTMLElement
    originalDirection: string
    direction: string
    dimention: number
    buttonLeft: HTMLElement | null
    buttonRight: HTMLElement | null
    offset: number
    length: number
    isDisabledAllowed: boolean
    position: number
    index: number
    timerInterval: number
    timerNext: number | undefined
    timerSeconds: number | undefined
    step: number | undefined
    visible: boolean
    animationID: number | undefined
}