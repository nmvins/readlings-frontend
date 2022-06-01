import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor(private authService: AuthenticationService, private router: Router) {}

  ngOnInit(): void {
  }

  logout(){
    this.authService.logout();
  }
  
  scrollToElement(el: HTMLElement): void {
    el.scrollIntoView({behavior: "smooth"});
  }

  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  start(){
    this.router.navigate(['measure']);
  }
}