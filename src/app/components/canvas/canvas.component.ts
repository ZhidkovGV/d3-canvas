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
    this.gridData.render$.subscribe((grid) => console.log(grid));
  }

}
