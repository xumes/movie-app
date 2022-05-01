import { Component, OnInit , Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {
@Input() label!: string;
@Input() color!: string;
@Output() bntClick = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }

  onClick() {
    this.bntClick.emit()
  }

}
