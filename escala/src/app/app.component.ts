import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EscalaService } from './escala.service';
import { FormBuilder } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 

import '../../node_modules/moment/locale/pt-br';
import { Funcionario } from './Interfaces/funcionario';

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

    onSubmit(){
      this.funcionario.push(this.checkoutForm.value.SelectfuncionaiosLista)
      if(this.checkoutForm.value.escolhaMes != undefined){
        this.calen = this.$services.addMes(this.checkoutForm.value);
      }
      console.log("Valor do checkbox: "+this.checkoutForm.value.checkbox_trabalha_sabado)
      this.preencheEscala(this.checkoutForm.value.SelectfuncionaiosLista,this.$services.addEscala(this.checkoutForm.value.dia1,this.checkoutForm.value.escala,this.checkoutForm.value.checkbox_trabalha_sabado))
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
   if(this.lancamentoFeriasForm.value.radioFF == 'falta'){
    console.log("cheguei aqui")
      this.$services.addFalta(this.escala,this.lancamentoFeriasForm.value.SelectfuncionaiosListaFF,this.lancamentoFeriasForm.value.dtInicialFF,this.lancamentoFeriasForm.value.dtFimFF)
   }
  }
}