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
  escala:any[] = [] 
  pessoas = ['Maria', 'José','Júlia','Pedro']
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
    this.escala = (this.$services.addEscala(this.checkoutForm.value.checkboxD,this.checkoutForm.value.checkboxN,this.checkoutForm.value.checkboxM,this.checkoutForm.value.checkboxMT,this.checkoutForm.value.checkboxS))
    this.calen = this.$services.addMes(this.checkoutForm.value);
    this.checkoutForm.reset();

  }          
}