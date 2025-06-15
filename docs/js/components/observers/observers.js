export function animations_observer(entries, params) {
    if(!entries) return

    if(!params) {
        params = {
            rootMargin: "0px 0px 0px 0px",
            threshold: [0.5]
        }
    }

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            const currElement = entry.target

            if(entry.isIntersecting) {
                currElement.classList.add("animate")
            }
            else {
                currElement.classList.remove("animate")
            }
        })
    }, params)

    if(entries.length == undefined) {
        observer.observe(entries)
    }
    else {
        Array
            .from(entries)
            .forEach(element => observer.observe(element))
    }
}

export function lazy_load(entries, params) {
    if(!entries) return

    if(!params) {
        params = {
            rootMargin: "120px 0px 120px 0px",
            threshold: 0
        }
    }

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            const currElement = entry.target

            if(entry.isIntersecting) {
                if(!currElement.src && currElement.getAttribute('data-src'))
                    currElement.setAttribute('src', currElement.getAttribute('data-src'))

                observer.unobserve(currElement) 
            }
        })
    }, params)


    if(entries.length == undefined) {
        observer.observe(entries)
    }
    else {
        Array
            .from(entries)
            .forEach(element => observer.observe(element))
    }


}

export function infinity_scroll(entries, params) {
    if(!entries) return

    if(!params) {
        params = {
            rootMargin: "0px 0px 0px 0px",
            threshold: 1
        }
    }

    const parent = entries.parentElement

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            const elements = parent.querySelectorAll(':scope > *'),
            target = parent.lastElementChild

            console.log(entry.target);
            
            
            if(entry.isIntersecting) {
                console.log("last child");
                
                elements.forEach(el => parent.append(el))

                console.log(elements);
                
                observer.unobserve(entry.target)

                

                parent.append()

                // observer.observe(target)
                
            }
        })
    }, params)
    
   observer.observe(entries)
}




