import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControllerContainerComponent } from './controller-container.component';

describe('ControllerContainerComponent', () => {
  let component: ControllerContainerComponent;
  let fixture: ComponentFixture<ControllerContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ControllerContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ControllerContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
