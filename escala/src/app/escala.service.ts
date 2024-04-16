import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EscalaService {

  pessoa:[] = [];
  
  constructor() { 

    

  }

  addPessoa(matriz: any, mes: any, tipo:any){
  
    let dias = this.getDias(mes)
    let x = 0
    while(x <= dias){
      if (x%2 == 0) {
        matriz[x] = tipo;
      }else  matriz[x] = '-';
      x++;
    }

    return matriz;
  }
  getDias(mes: number){
    if (mes == 2){
       return 28;}
      else if (mes == 4 || mes == 6 || mes == 9 || mes == 11 ){
        return 30}
      else 
        return 31
  }


}
