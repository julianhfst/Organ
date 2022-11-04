import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ButtonStyles, ButtonType } from 'libs/models/src';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
  @Input() btn_text = '';
  @Input() btn_class = '';
  @Input() btn_style: ButtonType = '';
  @Input() disabled = false;
  @Output() btnClick = new EventEmitter();

  onClick() {
    this.btnClick.emit();
  }

  ngOnInit(): void {
    if (this.btn_style != '' && this.btn_class == '') {
      this.btn_class = ButtonStyles[this.btn_style] ?? '';
    }
  }
}
