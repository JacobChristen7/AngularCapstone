import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerInput } from './player-input';

describe('PlayerInput', () => {
  let component: PlayerInput;
  let fixture: ComponentFixture<PlayerInput>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayerInput]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayerInput);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
