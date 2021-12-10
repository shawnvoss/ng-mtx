import { MatCommonModule } from '@angular/material/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MtxButtonRoundedDirective } from './rounded/button-rounded.directive';
import { MtxButtonWaitingDirective } from './waiting/button-waiting.directive';
import { MtxButtonSmallDirective } from './small/button-small.directive';
import { MtxButtonLargeDirective } from './large/button-large.directive';

@NgModule({
  imports: [BrowserAnimationsModule, CommonModule, MatButtonModule, MatCommonModule, MatProgressSpinnerModule],
  exports: [MtxButtonWaitingDirective, MtxButtonRoundedDirective, MtxButtonSmallDirective, MtxButtonLargeDirective],
  declarations: [MtxButtonWaitingDirective, MtxButtonRoundedDirective, MtxButtonSmallDirective, MtxButtonLargeDirective],
})
export class MtxButtonModule {}
