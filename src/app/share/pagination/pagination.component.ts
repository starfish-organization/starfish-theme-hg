import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

// TODO move to share
@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit {
  private _pageSize: number;
  @Input()
  set pageSize(value) {
    this._pageSize = value;
    this.totalPage = Math.ceil(this.total / value || 0);
  }
  get pageSize() {
    return this._pageSize;
  }

  private _total: number;
  @Input()
  set total(value) {
    this._total = value;
    this.totalPage = Math.ceil(value / this.pageSize || 0);
  }
  get total() {
    return this._total;
  }

  @Input()
  currentIndex: number;

  @Output()
  change = new EventEmitter();

  private totalPage = 0;

  constructor() {}

  ngOnInit(): void {}

  nextPage() {
    console.log(this.totalPage);
    if (this.currentIndex !== this.totalPage - 1) {
      this.change.emit(this.currentIndex + 1);
    }
  }

  lastPage() {
    if (this.currentIndex !== 0) {
      this.change.emit(this.currentIndex - 1);
    }
  }
}
