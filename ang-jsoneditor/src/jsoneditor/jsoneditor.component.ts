import {
  Component, ElementRef, Input, OnInit, ViewChild,
  Output, EventEmitter, forwardRef, ChangeDetectionStrategy
} from '@angular/core';
import * as editor from 'jsoneditor';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'json-editor',
  template: '<div [id]="id" #jsonEditorContainer></div>',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => JsonEditorComponent),
      multi: true
    }
  ],
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class JsonEditorComponent implements ControlValueAccessor, OnInit {
  private editor: any;
  public id = 'angjsoneditor' + Math.floor(Math.random() * 1000000);
  disabled = false;
  isFocused = false;

  public optionsChanged = false;

  @ViewChild('jsonEditorContainer') jsonEditorContainer: ElementRef;

  private _data: Object = {};

  @Input() options: JsonEditorOptions = new JsonEditorOptions();
  @Input('data')
  set data(value: Object) {
    this._data = value;
    if (this.editor) {
      this.editor.destroy();
      this.ngOnInit();
    }
  }

  @Output()
  change: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }


  ngOnInit() {
    let optionsBefore = this.options;
    if (!this.optionsChanged && this.editor) {
      optionsBefore = this.editor.options;
    }

    if (!this.options.onChange && this.change) {
      this.options.onChange = this.onChange.bind(this);
    }
    this.editor = new editor(this.jsonEditorContainer.nativeElement, optionsBefore, this._data);
  }


  /**
   * ngModel
   * ControlValueAccessor
   */

  // ControlValueAccessor implementation
  writeValue(value: any) {
    this.data = value;
  }

  // Implemented as part of ControlValueAccessor
  registerOnChange(fn) {
    this.onChangeModel = fn;
  }

  // Implemented as part of ControlValueAccessor.
  registerOnTouched(fn) {
    this.onTouched = fn;
  }

  // Implemented as part of ControlValueAccessor.
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  // Implemented as part of ControlValueAccessor.
  private onTouched = () => { };

  // Implemented as part of ControlValueAccessor.
  private onChangeModel = (e) => { };

  public onChange(e) {
    this.onChangeModel(this.editor.get());
    this.change.emit(this.editor.get());
  }


  /**
   * JSON EDITOR FUNCTIONS
   */

  public collapseAll() {
    this.editor.collapseAll();
  }

  public expandAll() {
    this.editor.expandAll();
  }

  public focus() {
    this.editor.focus();
  }

  public get(): JSON {
    return this.editor.get();
  }

  public getMode(): JsonEditorMode {
    return this.editor.getMode() as JsonEditorMode;
  }

  public getName(): string {
    return this.editor.getName();
  }

  public getText(): string {
    return this.editor.getText();
  }

  public set(json: JSON) {
    this.editor.set(json);
  }

  public setMode(mode: JsonEditorMode) {
    this.editor.setMode(mode);
  }

  public setName(name: string) {
    this.editor.setName(name);
  }

  public setSelection(start, end) {
    this.editor.setSelection(start, end);
  }

  public getSelection(): any {
    return this.editor.getSelection();
  }

  public setSchema(schema: any) {
    this.editor.setSchema(schema);
  }

  public setOptions(newOptions: JsonEditorOptions) {
    if (this.editor) {
      this.editor.destroy();
    }
    this.optionsChanged = true;
    this.options = newOptions;
    this.ngOnInit();
  }

  public destroy() {
    this.editor.destroy();
  }

  public isValidJson() {
    try {
      JSON.parse(this.getText());
      return true;
    } catch (e) {
      return false;
    }
  }
}

export type JsonEditorMode = 'tree' | 'view' | 'form' | 'code' | 'text';

export interface JsonEditorTreeNode {
  field: String,
  value: String,
  path: String[]
}

export interface IError {
  path: (string | number)[];
  message: string;
}

export class JsonEditorOptions {
  public ace: any;
  public ajv: Object;
  public onChange: () => void;
  public onEditable: (node: JsonEditorTreeNode | {}) => boolean | { field: boolean, value: boolean };
  public onError: (error: any) => void;
  public onModeChange: (newMode: JsonEditorMode, oldMode: JsonEditorMode) => void;
  public onValidate: (json: Object) => IError[];
  public escapeUnicode: boolean;
  public sortObjectKeys: boolean;
  public history: boolean;
  public mode: JsonEditorMode;
  public modes: JsonEditorMode[];
  public name: String;
  public schema: Object;
  public search: boolean;
  public indentation: Number;
  public theme: Number;
  public language: String;
  public languages: Object;

  /**
   * Adds main menu bar - Contains format, sort, transform, search etc. functionality. True
   * by default. Applicable in all types of mode.
   */
  public mainMenuBar: boolean;

  /**
   * Adds navigation bar to the menu - the navigation bar visualize the current position on
   * the tree structure as well as allows breadcrumbs navigation.
   * True by default.
   * Only applicable when mode is 'tree', 'form' or 'view'.
   */
  public navigationBar: boolean;

  /**
   * Adds status bar to the bottom of the editor - the status bar shows the cursor position
   * and a count of the selected characters.
   * True by default.
   * Only applicable when mode is 'code' or 'text'.
   */
  public statusBar: boolean;

  constructor() {
    this.escapeUnicode = false;
    this.sortObjectKeys = false;
    this.history = true;
    this.mode = 'tree';
    this.search = true;
    this.indentation = 2;
  }

}
