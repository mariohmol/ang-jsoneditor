
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
    public enableSort: boolean;
    public enableTransform: boolean;
    public escapeUnicode: boolean;
    public expandAll: boolean;
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
