import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCommonModule } from '@angular/material/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MtxButtonSmallDirective } from './button-small.directive';

@Component({
  template: `
    <button mat-button small>Button</button>
    <button mat-flat-button small>Flat Button</button>
    <button mat-stroked-button small>Stroked Button</button>
    <button mat-raised-button small>Raised Button</button>
  `,
})
class TestComponent {}

describe('MtxButtonSmallDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let buttonElement: HTMLElement;

  ['mat-button', 'mat-flat-button', 'mat-stroked-button', 'mat-raised-button'].forEach((selector) => {
    describe(`On ${selector}`, () => {
      beforeEach(() => {
        fixture = TestBed.configureTestingModule({
          imports: [CommonModule, MatCommonModule, MatButtonModule, MatProgressSpinnerModule],
          declarations: [MtxButtonSmallDirective, TestComponent],
        }).createComponent(TestComponent);

        fixture.detectChanges();

        buttonElement = fixture.debugElement.query(By.css(`button.${selector}`)).nativeElement;
      });

      it(`should apply 'mtx-button-small' class to host`, () => {
        expect(buttonElement).toBeTruthy();
        expect(buttonElement.classList.contains('mtx-button-small')).toBe(true);
      });
    });
  });
});
