import '../assets/styles/main.scss'
import { BurgerMenu } from '../components'


window.addEventListener('click', function(e) {
    const 
        burger: HTMLElement | null = (e.target as HTMLElement).closest('.burger')
    
    if(burger)
        BurgerMenu(burger)


})
