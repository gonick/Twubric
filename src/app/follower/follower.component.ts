import { Component, OnInit , Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-follower',
  templateUrl: './follower.component.html',
  styleUrls: ['./follower.component.css']
})
export class FollowerComponent implements OnInit {
 @Input() follower:object;
 @Input() sortType;
 @Output() remove:EventEmitter<number> = new EventEmitter<number>();
  constructor() { }

  ngOnInit() {
  }

  onRemove()
  {
    this.remove.emit(this.follower["uid"]);
  }

}
