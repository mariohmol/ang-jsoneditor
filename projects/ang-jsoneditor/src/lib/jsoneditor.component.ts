/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @angular-eslint/no-input-rename */
/* eslint-disable @angular-eslint/no-output-native */

import JSONEditor from 'jsoneditor';

import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
  forwardRef
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IError, JsonEditorMode, JsonEditorOptions, JsonEditorTreeNode } from './jsoneditoroptions';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'json-editor',
  standalone: true,
  template: `<div [id]="id" #jsonEditorContainer></div>`,
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

export class JsonEditorComponent implements ControlValueAccessor, OnInit, OnDestroy {
  @ViewChild('jsonEditorContainer', { static: true }) jsonEditorContainer: ElementRef;
  @Input() options: JsonEditorOptions = new JsonEditorOptions();
  @Output()
  change: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  jsonChange: EventEmitter<any> = new EventEmitter<any>();
  @Input() debug = false;
  public optionsChanged = false;

  disabled = false;
  isFocused = false;

  public id = 'angjsoneditor' + Math.floor(Math.random() * 1000000);
  private _data: Object = {};
  private editor: JSONEditor;

  constructor() { }

  @Input('data')
  set data(value: Object) {
    this._data = value;
    if (this.editor) {
      this.editor.destroy();
      this.ngOnInit();
    }
  }

  ngOnInit() {
    let optionsBefore = this.options;
    if (!this.optionsChanged && this.editor) {
      //TODO: check if this is needed
      optionsBefore = (this.editor as any).options;
    }

    if (!this.options.onChangeJSON && this.jsonChange) {
      this.options.onChangeJSON = this.onChangeJSON;
    }
    if (!this.options.onChange && this.change) {
      this.options.onChange = this.onChange;
    }
    const optionsCopy = Object.assign({}, optionsBefore);

    // expandAll is an option only supported by ang-jsoneditor and not by the the original jsoneditor.
    delete optionsCopy.expandAll;
    if (this.debug) {
      console.log(optionsCopy, this._data);
    }
    if (!this.jsonEditorContainer.nativeElement) {
      console.error(`Can't find the ElementRef reference for jsoneditor)`);
    }

    if (
        optionsCopy.mode === 'text' || optionsCopy.mode === 'code' ||
        (
          optionsCopy.modes &&
          (optionsCopy.modes.indexOf('text') !== -1 || optionsCopy.modes.indexOf('code') !== -1)
        )
      ) {
      optionsCopy.onChangeJSON = undefined;
    }
    this.editor = new JSONEditor(this.jsonEditorContainer.nativeElement, optionsCopy as any, this._data);

    if (this.options.expandAll) {
      this.editor.expandAll();
    }
  }

  ngOnDestroy() {
    this.destroy();
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
  registerOnChange(fn: any) {
    this.onChangeModel = fn;
  }

  // Implemented as part of ControlValueAccessor.
  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  // Implemented as part of ControlValueAccessor.
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  public onChange = () => {
    if (this.editor) {
      try {
        const json = this.editor.get();
        this.onChangeModel(json);
        this.change.emit(json);
      } catch (error) {
        if (this.debug) {
          console.log(error);
        }
      }
    }
  }

  public onChangeJSON = () => {
    if (this.editor) {
      try {
        this.jsonChange.emit(this.editor.get());
      } catch (error) {
        if (this.debug) {
          console.log(error);
        }
      }
    }
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
    return this.editor.getName()!;
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

  public setSelection(start: any, end: any) {
    this.editor.setSelection(start, end);
  }

  public getSelection(): any {
    return this.editor.getSelection();
  }

  public getValidateSchema(): any {
    //TODO: check if this is needed
    return (this.editor as any).validateSchema;
  }

  public setSchema(schema: any, schemaRefs: any) {
    this.editor.setSchema(schema, schemaRefs);
  }

  public search(query: string) {
    //TODO: check if this is needed
    (this.editor as any).search(query);
  }

  public setOptions(newOptions: JsonEditorOptions) {
    if (this.editor) {
      this.editor.destroy();
    }
    this.optionsChanged = true;
    this.options = newOptions;
    this.ngOnInit();
  }

  public update(json: JSON) {
    this.editor.update(json);
  }

  public destroy() {
    this.editor.destroy();
  }

  public getEditor(){
    //TODO: made it any because of the missing type definition
    return this.editor as any;
  }

  public isValidJson() {
    try {
      JSON.parse(this.getText());
      return true;
    } catch (e) {
      return false;
    }
  }

  // Implemented as part of ControlValueAccessor.
  private onTouched = () => {
  };

  // Implemented as part of ControlValueAccessor.
  private onChangeModel = (e: any) => {
  };
}

export { JsonEditorOptions, JsonEditorMode, JsonEditorTreeNode, IError };
