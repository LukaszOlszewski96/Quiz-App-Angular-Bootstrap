import { Directive, Input, ElementRef, Renderer2, HostListener } from '@angular/core';

@Directive({
  selector: '[appChangeBg]'
})
export class ChangeBgDirective {

  constructor(private element : ElementRef, private render : Renderer2) { }

  @HostListener('click') answer() {
      this.render.setStyle(this.element.nativeElement, 'background', '#B2B2B2');
      this.render.setStyle(this.element.nativeElement, 'color', '#000');
  }
}
