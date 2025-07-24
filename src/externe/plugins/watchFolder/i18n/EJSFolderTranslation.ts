
import { Translation } from "./Translation"

export class EJSFolderTranslation extends Translation {
    constructor({pluginName, language}: {pluginName: string, language?: Language}) {
        super({pluginName, language}),
            this.messages = {
                ru: {
                    ...this.messages.ru,
                    pluginStart: (watchDir: string, { destinationRootHTML }: { destinationRootHTML: string | undefined}) =>
                        'Началось слежение за директорией ' + watchDir +
                        (destinationRootHTML ? `\n[${this.pluginName}]: Итоговый Root HTML будет записан в ${destinationRootHTML}` : ''),
                        // (destinationRootHTML ? `\n[${this.pluginName}]: Остальные HTML будут записаны в ${destinationRootHTML}` : '')
                        // ,
                    
                }
            }
    }
    pluginStart(watchDir: string, { destinationRootHTML }: { destinationRootHTML: string | undefined}) {
        console.log(`[${this.pluginName}]: ${this.messages[this.language]?.pluginStart(watchDir, { destinationRootHTML })}`)
    }
}