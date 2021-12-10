import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: `button[mat-button][rounded],
             button[mat-flat-button][rounded],
             button[mat-stroked-button][rounded],
             button[mat-raised-button][rounded]`,
  host: {
    '[class.mtx-button-rounded]': 'rounded',
  },
})
export class MtxButtonRoundedDirective implements OnChanges {
  @Input() rounded = false;

  ngOnChanges(changes: SimpleChanges) {
    this.rounded = coerceBooleanProperty(changes['rounded'].currentValue);
  }

  static ngAcceptInputType_rounded: BooleanInput;
}
