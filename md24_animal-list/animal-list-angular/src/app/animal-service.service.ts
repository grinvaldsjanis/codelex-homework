import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { Animal } from './utils/animal.interface';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AnimalService {
  private apiUrl = 'http://localhost:3004/animals';

  constructor(private http: HttpClient) {}

  private handleError(error: any) {
    console.error(error);
    return throwError(error);
  }

  getAllAnimalsData(): Observable<Animal[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map((response: any) => {
        if (Array.isArray(response.animals)) {
          return response.animals.map((animal: any) => {
            return {
              id: animal._id,
              name: animal.name,
              aclass: animal.aclass,
            } as Animal;
          });
        } else {
          throw new Error('Response is not an array');
        }
      })
    );
  }

  addAnimal(animal: Animal): Observable<Animal> {
    const data = {
      name: animal.name,
      aclass: animal.aclass,
    };
    return this.http.post<Animal>(this.apiUrl, data).pipe(
      catchError(this.handleError)
    );
  }

  deleteAnimal(animalId: string): Observable<void> {
    console.log(`deleteAnimal called with id: ${animalId}`);
    const url = `${this.apiUrl}/${animalId}`;
    return this.http.delete<void>(url);
  }
}
