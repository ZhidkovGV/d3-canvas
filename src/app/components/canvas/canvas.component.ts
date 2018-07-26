import {AfterContentInit, Component, ElementRef, ViewChild} from '@angular/core';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements AfterContentInit {
  @ViewChild('canvas') canvas: ElementRef;

  constructor() {
  }

  ngAfterContentInit() {
    this.canvas.nativeElement.createContext();
  }

}
