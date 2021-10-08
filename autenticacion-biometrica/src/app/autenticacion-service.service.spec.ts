import { TestBed } from '@angular/core/testing';

import { AutenticacionServiceService } from './autenticacion-service.service';

describe('AutenticacionServiceService', () => {
  let service: AutenticacionServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutenticacionServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
