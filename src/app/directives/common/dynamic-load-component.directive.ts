import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appDynamicLoadComponent]',
  standalone: false
})
export class DynamicLoadComponentDirective {

  constructor(public viewContaierRef : ViewContainerRef) { }

}
