
import { FFmpegProgressInterface } from "../types/plugin.interface"
import { Translation } from "./Translation"

export class VideoFolderTranslation extends Translation {
    constructor({pluginName, language}: {pluginName: string, language?: Language}) {
        super({pluginName, language})
        this.messages = {
            ru: {
                ...this.messages.ru,
                errorConvertingFile: (err: Error, format: string) =>
                    `❌ Ошибка при конвертации в ${format}\n[${this.pluginName}]: ${err}`,
                percentConvertingFile: (progress: FFmpegProgressInterface, fileName: string) =>
                    `⏳ [${fileName}] Обработка: ${progress.percent ? progress.percent.toFixed(2) : '0'}%`,
                videoConvertingStart: (outputFile: string, destinationVideoDirectory: string) =>
                    `Началась конвертация видео ${outputFile}\n[${this.pluginName}]: Итоговый файл будет записан в ${destinationVideoDirectory}`,
                pluginConvertedVideoStart: (watchDir: string, destinationVideoDirectory: string) =>
                    `Началось слежение за директорией ${watchDir}\n[${this.pluginName}]: Итоговые видео будут записаны в директорию ${destinationVideoDirectory}`,
                pluginCreateVideoPosterStart: (watchDir: string, posterDirectory: string) =>
                    `Началось слежение за директорией ${watchDir}\n[${this.pluginName}]: Итоговый постер будет записан в директорию ${posterDirectory}`
            },
            en: {
                errorConvertingFile: (err: Error, format: string) =>
                `❌ Error converting to ${format}\n[${this.pluginName}]: ${err}`,
                percentConvertingFile: (progress: FFmpegProgressInterface, fileName: string) =>
                `⏳ [${fileName}] Processing: ${progress.percent ? progress.percent.toFixed(2) : '0'}%`,
                videoConvertingStart: (outputFile: string, destinationVideoDirectory: string) =>
                `Started converting video ${outputFile}\n[${this.pluginName}]: Final file will be saved to ${destinationVideoDirectory}`,
                pluginConvertedVideoStart: (watchDir: string, destinationVideoDirectory: string) =>
                `Started watching directory ${watchDir}\n[${this.pluginName}]: Final videos will be saved to ${destinationVideoDirectory}`,
                pluginCreateVideoPosterStart: (watchDir: string, posterDirectory: string) =>
                `Started watching directory ${watchDir}\n[${this.pluginName}]: Poster will be saved to ${posterDirectory}`
            },
            de: {
                errorConvertingFile: (err: Error, format: string) =>
                `❌ Fehler bei der Konvertierung in ${format}\n[${this.pluginName}]: ${err}`,
                percentConvertingFile: (progress: FFmpegProgressInterface, fileName: string) =>
                `⏳ [${fileName}] Verarbeitung: ${progress.percent ? progress.percent.toFixed(2) : '0'}%`,
                videoConvertingStart: (outputFile: string, destinationVideoDirectory: string) =>
                `Konvertierung des Videos ${outputFile} gestartet\n[${this.pluginName}]: Die endgültige Datei wird unter ${destinationVideoDirectory} gespeichert`,
                pluginConvertedVideoStart: (watchDir: string, destinationVideoDirectory: string) =>
                `Überwachung des Verzeichnisses ${watchDir} gestartet\n[${this.pluginName}]: Die Videos werden in ${destinationVideoDirectory} gespeichert`,
                pluginCreateVideoPosterStart: (watchDir: string, posterDirectory: string) =>
                `Überwachung des Verzeichnisses ${watchDir} gestartet\n[${this.pluginName}]: Das Poster wird in ${posterDirectory} gespeichert`
            }
        }
    }

    pluginConvertedVideoStart(watchDir: string, destinationVideoDirectory: string) {
        console.log(`[${this.pluginName}]: ${this.messages[this.language]?.pluginConvertedVideoStart(watchDir, destinationVideoDirectory)}`)
    }
    pluginCreateVideoPosterStart(watchDir: string, posterDirectory: string) {
        console.log(`[${this.pluginName}]: ${this.messages[this.language]?.pluginCreateVideoPosterStart(watchDir, posterDirectory)}`)
    }
    videoConvertingStart(outputFile: string, destinationVideoDirectory: string) {
        console.log(`[${this.pluginName}]: ${this.messages[this.language]?.videoConvertingStart(outputFile, destinationVideoDirectory)}`)
    }
    errorConvertingFile(err: Error, format: string) {        
        console.error(`[${this.pluginName}]: ${this.messages[this.language]?.errorConvertingFile(err, format)}`)
    }
    percentConvertingFile(progress: FFmpegProgressInterface, fileName: string) {        
        console.log(`[${this.pluginName}]: ${this.messages[this.language]?.percentConvertingFile(progress, fileName)}`)
    }
}