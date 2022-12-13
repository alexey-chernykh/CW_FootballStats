import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TeamComponent } from './team/team.component';
import { TrenerComponent } from "./trener/trener.component";
import { PlayerComponent } from "./player/player.component";
import { MatchComponent } from "./match/match.component";
import { CardComponent } from "./card/card.component";
import { GoalComponent } from "./goal/goal.component";
import { UpcomingComponent } from "./upcoming/upcoming.component";
import { TodaysComponent } from "./todays/todays.component";
import { PastComponent } from "./past/past.component";


const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'teams', component:TeamComponent},
  {path:'treners', component:TrenerComponent},
  {path:'players', component:PlayerComponent},
  {path:'matches', component:MatchComponent},
  {path:'goals', component:GoalComponent},
  {path:'cards', component:CardComponent},
  {path:'upcoming', component:UpcomingComponent},
  {path:'todays', component:TodaysComponent},
  {path:'past', component:PastComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
