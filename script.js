window.onload = () => {
    document.getElementById("searchButton").addEventListener("click", search);
  };
  
  function search() {
    let address = document.getElementById("searchField").value;
    fetch(
      "https://api.dataforsyningen.dk/adgangsadresser?vejnavn=" + address
    ).then((response) =>
      response.json().then((data) => {
        console.log(data);
        let html = "<ul>";
        data.forEach((element) => {
          html += "<li>" + element.adressebetegnelse + "</li>";
        });
        html += "</ul>";
        document.getElementById("found").innerHTML = html;
      })
    );
  }