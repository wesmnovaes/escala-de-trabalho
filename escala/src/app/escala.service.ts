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
  addEscala(dia1, hor){  
    this.escala = [];
    let dia_semana = ''
    for (let d=0; d<this.dias; d++){
      dia_semana = moment(this.mes_ano).add(d,'days').format('dddd'); 
      if(dia_semana == 'sábado' && !hor.sab){
          this.escala[d] = '-'
        }else if(dia_semana == 'domingo' && !hor.dom){
          this.escala[d] = '-'
          }else{
          if(hor.altern){
            if(dia1 == 'true'){             
              this.escala[d] = hor.sigla;
              if(d+2 <= this.dias){
              this.escala[d+1] = '-';
              }
            }else{
              this.escala[d] = '-';
              if(d+2 <= this.dias){
                this.escala[d+1] = hor.sigla
              }
            }
            d++;
          }else{
            this.escala[d] = hor.sigla
          }
        }
      }
      return this.escala
  }  
    addFalta(ausencia,funcio,dt_inicio,dt_fim){
      console.log("chegou aqui o funcionário: "+funcio.nome+" primeiro dia: "+funcio.escala[0])
      for(let c = 0; c < funcio.escala.length; c++){
       let dia = moment(this.mes_ano).add(c, 'days').format('YYYY-MM-DD')
        if(dia >= dt_inicio && dia <= dt_fim ){
          if(ausencia == 'falta' && funcio.escala[c] != '-'){
              funcio.escala[c] = 'A*'
          }else if (ausencia == 'ferias' && funcio.escala[c] != '-') {
            funcio.escala[c] = 'Fe*'
          }    
        }  
      }
    return funcio;
    }

atualizaFuncionario(escala,fun){
  let idx = escala.findIndex((x) => x.nome == fun.nome)
  escala[idx] = fun;
  return escala;
}
}