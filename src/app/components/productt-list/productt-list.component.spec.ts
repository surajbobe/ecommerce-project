import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProducttListComponent } from './productt-list.component';

describe('ProducttListComponent', () => {
  let component: ProducttListComponent;
  let fixture: ComponentFixture<ProducttListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProducttListComponent]
    });
    fixture = TestBed.createComponent(ProducttListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
