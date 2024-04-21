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
  addEscala(checkboxD,checkboxN,checkboxM,checkboxMT,checkboxS){
    if(checkboxD){
      for (let d=0; d<this.dias; d++){
        this.escala.push('D')
      }} else if (checkboxN){
        for (let d=0; d<this.dias; d++){
          this.escala.push('N')
        }}else if (checkboxM){
          for (let d=0; d<this.dias; d++){
            this.escala.push('M')
          }}else if (checkboxMT){
            for (let d=0; d<this.dias; d++){
              this.escala.push('MT')
            }}else if (checkboxS){
              for (let d=0; d<this.dias; d++){
                this.escala.push('S')
              }}
    
            return this.escala;
  }
}
