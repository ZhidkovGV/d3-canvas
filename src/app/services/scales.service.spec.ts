import { TestBed, inject } from '@angular/core/testing';

import { ScalesService } from './scales.service';

describe('ScalesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ScalesService]
    });
  });

  it('should be created', inject([ScalesService], (service: ScalesService) => {
    expect(service).toBeTruthy();
  }));
});
