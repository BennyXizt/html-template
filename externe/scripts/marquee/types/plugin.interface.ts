import { MarqueeDirection } from "./plugin.type"

export interface MarqueeElementInterface {
    root: HTMLElement
    speed: number
    offset: number
    direction: MarqueeDirection
    gap: number
    childrensWidth: number
}
