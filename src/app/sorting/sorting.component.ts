import { Component, OnInit, EventEmitter, Output,Input } from '@angular/core';

@Component({
  selector: 'app-sorting',
  templateUrl: './sorting.component.html',
  styleUrls: ['./sorting.component.css']
})
export class SortingComponent implements OnInit {
  @Output() notify: EventEmitter<object> = new EventEmitter<object>();
  sorts = {
    total: 0,
    friends: 0,
    influence: 0,
    chirpiness: 0,
  }
  @Input() currentSort;
  @Input() currentSortType;
  constructor() { }

  ngOnInit() {
  }

  onclick(sortType: string) {
    let currentValue = this.sorts[sortType];
    this.sorts[sortType] = (currentValue == 2) ? 1 : currentValue + 1;
    this.notify.emit({sortType:sortType,type:this.sorts[sortType]});
    Object.keys(this.sorts).forEach(key => {
      if (key !== sortType) {
        this.sorts[key] = 0;
      }
    });
  }
}
