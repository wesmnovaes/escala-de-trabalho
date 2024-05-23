import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EscalaService } from './escala.service';
import { FormBuilder } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 

import '../../node_modules/moment/locale/pt-br';
import { Funcionario } from './Interfaces/funcionario';
import { jsPDF }  from 'jspdf';
import html2canvas from 'html2canvas';
import { horario } from './Interfaces/horarios';

@Component({
  selector: 'app-root',
  standalone: true,
  host: {ngSkipHydration: 'true'},
  imports: [RouterOutlet, FormsModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})

export class AppComponent {

  calen:any[] = [] 
  escala:any[] = []
  pessoas = ['Maria', 'José','Júlia','Pedro']
  mes;
  
  // dados para teste
  //horarios:any = [{desc: '7h às 11h - 12 às 19h', legenda: '', sigla: 'D', he: 'S'}]
  horarios:any = []

  constructor(private $services: EscalaService, private formBuilder: FormBuilder){}
  
  funcionario:any[] = [];

  checkoutForm = this.formBuilder.group({
    escolhaMes: '',
    escala: '',
    SelectfuncionaiosLista:'',
    dia1:''
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
  novaEscalaForm = this.formBuilder.group({
    desc_escala: '',
    sigla_escala:'',
    legenda_escala: '',
    escala_check_he:''
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
                                                                                                  this.checkoutForm.value.escala))

        let d: horario = JSON.parse(this.checkoutForm.value.escala!)
        let dd = d.desc
        console.log("hor: "+dd)
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
  addEscalaHorario(){
    let hor: horario = ({desc:'',legenda:'',he:'',sigla:''})
    hor.desc = this.novaEscalaForm.value.desc_escala! 
    hor.he = this.novaEscalaForm.value.escala_check_he!
    hor.sigla = this.novaEscalaForm.value.sigla_escala!
    hor.legenda = this.novaEscalaForm.value.legenda_escala!
    this.horarios.push(hor)
 }
}