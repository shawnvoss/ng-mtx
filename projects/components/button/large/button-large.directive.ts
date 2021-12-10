import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: `button[mat-button][large],
             button[mat-flat-button][large],
             button[mat-stroked-button][large],
             button[mat-raised-button][large]`,
  host: {
    '[class.mtx-button-large]': 'large',
  },
})
export class MtxButtonLargeDirective implements OnChanges {
  @Input() large = false;

  ngOnChanges(changes: SimpleChanges) {
    this.large = coerceBooleanProperty(changes['large'].currentValue);
  }

  static ngAcceptInputType_large: BooleanInput;
}
