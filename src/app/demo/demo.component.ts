import { Component, OnInit, ViewChild } from '@angular/core';
import { JsonEditorComponent, JsonEditorOptions } from 'ang-jsoneditor';
import { FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class DemoComponent implements OnInit {

  public editorOptions: JsonEditorOptions;
  public data: any;

  public editorOptions2: JsonEditorOptions;
  public data2: any;

  @ViewChild('editor') editor: JsonEditorComponent;
  @ViewChild('editorTwo') editorTwo: JsonEditorComponent;

  public form;
  public formData;

  constructor(public fb: FormBuilder) {
    this.editorOptions = new JsonEditorOptions();
    this.initEditorOptions(this.editorOptions);

    this.editorOptions2 = new JsonEditorOptions();
    this.initEditorOptions(this.editorOptions2)
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

    this.form = this.fb.group({
      myinput: [this.data2]
    });

    this.editorOptions.onChange = this.changeLog.bind(this);
  }

  changeLog(event = null) {
    console.log(event);
    console.log('change:', this.editor);
    console.log('change2:', this.editorTwo);
  }

  changeEvent(event) {
    console.log(event);
  }

  initEditorOptions(editorOptions) {
    // this.editorOptions.mode = 'code'; // set only one mode
    editorOptions.modes = ['code', 'text', 'tree', 'view']; // set all allowed modes
    // this.editorOptions.ace = (<any>window).ace.edit('editor');
  }

  setLanguage(lang) {
    this.editorOptions.language = lang; // force a specific language, ie. pt-BR
    this.editor.setOptions(this.editorOptions);
  }

  setAce() {
    const aceEditor = (<any>window).ace.edit(document.querySelector('#a' + this.editor.id + '>div'));
    // custom your ace here
    aceEditor.setReadOnly(true);
    aceEditor.setFontSize('110pt');
    this.editorOptions.ace = aceEditor;
    this.editor.setOptions(this.editorOptions);
  }

  toggleNav() {
    this.editorOptions.navigationBar = !this.editorOptions.navigationBar;
    this.editor.setOptions(this.editorOptions);
  }

  toggleStatus() {
    this.editorOptions.statusBar = !this.editorOptions.statusBar;
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

  print(v) {
    return JSON.stringify(v, null, 2);
  }
  submit() {
    this.formData = JSON.stringify(this.form.value, null, 2);
    console.log(this.form.value);
  }
}
