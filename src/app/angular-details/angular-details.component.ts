import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-angular-details',
  templateUrl: './angular-details.component.html',
  styleUrls: ['./angular-details.component.css']
})
export class AngularDetailsComponent implements OnInit {

  title = this.appComponent.title;

  constructor(
    private appComponent: AppComponent,
    private router: Router
    ) { }

  ngOnInit(): void {
  }

}
