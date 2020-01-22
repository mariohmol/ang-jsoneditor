import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { JsonEditorComponent, JsonEditorOptions } from '../../../ang-jsoneditor/src/public_api';

@Component({
  selector: 'app-show',
  template: '<div>{{showData()}}</div>'
})
export class ShowComponent {

  @Input()
  public data;

  showData(){
    return JSON.stringify(this.data, null, 2);
  }

}
