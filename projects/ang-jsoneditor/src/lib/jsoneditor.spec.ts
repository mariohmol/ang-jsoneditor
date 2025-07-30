import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { JsonEditor } from './jsoneditor';

describe('JsoneditorComponent', () => {
  let component: JsonEditor;
  let fixture: ComponentFixture<JsonEditor>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ JsonEditor ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JsonEditor);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
