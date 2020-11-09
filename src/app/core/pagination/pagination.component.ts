import { Component, Input, OnInit } from '@angular/core';


// TODO move to share
@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  @Input()
  pageSize: number;

  @Input()
  total: number;

  @Input()
  currentIndex: number;

  constructor() {}

  ngOnInit(): void {}

  goPage(pageIndex: number) {
    
  }

  generateButtonTexts() {
    
  }
  

}
