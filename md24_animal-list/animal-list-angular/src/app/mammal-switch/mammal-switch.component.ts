import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-mammal-switch',
  templateUrl: './mammal-switch.component.html',
  styleUrls: ['./mammal-switch.component.scss']
})
export class MammalSwitchComponent {
  checked = false;
  @Output() filterRequest: EventEmitter<boolean> = new EventEmitter();
}