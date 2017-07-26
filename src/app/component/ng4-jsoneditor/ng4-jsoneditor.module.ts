import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JsonEditorComponent } from '../jsoneditor/jsoneditor.component';

@NgModule({
  imports: [CommonModule],
  declarations: [JsonEditorComponent],
  exports: [JsonEditorComponent]
})

export class Ng4JsonEditorModule { }