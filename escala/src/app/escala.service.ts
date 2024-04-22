import { Injectable } from '@angular/core';
import moment from '../../node_modules/moment';

@Injectable({
  providedIn: 'root'
})
export class EscalaService {

  calendario:any[] = [];
  escala:any = [];  
  dias = 0;
  constructor(){}

  addMes(ForObj:any){

     this.dias = moment(ForObj.escolhaMes, "YYYY-MM").daysInMonth()
    if (this.calendario[0] == null) {
      for(let i=0; i < this.dias; i++){
        let d = moment(ForObj.escolhaMes).add(i, 'days').format('D, ddd')
        this.calendario.push(d)
      }
    }
    return this.calendario;
  }
  addEscala(inicio,escala){
    this.escala = [];
    for (let d=0; d<this.dias; d++){
      if(inicio == 'true'){
        this.escala[d] = escala;
        this.escala[d+1] = '-';
        d++;
      }else{
        this.escala[d] = '-';
        this.escala[d+1] = escala;
        d++;
        }
      }
    return this.escala;
    }
}