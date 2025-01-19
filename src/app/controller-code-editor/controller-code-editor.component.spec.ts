import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControllerCodeEditorComponent } from './controller-code-editor.component';

describe('ControllerCodeEditorComponent', () => {
  let component: ControllerCodeEditorComponent;
  let fixture: ComponentFixture<ControllerCodeEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ControllerCodeEditorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ControllerCodeEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
