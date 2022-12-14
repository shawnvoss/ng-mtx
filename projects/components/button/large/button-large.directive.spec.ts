import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCommonModule } from '@angular/material/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MtxButtonLargeDirective } from './button-large.directive';

@Component({
  template: `
    <button mat-button large>Button</button>
    <button mat-flat-button large>Flat Button</button>
    <button mat-stroked-button large>Stroked Button</button>
    <button mat-raised-button large>Raised Button</button>
  `,
})
class TestComponent {}

describe('MtxButtonLargeDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let buttonElement: HTMLElement;

  ['mat-button', 'mat-flat-button', 'mat-stroked-button', 'mat-raised-button'].forEach((selector) => {
    describe(`On ${selector}`, () => {
      beforeEach(() => {
        fixture = TestBed.configureTestingModule({
          imports: [CommonModule, MatCommonModule, MatButtonModule, MatProgressSpinnerModule],
          declarations: [MtxButtonLargeDirective, TestComponent],
        }).createComponent(TestComponent);

        fixture.detectChanges();

        buttonElement = fixture.debugElement.query(By.css(`button.${selector}`)).nativeElement;
      });

      it(`should apply 'mtx-button-large' class to host`, () => {
        expect(buttonElement).toBeTruthy();
        expect(buttonElement.classList.contains('mtx-button-large')).toBe(true);
      });
    });
  });
});
