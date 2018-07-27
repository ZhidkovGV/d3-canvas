import {Injectable} from '@angular/core';
import {Observable, interval, of} from 'rxjs';
import {switchMap} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class GridDataService {
  grid: number[][];
  render$: Observable<number[][]> = interval(17).pipe(
    switchMap(() => {
      this.grid = this.newGeneration(this.grid);
      return of(this.grid);
    }))
  ;

  constructor() {
  }

  initPopulation() {
    this.grid = Array.from({length: 30}, (() => {
      return Array.from({length: 30}, () => Math.round(Math.random() * 1.2));
    }));
  }

  newGeneration(grid: number[][]) {
    return grid.map((column, xIndex) => {
      return column.map((element, yIndex) => {
        const columnsCount = column.length - 1;
        const neighbours = this.countNeighbours(columnsCount, xIndex, yIndex);
        return this.applyRules(element, neighbours);
      });
    });
  }

  countNeighbours(columnsCount: number, xIndex: number, yIndex: number) {
    let neighbours = -1;
    for (let i = -1; i < 2; i++) {
      for (let j = -1; j < 2; j++) {
        if (this.grid[(xIndex + i + columnsCount) % columnsCount][(yIndex + j + columnsCount) % columnsCount] === 1) {
          neighbours += 1;
        }
      }
    }
    return neighbours;
  }

  applyRules(valueToChange: number, neighbours: number) {
    if (neighbours < 2 || neighbours > 3) {
      valueToChange = 0;
      return valueToChange;
    } else if (valueToChange === 0) {
      valueToChange = 1;
      return valueToChange;
    } else {
      return valueToChange;
    }
  }
}
