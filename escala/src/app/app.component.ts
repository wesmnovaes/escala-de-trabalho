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
    dia1:''
  });

  funcionarioForm = this.formBuilder.group({
    nomefuncionario: ''
  })

    onSubmit(){
      this.funcionario.push(this.checkoutForm.value.SelectfuncionaiosLista)
      if(this.checkoutForm.value.escolhaMes != undefined){
        this.calen = this.$services.addMes(this.checkoutForm.value);
      }
      this.preencheEscala(this.checkoutForm.value.SelectfuncionaiosLista,this.$services.addEscala(this.checkoutForm.value.dia1,this.checkoutForm.value.escala))
      this.checkoutForm.controls.escolhaMes.disable();
      this.checkoutForm.reset();
  }
    preencheEscala(nomePessoa, escala){
    console.log("escala recebida em preencher escala: "+escala)
    let fun: Funcionario = ({nome: nomePessoa, escala: escala});
    this.escala.push(fun);
  }  
    addFuncionario(){
    this.pessoas.push(this.funcionarioForm.value.nomefuncionario||'')
    this.funcionarioForm.reset();
  }
}