  function habilitaDia1() {
    var x = document.getElementById("div_dia_inicial");
    x.style.display = "block";
  }
  function desabilitaDia1() {
    var x = document.getElementById("div_dia_inicial");
    if (x.style.display == "block") {
      x.style.display = "none";
    } 
  }