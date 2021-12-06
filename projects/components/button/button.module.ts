import { MatCommonModule } from '@angular/material/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MtxButtonWaitingDirective } from './waiting/button-waiting.directive';

@NgModule({
  imports: [BrowserAnimationsModule, CommonModule, MatButtonModule, MatCommonModule, MatProgressSpinnerModule],
  exports: [MtxButtonWaitingDirective],
  declarations: [MtxButtonWaitingDirective],
})
export class MtxButtonModule {}
