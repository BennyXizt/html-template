import { infinity_scroll, animations_observer } from "./components/observers/observers.js";



 animations_observer(document.querySelectorAll('.list li'))


  infinity_scroll(document.querySelector('.list li:last-child'))

