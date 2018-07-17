import { TestBed, async } from '@angular/core/testing';
import {
  RouterTestingModule
} from '@angular/router/testing';
import { NgJsonEditorModule } from 'ang-jsoneditor';
import { AppComponent } from './app.component';
import { routes } from './app.module';
import { DemoComponent } from './demo/demo.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NgJsonEditorModule.forRoot(),
        RouterTestingModule.withRoutes(routes)
      ],
      declarations: [
        AppComponent, DemoComponent
      ]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

});
