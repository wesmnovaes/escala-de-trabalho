import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})

export class AppComponent {

  constructor(public datepipe: DatePipe){
    let currentDateTime =this.datepipe.transform((new Date), 'MM');
    console.log(currentDateTime);
  }

  pessoas = [{nome:"Maria",dias:['D','-','D','-','D','-','D','-','D','-','D','-','D','-','D','-','D','-','D','-','D','-','D','-','D','-','D','-','D','-','D']},
             {nome:"Julia",dias:['D','-','D','-','D','-','D','-','D','-','D','-','D','-','D','-','D','-','D','-','D','-','D','-','D','-','D','-','D','-','D']},
             {nome:"João",dias:['D','-','D','-','D','-','D','-','D','-','D','-','D','-','D','-','D','-','D','-','D','-','D','-','D','-','D','-','D','-','D']}
            ]
}
