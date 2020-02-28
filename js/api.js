
const api_key = 'ov7ynlo25jnTdbgLfZKfNgzbBB77Tfzy'

document.addEventListener('DOMContentLoaded', () => {
function apiCallSearch(query, limit, offset){
  fetch('http://api.giphy.com/v1/gifs/search?api_key=ov7ynlo25jnTdbgLfZKfNgzbBB77Tfzy&q=' + query + '&limit=' + limit + '&offset=' + offset)
  .then((response) => {
          return response.json();
      })
  .then((myApiResponse) => {
      myApiResponse.data.forEach(element => {
          console.log(element);
      });
  });
}


function setSrcGif(imgid, gifid) {
  document.getElementById(imgid).src = 'https://i.giphy.com/media/' + gifid + '/giphy.webp'
}

function gifRandom(tag, imgid){
  fetch('http://api.giphy.com/v1/gifs/random?api_key=ov7ynlo25jnTdbgLfZKfNgzbBB77Tfzy&tag=' + tag)
  .then((response) => {
      return response.json()
  }).then((json) => {
      setSrcGif(imgid, json.data.id)
    
  })
}
const container = document.getElementById("gifsBusqueda")

  document.querySelector(".vermas1").addEventListener("click", () => {
    url = `https://api.giphy.com/v1/gifs/search?api_key=ov7ynlo25jnTdbgLfZKfNgzbBB77Tfzy&limit=12&q=`
    url += 'simpsons';
    fetch(url)
        .then(response => response.json())
        .then(content => {
            console.log(content.data)
            console.log("META", content.meta)
            container.innerHTML = ''
            content.data.forEach(gif => {
                renderGif(gif)
            });

        })
        .catch(err => {
            console.error(err);
        });

    })
    document.querySelector(".vermas2").addEventListener("click", () => {
    url = `https://api.giphy.com/v1/gifs/search?api_key=ov7ynlo25jnTdbgLfZKfNgzbBB77Tfzy&limit=12&q=`
    url += 'friends';
    fetch(url)
        .then(response => response.json())
        .then(content => {
            console.log(content.data)
            console.log("META", content.meta)
            container.innerHTML = ''
            content.data.forEach(gif => {
                renderGif(gif)
            });

        })
        .catch(err => {
            console.error(err);
        });

    })
    document.querySelector(".vermas3").addEventListener("click", () => {
      url = `https://api.giphy.com/v1/gifs/search?api_key=ov7ynlo25jnTdbgLfZKfNgzbBB77Tfzy&limit=12&q=`
    url += 'marty mcfly';
    fetch(url)
        .then(response => response.json())
        .then(content => {
            console.log(content.data)
            console.log("META", content.meta)
            container.innerHTML = ''
            content.data.forEach(gif => {
                renderGif(gif)
            });

        })
        .catch(err => {
            console.error(err);
        });

    })
    document.querySelector(".vermas4").addEventListener("click", () => {
      url = `https://api.giphy.com/v1/gifs/search?api_key=ov7ynlo25jnTdbgLfZKfNgzbBB77Tfzy&limit=12&q=`
    url += 'daft punk';
    fetch(url)
        .then(response => response.json())
        .then(content => {
            console.log(content.data)
            console.log("META", content.meta)
            container.innerHTML = ''
            content.data.forEach(gif => {
                renderGif(gif)
            });

        })
        .catch(err => {
            console.error(err);
        });

    })
    



gifRandom('simpsons', 'containerGif1')
gifRandom('friends', 'containerGif2')
gifRandom('marty mcfly', 'containerGif3')
gifRandom('daft punk', 'containerGif4')
}) 





document.addEventListener('DOMContentLoaded', init)
function init() {
  let trend = `https://api.giphy.com/v1/gifs/trending?api_key=ov7ynlo25jnTdbgLfZKfNgzbBB77Tfzy&limit=12&rating=G`
  fetch(trend)
      .then(response => response.json())
      .catch((error) => {
        return error
      })
      .then(content => {
        console.log(content.data)
        console.log('META', content.meta)

        content.data.forEach(gif => {
          renderGif(gif)
      })

      
  document.getElementById('rectangle-copy').addEventListener('click', ev => {
    ev.preventDefault()
    let url = `http://api.giphy.com/v1/gifs/search?api_key=ov7ynlo25jnTdbgLfZKfNgzbBB77Tfzy&limit=12&q=`
    let str = document.getElementById('input').value.trim()
    url = url.concat(str)
    console.log(url)
    fetch(url)
      .then(response => response.json())
      .catch((error) => {
        return error
      })
      .then(content => {
        console.log(content.data)
        console.log('META', content.meta)

        content.data.forEach(gif => {
          renderGif(gif)
          

          
      })




        document.getElementById('input').value = ''

      
  })
  document.getElementById("gifsBusqueda").innerHTML =''

})
})
}



function renderGif(gif) {
  
  let fig = document.createElement('div')
  let img = document.createElement('img')
  let fc = document.createElement('figcaption')
  img.setAttribute("width", "270 ")
  img.setAttribute("height", "270")
  img.src = gif.images.downsized.url
  img.alt = gif.title
  fig.appendChild(img)
  fig.appendChild(fc)
  let container = document.getElementById("gifsBusqueda")

  container.appendChild(fig)

}
