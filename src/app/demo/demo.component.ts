import { Component, OnInit, ViewChild } from '@angular/core';
import { JsonEditorComponent, JsonEditorOptions } from 'ang-jsoneditor';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class DemoComponent implements OnInit {

  public editorOptions: JsonEditorOptions;
  public data: any;
  public data2: any;

  @ViewChild('editor') editor: JsonEditorComponent;
  @ViewChild('editorTwo') editorTwo: JsonEditorComponent;

  constructor() {
    this.editorOptions = new JsonEditorOptions();
    this.initEditorOptions();
  }

  ngOnInit() {

    this.data = {
      'randomNumber': 10,
      'products': [
        {
          'name': 'car',
          'product':
            [
              {
                'name': 'honda',
                'model': [
                  { 'id': 'civic', 'name': 'civic' },
                  { 'id': 'accord', 'name': 'accord' }, { 'id': 'crv', 'name': 'crv' },
                  { 'id': 'pilot', 'name': 'pilot' }, { 'id': 'odyssey', 'name': 'odyssey' }
                ]
              }
            ]
        }
      ]
    };

    this.data2 = {
      'nedata': 'test'
    };

    this.editorOptions.onChange = this.change.bind(this);
  }

  change() {
    console.log('change:', this.editor);
    console.log('change2:', this.editorTwo);
  }

  initEditorOptions() {
    this.editorOptions.mode = 'code'; // set only one mode
    this.editorOptions.modes = ['code', 'text', 'tree', 'view']; // set all allowed modes
    // this.editorOptions.ace = (<any>window).ace.edit('editor');
  }

  setLanguage(lang) {
    this.editorOptions.language = lang; // force a specific language, ie. pt-BR
    this.editor.setOptions(this.editorOptions);
  }

  setAce() {
    const aceEditor = (<any> window).ace.edit(document.querySelector('#a' + this.editor.id + '>div'));
    // custom your ace here
    aceEditor.setReadOnly(true);
    aceEditor.setFontSize('110pt');
    this.editorOptions.ace = aceEditor;
    this.editor.setOptions(this.editorOptions);
  }

  customLanguage() {
    this.editorOptions.languages = {
      'pt-BR': {
        'auto': 'Automático testing'
      },
      'en': {
        'auto': 'Auto testing'
      }
    };
    this.editor.setOptions(this.editorOptions);
  }

  changeObject() {
    this.data.randomNumber = Math.random() * 100;
  }

  changeData() {
    this.data = Object.assign({}, this.data,
      { randomNumber: Math.random() * 100 });
  }

  /**
   * Example on how get the json changed from the jsoneditor
   */
  getData() {
    const changedJson = this.editor.get();
    console.log(changedJson);
  }
}
