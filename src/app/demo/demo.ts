import { Component, OnInit, ViewChild } from '@angular/core';
import { JsonEditor, JsonEditorOptions } from '../../../projects/ang-jsoneditor/src/public-api';
import { ReactiveFormsModule, UntypedFormBuilder } from '@angular/forms';
import { schema } from './schema.value';
import { ShowComponent } from './show.component';


@Component({
  imports: [ReactiveFormsModule, JsonEditor, ShowComponent],
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class Demo implements OnInit {

  @ViewChild('editor', { static: false }) editor: JsonEditor;
  @ViewChild('editorTwo', { static: false }) editorTwo: JsonEditor;

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
      description: 'Search for "pilot" to test auto-scroll. It is near the bottom of the list.',
      manufacturers: [
        { id: 'toyota', country: 'Japan', founded: 1937, employees: 370870 },
        { id: 'ford', country: 'USA', founded: 1903, employees: 186000 },
        { id: 'bmw', country: 'Germany', founded: 1916, employees: 118909 },
        { id: 'mercedes', country: 'Germany', founded: 1926, employees: 172425 },
        { id: 'volkswagen', country: 'Germany', founded: 1937, employees: 672800 },
        { id: 'hyundai', country: 'South Korea', founded: 1967, employees: 75000 },
        { id: 'nissan', country: 'Japan', founded: 1933, employees: 133580 },
        { id: 'chevrolet', country: 'USA', founded: 1911, employees: 155000 },
        { id: 'subaru', country: 'Japan', founded: 1953, employees: 15000 },
        { id: 'mazda', country: 'Japan', founded: 1920, employees: 48000 }
      ],
      products: [
        {
          name: 'car',
          product: [
            {
              name: 'honda',
              model: [
                { id: 'civic', name: 'civic', year: 2020, price: 21550 },
                { id: 'accord', name: 'accord', year: 2021, price: 25970 },
                { id: 'crv', name: 'crv', year: 2022, price: 28410 },
                { id: 'hrv', name: 'hrv', year: 2022, price: 23650 },
                { id: 'fit', name: 'fit', year: 2020, price: 16190 },
                { id: 'ridgeline', name: 'ridgeline', year: 2022, price: 36490 },
                { id: 'passport', name: 'passport', year: 2022, price: 37050 },
                { id: 'pilot', name: 'pilot', year: 2022, price: 38170 },
                { id: 'odyssey', name: 'odyssey', year: 2022, price: 32490 }
              ]
            },
            {
              name: 'toyota',
              model: [
                { id: 'camry', name: 'camry', year: 2022, price: 25945 },
                { id: 'corolla', name: 'corolla', year: 2022, price: 20075 },
                { id: 'rav4', name: 'rav4', year: 2022, price: 27575 },
                { id: 'highlander', name: 'highlander', year: 2022, price: 35810 },
                { id: 'tacoma', name: 'tacoma', year: 2022, price: 27450 }
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
    editorOptions.modes = ['code', 'text', 'tree', 'view']; // set all allowed modes
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
