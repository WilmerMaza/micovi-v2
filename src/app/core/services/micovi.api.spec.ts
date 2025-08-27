import { TestBed } from '@angular/core/testing';

import { MicoviApi } from '../../shared/services/micovi.api';

describe('MicoviApi', () => {
  let service: MicoviApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MicoviApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
