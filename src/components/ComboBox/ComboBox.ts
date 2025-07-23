import type { ComboBoxSettings} from './types/plugin.interface'
import { SearchType } from './types/plugin.enum'

let 
    originalList: Element[] = [],
    isAutoCorrectExists = false

import './_ComboBox.scss'

export function ComboBox(settings: ComboBoxSettings) {
    const finalSettings: ComboBoxSettings = {
        ...settings,
        searchType: settings.searchType ?? SearchType.default
    }
    
    handleClick(finalSettings, originalList)
    handleAutoCorrect(finalSettings, originalList)
}


function handleClick({event, searchType}: ComboBoxSettings, originalList: Element[]) {
    const 
        target = event.target as HTMLElement,
        liHTMLElement = target.closest('li[data-fsc-combobox-item]'),
        inputHTMLElement = target.hasAttribute('data-fsc-combobox') ? target : null,
        imgHTMLElement = target.hasAttribute('data-fsc-combobox-input-icon-close')
        

    document.querySelectorAll("article[data-fsc-combobox-collapsed='true']").forEach((combo_box) => {
        (combo_box as HTMLElement).dataset['fscComboboxCollapsed'] = 'false'
    })   
    
    
    if(inputHTMLElement) {
        const   
            combo_box = inputHTMLElement.closest('article[data-fsc-combobox-id]'),
            ul = combo_box?.querySelector('ul'),
            list = ul?.querySelectorAll('p'),
            convertedList = list ? Array.from(list) : []

        const finalParameters = {
            ul,
            list: Array.from(list!),
            searchType: searchType || SearchType.default,
            searchTerm: (inputHTMLElement as HTMLInputElement).value?.trim()?.toLowerCase()
        }
            
        if(originalList.length == 0)
            originalList.push(...convertedList)

        if(inputHTMLElement.hasAttribute('data-fsc-combobox-result'))
            actionFilterList(finalParameters)
            

        if(combo_box) 
            (combo_box as HTMLElement).dataset['fscComboboxCollapsed'] = 'true'
    }
    
    if(liHTMLElement) {
        const 
            combo_box = target.closest('article[data-fsc-combobox-id]'),
            input = combo_box?.querySelector('input'),
            close = combo_box?.querySelector('img[data-fsc-combobox-input-icon-close]')
        
        if(close) {
            close.setAttribute('data-fsc-combobox-collapsed', '')
        }
        
        
        if(input) {
            input.value = liHTMLElement.textContent!.trim()
            input.setAttribute('data-fsc-combobox-result', '')
        }
    }

    if(imgHTMLElement) {
        const 
            combo_box = target.closest('article[data-fsc-combobox-id]'),
            input = combo_box?.querySelector('input'),
            ul = combo_box?.querySelector('ul'),
            list = ul?.querySelectorAll('p'),
            convertedList = list ? Array.from(list) : []
        
        if(input) {
            input.value = ''
            target.removeAttribute('data-fsc-combobox-collapsed')

             const finalParameters = {
                ul,
                list: Array.from(list!),
                searchType: searchType || SearchType.default,
                searchTerm: ''
            }
            
           actionFilterList(finalParameters)
                
        }
       
    }
}

function handleAutoCorrect({ searchType }: ComboBoxSettings, originalList: Element[]) {
    if(isAutoCorrectExists) return
        isAutoCorrectExists = true
        
    const input = document.querySelector("article[data-fsc-combobox-collapsed='true'] input")

    if(input) {
        input?.removeEventListener("keyup", autoCorrect)
        input?.addEventListener("keyup", autoCorrect)
    }
    
    function autoCorrect(this: HTMLInputElement) {        
        const combo_box = this.closest("article[data-fsc-combobox-id]"),
              ul = combo_box?.querySelector('ul'),
              searchTerm = this.value?.trim()?.toLowerCase(),
              list = [...originalList]
            
        const finalParameters = {
            list, searchTerm, ul,
            searchType: searchType ?? SearchType.default
        }

        actionFilterList(finalParameters)        
    }
}

function actionFilterList( { list, searchTerm, ul, searchType } : {
    list: Element[],
    searchTerm: string | null,
    ul: HTMLUListElement | null | undefined,
    searchType: SearchType 
}) {    
 const convertedList = list ? Array.from(list) : []    

 const 
        combo_box = ul?.closest("article[data-fsc-combobox-id]"),
        imgClose = combo_box?.querySelector("img[data-fsc-combobox-input-icon-close]")
 
    
 
 if(convertedList.length > 0 && searchTerm && ul) {    

    (imgClose as HTMLElement)?.setAttribute('data-fsc-combobox-collapsed', '')

    const filteredList =
        convertedList
        .filter(e => {            
            if(searchType == SearchType.firstLetter) 
                return e.textContent?.trim()?.toLowerCase()?.startsWith(searchTerm)
            else if(searchType == SearchType.default) 
                return e.textContent?.trim()?.toLowerCase()?.includes(searchTerm)
        })
        .map(e => {
            const 
                value = e.textContent

            let span: string | undefined = ''

            if(searchType == SearchType.firstLetter) 
                span = value?.replace(new RegExp(searchTerm, "i"), match => {
                    return `<span data-fsc-combobox-highlited>${match}</span>`
                })
            else if(searchType == SearchType.default) 
                span = value?.replace(new RegExp(searchTerm, "ig"), match => {
                    return `<span data-fsc-combobox-highlited>${match}</span>`
                })
            
            return {
                span,
                image: e.querySelector('img')
            }
            
        })
        
        ul.innerHTML = ''
        filteredList.forEach(e => {
            ul.insertAdjacentHTML('beforeend',
                `<li data-fsc-combobox-item>
                    <p>
                        ${e.span}
                        ${e.image?.outerHTML}
                    </p>
                </li>`
            )
            
        })     
 }
 else if(searchTerm == '' && ul) {
    imgClose?.removeAttribute('data-fsc-combobox-collapsed')
    
    ul.innerHTML = ''
    originalList.forEach(e => {     
        ul.insertAdjacentHTML('beforeend',
            `<li data-fsc-combobox-item>
                ${e.outerHTML}
            </li>`
        )                
    })    
    
    if(combo_box) 
            (combo_box as HTMLElement).dataset['fscComboboxCollapsed'] = 'true'
    
 }
}

