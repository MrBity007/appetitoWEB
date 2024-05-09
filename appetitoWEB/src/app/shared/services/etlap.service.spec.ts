import { TestBed } from '@angular/core/testing';

import { EtlapService } from './etlap.service';

describe('EtlapService', () => {
  let service: EtlapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EtlapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
