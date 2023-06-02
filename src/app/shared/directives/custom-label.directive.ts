import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[customLabel]'
})
export class CustomLabelDirective {

  private htmlElement?: ElementRef<HTMLElement>;

  constructor(
    private elementRef: ElementRef<HTMLElement>
  ) {
    this.htmlElement = elementRef;
    this.htmlElement.nativeElement.innerHTML = 'Hola Mundo!';
  }

}
