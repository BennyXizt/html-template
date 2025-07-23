import { Translation } from "./Translation"

export class FontsFolderTranslation extends Translation {
    constructor({pluginName, language}: {pluginName: string, language?: Language}) {
        super({pluginName, language})
        this.messages = {
            ru: {
                ...this.messages.ru,
                pluginStart: (watchDir: string, outputDestination: string) =>
                    `Началось слежение за директорией ${watchDir}\n[${this.pluginName}]: Итоговые шрифты будут записаны в ${outputDestination}`,
                errorFontWeightNotExists: (name: string) =>
                    `❌ Ошибка font-weight c названием '${name}' не существует`,
                newFontAdded: (destinationFile: string) =>
                    `🆕 Шрифт создан: ${destinationFile}`,
                newFontUpdated: (destinationFile: string) =>
                    `🆕 Шрифт обновлён: ${destinationFile}`
            },
            en: {
                ...this.messages.en,
                pluginStart: (watchDir: string, outputDestination: string) =>
                `Started watching directory ${watchDir}, final fonts will be saved to ${outputDestination}`,
                errorFontWeightNotExists: (name: string) =>
                `❌ Error: font-weight named '${name}' does not exist`,
                newFontAdded: (destinationFile: string) =>
                `🆕 Font created: ${destinationFile}`,
                newFontUpdated: (destinationFile: string) =>
                `🆕 Font updated: ${destinationFile}`
            },
            de: {
                ...this.messages.de,
                pluginStart: (watchDir: string, outputDestination: string) =>
                `Überwachung des Verzeichnisses ${watchDir} gestartet, finale Schriftarten werden in ${outputDestination} gespeichert`,
                errorFontWeightNotExists: (name: string) =>
                `❌ Fehler: font-weight mit dem Namen '${name}' existiert nicht`,
                newFontAdded: (destinationFile: string) =>
                `🆕 Schriftart erstellt: ${destinationFile}`,
                newFontUpdated: (destinationFile: string) =>
                `🆕 Schriftart aktualisiert: ${destinationFile}`
            }
        }
    }
    pluginStart(watchDir: string, outputDestination: string) {
        console.log(`[${this.pluginName}]: ${this.messages[this.language]?.pluginStart(watchDir, outputDestination)}`)
    }
    newFontAdded(destinationFile: string) {
        console.log(`[${this.pluginName}]: ${this.messages[this.language]?.newFontAdded(destinationFile)}`)
    }
    newFontUpdated(destinationFile: string) {
       console.log(`[${this.pluginName}]: ${this.messages[this.language]?.newFontUpdated(destinationFile)}`)
    }
    errorFontWeightNotExists(name: string) {        
        console.error(`[${this.pluginName}]: ${this.messages[this.language]?.errorFontWeightNotExists(name)}`)
    }
}