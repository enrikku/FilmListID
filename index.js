document.addEventListener("DOMContentLoaded", () => {
  const archivo = "./film.txt";
  let tiempo = 0;
  let cont = 0;

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
            divFilm.appendChild(divImage);
            divImage.appendChild(divText);
            divFilm.appendChild(divText);
            divText.appendChild(titol);
            divText.appendChild(valoracion)

            cont++;
            total.textContent = cont;
            horas.textContent = parseInt(tiempo / 60);
          });
      });
    })
    .catch((error) => console.error(error));
});
