import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: `button[mat-button][small],
             button[mat-flat-button][small],
             button[mat-stroked-button][small],
             button[mat-raised-button][small]`,
  host: {
    '[class.mtx-button-small]': 'small',
  },
})
export class MtxButtonSmallDirective implements OnChanges {
  @Input() small = false;

  ngOnChanges(changes: SimpleChanges) {
    this.small = coerceBooleanProperty(changes['small'].currentValue);
  }

  static ngAcceptInputType_small: BooleanInput;
}
