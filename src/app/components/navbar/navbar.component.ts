import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { MeasureService } from 'src/app/services/measure.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Input() sidenav: any;
  showSideNav: boolean;
   links = ['/home', '/reading-settings'];
  activeLink = this.links[0];

  constructor(private authService: AuthenticationService, private measureService: MeasureService,
     router: Router) {
    router.events.subscribe(event => {
      if (router.url === '') {
        this.showSideNav = false;
      } else this.showSideNav = true;
    });
  }

  ngOnInit(): void {
  }

  async logout(){
    const time = new Date();
    await this.measureService.addLoginDate(time.toString());
    this.authService.logout();
  }

}
