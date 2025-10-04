import { Component } from '@angular/core';
import { CreatePartyComponent } from "../create-party/create-party.component";
import { EnterPartyComponent } from "../enter-party/enter-party.component";

@Component({
    selector: 'app-home-page',
    imports: [CreatePartyComponent, EnterPartyComponent],
    templateUrl: './home-page.component.html',
    styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  
  createPartyVisible : boolean = false;
  enterPartyVisible : boolean = false;

  openCreateParty()
  {
    this.createPartyVisible = true;
  }
 
  closeCreateParty()
  {
    this.createPartyVisible = false;
  }

  openEnterCode()
  {
    this.enterPartyVisible = true;
  }

  closeEnterCode()
  {
    this.enterPartyVisible = false;
  }
}
