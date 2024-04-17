import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EscalaService } from './escala.service';

import moment from '../../node_modules/moment';
import '../../node_modules/moment/locale/pt-br';

@Component({
  selector: 'app-root',
  standalone: true,
  host: {ngSkipHydration: 'true'},
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})

export class AppComponent {

  constructor(private $services: EscalaService){ moment.locale('pt-br');
  }
  
  
  a = moment().format('LLL');

  
  
  pessoas = [{nome:"Maria",dias:['D','-','D','-','D','-','D','-','D','-','D','-','D','-','D','-','D','-','D','-','D','-','D','-','D','-','D','-','D','-','D']},
             {nome:"Julia",dias:['D','-','D','-','D','-','D','-','D','-','D','-','D','-','D','-','D','-','D','-','D','-','D','-','D','-','D','-','D','-','D']},
             {nome:"João",dias:['D','-','D','-','D','-','D','-','D','-','D','-','D','-','D','-','D','-','D','-','D','-','D','-','D','-','D','-','D','-','D']}
            ]          
}