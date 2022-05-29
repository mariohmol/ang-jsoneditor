import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngJsoneditorModule } from "ang-jsoneditor";

import { AppComponent } from './app.component';
import {ShowComponent} from "./show.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    ShowComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AngJsoneditorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
