# Angular Json Editor

[![Build Status](https://travis-ci.org/mariohmol/ang-jsoneditor.svg?branch=master)](https://travis-ci.org/mariohmol/ang-jsoneditor)

Angular Json Editor (wrapper for [jsoneditor](https://github.com/josdejong/jsoneditor)). View/Edit Json file with formatting.

[StackBlitz template](https://stackblitz.com/edit/ang-jsoneditor)

Working with latest Angular 16. 

![Demo Image](/src/assets/printDemo.png)

## Installation

To install this library with npm, run below command:

$ npm install --save jsoneditor ang-jsoneditor


Example:

```html
<json-editor [options]="editorOptions" [data]="data" (change)="getData($event)"></json-editor>
```

## Usage

### Configuration

First, Import Angular  JsonEditor module in root

```ts
import { NgJsonEditorModule } from 'ang-jsoneditor' 

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    ....,
    NgJsonEditorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```
Then setup your component models as below :

```ts
import { Component, ViewChild } from '@angular/core';
import { JsonEditorComponent, JsonEditorOptions } from 'ang-jsoneditor';

@Component({
  selector: 'app-root',
  template: '<json-editor [options]="editorOptions" [data]="data"></json-editor>',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public editorOptions: JsonEditorOptions;
  public data: any;
  @ViewChild(JsonEditorComponent, { static: false }) editor: JsonEditorComponent;

  constructor() { 
    this.editorOptions = new JsonEditorOptions()
    this.editorOptions.modes = ['code', 'text', 'tree', 'view']; // set all allowed modes
    //this.options.mode = 'code'; //set only one mode
      
      this.data = {"products":[{"name":"car","product":[{"name":"honda","model":[{"id":"civic","name":"civic"},{"id":"accord","name":"accord"},{"id":"crv","name":"crv"},{"id":"pilot","name":"pilot"},{"id":"odyssey","name":"odyssey"}]}]}]}
  }

}
```
Note : For better styling, add below line to your main style.css file

```js
@import "~jsoneditor/dist/jsoneditor.min.css";
```


### Forms

Build it integrated with ReactiveForms:

```ts 
this.form = this.fb.group({
  myinput: [this.data]
});
```
```html
<form  [formGroup]="form" (submit)="submit()">
    <json-editor [options]="editorOptions2" formControlName="myinput">
    </json-editor>
</form>
```

### Extra Features

Besides all the 
[configuration options](https://github.com/josdejong/jsoneditor/blob/master/docs/api.md) 
from the original jsoneditor, Angular Json Editor supports one additional option:

_expandAll_ - to automatically expand all nodes upon json loaded with the _data_ input. 

# Troubleshoot

If you have issue with the height of the component, you can try one of those solutions:

When you import CSS:

```css
@import "~jsoneditor/dist/jsoneditor.min.css";
textarea.jsoneditor-text{min-height:350px;}
```

Or Customizing the CSS:

```css
:host ::ng-deep json-editor,
:host ::ng-deep json-editor .jsoneditor,
:host ::ng-deep json-editor > div,
:host ::ng-deep json-editor jsoneditor-outer {
  height: 500px;
}
```

Or  as a inner style in component:

```html
<json-editor class="col-md-12" #editorExample style="min-height: 300px;" [options]="editorOptionsData" [data]="dataStructure"></json-editor>
```

For code view you can change the height using this example:
```css
.ace_editor.ace-jsoneditor {
  min-height: 500px;
}
```

Use debug mode to see in your console the data and options passed to jsoneditor. Copy this and paste in your issue when reporting bugs.

```html
<json-editor [debug]="true" [options]="editorOptionsData" [data]="dataStructure"></json-editor>
```

## JSONOptions missing params

If you find youself trying to use an custom option that is not mapped here, you can do:

```ts
let editorOptions: JsonEditorOptions = new JsonEditorOptions(); (<any>this.editorOptions).templates = [{menu options objects as in json editor documentation}]
```

See the [issue](https://github.com/mariohmol/ang-jsoneditor/issues/57)

## Internet Explorer 

If you want to support IE, please follow this guide:
* https://github.com/mariohmol/ang-jsoneditor/issues/44#issuecomment-508650610

## Multiple editors

To use multiple jsoneditors in your view you cannot use the same editor options.

You should have something like: 

```html
<div *ngFor="let prd of data.products" class="w-100-p p-24" >
  <json-editor [options]="makeOptions()" [data]="prd" (change)="showJson($event)"></json-editor>
</div>
```

```ts
makeOptions = () => {
  const options = new JsonEditorOptions();
  options.modes = ['code', 'text', 'tree', 'view'];
  return options;
}
```

# Demo

Demo component files are included in Git Project.

Demo Project with a lot of different implementations (ngInit, change event and others):
[https://github.com/mariohmol/ang-jsoneditor/tree/master/src/app/demo)

When publishing it to npm, look over this docs: https://docs.npmjs.com/misc/developers

# Collaborate

Fork, clone this repo and install dependencies. 
This project just works with webpack 4 (dont change to 5):

```sh
npm i -g rimraf
npm i
```

# License
MIT(./LICENSE)
