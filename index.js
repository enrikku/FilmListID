document.addEventListener("DOMContentLoaded", () => {
  const archivo = "./film.txt";
  let tiempo = 0;
  let cont = 0;
  let array = [];

  fetch(archivo)
    .then((response) => response.text())
    .then((contenido) => {
      const lineas = contenido.split("\n");

      lineas.forEach((linea) => {
        const id = linea.trim();
        const idFilm = id;
        const api =
          "https://www.omdbapi.com/?i=" + idFilm + "&plot=full&apikey=b632d598";

        const divContainer = document.getElementById("container");
        const divFilm = document.createElement("div");
        const divImage = document.createElement("div");
        const divText = document.createElement("div");
        const titol = document.createElement("h3");
        const valoracion = document.createElement("h3")

        const divDescription = document.createElement("div");
        
        

        fetch(api)
          .then((res) => res.json())
          .then((data) => {
            const rutaImg = data.Poster;
            const durationFilm = parseInt(data.Runtime.replace(" min", ""));
            const total = document.getElementById("total");
            const horas = document.getElementById("horas");
            const rating = data.imdbRating;

            if (!isNaN(durationFilm)) {
              tiempo = tiempo + durationFilm;
            }

            divDescription.id = id;
            divDescription.classList = "description"

            
            divFilm.id = "film";

            divImage.id = "film-image";
            divImage.classList = id;

            divImage.style.backgroundImage = `url(${rutaImg})`;
            divImage.style.backgroundSize = "100% 100%";

            divText.id = "text";
            titol.classList = "titulo"
            titol.textContent = data.Title;

            valoracion.classList = "valoracion"
            valoracion.textContent = "Valoracion: " + rating

            divContainer.appendChild(divFilm);
            divContainer.appendChild(divDescription)
            divFilm.appendChild(divImage);
            divImage.appendChild(divText);
            divFilm.appendChild(divText);
            divText.appendChild(titol);
            divText.appendChild(valoracion)

            cont++;
            total.textContent = cont;
            horas.textContent = parseInt(tiempo / 60);

            if (cont === lineas.length) 
            {
              var imgs = document.querySelectorAll("#film-image")

              imgs.forEach((img) =>{
                img.addEventListener("click", function(){
                  var idSelection = this.classList[0];

                  obtenerDatos(idSelection);
                })
              })
            }
          });
      });
    })
    .catch((error) => console.error(error));


    function obtenerDatos(idSelection)
    {
      const api = "https://www.omdbapi.com/?i=" + idSelection + "&plot=full&apikey=b632d598";
      const info = document.getElementById(idSelection)
      const films = document.querySelectorAll("#film");
      const estats = document.getElementById("estats")

      const title = document.createElement("h1")
      const year = document.createElement("p")
      const desciption = document.createElement("p")
      const genre = document.createElement("p")
      const rate = document.createElement("p")
      
      
      fetch(api)
      .then((res) => res.json())
      .then((data) => {
          info.style.display = "block"
          info.addEventListener("click", function(){
            info.style.display = "none"
            
            films.forEach((film) =>{
              film.style.display = "flex"
              
              title.innerHTML = ""
              desciption.innerHTML = ""
              desciption.innerHTML = ""
              genre.innerHTML = ""
              rate.innerHTML = ""

              estats.style.display = "block"
            })
          });

          estats.style.display = "none"

          title.innerHTML = data.Title;
          year.innerHTML = data.Year
          genre.innerHTML = data.Genre
          desciption.innerHTML = data.Plot

          //desciption.innerHTML = descripcionTraducida(data.Plot);

          rate.innerHTML = "Valoracion: " + data.imdbRating
          
          info.appendChild(title)
          title.appendChild(year)
          year.appendChild(genre)
          genre.appendChild(desciption)
          desciption.appendChild(rate)

          films.forEach((film) =>{
            film.style.display = "none"
          })
      }); 
    }

    function descripcionTraducida(desciption)
    {
      const translateAPI = "https://api.mymemory.translated.net/get?q=" + desciption + "&langpair=en|es"
      var traduction = "";
      const pito = document.getElementById("enric")
      
      fetch(translateAPI)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.matches[0].translation)
        traduction = data.matches[0].translation
      });
    }
  });
