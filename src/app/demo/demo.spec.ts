import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Demo } from './demo';
import { JsonEditor } from '../../../projects/ang-jsoneditor/src/public-api';

describe('Demo', () => {
  let component: Demo;
  let fixture: ComponentFixture<Demo>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        JsonEditor,
        FormsModule,
        ReactiveFormsModule,
        Demo
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Demo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
