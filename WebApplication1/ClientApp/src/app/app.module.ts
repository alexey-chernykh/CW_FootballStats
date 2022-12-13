import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app.routing.module';
import { SharedService } from "./shared.service";

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';

import { TeamComponent } from './team/team.component';
import { ShowTmComponent } from './team/show-tm/show-tm.component';
import { AddEditTmComponent } from './team/add-edit-tm/add-edit-tm.component';

import { TrenerComponent } from './trener/trener.component';
import { ShowTrComponent } from './trener/show-tr/show-tr.component';
import { AddEditTrComponent } from './trener/add-edit-tr/add-edit-tr.component';

import { PlayerComponent } from "./player/player.component";
import { ShowPlComponent } from './player/show-pl/show-pl.component';
import { AddEditPlComponent } from './player/add-edit-pl/add-edit-pl.component';

import { MatchComponent } from "./match/match.component";
import { ShowMtComponent } from './match/show-mt/show-mt.component';
import { AddEditMtComponent } from './match/add-edit-mt/add-edit-mt.component';

import { CardComponent } from "./card/card.component";
import { ShowCdComponent } from './card/show-cd/show-cd.component';
import { AddEditCdComponent } from './card/add-edit-cd/add-edit-cd.component';

import { GoalComponent } from "./goal/goal.component";
import { ShowGlComponent } from './goal/show-gl/show-gl.component';
import { AddEditGlComponent } from './goal/add-edit-gl/add-edit-gl.component';

import { UpcomingComponent } from "./upcoming/upcoming.component";
import { ShowUpComponent } from './upcoming/show-up/show-up.component';
import { AddEditUpComponent } from './upcoming/add-edit-up/add-edit-up.component';

import { TodaysComponent } from "./todays/todays.component";
import { ShowTdComponent } from './todays/show-td/show-td.component';
import { AddEditTdComponent } from './todays/add-edit-td/add-edit-td.component';

import { PastComponent } from "./past/past.component";
import { ShowPsComponent } from './past/show-ps/show-ps.component';
import { AddEditPsComponent } from './past/add-edit-ps/add-edit-ps.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    TeamComponent,
    ShowTmComponent,
    AddEditTmComponent,
    TrenerComponent,
    ShowTrComponent,
    AddEditTrComponent,
    PlayerComponent,
    ShowPlComponent,
    AddEditPlComponent,
    MatchComponent,
    ShowMtComponent,
    AddEditMtComponent,
    CardComponent,
    ShowCdComponent,
    AddEditCdComponent,
    GoalComponent,
    ShowGlComponent,
    AddEditGlComponent,
    UpcomingComponent,
    ShowUpComponent,
    AddEditUpComponent,
    TodaysComponent,
    ShowTdComponent,
    AddEditTdComponent,
    PastComponent,
    ShowPsComponent,
    AddEditPsComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
