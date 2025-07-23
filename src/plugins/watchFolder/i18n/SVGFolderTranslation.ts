import { Translation } from "./Translation"

export class SVGFolderTranslation extends Translation {
    constructor({pluginName, language}: { pluginName: string, language?: Language}) {
        super({ pluginName, language })
        this.messages = {
            ru: {
                ...this.messages.ru,
                pluginStart: (watchDir: string, nameOfTheOutputFile: string) =>
                    `Началось слежение за директорией ${watchDir}, итоговые спрайты будут записаны в ${nameOfTheOutputFile}`,
                iconWasCreated: (destFile: string, name: string) =>
                    `🆕 Иконка создана: ${destFile} c id="${name}"`,
                iconIsExist: (name: string) =>
                    `📄 SVG c именем ${name} уже существует`
            },
            en: {
                ...this.messages.en,
                pluginStart: (watchDir: string, nameOfTheOutputFile: string) =>
                `Started watching directory ${watchDir}, final sprites will be saved to ${nameOfTheOutputFile}`,
                iconWasCreated: (destFile: string, name: string) =>
                `🆕 Icon created: ${destFile} with id="${name}"`,
                iconIsExist: (name: string) =>
                `📄 SVG with name ${name} already exists`
            },
            de: {
                ...this.messages.de,
                pluginStart: (watchDir: string, nameOfTheOutputFile: string) =>
                `Überwachung des Verzeichnisses ${watchDir} gestartet, finale Sprites werden in ${nameOfTheOutputFile} gespeichert`,
                iconWasCreated: (destFile: string, name: string) =>
                `🆕 Symbol erstellt: ${destFile} mit id="${name}"`,
                iconIsExist: (name: string) =>
                `📄 SVG mit dem Namen ${name} existiert bereits`
            }
        }
    }
    pluginStart(watchDir: string, nameOfTheOutputFile: string) {
        console.log(`[${this.pluginName}]: ${this.messages[this.language]?.pluginStart(watchDir, nameOfTheOutputFile)}`)
    }
    iconWasCreated(destFile: string, name: string) {      
        console.log(`[${this.pluginName}]: ${this.messages[this.language]?.iconWasCreated(destFile, name)}`)
    }
    iconIsExist(name: string) {
        console.log(`[${this.pluginName}]: ${this.messages[this.language]?.iconIsExist(name)}`)
    }

}