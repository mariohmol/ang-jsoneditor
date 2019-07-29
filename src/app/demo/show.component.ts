import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { JsonEditorComponent, JsonEditorOptions } from 'ang-jsoneditor';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-show',
  template: '<div>{{showData()}}</div>',
  styleUrls: ['./demo.component.css']
})
export class ShowComponent implements OnInit {

  @Input()
  public data;

  constructor(public fb: FormBuilder) {
  
  }

  ngOnInit() {
    
  }

  showData(){
    return JSON.stringify(this.data, null, 2);
  }

}
