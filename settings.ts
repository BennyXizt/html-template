import { ConvertVideo } from "./externe/plugins/convertVideo/types/plugin.type"
import { convertToMOV } from "./externe/plugins/convertVideo/utils/utils"


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
        outputFormat: '.mov',
        convertVideoFunction: convertToMOV
    },
    excludedSVG: [
        
    ]
}