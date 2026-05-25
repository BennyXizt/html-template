import { convertVideo } from "./externe/plugins/convertMedia"
import { ConvertVideo } from "./externe/plugins/convertMedia/types/plugin.interface"


type Settings = {
    watcherNeeded: boolean
    SVGConvertType: number
    videoConverter: {
        outputFormat: string
        convertVideoFunction: ({ inputFile, outputFile }: ConvertVideo) => void
    }
    excludedSVG: string[]
}

export const settings: Settings = {
    watcherNeeded: true,
    SVGConvertType: 0,
    videoConverter: {
        outputFormat: convertVideo.toMP4scale480.extention,
        convertVideoFunction: convertVideo.toMP4scale480.function
    },
    excludedSVG: [
        
    ]
}