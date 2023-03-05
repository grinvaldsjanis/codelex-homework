import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Animal } from 'src/utils/animal.interface';

@Component({
  selector: 'app-animal-list',
  templateUrl: './animal-list.component.html',
  styleUrls: ['./animal-list.component.scss'],
})
export class AnimalListComponent {
  @Output() deleteRequest: EventEmitter<string> = new EventEmitter();
  @Input() listedAnimals!: Animal[];
}