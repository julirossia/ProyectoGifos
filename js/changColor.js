document.addEventListener("DOMContentLoaded", async () => {

    const body = document.querySelector('body')
    const bodyclass = localStorage.getItem('color-theme')

    let activateThemes = (bodyclass) => {

        if (bodyclass == 'dark-mode') {
            body.classList.add("dark");
            body.classList.remove("light");
        }
        else if (bodyclass == 'light-mode') {
            body.classList.add("light");
            body.classList.remove("dark");
        }
        else {
            body.classList.add('dark')
        }
    }

    activateThemes(bodyclass)

    document.querySelector(".dark").addEventListener("click", () => {
        const body = document.querySelector(".body");
        body.classList.add("dark");
        body.classList.remove("light");
        localStorage.setItem('color-theme', 'dark-mode')
    });

    document.querySelector(".day").addEventListener("click", () => {
        const body = document.querySelector("body");
        body.classList.add("light");
        body.classList.remove("dark");
        localStorage.setItem('color-theme', 'light-mode')


    });
})

