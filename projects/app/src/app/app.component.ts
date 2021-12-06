import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'app';
  waiting = false;
  message = 'Loading...';

  setWaiting(value: boolean): void {
    this.waiting = value;
    this.message = 'Still Loading...';
  }
}
