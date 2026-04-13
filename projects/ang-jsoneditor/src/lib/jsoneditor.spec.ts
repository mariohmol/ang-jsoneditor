import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { JsonEditor } from './jsoneditor';
import { JsonEditorOptions } from './jsoneditoroptions';

describe('JsoneditorComponent', () => {
  let component: JsonEditor;
  let fixture: ComponentFixture<JsonEditor>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ JsonEditor ]
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

  describe('JsonEditorOptions defaults', () => {
    it('should default mainMenuBar to true', () => {
      const options = new JsonEditorOptions();
      expect(options.mainMenuBar).toBe(true);
    });

    it('should default navigationBar to true', () => {
      const options = new JsonEditorOptions();
      expect(options.navigationBar).toBe(true);
    });

    it('should default statusBar to true', () => {
      const options = new JsonEditorOptions();
      expect(options.statusBar).toBe(true);
    });
  });
});
