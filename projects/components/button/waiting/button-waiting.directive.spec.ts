import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCommonModule } from '@angular/material/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MtxButtonWaitingDirective } from './button-waiting.directive';

@Component({
  template: `
    <button mat-button waiting [message]="message">Button</button>
    <button mat-flat-button waiting [message]="message">Flat Button</button>
    <button mat-stroked-button waiting [message]="message">Stroked Button</button>
    <button mat-raised-button waiting [message]="message">Raised Button</button>
    <button mat-icon-button waiting [message]="message"></button>
    <button mat-fab waiting [message]="message"></button>
    <button mat-mini-fab waiting [message]="message"></button>
  `,
})
class TestComponent {
  message = '';
}

describe('MtxButtonWaitingDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let buttonElement: HTMLElement;

  [
    { selector: 'mat-button' },
    { selector: 'mat-flat-button' },
    { selector: 'mat-stroked-button' },
    { selector: 'mat-raised-button' },
    { selector: 'mat-icon-button' },
    { selector: 'mat-fab', round: true },
    { selector: 'mat-mini-fab', round: true },
  ].forEach((test) => {
    describe(`On ${test.selector}`, () => {
      beforeEach(() => {
        fixture = TestBed.configureTestingModule({
          imports: [CommonModule, MatCommonModule, MatButtonModule, MatProgressSpinnerModule],
          declarations: [MtxButtonWaitingDirective, TestComponent],
        }).createComponent(TestComponent);

        fixture.detectChanges();

        buttonElement = fixture.debugElement.query(By.css(`button.${test.selector}`)).nativeElement;
      });

      it(`should apply 'max-button-waiting' class to host`, () => {
        expect(buttonElement).toBeTruthy();
        expect(buttonElement.classList.contains('mtx-button-waiting')).toBe(true);
      });

      it('should be disabled', () => {
        const disabledAttribute = coerceBooleanProperty(buttonElement.attributes.getNamedItem('disabled')?.value);

        expect(disabledAttribute).toBeTrue();
      });

      it(`should have a child node with 'mtx-waiting-container' class`, () => {
        const waitingContainer = buttonElement.querySelector('.mtx-waiting-container');

        expect(waitingContainer).toBeTruthy();
      });

      it('should have progress spinner', () => {
        const spinner = buttonElement.querySelector('mat-spinner');

        expect(spinner).toBeTruthy();
      });

      describe('when there is a wait message', () => {
        const expectedMessage = 'Loading';

        beforeEach(() => {
          fixture.componentInstance.message = expectedMessage;
          fixture.detectChanges();
        });

        if (test.round) {
          describe('when button is round', () => {
            it(`should not apply 'mtx-waiting-message' class to host element`, () => {
              expect(buttonElement).toBeTruthy();
              expect(buttonElement.classList.contains('mtx-waiting-message')).toBeFalse();
            });

            it(`should not display a message`, () => {
              const messageContainer = buttonElement.querySelector('.mtx-message');

              expect(messageContainer).toBeFalsy();
            });
          });
        } else {
          describe('when button is not round', () => {
            it(`should apply 'mtx-waiting-message' class to host element`, () => {
              expect(buttonElement).toBeTruthy();
              expect(buttonElement.classList.contains('mtx-waiting-message')).toBeTrue();
            });

            it(`should have a child node with 'mtx-message' class`, () => {
              const messageContainer = buttonElement.querySelector('.mtx-message');

              expect(messageContainer).toBeTruthy();
            });

            it('should have expected message', () => {
              const messageContainer = buttonElement.querySelector('.mtx-message');

              expect(messageContainer?.textContent).toBe(expectedMessage);
            });
          });
        }
      });
    });
  });
});
