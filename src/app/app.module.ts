import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { IsotopeModule } from 'angular2-isotope';

import { AppComponent } from './app.component';
import { FollowerComponent } from './follower/follower.component';
import { MockDataService } from './mock-data.service';
import { SortingComponent } from './sorting/sorting.component';
import { DateComponent } from './date/date.component';
import { DatepickerModule } from 'angular2-material-datepicker'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SortByPipe } from './sort-by.pipe'
@NgModule({
  declarations: [
    AppComponent,
    FollowerComponent,
    SortingComponent,
    DateComponent,
    SortByPipe,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    IsotopeModule,
    DatepickerModule,
    BrowserAnimationsModule
  ],
  providers: [MockDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
