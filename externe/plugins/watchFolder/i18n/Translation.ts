export class Translation {
    protected messages: Record<Language, any> = {
        ru: {
            newFileAdded: (filePath: string) =>
                `🆕 Новый файл добавлен: ${filePath}`,
            fileHasBeenUpdated: (destinationFile: string) =>
                `🔄 Файл был перезаписан: ${destinationFile}`,
            fileHasBeenChanged: (filePath: string) =>
                `🔄 Файл был изменен: ${filePath}`,
            errorReadingTheFile: (err: Error) =>
                `❌ Ошибка при чтении файла:\n ${err}`

        },
        en: {
            newFileAdded: (filePath: string) =>
            `🆕 New file added: ${filePath}`,
            errorReadingTheFile: (err: Error) =>
            `❌ Error reading the file:\n ${err}`
        },
        de: {
            newFileAdded: (filePath: string) =>
            `🆕 Neue Datei hinzugefügt: ${filePath}`,
            errorReadingTheFile: (err: Error) =>
            `❌ Fehler beim Lesen der Datei:\n ${err}`
        }
    }

    pluginName: string
    language: Language
    

    constructor({pluginName, language}: { pluginName: string, language?: Language}) {
        this.pluginName = pluginName
        this.language = language ?? 'ru'
    }
    newFileAdded(filePath: string) {
        console.log(`[${this.pluginName}]: ${this.messages[this.language]?.newFileAdded(filePath)}`)
    }
    fileHasBeenChanged(filePath: string) {
        console.log(`[${this.pluginName}]: ${this.messages[this.language]?.fileHasBeenChanged(filePath)}`)
    }
    fileHasBeenUpdated(filePath: string) {
        console.log(`[${this.pluginName}]: ${this.messages[this.language]?.fileHasBeenUpdated(filePath)}`)
    }
    errorReadingTheFile(err: Error) {
       console.error(`[${this.pluginName}]: ${this.messages[this.language]?.errorReadingTheFile(err)}`)
    }

}
