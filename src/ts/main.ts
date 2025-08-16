import '~/test.scss'
import '@/assets/styles/main.scss'
import { BurgerMenu } from '~/components'
import { autoloader } from '~/scripts/autoloader/autoloader'

window.addEventListener('click', function(e) {
    const 
        burger: HTMLElement | null = (e.target as HTMLElement).closest('.burger')
    
    if(burger)
        BurgerMenu(burger)


})

document.fonts.ready.then(() => {
    autoloader()
})