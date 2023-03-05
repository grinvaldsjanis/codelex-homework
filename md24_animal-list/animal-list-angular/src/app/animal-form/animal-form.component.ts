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

// import { Component, EventEmitter, Output } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { Animal } from '../../utils/animal.interface';
// import { AnimalService } from '../animal-service.service';

// @Component({
//   selector: 'app-animal-form',
//   templateUrl: './animal-form.component.html',
//   styleUrls: ['./animal-form.component.scss'],
// })
// export class AnimalFormComponent {
//   animalForm: FormGroup;
//   @Output() animalAdded = new EventEmitter<Animal>();
//   classOptions = ['mammal', 'bird', 'reptile', 'fish', 'insect', 'amphibian'];

//   constructor(private fb: FormBuilder, private animalService: AnimalService) {
//     this.animalForm = this.fb.group({
//       name: ['', Validators.required],
//       aclass: ['', Validators.required],
//     });
//   }

//   onSubmit() {
//     const animal: Animal = {
//       name: this.animalForm.value.name,
//       aclass: this.animalForm.value.aclass,
//     };
//     this.animalService.addAnimal(animal).subscribe((newAnimal: Animal) => {
//       this.animalForm.reset();
//       console.log('onSubmit form with animal:', animal);
//       this.animalAdded.emit(newAnimal);
//     });
//   }
// }
