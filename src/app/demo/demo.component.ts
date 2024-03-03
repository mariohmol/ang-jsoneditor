import { Component, OnInit, ViewChild } from '@angular/core';
import { JsonEditorComponent, JsonEditorOptions } from '../../../ang-jsoneditor/src/public_api';
import { UntypedFormBuilder } from '@angular/forms';
import { schema } from './schema.value';
@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class DemoComponent implements OnInit {

  @ViewChild('editor', { static: false }) editor: JsonEditorComponent;
  @ViewChild('editorTwo', { static: false }) editorTwo: JsonEditorComponent;

  public editorOptions: JsonEditorOptions;
  public data: any;

  public editorOptions2: JsonEditorOptions;
  public data2: any;

  public showData;
  public editedData;
  public show = false;
  public form;
  public formData;

  dataMulti: any = {
    products: [{
      name: 'car',
      product: [{
        name: 'honda',
        model: [
          { id: 'civic', name: 'civic' },
          { id: 'accord', name: 'accord' },
          { id: 'crv', name: 'crv' },
          { id: 'pilot', name: 'pilot' },
          { id: 'odyssey', name: 'odyssey' }
        ]
      }]
    },
    {
      name: 'book',
      product: [{
        name: 'dostoyevski',
        model: [
          { id: 'Axe', name: 'Axe' },
          { id: 'accord', name: 'accord' },
          { id: 'crv', name: 'crv' },
          { id: 'pilot', name: 'pilot' },
          { id: 'odyssey', name: 'odyssey' }
        ]
      }]
    }
    ]
  };

  constructor(public fb: UntypedFormBuilder) {
    this.editorOptions = new JsonEditorOptions();
    this.editorOptions.schema = schema;

    this.initEditorOptions(this.editorOptions);

    // code, text, tree, form and view
    this.editorOptions.mode = 'view'

    this.editorOptions2 = new JsonEditorOptions();
    this.initEditorOptions(this.editorOptions2)
  }

  ngOnInit() {
    this.showData = this.data = {
      randomNumber: 2,
      products: [
        {
          name: 'car',
          product:
            [
              {
                name: 'honda',
                model: [
                  { id: 'civic', name: 'civic' },
                  { id: 'accord', name: 'accord' }, { id: 'crv', name: 'crv' },
                  { id: 'pilot', name: 'pilot' }, { id: 'odyssey', name: 'odyssey' }
                ]
              }
            ]
        }
      ]
    };

    this.data2 = {
      nedata: 'test'
    };

    this.form = this.fb.group({
      myinput: [this.data2]
    });

    // this.editorOptions.onChange = this.changeLog.bind(this);
  }

  changeLog(event = null) {
    console.log(event);
    console.log('change:', this.editor);
    console.log('change2:', this.editorTwo);

    /**
     * Manual validation based on the schema
     * if the change does not meet the JSON Schema, it will use the last data
     * and will revert the user change.
     */
    const editorJson = this.editor.getEditor()
    editorJson.validate()
    const errors = editorJson.validateSchema.errors
    if (errors && errors.length > 0) {
      console.log('Errors found', errors)
      editorJson.set(this.showData);
    } else {
      this.showData = this.editor.get();
    }
  }

  changeEvent(event) {
    console.log(event);
  }

  initEditorOptions(editorOptions) {
    // this.editorOptions.mode = 'code'; // set only one mode
    editorOptions.modes = ['code', 'text', 'tree', 'view', 'preview']; // set all allowed modes
    editorOptions.onCreateMenu = (items: Array<any>, node: object) => {
      console.log(items, node, 'onCreateMenu');
      return items;
    };
    // this.editorOptions.ace = (<any>window).ace.edit('editor');
  }

  setLanguage(lang) {
    this.editorOptions.language = lang; // force a specific language, ie. pt-BR
    this.editor.setOptions(this.editorOptions);
  }

  setAce() {
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
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
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'pt-BR': {
        auto: 'Automático testing'
      },
      en: {
        auto: 'Auto testing'
      }
    };
    this.editor.setOptions(this.editorOptions);
  }

  changeObject() {
    this.data.randomNumber = Math.floor(Math.random() * 8);
  }

  changeData() {
    this.data = Object.assign({}, this.data,
      { randomNumber: Math.floor(Math.random() * 8) });
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

  showJson(d) {
    console.log(d)
    this.editedData = JSON.stringify(d, null, 2);
  }

  makeOptions = () => new JsonEditorOptions()
}
