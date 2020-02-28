const api_url = 'https://api.giphy.com/v1/gifs'
const api_key = 'ov7ynlo25jnTdbgLfZKfNgzbBB77Tfzy'
const endpoints = {
    upload: `https://upload.giphy.com/v1/gifs?api_key=${api_key}`
}

const getData = async endpoint => {
    try {
        const res = await fetch(endpoint)
        const data = await res.json()
        return data.data
    } catch (error) {
        console.log(error)
    }
}

const source = (imgId, gifId) => {
    document.getElementById(imgId).src = 'https://i.giphy.com/media/' + gifId + '/giphy.webp'
}

const getId = async(endpoint, imgId) => {
    try {
        const res = await fetch(endpoint)
        const data = await res.json()
        return source(imgId, data.data.id)
    } catch (error) {
        console.log(error)
    }
}

document.addEventListener("DOMContentLoaded", async () => {
   
 
    
    const btn_comenzar = document.querySelector(".btn_comenzar")
    const container_crear = document.querySelector(".container_crear")
    const capturar = document.querySelector(".container_capturar")
    const container_subiendo = document.querySelector(".container_subiendo")
    const $input_my_guifos = document.querySelector(".input_my_guifos")
    const btn_capturar = document.querySelector("#btn_capturar")
    const btn_camara = document.querySelector(".btn_camara")
    const captura_gif = document.querySelector("#captura_gif")
    const btn_listo = document.querySelector("#btn_listo")
    const btn_recording = document.querySelector(".btn_recording")
    const input_listo = document.querySelector(".input_listo")
    const btn_listo_container = document.querySelector(".btn_listo_container")
    const btn_container_capt2= document.querySelector(".btn_container_capt2")
    const container_btn_repetir= document.querySelector(".container_btn_repetir")
    const btn_repetir= document.querySelector(".btn_repetir")
    const btn_subir = document.querySelector(".btn_subir")
    const input_repetir = document.querySelector(".input_repetir")
    const barra_carga = document.querySelector(".barra_carga")
    const container_capturando = document.querySelector(".container_capturando")
    const $desc = document.querySelector(".a_descarga");
    const btn_listo2 = document.querySelector(".btn_listo2")
    const capturaGif = document.querySelector(".capturaGif")
    const $container = document.querySelector(".container_my_guifos")
    
    

    
   
    const img = document.createElement('img')
    let recorder = null;
    let blob = null;
     
    
    btn_comenzar.addEventListener('click', () => {
        capturar.style.display = 'block'
        container_crear.style.display = 'none'
        $input_my_guifos.style.display = 'none'
        $container.style.display = 'none'
        

        carga()
    
    })
    
    btn_capturar.addEventListener('click', async () => {
    
        btn_container_capt2.style.display = 'none'
        btn_capturar.style.visibility = 'none'
        btn_camara.style.display = 'none'
        btn_listo_container.style.display = 'block'
        btn_listo.style.display = 'block'
        btn_recording.style.display = 'block'
        input_listo.style.display = 'block'
        $input_my_guifos.style.display = 'none'
        $container.style.display = 'none'
        
    
        recorder = await startRecord(recorder, captura_gif)
    
    })
    
    btn_listo.addEventListener('click', async () => {
        move()
        

        await stopRecord(recorder, captura_gif)
        img.style.display = 'block'

        $input_my_guifos.style.display = 'none'
        $container.style.display = 'none'
        
        
    })
    
    btn_repetir.addEventListener('click', async () => {
    
        container_btn_repetir.style.display = 'none'
        btn_repetir.style.display = 'none'
        btn_subir.style.display = 'none'
        $input_my_guifos.style.display = 'none'
        $container.style.display = 'none'
        img.src = URL.revokeObjectURL(blob)
        captura_gif.style.display = 'block'
        img.style.display = 'none'
        recorder = await startRecord(recorder, captura_gif)
        btn_listo_container.style.display = 'block'
        btn_listo.style.display = 'block'
        btn_recording.style.display = 'block'
        input_listo.style.display = 'block'
        document.querySelector('.titulosDeMensaje').innerHTML = 'Capturando tu Guifo';
        
    })
    
    btn_subir.addEventListener('click', async () => {
        container_subiendo.style.display="block"
        btn_repetir.style.display="none"
        btn_subir.style.display="none"
        capturar.style.display="none"
        input_repetir.style.display = 'none'
        document.getElementById('min').style.display='none'
        document.getElementById('seg').style.display='none'
        $container.style.display = 'none'
        document.querySelector(".barra_carga").style.display = 'none'
        
        moveIt()
        let blob = await recorder.getBlob()  
        let response = await sendGif(blob)
        const gif = await getData(`${api_url}/${response.id}?api_key=${api_key}`);
        renderVistaGif(gif);
        container_subiendo.style.display="none" 
        container_crear.style.display="block"
        $input_my_guifos.style.display="block"  
        document.querySelector('.titulosDeMensaje').innerHTML = 'Guifo subido con éxito';
        document.querySelector('.img_window').style.display = 'none'
        document.querySelector('.text_instrucciones').style.display = 'none'
        document.querySelector('.btn_cancelar').style.display = 'none'
        document.querySelector('.btn_comenzar').style.display = 'none'
        document.querySelector('.gifo_creado').style.display = 'block'
        document.querySelector('.btn_copiar').style.display = 'block'
        document.querySelector('.btn_descargar').style.display = 'block'
        document.querySelector('.btn_listo2').style.display = 'block'
        document.querySelector('.capturaGif').style.display = 'block'
        capturaGif.style.display = 'block'
        $container.style.display = 'block'
        
    })

    

    
    btn_listo2.addEventListener('click', () => {
        container_crear.style.display='none'
        
    })

    $desc.addEventListener("click", async () => {
        let blob = await recorder.getBlob();
        const blobUrl = URL.createObjectURL(blob)
        $desc.setAttribute("href", blobUrl)
      }) 

      document.querySelector(".btn_copiar").addEventListener("click", async () => {
        let input = document.createElement("input");
        let blob = await recorder.getBlob();
        const blobUrl = URL.createObjectURL(blob);
        input.setAttribute("value", blobUrl);
        document.body.appendChild(input);
        input.select();
        document.execCommand("copy");
        document.body.removeChild(input);
      })
    
    const getMedia = async () => {
        let stream = null 
        try {
            stream = await navigator.mediaDevices.getUserMedia({
                video: {
                    width:{max: 950},
                    height:{max: 434},
                 },
                audio: false
            })
            return stream
        } catch(err) {
            return 'Sin permisos para la cámara'
        }
    }
    
    const startRecord = async (recorder, container) => {
        let stream = await getMedia() 
        container.srcObject = stream
        container.play()
        recorder = new RecordRTCPromisesHandler(stream, {
            type: 'gif',
            frameRate: 1,
            quality: 10,
            width: 360,
            hidden: 240,
            onGifRecordingStarted: function() {
                document.querySelector('.titulosDeMensaje').innerHTML = ' ';

                document.querySelector('.titulosDeMensaje').innerHTML = 'Capturando tu guifo';
            }
            });
        recorder.startRecording();
        return recorder;
     }
    
     const stopRecord = async (recorder, container) => {
    
        btn_listo_container.style.display = 'none'
        btn_listo.style.display = 'none'
        btn_recording.style.display = 'none'
        input_listo.style.display = 'none'
        document.querySelector('.titulosDeMensaje').innerHTML = 'Vista previa'
        container_btn_repetir.style.display = 'block'
        btn_repetir.style.display = 'block'
        btn_subir.style.display = 'block'
        input_repetir.style.display = 'block'
        barra_carga.style.display = 'block'
        carga2()
        container.pause()
        container.srcObject = null
        
        await recorder.stopRecording()
        let blob = await recorder.getBlob()  
        preview(blob)  
        return blob
    }
    
    const upload = async (endpoint, body) => {
        try {
            const res = await fetch(endpoint, {
                method: 'POST',
                mode: 'cors',
                body: body,
            })
            const data = await res.json()
            return data.data
        } catch (error) {
            console.log(error)
        }
    }
    
    
    const sendGif = async blob => {
        const form = new FormData();
        form.append("file", blob, "myGifs.gif");
        console.log(form.get("file"));
        const response = await upload(endpoints.upload, form);
        const actualGifs = JSON.parse(localStorage.getItem("myGifs")) || [];
        console.log(actualGifs);
        const newGifs = [...actualGifs, response.id];
        console.log(newGifs);
        localStorage.setItem("myGifs", JSON.stringify(newGifs));
        const gif = await getData(`${api_url}?api_key=${api_key}&ids=${newGifs}`);
        renderMyGif(gif);
        return response;
    };
    
    const renderMyGif = (gifs)  => {
        let $container = document.querySelector(".container_my_guifos")
        $input_my_guifos.style.display = 'block'
        input_repetir.style.display = 'none'
    
        if(Array.isArray(gifs)) { 
            for(let gif of gifs) {
    
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
    }
    
    const preview = (blob) => {
        captura_gif.style.display = 'none'
        
        img.src = URL.createObjectURL(blob)
        img.setAttribute("width", "832")
        img.setAttribute("height", "434") 
        container_capturando.appendChild(img)
          
    }

    const renderVistaGif = gif => {
        let vistaGif = document.querySelector(".capturaGif");
        let img = document.createElement("img");
        img.setAttribute("width", "365");
        img.setAttribute("height", "191");
        img.setAttribute("style", "opacity: 0.7");
        img.src = gif.images.downsized.url;
        img.alt = gif.title;
        vistaGif.appendChild(img);
      };


      var i = 0;
      function move() {
        if (i == 0) {
          i = 1;
          var elem = document.getElementById("divisor1");
          var width = 1;
          var id = setInterval(frame, 30);
          function frame() {
            if (width >= 100) {
              clearInterval(id);
              i = 0;
            } else {
              width++;
              elem.style.width = width + "%";
            }
          }
        }
      }
      
      var i = 0;
      function moveIt() {
        if (i == 0) {
          i = 1;
          var elem = document.getElementById("up3");
          var width = 1;
          var id = setInterval(frame, 50);
          function frame() {
            if (width >= 100) {
              clearInterval(id);
              i = 0;
            } else {
              width++;
              elem.style.width = width + "%";
            }
          }
        }
      }
      function detener(){
          clearInterval(cronometro)
      }
      function carga(){
          contador_s =  00
          contador_m = 00
          s = document.getElementById('segundos')
          m = document.getElementById('minutos')

          cronometro = setInterval(
              function(){
                  if(contador_s==60)
                  {
                      contador_s=0
                      contador_m++
                      m.innerHTML=contador_m
                      if(contador_m==0)
                      {
                          contador_m=0
                      }
                  }
                  s.innerHTML = contador_s
                  contador_s++
              }
         ,1000)
      }

      function stop(){
        clearInterval(cronometro)
    }
      function carga2(){
        contador_s =  00
        contador_m = 00
        s = document.getElementById('seg')
        m = document.getElementById('min')

        cronometro = setInterval(
            function(){
                if(contador_s==60)
                {
                    contador_s=0
                    contador_m++
                    m.innerHTML=contador_m
                    if(contador_m==0)
                    {
                        contador_m=0
                    }
                }
                s.innerHTML = contador_s
                contador_s++
            }
       ,1000)
    }

    function counter_fn() {
        var counter = document.getElementById("cntr");
        var count = 0;
        count = counter.value;
        count = count + 1;
        counter.innerHTML = count;
      }
      window.onload = counter_fn;

      

      const myGifs = JSON.parse(localStorage.getItem("myGifs")) || [];
    localStorage.setItem("myGifs", JSON.stringify(myGifs));
    const gif = await getData(`${api_url}?api_key=${api_key}&ids=${myGifs}`);
    renderMyGifs(gif);


})  