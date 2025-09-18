import { Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { CreatePartyComponent } from './components/create-party/create-party.component';
import { EnterPartyComponent } from './components/enter-party/enter-party.component';
import { PartyHomeComponent } from './components/party-home/party-home.component';

export const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'party/:code', component: PartyHomeComponent },
];
