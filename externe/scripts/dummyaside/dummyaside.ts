

export function dummyasideAutoload() {
   const pages = (import.meta as any).glob('/externe/pages/*.html', { 
        eager: true, 
        query: '?url', 
        import: 'default'  
    });
    
   const result = Object.entries(pages)
    .map(e => {
        return {
            name: e[0].match(/\/externe\/pages\/(.+)\.html$/)![1],
            link: e[0]
        }
    })

    const ul = document.createElement('ul')
    ul.innerHTML = 
    `
        <li>
            <a href='http://localhost:5173/'>Main Page</a>
        </li>
    `
    result.forEach(e =>{
        ul.innerHTML += 
        `
            <li>
                <a href='${e.link}'>${e.name[0].toUpperCase() + e.name.slice(1)}</a>
            </li>
        `
        
    })
    
    document.querySelector('[data-fsc-dummyaside]')?.append(ul)
    
}