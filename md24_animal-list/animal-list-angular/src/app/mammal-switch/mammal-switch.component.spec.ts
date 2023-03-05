import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MammalSwitchComponent } from './mammal-switch.component';

describe('MammalSwitchComponent', () => {
  let component: MammalSwitchComponent;
  let fixture: ComponentFixture<MammalSwitchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MammalSwitchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MammalSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
