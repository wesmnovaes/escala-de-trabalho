  function habilitaDia1() {
    var x = document.getElementById("div_dia_inicial");
    x.style.display = "block";

    
  }
  function mostrar_legenda(){
    var y = document.getElementById("legenda_horario");
    y.style.display = "block";
  }
  function desabilitaDia1() {
    var x = document.getElementById("div_dia_inicial");
    if (x.style.display == "block") {
      x.style.display = "none";
    } 
  }
  function printDiv(divName) {
    var printContents = document.getElementById(divName).innerHTML;
    var originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;

    window.print();

    document.body.innerHTML = originalContents;
}