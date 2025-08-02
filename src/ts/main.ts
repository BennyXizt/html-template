import '../externe/test.scss'
import '../assets/styles/main.scss'
import { BurgerMenu } from '../externe/components'
import { autoloader } from '../externe/plugins/autoloader/autoloader'

window.addEventListener('click', function(e) {
    const 
        burger: HTMLElement | null = (e.target as HTMLElement).closest('.burger')
    
    if(burger)
        BurgerMenu(burger)


})

document.fonts.ready.then(() => {
    autoloader()
})