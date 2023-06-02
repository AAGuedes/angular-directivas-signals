import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[customLabel]'
})
export class CustomLabelDirective implements OnInit {

  private htmlElement?: ElementRef<HTMLElement>;

  private _color: string = 'red';
  private _errors?: ValidationErrors | null | undefined;

  @Input()
  public set color(value: string) {
    this._color = value;
    this.setStyle();
  }

  @Input()
  public set errors(value: ValidationErrors | null | undefined) {
    this._errors = value;
    this.setErrorMessage();
  }

  constructor(
    private elementRef: ElementRef<HTMLElement>
  ) {
    this.htmlElement = elementRef;
  }

  ngOnInit(): void {
    this.setStyle();
  }

  setStyle(): void {
    if(!this.htmlElement) return;
    this.htmlElement.nativeElement.style.color = this._color;
  }

  setErrorMessage(): void {
    if(!this.htmlElement) return;
    if(!this._errors) {
      this.htmlElement.nativeElement.innerHTML = 'No hay errores.';
      return;
    }

    const errors = Object.keys(this._errors);

    if(errors.includes('required')) {
      this.htmlElement.nativeElement.innerHTML = 'Este campo es requerido.';
      return;
    }

    if(errors.includes('minlength')) {
      const min = this._errors['minlength']['requiredLength'];
      this.htmlElement.nativeElement.innerHTML = `Este campo requiere ${ min } caracteres como mínimo.`;
    }

    if(errors.includes('email')) {
      this.htmlElement.nativeElement.innerHTML = 'Este campo no tiene formato de email.'
    }

  }

}
