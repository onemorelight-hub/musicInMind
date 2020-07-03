import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DancePageRoutingModule } from './dance-routing.module';

import { DancePage } from './dance.page';
import { DurationPipe } from '../pipe/duration.pipe';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DancePageRoutingModule
  ],
  declarations: [DancePage, DurationPipe]
})
export class DancePageModule {}
