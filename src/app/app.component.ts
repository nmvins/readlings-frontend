import { Component, HostListener } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  mode = new FormControl('over');
  shouldRun = true;

  constructor(
    private authService: AuthenticationService) {}

  @HostListener('window:beforeunload')
  unloadHandler(event: any) {
    this.authService.logout();
  }

}
