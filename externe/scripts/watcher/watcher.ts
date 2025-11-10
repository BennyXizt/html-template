/**
 * watcher.ts
 * Компонент Intersection Observer, позволяющий следить за появлением элемента в viewport Браузера.
 *
 * Поддерживаемые атрибуты `data-fsc-watcher-*`:
 * - data-fsc-watcher — инициализирует элемент как счетчик
 */

export const watcherObserverArray = [watcherObserver, '[data-fsc-watcher]']

function watcherObserver(entry: IntersectionObserverEntry, observer: IntersectionObserver) {
  const rootClass = entry.target.classList[0].match(/^([A-Za-z-]+)(?:__.*)?$/)
  
  if(entry.isIntersecting) 
    entry.target.classList.add(`${rootClass![1]}--active`)   
  else 
    entry.target.classList.remove(`${rootClass![1]}--active`)   
   
}