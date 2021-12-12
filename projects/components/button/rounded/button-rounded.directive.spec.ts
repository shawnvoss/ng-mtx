import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCommonModule } from '@angular/material/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MtxButtonRoundedDirective } from './button-rounded.directive';

@Component({
  template: `
    <button mat-button rounded>Button</button>
    <button mat-flat-button rounded>Flat Button</button>
    <button mat-stroked-button rounded>Stroked Button</button>
    <button mat-raised-button rounded>Raised Button</button>
    <button mat-icon-button rounded></button>
    <button mat-fab rounded></button>
    <button mat-mini-fab rounded></button>
  `,
})
class TestComponent {}

describe('MtxButtonRoundedDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let buttonElement: HTMLElement;

  [
    { selector: 'mat-button' },
    { selector: 'mat-flat-button' },
    { selector: 'mat-stroked-button' },
    { selector: 'mat-raised-button' },
    { selector: 'mat-icon-button', round: true },
    { selector: 'mat-fab', round: true },
    { selector: 'mat-mini-fab', round: true },
  ].forEach((test) => {
    describe(`On ${test.selector}`, () => {
      beforeEach(() => {
        fixture = TestBed.configureTestingModule({
          imports: [CommonModule, MatCommonModule, MatButtonModule, MatProgressSpinnerModule],
          declarations: [MtxButtonRoundedDirective, TestComponent],
        }).createComponent(TestComponent);

        fixture.detectChanges();

        buttonElement = fixture.debugElement.query(By.css(`button.${test.selector}`)).nativeElement;
      });

      if (test.round) {
        describe('when circular style button (e.g. floating action button)', () => {
          it(`should not apply 'mtx-button-rounded' class to host element`, () => {
            expect(buttonElement).toBeTruthy();
            expect(buttonElement.classList.contains('mtx-button-rounded')).toBeFalse();
          });
        });
      } else {
        describe('when non-circular style button', () => {
          it(`should apply 'mtx-button-rounded' class to host`, () => {
            expect(buttonElement).toBeTruthy();
            expect(buttonElement.classList.contains('mtx-button-rounded')).toBe(true);
          });
        });
      }
    });
  });
});
