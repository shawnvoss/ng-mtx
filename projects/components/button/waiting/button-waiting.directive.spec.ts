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
    <button mat-fab waiting [message]="message"></button>
  `,
})
class TestComponent {
  message = '';
}

describe('MtxButtonWaitingDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let buttonElement: HTMLElement;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      imports: [CommonModule, MatCommonModule, MatButtonModule, MatProgressSpinnerModule],
      declarations: [MtxButtonWaitingDirective, TestComponent],
    }).createComponent(TestComponent);

    fixture.detectChanges();

    buttonElement = fixture.debugElement.query(By.css('button.mat-button')).nativeElement;
  });

  it(`should apply 'max-button-waiting' class to host`, () => {
    expect(buttonElement).toBeTruthy();
    expect(buttonElement.classList.contains('mat-button-waiting')).toBe(true);
  });

  it('should be disabled', () => {
    const disabledAttribute = coerceBooleanProperty(buttonElement.attributes.getNamedItem('disabled')?.value);

    expect(disabledAttribute).toBeTrue();
  });

  it(`should have a child node with 'mat-waiting-container' class`, () => {
    const waitingContainer = buttonElement.querySelector('.mat-waiting-container');

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

    it(`should apply 'mat-waiting-message' class to host element`, () => {
      expect(buttonElement).toBeTruthy();
      expect(buttonElement.classList.contains('mat-waiting-message')).toBeTrue();
    });

    it(`should have a child node with 'mat-message' class`, () => {
      const messageContainer = buttonElement.querySelector('.mat-message');

      expect(messageContainer).toBeTruthy();
    });

    it('should have expected message', () => {
      const messageContainer = buttonElement.querySelector('.mat-message');

      expect(messageContainer?.textContent).toBe(expectedMessage);
    });

    describe('except when button is round', () => {
      let fab: HTMLElement;

      beforeEach(() => {
        fab = fixture.debugElement.query(By.css('button.mat-fab')).nativeElement;
      });

      it(`should not apply 'mat-waiting-message' class to host element`, () => {
        expect(buttonElement).toBeTruthy();
        expect(fab.classList.contains('mat-waiting-message')).toBeFalse();
      });

      it(`should not display a message`, () => {
        const messageContainer = fab.querySelector('.mat-message');

        expect(messageContainer).toBeFalsy();
      });
    });
  });
});
