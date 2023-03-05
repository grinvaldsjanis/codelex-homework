import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-animal-form',
  templateUrl: './animal-form.component.html',
  styleUrls: ['./animal-form.component.scss'],
})
export class AnimalFormComponent {
  classOptions = ['mammal', 'bird', 'reptile', 'fish', 'insect', 'amphibian'];

  animalForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    aclass: new FormControl('', [Validators.required]),
  });

  @Output() addAnimal = new EventEmitter<{
    name: string;
    aclass: string;
  }>();

  addNewAnimal() {
    if (this.animalForm.valid) {
      const newAnimal = {
        name: this.animalForm.value.name!,
        aclass: this.animalForm.value.aclass!,
      };
      this.addAnimal.emit(newAnimal);
      this.animalForm.reset();
    }
  }
}
