import { Component, Input } from "@angular/core";

@Component ({
  selector: "app-show",
  template: "<div>{{data | json}}</div>"
})
export class ShowComponent {
  public data;
}
