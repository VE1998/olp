import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Sistema Olpasa';

  showFiller = false;

  badgevisible = false;
  badgevisibility() {
    this.badgevisible = true;
  }
}
