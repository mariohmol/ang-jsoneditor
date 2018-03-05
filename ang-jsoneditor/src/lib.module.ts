import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JsonEditorComponent } from './jsoneditor/jsoneditor.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    JsonEditorComponent
  ],
  exports: [
    JsonEditorComponent
  ]
})
export class NgJsonEditorModule {

  public static forRoot(): ModuleWithProviders {

    return {
      ngModule: NgJsonEditorModule,
      providers: [
      ]
    };
  }
}
