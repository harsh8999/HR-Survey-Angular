import { Component } from '@angular/core';


export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent {
  tiles: Tile[] = [
    {text: 'Question', cols: 1, rows: 1, color: 'lightblue'},
    {text: 'Survey', cols: 1, rows: 1, color: 'lightgreen'},
  ];
}
