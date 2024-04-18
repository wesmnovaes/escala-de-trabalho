import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EscalaService } from './escala.service';
import { FormBuilder } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import moment from '../../node_modules/moment';
import '../../node_modules/moment/locale/pt-br';

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

  constructor(private $services: EscalaService, private formBuilder: FormBuilder){}
  
  funcionario:any[] = [];

  checkoutForm = this.formBuilder.group({
    escolhaMes: '',
    checkboxD: '',
    checkboxN: '',
    checkboxM: '',
    checkboxMT: '',
    checkboxS: '',
    SelectfuncionaiosLista:''
  });

  onSubmit(){
    this.funcionario.push(this.checkoutForm.value.SelectfuncionaiosLista)
    this.calen = this.$services.addPessoa(this.checkoutForm.value);
    this.checkoutForm.reset();
  }
  
  pessoas = [{nome:"Maria",dias:['D','-','D','-','D','-','D','-','D','-','D','-','D','-','D','-','D','-','D','-','D','-','D','-','D','-','D','-','D','-','D']},
             {nome:"Julia",dias:['D','-','D','-','D','-','D','-','D','-','D','-','D','-','D','-','D','-','D','-','D','-','D','-','D','-','D','-','D','-','D']},
             {nome:"João",dias:['D','-','D','-','D','-','D','-','D','-','D','-','D','-','D','-','D','-','D','-','D','-','D','-','D','-','D','-','D','-','D']}
            ]          
}