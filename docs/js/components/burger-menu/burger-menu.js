export default function actionBurgerMenu(burger, body, menu = null) {
    if(!burger) return

    burger.addEventListener("click", function() {
        if(this.classList.contains("active")) {
            this.classList.remove("active")
            this.classList.add("reverse")
            menu.classList.remove("active")
            body.classList.remove("active")
        } else {
            this.classList.remove("reverse")
            this.classList.add("active")
            menu.classList.add("active")
            body.classList.add("active")
        }
    })
    burger.addEventListener("animationend", function(e) {
        if (e.animationName === "burger-reverse-opacity-middle") {
            this.classList.remove("reverse")
        }
    })
}