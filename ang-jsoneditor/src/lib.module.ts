import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JsonEditorComponent } from './jsoneditor/jsoneditor.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    JsonEditorComponent
  ],
  exports: [
    JsonEditorComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})
export class NgJsonEditorModule {

  public static forRoot(): ModuleWithProviders<any> {

    return {
      ngModule: NgJsonEditorModule,
      providers: [
      ]
    };
  }
}
