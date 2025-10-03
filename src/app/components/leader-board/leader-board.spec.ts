import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaderBoard } from './leader-board';

describe('LeaderBoard', () => {
  let component: LeaderBoard;
  let fixture: ComponentFixture<LeaderBoard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeaderBoard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeaderBoard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
