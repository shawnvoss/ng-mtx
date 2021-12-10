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
    <button mat-fab rounded></button>
  `,
})
class TestComponent {
  message = '';
}

describe('MtxButtonRoundedDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let buttonElement: HTMLElement;
  let fabElement: HTMLElement;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      imports: [CommonModule, MatCommonModule, MatButtonModule, MatProgressSpinnerModule],
      declarations: [MtxButtonRoundedDirective, TestComponent],
    }).createComponent(TestComponent);

    fixture.detectChanges();

    buttonElement = fixture.debugElement.query(By.css('button.mat-button')).nativeElement;
    fabElement = fixture.debugElement.query(By.css('button.mat-fab')).nativeElement;
  });

  describe('when non-circular style button', () => {
    it(`should apply 'mtx-button-rounded' class to host`, () => {
      expect(buttonElement).toBeTruthy();
      expect(buttonElement.classList.contains('mtx-button-rounded')).toBe(true);
    });
  });

  describe('when circular style button (e.g. floating action button)', () => {
    it(`should not apply 'mtx-waiting-message' class to host element`, () => {
      expect(fabElement).toBeTruthy();
      expect(fabElement.classList.contains('mtx-waiting-message')).toBeFalse();
    });
  });
});
