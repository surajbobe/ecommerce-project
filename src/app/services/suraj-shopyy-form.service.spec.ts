import { TestBed } from '@angular/core/testing';

import { SurajShopyyFormService } from './suraj-shopyy-form.service';

describe('SurajShopyyFormService', () => {
  let service: SurajShopyyFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SurajShopyyFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
