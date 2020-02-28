document.addEventListener("DOMContentLoaded", async () => {
  const $input_my_guifos = document.querySelector(".input_my_guifos")
  $input_my_guifos.style.display='block'
  
  const renderMyGifs = gifs => {
      let $container = document.querySelector(".container_my_guifos")
      

    if (Array.isArray(gifs)) {
      for (let gif of gifs) {
          let img = document.createElement('img')
          img.setAttribute("width", "270")
          img.setAttribute("height", "270")
          img.setAttribute("style", "margin: 18px 18px 18px 18px")
          img.src = gif.images.downsized.url
          img.alt = gif.title
          $container.appendChild(img)
      }
    } else {
      let img = document.createElement('img')
              img.setAttribute("width", "270")
              img.setAttribute("height", "270")
              img.setAttribute("style", "margin: 18px 18px 18px 18px")
              img.src = gifs.images.downsized.url
              img.alt = gifs.title
              $container.appendChild(img)
    }
  };


const myGifs = JSON.parse(localStorage.getItem("myGifs")) || [];
localStorage.setItem("myGifs", JSON.stringify(myGifs));
const gifs = await getData(`${api_url}?api_key=${api_key}&ids=${myGifs}`);
renderMyGifs(gifs);

});

