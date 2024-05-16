import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EscalaService } from './escala.service';
import { FormBuilder } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 

import '../../node_modules/moment/locale/pt-br';
import { Funcionario } from './Interfaces/funcionario';
import { jsPDF }  from 'jspdf';
import html2canvas from 'html2canvas';
import { horarios } from './Interfaces/horarios';

@Component({
  selector: 'app-root',
  standalone: true,
  host: {ngSkipHydration: 'true'},
  imports: [RouterOutlet, FormsModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})

export class AppComponent {

  //calen:any[] = [] 
  //escala:any[] = []
  pessoas = ['Maria', 'José','Júlia','Pedro']
  mes;
  
  // dados para teste
  horarios:any = [{desc: '7h às 11h - 12 às 19h', sigla: 'D', fds: 'S'}, 
                  {desc: '19h às 21h - 22h às 7h', sigla: 'N', fds: 'S'},
                  {desc: '07h às 12h - 14h às 17h', sigla: 'M', fds: 'S'},
                  {desc: '08h às 12h - 14h às 18h', sigla: 'MT', fds: 'S'},
                  {desc: '08h às 12h Sábado', sigla: 'M*', fds: 'S'}
                ]
  calen:any[] = [ "1, seg"	,"2, ter"	,"3, qua"	,"4, qui"	,"5, sex"	,"6, sáb"	,"7, dom"	,"8, seg"	,"9, ter"	,"10, qua"	,"11, qui"	,"12, sex"	,"13, sáb	","14, dom"	,"15, seg"	,"16, ter"	,"17, qua"	,"18, qui"	,"19, sex"	,"20, sáb"	,"21, dom	","22, seg"	,"23, ter"	,"24, qua"	,"25, qui"	,"26, sex	","27, sáb	","28, dom","29, seg","30, ter","31, ter" ]
  escala:any[] = [
                  {nome:"Maria", escala:["-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-"]},
                  {nome:"João", escala:["-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-"]},
                  {nome:"Pedro", escala:["-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-"]},
                  {nome:"Julia", escala:["-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-"]},
                  {nome:"Maria Alice", escala:["-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-"]}
                ]  
  
  
  constructor(private $services: EscalaService, private formBuilder: FormBuilder){}
  
  funcionario:any[] = [];

  checkoutForm = this.formBuilder.group({
    escolhaMes: '',
    escala: '',
    SelectfuncionaiosLista:'',
    dia1:'',
    checkbox_trabalha_sabado:''
  });
  lancamentoFeriasForm = this.formBuilder.group({
    SelectfuncionaiosListaFF:'',
    dtInicialFF:'',
    dtFimFF:'',
    radioFF:''
  })
  funcionarioForm = this.formBuilder.group({
    nomefuncionario: ''
  })

    gerarPDF(){
      let elementoParaImprimir 
      elementoParaImprimir = document.getElementById('tabela_escala');
     html2canvas(elementoParaImprimir, {scale:2}).then((canvas) => {
        const pdf = new jsPDF({
          orientation: 'l',
          unit: 'mm',
          format: 'a4'
         });
         
         pdf.addImage(canvas.toDataURL('image/PNG'),'PNG',5,5,285,118,'','SLOW',0);
        pdf.save('Escala - '+this.mes);
      })
    }

    onSubmit(){
      this.funcionario.push(this.checkoutForm.value.SelectfuncionaiosLista)
      if(this.checkoutForm.value.escolhaMes != undefined){
        this.mes = this.checkoutForm.value.escolhaMes;
        this.calen = this.$services.addMes(this.checkoutForm.value);
      }
      this.preencheEscala(this.checkoutForm.value.SelectfuncionaiosLista,this.$services.addEscala(this.checkoutForm.value.dia1,
                                                                                                  this.checkoutForm.value.escala,
                                                                                                  this.checkoutForm.value.checkbox_trabalha_sabado))
      this.checkoutForm.controls.escolhaMes.disable();
      this.checkoutForm.reset();
  }
    preencheEscala(nomePessoa, escala){
      let fun: Funcionario = ({nome: nomePessoa, escala: escala});
      this.escala.push(fun);
  }  
    addFuncionario(){
      this.pessoas.push(this.funcionarioForm.value.nomefuncionario||'')
      this.funcionarioForm.reset();
  }
    addFeriasFaltas(){
        this.escala =  this.$services.addFalta(this.lancamentoFeriasForm.value.radioFF,
                                               this.escala,
                                               this.lancamentoFeriasForm.value.SelectfuncionaiosListaFF,
                                               this.lancamentoFeriasForm.value.dtInicialFF,
                                               this.lancamentoFeriasForm.value.dtFimFF)
      }
}