import { NgModule } from '@angular/core';
import { AngularD3CloudComponent } from './angular-d3-cloud.component';
import { AngularD3CloudService } from './angular-d3-cloud.service';

@NgModule({
  declarations: [AngularD3CloudComponent],
  providers: [AngularD3CloudService],
  exports: [AngularD3CloudComponent]
})
export class AngularD3CloudModule { }
