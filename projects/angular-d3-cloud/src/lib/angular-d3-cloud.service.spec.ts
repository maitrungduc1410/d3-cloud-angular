import { TestBed } from '@angular/core/testing';

import { AngularD3CloudService } from './angular-d3-cloud.service';

describe('AngularD3CloudService', () => {
  let service: AngularD3CloudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AngularD3CloudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
