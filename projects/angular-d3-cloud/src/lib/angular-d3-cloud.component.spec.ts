import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularD3CloudComponent } from './angular-d3-cloud.component';

describe('AngularD3CloudComponent', () => {
  let component: AngularD3CloudComponent;
  let fixture: ComponentFixture<AngularD3CloudComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ AngularD3CloudComponent ]
    });

    fixture = TestBed.createComponent(AngularD3CloudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
