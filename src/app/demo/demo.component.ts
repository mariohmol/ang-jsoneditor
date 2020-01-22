import { Component, OnInit, ViewChild } from '@angular/core';
import { JsonEditorComponent, JsonEditorOptions } from '../../../ang-jsoneditor/src/public_api';
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

  public showData;

  @ViewChild('editor', { static: true }) editor: JsonEditorComponent;
  @ViewChild('editorTwo', { static: true }) editorTwo: JsonEditorComponent;

  public form;
  public formData;

  constructor(public fb: FormBuilder) {
    this.editorOptions = new JsonEditorOptions();
    this.editorOptions.schema ={
      'definitions': {},
      '$schema': 'http://json-schema.org/draft-07/schema#',
      '$id': 'http://example.com/root.json',
      'type': 'object',
      'title': 'The Root Schema',
      'required': [
        'randomNumber',
        'products'
      ],
      'properties': {
        'randomNumber': {
          '$id': '#/properties/randomNumber',
          'type': 'integer',
          'title': 'The Randomnumber Schema',
          'default': 0,
          'examples': [
            10
          ],
          'enum':[1,2,3,4,5,6,7,8]
        },
        'products': {
          '$id': '#/properties/products',
          'type': 'array',
          'title': 'The Products Schema',
          'items': {
            '$id': '#/properties/products/items',
            'type': 'object',
            'title': 'The Items Schema',
            'required': [
              'name',
              'product'
            ],
            'properties': {
              'name': {
                '$id': '#/properties/products/items/properties/name',
                'type': 'string',
                'title': 'The Name Schema',
                'default': '',
                'examples': [
                  'car'
                ],
                'pattern': '^(.*)$'
              },
              'product': {
                '$id': '#/properties/products/items/properties/product',
                'type': 'array',
                'title': 'The Product Schema',
                'items': {
                  '$id': '#/properties/products/items/properties/product/items',
                  'type': 'object',
                  'title': 'The Items Schema',
                  'required': [
                    'name',
                    'model'
                  ],
                  'properties': {
                    'name': {
                      '$id': '#/properties/products/items/properties/product/items/properties/name',
                      'type': 'string',
                      'title': 'The Name Schema',
                      'default': '',
                      'examples': [
                        'honda'
                      ],
                      'pattern': '^(.*)$'
                    },
                    'model': {
                      '$id': '#/properties/products/items/properties/product/items/properties/model',
                      'type': 'array',
                      'title': 'The Model Schema',
                      'items': {
                        '$id': '#/properties/products/items/properties/product/items/properties/model/items',
                        'type': 'object',
                        'title': 'The Items Schema',
                        'required': [
                          'id',
                          'name'
                        ],
                        'properties': {
                          'id': {
                            '$id': '#/properties/products/items/properties/product/items/properties/model/items/properties/id',
                            'type': 'string',
                            'title': 'The Id Schema',
                            'default': '',
                            'examples': [
                              'civic'
                            ],
                            'pattern': '^(.*)$'
                          },
                          'name': {
                            '$id': '#/properties/products/items/properties/product/items/properties/model/items/properties/name',
                            'type': 'string',
                            'title': 'The Name Schema',
                            'default': '',
                            'examples': [
                              'civic'
                            ],
                            'pattern': '^(.*)$'
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }

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

    //this.editorOptions.onChange = this.changeLog.bind(this);
  }

  changeLog(event = null) {
    debugger;
    console.log(event);
    console.log('change:', this.editor);
    console.log('change2:', this.editorTwo);
    this.showData = this.editorTwo.get();
  }

  changeEvent(event) {
    debugger;
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
