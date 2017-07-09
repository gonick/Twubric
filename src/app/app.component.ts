import { Component, OnInit, AfterViewInit, HostListener } from '@angular/core';
import { MockDataService } from './mock-data.service';
declare var require: any;
import { ElementRef, Renderer2 } from '@angular/core';

const Isotope = require('isotope-layout');
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'app works!';
  followers;
  _followers;
  len;
  endDate;
  startDate;
  errorMessage = "";
  currentSort = "";
  currentSortType = 0;
  options = {
    total: '.total parseInt',
    friends: '.friends-count parseInt',
    chirpiness: '.chirpiness-count parseInt',
    influence: '.influence-count parseInt'
  }
  constructor(private mockDataService: MockDataService) { }

  ngOnInit() {
    this.mockDataService.getFollowers()
      .subscribe(
      f => {
        this.followers = f;
        this._followers = f;
        //initilize start and end date
        let min = this.followers[0].join_date, max = this.followers[0].join_date;
        this.followers.forEach(element => {
          min = Math.min(min, element.join_date);
          max = Math.max(max, element.join_date);
        });
        this.startDate = new Date(min);
        this.endDate = new Date(max);



      },
      error => this.errorMessage
      )

  }

  onNotify(message) {
    this.currentSort = message.sortType;
    this.currentSortType = message.type;
    console.log(message);

    if (message.type == 2) {
      var iso = new Isotope('isotope', {
        itemSelector: 'isotope-brick',
        getSortData: this.options,
        sortBy: this.options[message.sortType]
      });
    }
    else {
      var iso = new Isotope('isotope', {
        itemSelector: 'isotope-brick',
        getSortData: this.options,
        sortAscending: this.options[message.sortType]
      });
    }
    this.followers.sort((a, b) => {
      let x = a.twubric[message.sortType];
      let y = b.twubric[message.sortType];
      return (message.type == 1) ? y - x : x - y;
    })
  }
  onRemove(id) {
    for (let i = 0; i < this.followers.length; i++) {
      if (this.followers[i].uid == id) {
        this.followers.splice(i, 1);
        this._followers.splice(i, 1);
        break;
      }
    }
    this.currentSort = "";
    this.currentSortType = 0;
  }
  onStartDateChange(message) {
    console.log("inside onStartDateChange : " + JSON.stringify(message));
    this.followers = [];
    message.startDate.setHours(0, 0, 0, 0);
    message.endDate.setHours(0, 0, 0, 0);
    this._followers.forEach(element => {
      let date = new Date(element.join_date);
      date.setHours(0, 0, 0, 0);
      if (date >= message.startDate && date <= message.endDate)
        this.followers.push(element);
    });
    if (this.currentSort != "") {
      this.onNotify({ sortType: this.currentSort, type: this.currentSortType });
    }
  }
  ngAfterViewInit() {

  }
  @HostListener('window:keydown', ['$event'])
  keyboardInput(event: KeyboardEvent) {
    switch (event.key) {
      case "t":
      case "T":
        this.currentSortType = this.currentSort != "total" ? 1 : (this.currentSortType == 2 ? 1 : this.currentSortType + 1);
        this.currentSort = "total";
        this.onNotify({ sortType: this.currentSort, type: this.currentSortType });
        break;
      case "f":
      case "F":
        this.currentSortType = this.currentSort != "friends" ? 1 : (this.currentSortType == 2 ? 1 : this.currentSortType + 1);
        this.currentSort = "friends";
        this.onNotify({ sortType: this.currentSort, type: this.currentSortType });
        break;
      case "c":
      case "C":
        this.currentSortType = this.currentSort != "chirpiness" ? 1 : (this.currentSortType == 2 ? 1 : this.currentSortType + 1);
        this.currentSort = "chirpiness";
        this.onNotify({ sortType: this.currentSort, type: this.currentSortType });
        break;
      case "i":
      case "I":
        this.currentSortType = this.currentSort != "influence" ? 1 : (this.currentSortType == 2 ? 1 : this.currentSortType + 1);
        this.currentSort = "influence";
        this.onNotify({ sortType: this.currentSort, type: this.currentSortType });
        break;

    }
    console.log(`${this.currentSort} _ ${this.currentSortType}`);
  }
}
