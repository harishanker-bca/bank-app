import { Component } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent {
isReadMore:boolean=true;

toggle(){
  this.isReadMore=!(this.isReadMore);
}
}
