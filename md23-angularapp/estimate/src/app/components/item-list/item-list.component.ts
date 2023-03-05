import { Component } from '@angular/core';

interface Item {
  name: string;
  cost: number;
  active: boolean;
}

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss'],
})
export class ItemListComponent {
  items = [
    { name: 'Web Development', cost: 300.5, active: false },
    { name: 'Design', cost: 400.75, active: false },
    { name: 'Integration', cost: 250.25, active: false },
    { name: 'Training', cost: 220.0, active: false },
    { name: 'Party', cost: 300.75, active: false },
  ];
  title: any;

  getTotalCost(): number {
    return this.items.reduce((total, item) => {
      return item.active ? total + item.cost : total;
    }, 0);
  }

  toggleItemActive(item: Item): void {
    item.active = !item.active;
  }
}
