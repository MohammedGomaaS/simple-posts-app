import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Content } from '../../models';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {
  @Input() content!: Content;
  @Output() onClick: EventEmitter<void> = new EventEmitter<void>()

  constructor() { }

  ngOnInit() {}

  public handleOnClick(): void {
    this.onClick.next()
  }

}
