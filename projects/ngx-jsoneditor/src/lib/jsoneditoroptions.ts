/* eslint-disable @typescript-eslint/ban-types */

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


  /**
   *   {function} onChange  Callback method, triggered
  on change of contents.
  Does not pass the contents itself.
  See also `onChangeJSON` and
  `onChangeText`.
   */
  public onChange: () => void;

  /**
   *   // {function} onChangeJSON  Callback method, triggered
//     in modes on change of contents,
//     passing the changed contents
//     as JSON.
//     Only applicable for modes
//     'tree', 'view', and 'form'.
   */
  public onChangeJSON?: () => void;


  public onNodeName: () => void;
  public onCreateMenu: (items: Array<any>, node: object) => Array<any>;
  public onColorPicker: () => void;

  /**
  // {function} onChangeText  Callback method, triggered
  //     in modes on change of contents,
  //     passing the changed contents
  //     as stringified JSON.
   */
  public onChangeText: (jsonstr: string) => void;


  /**
   *   {function} onSelectionChange Callback method,
  triggered on node selection change
  Only applicable for modes
  'tree', 'view', and 'form'
   */
  public onSelectionChange: () => void;

  /**
   *     {function} onTextSelectionChange Callback method,
  triggered on text selection change
  Only applicable for modes
   */
  public onTextSelectionChange: () => void;


  /**
   *   // {function} onEvent Callback method, triggered
    // when an event occurs in
    // a JSON field or value.
    // Only applicable for
    // modes 'form', 'tree' and
    // 'view'
   */
  public onEvent: () => void;

  /**
   * // *   {function} onFocus  Callback method, triggered
//  when the editor comes into focus,
//  passing an object {type, target},
//  Applicable for all modes
   */
  public onFocus: () => void;

  // *   {function} onBlur   Callback method, triggered
  //  when the editor goes out of focus,
  //  passing an object {type, target},
  //  Applicable for all modes
  public onBlur: () => void;

  /**
   *  // *   {function} onClassName Callback method, triggered
// when a Node DOM is rendered. Function returns
// a css class name to be set on a node.
// Only applicable for
// modes 'form', 'tree' and
// 'view'
   */
  public onClassName: (node: JsonEditorTreeNode) => void;

  public onEditable: (node: JsonEditorTreeNode | {}) => boolean | { field: boolean, value: boolean };

  /**
   *   {function} onError   Callback method, triggered
  when an error occurs
   */
  public onError: (error: any) => void;
  public onModeChange: (newMode: JsonEditorMode, oldMode: JsonEditorMode) => void;
  public onValidate: (json: Object) => IError[];
  public onValidationError: (errors: object[]) => void;

  public enableSort: boolean;
  public enableTransform: boolean;
  public escapeUnicode: boolean;
  public expandAll?: boolean;
  public sortObjectKeys: boolean;
  public history: boolean;
  public mode: JsonEditorMode;
  public modes: JsonEditorMode[];
  public name: String;
  public schema: Object;
  public search: boolean;
  public indentation: Number;
  public templates: Object;
  public theme: Number;
  public language: String;
  public languages: Object;
  public limitDragging: boolean;

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
    this.enableSort = true;
    this.enableTransform = true;
    this.escapeUnicode = false;
    this.expandAll = false;
    this.sortObjectKeys = false;
    this.history = true;
    this.mode = 'tree';
    this.search = true;
    this.indentation = 2;
  }
}
