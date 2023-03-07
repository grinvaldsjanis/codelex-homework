import { AnimalService } from './../animal-service.service';
import { Component } from '@angular/core';
import { Animal } from 'src/app/utils/animal.interface';

@Component({
  selector: 'app-animal-page',
  templateUrl: './animal-page.component.html',
  styleUrls: ['./animal-page.component.scss'],
})
export class AnimalPageComponent {
  listedAnimals: Animal[] = [];
  constructor(private animalService: AnimalService) {}
  animals: Animal[] = [];

  getAllAnimals() {
    this.animalService.getAllAnimalsData().subscribe((res) => {
      this.animals = res;
      this.filterMammals(false);
    });
  }

  ngOnInit() {
    this.getAllAnimals();
  }

  deleteAnimal = (animalId: string) => {
    this.animalService.deleteAnimal(animalId).subscribe(
      () => {
        this.listedAnimals = this.animals.filter(
          (animal) => animal.id !== animalId
        );
      },
      (error) => {
        console.log(error);
      }
    );
  };

  onSubmit(newAnimal: Animal) {
    this.animalService.addAnimal(newAnimal).subscribe((response) => {
      console.log('On submit response', response);
      this.getAllAnimals();
    });
  }

  filterMammals(filter: boolean) {
    if (filter) {
      this.listedAnimals = this.animals.filter(
        (animal) => animal.aclass === 'mammal'
      );
    } else {
      this.listedAnimals = this.animals;
    }
    console.log('filter mammals', filter, this.listedAnimals);
  }
}
