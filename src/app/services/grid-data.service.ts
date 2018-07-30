import {Injectable} from '@angular/core';
import {Observable, interval, of} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {
  CHANCE_TO_FILL_ON_INIT,
  LAST_LEFT_NEIGHBOUR, LAST_RIGHT_NEIGHBOUR, MAX_NEIGHBOURS, MIN_NEIGHBOURS, SIZE_OF_GRID,
  TIME_BEFORE_NEW_GENERATION
} from '../game-config';


@Injectable({
  providedIn: 'root'
})
export class GridDataService {
  grid: number[][];
  render$: Observable<number[][]> = interval(TIME_BEFORE_NEW_GENERATION).pipe(
    switchMap(() => {
      this.grid = this.newGeneration(this.grid);
      return of(this.grid);
    }))
  ;

  constructor() {
  }

  initPopulation() {
    this.grid = Array.from({length: SIZE_OF_GRID}, (() => {
      return Array.from({length: SIZE_OF_GRID}, () => Math.round(Math.random() * (0.5 + (CHANCE_TO_FILL_ON_INIT / 100))));
    }));
  }

  newGeneration(grid: number[][]) {
    return grid.map((column, xIndex) => {
      return column.map((element, yIndex) => {
        const neighbours = this.countNeighbours(xIndex, yIndex);
        return this.applyRules(element, neighbours);
      });
    });
  }

  countNeighbours(xIndex: number, yIndex: number) {
    let neighbours = -1;
    for (let i = LAST_LEFT_NEIGHBOUR; i < LAST_RIGHT_NEIGHBOUR; i++) {
      for (let j = LAST_LEFT_NEIGHBOUR; j < LAST_RIGHT_NEIGHBOUR; j++) {
        if (this.grid[(xIndex + i + SIZE_OF_GRID) % SIZE_OF_GRID][(yIndex + j + SIZE_OF_GRID) % SIZE_OF_GRID] === 1) {
          neighbours += 1;
        }
      }
    }
    return neighbours;
  }

  applyRules(valueToChange: number, neighbours: number) {
    if (neighbours < MIN_NEIGHBOURS || neighbours > MAX_NEIGHBOURS) {
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
