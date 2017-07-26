import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
//import { JsonEditorComponent } from './component/jsoneditor/jsoneditor.component';
import { DemoComponent } from './demo/demo.component';
import { Ng4JsonEditorModule } from './component/ng4-jsoneditor/ng4-jsoneditor.module';

const routes: Routes = [
  { path: '', redirectTo: '/demo', pathMatch: 'full' },
  { path: 'demo',  component: DemoComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    DemoComponent
  ],
  imports: [
    BrowserModule,
    Ng4JsonEditorModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
