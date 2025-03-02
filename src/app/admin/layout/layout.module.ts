import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { ComponentsModule } from './components/components.module';


//eğerki bir module başka bir modulu kendi içinde benimsicekse o modolu import etmesi gerekiyor
@NgModule({
  declarations: [
    LayoutComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule
  ],
  exports:[
    LayoutComponent
  ]
})
export class LayoutModule { }
