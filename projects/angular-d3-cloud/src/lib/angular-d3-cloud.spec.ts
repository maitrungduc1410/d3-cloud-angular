import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularD3Cloud } from './angular-d3-cloud';

describe('AngularD3Cloud', () => {
  let component: AngularD3Cloud;
  let fixture: ComponentFixture<AngularD3Cloud>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AngularD3Cloud],
    }).compileComponents();

    fixture = TestBed.createComponent(AngularD3Cloud);
    fixture.componentRef.setInput('data', [
      { text: 'hello', value: 20 },
      { text: 'world', value: 40 },
    ]);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
