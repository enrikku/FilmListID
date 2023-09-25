document.addEventListener("DOMContentLoaded", function () {
    const buscador = document.getElementById("buscador");
    const container = document.getElementById("container");
    var estats = document.getElementById("estats")

    buscador.addEventListener("input", function () {
        const searchTerm = buscador.value.toLowerCase();
        window.scrollTo({
            top: 0,
            behavior: "smooth",
          });

        container.querySelectorAll("#film").forEach(film => {
            const title = film.querySelector("h3").textContent.toLowerCase();
            if (title.includes(searchTerm)) {
                var qtt = document.querySelectorAll("#film");
               //console.log(qtt.length)
                film.style.order = "1";
                film.style.opacity = "1";
            } else {
                film.style.order = "2";
                film.style.opacity = "0";
            }

            if(buscador.value === ""){
                console.log("Esta Vacio")
                film.style.visibility = "visible"
                estats.style.visibility = "visible"
                
            }else{
                estats.style.visibility = "hidden"
            }
        });
    });
});