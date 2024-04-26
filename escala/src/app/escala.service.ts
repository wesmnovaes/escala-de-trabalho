import { Injectable } from '@angular/core';
import moment from '../../node_modules/moment';

@Injectable({
  providedIn: 'root'
})
export class EscalaService {

  calendario:any[] = [];
  escala:any = [];  
  dias = 0;
  mes_ano = '';
  constructor(){}

  addMes(ForObj:any){
    this.mes_ano = ForObj.escolhaMes
    this.dias = moment(ForObj.escolhaMes, "YYYY-MM").daysInMonth()
    if (this.calendario[0] == null) {
      for(let i=0; i < this.dias; i++){
        let d = moment(ForObj.escolhaMes).add(i, 'days').format('D, ddd')
        this.calendario.push(d)
      }
    }
    return this.calendario;
  }
  addEscala(inicio,escala,checkbox_trabalha_sabado){
    this.escala = [];
    let dia_semana = ''
    if(escala == 'MT'){
      for (let d=0; d<this.dias; d++){
        dia_semana = moment(this.mes_ano).add(d,'days').format('dddd'); 
        console.log("esse é o dia da semana: || "+dia_semana);
        if(dia_semana == 'sábado' || dia_semana == 'domingo'){
          if(checkbox_trabalha_sabado){
            this.escala[d] = 'M*';  
          }else{
            this.escala[d] = '-';
          }
        }else{
          this.escala[d] = escala;
          if(d+2 <= this.dias){
            this.escala[d+1] = '-';
          }
        } 
      }
    } else{
        for (let d=0; d<this.dias; d++){
          if(inicio == 'true'){
            this.escala[d] = escala;
            if(d+2 <= this.dias){
              this.escala[d+1] = '-';
            }
          }else{
            this.escala[d] = '-';
            if(d+2 <= this.dias){
              this.escala[d+1] = escala;
            }
          }
            d++;
          }
    }
      return this.escala;
    }
}