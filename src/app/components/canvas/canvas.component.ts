import {AfterContentInit, Component, ElementRef, ViewChild} from '@angular/core';
import {GridDataService} from '../../services/grid-data.service';
import {DEAD_CELL, SIZE_OF_CELL} from '../../game-config';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements AfterContentInit {
  @ViewChild('canvas') canvas: ElementRef;

  prevGeneration: number[][];

  constructor(private gridData: GridDataService) {
  }

  ngAfterContentInit() {
    const context = this.canvas.nativeElement.getContext('2d');
    this.gridData.initPopulation();
    this.prevGeneration = [];
    this.gridData.render$.subscribe((grid) => {
      grid.forEach((row, xIndex) => {
        row.forEach((element, yIndex) => {
          if (this.prevGeneration.length === 0) {
            this.drawField(context, element, xIndex, yIndex);
          } else if ((this.prevGeneration[xIndex][yIndex] !== grid[xIndex][yIndex])) {
            this.drawField(context, element, xIndex, yIndex);
          }
        });
      });
      this.prevGeneration = grid;
    });
  }

  drawField(context: any, fieldState: number, x: number, y: number) {
    context.beginPath();
    context.fillStyle = fieldState === DEAD_CELL ? '#000042' : '#FFFFFF';
    context.rect(SIZE_OF_CELL * x, SIZE_OF_CELL * y, SIZE_OF_CELL, SIZE_OF_CELL);
    context.fill();
  }

  fixCanvasDpi(): any {
    const windowDPI = window.devicePixelRatio;
    const styleHeight = parseFloat(getComputedStyle(this.canvas.nativeElement).height);
    const styleWidth = parseFloat(getComputedStyle(this.canvas.nativeElement).width);
    return {
      height: windowDPI * styleHeight,
      width: windowDPI * styleWidth
    };
  }

}
