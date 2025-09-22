import { Component } from '@angular/core';
import { CreatePartyComponent } from "../create-party/create-party.component";

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CreatePartyComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  
  createPartyVisible : boolean = false;

  openCreateParty()
  {
    this.createPartyVisible = true;
    console.log("Create Party Clicked");
  }

  closeCreateParty()
  {
    this.createPartyVisible = false;
    console.log("Create Party Clicked");
  }
}
