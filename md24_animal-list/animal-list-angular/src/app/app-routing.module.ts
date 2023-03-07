import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnimalPageComponent} from './animal-page/animal-page.component';
import { TaskPageComponent} from './task-page/task-page.component';


const routes: Routes = [
  { path: 'animals', component: AnimalPageComponent },
  { path: 'tasks', component: TaskPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
