
export function phpmailerOnSubmit(event: Event) {
   event.preventDefault()
   const 
        element = event.target as HTMLFormElement

    if(!element)
        return

    const
        body = new FormData(element),
        method = element.getAttribute('method') || 'POST'
        
   fetch('/php/mail.php', {
        method,
        body
   })
   .then(res => res.json())
   .then(data => alert(`Status: ${data.status}`))
}