import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { Directive, Input, OnChanges, ViewContainerRef, SimpleChanges, ComponentRef, Renderer2, SimpleChange } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { ThemePalette } from '@angular/material/core';
import { MatProgressSpinner, MatSpinner } from '@angular/material/progress-spinner';

@Directive({
  selector: `button[mat-button][waiting],
             button[mat-flat-button][waiting],
             button[mat-stroked-button][waiting],
             button[mat-raised-button][waiting],
             button[mat-icon-button][waiting],
             button[mat-fab][waiting],
             button[mat-mini-fab][waiting]`,
  host: {
    '[class.mtx-button-waiting]': 'waiting',
  },
})
export class MtxButtonWaitingDirective implements OnChanges {
  readonly spinnerSize = 24;

  private spinner!: ComponentRef<MatProgressSpinner> | null;
  private waiterWrapper!: HTMLElement | null;
  private messageElement!: HTMLElement | null;
  private contentWrapper!: HTMLElement;

  @Input() waiting = false;
  @Input() message = '';
  @Input() disabled = false;
  @Input() color: ThemePalette;

  constructor(private matButton: MatButton, private viewContainerRef: ViewContainerRef, private renderer: Renderer2) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['waiting']) {
      this.onWaitingChange(changes['waiting']);
    }
    if (changes['message']) {
      if (this.matButton.isRoundButton) {
        console.warn(`Property 'message' cannot be used with round buttons such as FAB and Mini FAB, and will be ignored.`);
        return;
      }
      this.onMessageChange(changes['message']);
    }
  }

  private onWaitingChange(change: SimpleChange) {
    this.waiting = coerceBooleanProperty(change.currentValue);

    if (!this.waiting && change.firstChange) {
      return;
    }

    if (!this.contentWrapper) {
      this.contentWrapper = this.viewContainerRef.element.nativeElement.querySelector('.mat-button-wrapper');
    }

    if (this.waiting) {
      this.matButton.disabled = true;
      this.createWaiter();
    } else if (!change.firstChange) {
      this.matButton.disabled = this.disabled;
      this.destroyWaiter();
    }
  }

  private onMessageChange(change: SimpleChange) {
    if (!this.waiting) {
      return;
    }

    const hasMessage = change.currentValue?.length > 0;

    if (!hasMessage && change.firstChange) {
      return;
    }

    if (hasMessage) {
      this.renderer.addClass(this.viewContainerRef.element.nativeElement, 'mtx-waiting-message');
      this.createMessage();
    } else if (!change.firstChange) {
      this.destroyMessage();
      this.renderer.removeClass(this.viewContainerRef.element.nativeElement, 'mtx-waiting-message');
    }
  }

  private createWaiter() {
    if (this.waiterWrapper) {
      return;
    }

    this.spinner = this.viewContainerRef.createComponent(MatSpinner);
    this.spinner.instance.diameter = this.spinnerSize;
    this.spinner.instance.color = this.color;

    this.waiterWrapper = this.renderer.createElement('span') as HTMLElement;
    this.waiterWrapper.className = 'mtx-waiting-container';

    this.waiterWrapper.appendChild(this.spinner.instance._elementRef.nativeElement);
    this.renderer.appendChild(this.viewContainerRef.element.nativeElement, this.waiterWrapper);
  }

  private destroyWaiter() {
    if (!this.waiterWrapper || !this.spinner) {
      return;
    }

    this.spinner.destroy();
    this.waiterWrapper.remove();
    this.waiterWrapper = null;
  }

  private createMessage() {
    if (!this.messageElement) {
      this.messageElement = this.renderer.createElement('span') as HTMLElement;
      this.messageElement.className = 'mtx-message';
      this.renderer.appendChild(this.waiterWrapper, this.messageElement);
    }

    this.messageElement.textContent = this.message;
  }

  private destroyMessage() {
    if (!this.messageElement) {
      return;
    }

    this.messageElement.remove();
    this.messageElement = null;
  }

  static ngAcceptInputType_waiting: BooleanInput;
  static ngAcceptInputType_disabled: BooleanInput;
}
