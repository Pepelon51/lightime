self.addEventListener('install', event=>{

    caches.open('appShellPrueba').then(cache=>{
        cache.addAll([
            '/index.html',
            'js/app.js',
            '/images/banner1.jpg',
            "css/bootstrap.min.css",
            "css/style.css",
            "css/responsive.css",
            "images/fevicon.png",
            "images/logo.png"

        ])
    });

   /* caches.match('/index.html')
        .then(respuesta=>{
            respuesta.text().then(console.log)
        }); */

    self.skipWaiting(); 

    self.addEventListener('activate', event=>{
        //Elimimar la cache anterior
        caches.delete('appShellTest');

    })


    self.addEventListener('fetch', event=>{
        const resp =fecth(event.request).then( respuesta=>{
            if(!respuesta){
                return caches.match(event.request);
            }else{
                caches.open('dinamico').then(
                    cache=>{
                        cache.put(event.request, respuesta);
                    }
                );
                return respuesta.clone();
            }
            }).catch(err=>{
                return caches.match(e.request);
            });
        });
        event.respondWidth(resp);

    });


    //console.log(event);
      /* const respuesta=fecth(event.request).then();
      event.respondWith(respuesta); */
     /* event.respondWith(
        fetch(event.request)
        .then(resp=>{
            if(resp.ok){
                return resp;
            }else{
                console.log('no tibio');
            }
            })

      );

      console.log(event.request.url);*/