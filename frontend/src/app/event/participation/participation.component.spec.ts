import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipationComponent } from './participation.component';

describe('DetailComponent', () => {
  let component: ParticipationComponent;
  let fixture: ComponentFixture<ParticipationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ParticipationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ParticipationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
