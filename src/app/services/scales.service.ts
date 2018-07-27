import {Injectable} from '@angular/core';
import {scaleLinear} from 'd3';
import {max} from 'd3-array';
@Injectable({
  providedIn: 'root'
})
export class ScalesService {

  constructor() {
  }

  getScales(data: any[]) {
    return {
      x: scaleLinear().domain([0, max(data, (d) => d[0])]).range([0, 100]),
      y: scaleLinear().domain([0, max(data, (d) => d[0])]).range([0, 100])
    };
  }
}
