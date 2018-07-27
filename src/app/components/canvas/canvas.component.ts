import {AfterContentInit, Component, ElementRef, ViewChild} from '@angular/core';
import {GridDataService} from '../../services/grid-data.service';
import {SIZE_OF_CELL} from '../../game-config';

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
    const context = this.canvas.nativeElement.getContext('2d', {alpha: false});
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
    context.rect(SIZE_OF_CELL * x, SIZE_OF_CELL * y, SIZE_OF_CELL, SIZE_OF_CELL);
    context.fill();
  }
}
