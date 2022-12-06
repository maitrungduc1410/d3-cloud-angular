import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularD3CloudComponent } from './angular-d3-cloud.component';
import { AngularD3CloudModule } from './angular-d3-cloud.module';

describe('AngularD3CloudComponent', () => {
  let component: AngularD3CloudComponent;
  let fixture: ComponentFixture<AngularD3CloudComponent>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [
          AngularD3CloudModule
        ]
      })
      .compileComponents();

    fixture = TestBed.createComponent(AngularD3CloudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();    
  });

  it('should create', () => {    
    expect(component).toBeTruthy();
  });
});
