import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template:`
  <!-- <app-board></app-board> -->
  <router-outlet></router-outlet>
  `,
  styles: [``]
})
export class AppComponent {
  title = 'Whack-a-mole';
}
