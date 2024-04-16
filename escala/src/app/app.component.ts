import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DatePipe } from '@angular/common';
import { EscalaService } from './escala.service'

import {Pipe, PipeTransform} from '@angular/core';
import moment from '../../node_modules/moment';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})

export class AppComponent {

  constructor(public datepipe: DatePipe, private $services: EscalaService){

    let currentDateTime =this.datepipe.transform((new Date), 'EEEE, MMMM d, y');
    console.log(currentDateTime);
  }

  pessoas = [{nome:"Maria",dias:['D','-','D','-','D','-','D','-','D','-','D','-','D','-','D','-','D','-','D','-','D','-','D','-','D','-','D','-','D','-','D']},
             {nome:"Julia",dias:['D','-','D','-','D','-','D','-','D','-','D','-','D','-','D','-','D','-','D','-','D','-','D','-','D','-','D','-','D','-','D']},
             {nome:"João",dias:['D','-','D','-','D','-','D','-','D','-','D','-','D','-','D','-','D','-','D','-','D','-','D','-','D','-','D','-','D','-','D']}
            ]
}
@Pipe({name: 'customDate'})
export class CustomDatePipe implements PipeTransform {
  transform(date, format = 'dd/MM/yyyy', dayOffset = 0, monthOffset = 0, yearOffset = 0) {
    return moment(new Date(date)).add(dayOffset, 'days')
                                 .add(monthOffset, 'months')
                                 .add(yearOffset, 'years')
                                 .format(format);
  }
}