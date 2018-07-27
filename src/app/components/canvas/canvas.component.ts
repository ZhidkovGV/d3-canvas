import {AfterContentInit, Component, ElementRef, ViewChild} from '@angular/core';
import {GridDataService} from '../../services/grid-data.service';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements AfterContentInit {
  @ViewChild('canvas') canvas: ElementRef;

  constructor(private gridData: GridDataService) {
  }

  ngAfterContentInit() {
    const context = this.canvas.nativeElement.getContext('2d');
    this.gridData.initPopulation();
    this.gridData.render$.subscribe((grid) => {
      grid.forEach((row, xIndex) => {
        row.forEach((element, yIndex) => {
          this.drawField(context, element, xIndex, yIndex);
        });
      });
    });
  }

  drawField(context: any, fieldState: number, x: number, y: number) {
    context.beginPath();
    context.fillStyle = fieldState === 1 ? 'white' : 'black';
    context.rect(5 * x, 5 * y, 5, 5);
    context.fill();
  }
}
