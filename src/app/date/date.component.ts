import { Component, OnChanges, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.css']
})
export class DateComponent implements OnChanges {
  @Input() startDate;
  @Input() endDate;
  currentStartDate;
  currentEndDate;
  @Output() dateChange: EventEmitter<object> = new EventEmitter<object>();
  constructor() {

  }

  ngOnChanges() {
    this.currentStartDate = this.startDate;
    this.currentEndDate = this.endDate;
    console.log("init startDate: " + this.startDate)
    console.log("init endDate: " + this.startDate)
  }
  onSelect(date) {
    console.log("here")
    this.dateChange.emit({ startDate: this.currentStartDate, endDate: this.currentEndDate });
  }
}
