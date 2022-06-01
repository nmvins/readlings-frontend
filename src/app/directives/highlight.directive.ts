import { Directive, ElementRef, HostBinding, Input, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {

  @Input("appHighlight") wordToHighlight: string;
  // @Input() caseSensitive = false;
  @Input() colorClass = "";
  @Input() text = '';

  @HostBinding("innerHtml")
  content: string;
  
  constructor(private el: ElementRef, private sanitizer: DomSanitizer) { }

  ngOnChanges() {
    const text = this.text;
    const regex = new RegExp(
      this.wordToHighlight ,
      //this.caseSensitive ? "g" : "gi",
    );
    const newText = text!.replace(regex, (match: string) => {
      return `<mark class="appHighlight ${this.colorClass}">${match}</mark>`;
    });
    const sanitzed = this.sanitizer.sanitize(
      SecurityContext.HTML,
      newText
    );
    this.content = sanitzed!;
  }

}
