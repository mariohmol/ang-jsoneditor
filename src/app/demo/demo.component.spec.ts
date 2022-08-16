import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NgJsonEditorModule } from 'ang-jsoneditor';

import { DemoComponent } from './demo.component';
import { ShowComponent } from './show.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('DemoComponent', () => {
  let component: DemoComponent;
  let fixture: ComponentFixture<DemoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        NgJsonEditorModule.forRoot(),
        FormsModule,
        ReactiveFormsModule
      ],
      declarations: [ DemoComponent, ShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
