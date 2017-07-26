import { Component, OnInit, ViewChild } from '@angular/core';
//import { Ng4JsonEditorModule } from '../component/ng4-jsoneditor/ng4-jsoneditor.module';
import { JsonEditorComponent, JsonEditorOptions } from '../component/jsoneditor/jsoneditor.component';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class DemoComponent implements OnInit {

  public editorOptions: JsonEditorOptions;
  public data: any;

  @ViewChild(JsonEditorComponent) editor: JsonEditorComponent;

  constructor() { 
    this.editorOptions = new JsonEditorOptions()
  }

  ngOnInit() {
      this.editorOptions.modes = ['code', 'text', 'tree', 'view']; // set all allowed modes
      //this.options.mode = 'code'; //set only one mode
      
      this.data = {"products":[{"name":"car","product":[{"name":"honda","model":[{"id":"civic","name":"civic"},{"id":"accord","name":"accord"},{"id":"crv","name":"crv"},{"id":"pilot","name":"pilot"},{"id":"odyssey","name":"odyssey"}]}]}]}
      
  }

}
