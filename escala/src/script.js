function mostraPerguntaSabado() {
    var x = document.getElementById("meio_periodo_sabado");
    x.style.display = "flex"; 
  }
  function EscondePerguntaSabado() {
    var x = document.getElementById("meio_periodo_sabado");
    if (x.style.display == "flex") {
    x.style.display = "none";
    }
  }
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