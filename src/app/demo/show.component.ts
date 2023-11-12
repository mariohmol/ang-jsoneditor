import { JsonPipe } from "@angular/common";
import { Component, Input } from "@angular/core";

@Component ({
  standalone: true,
  imports: [JsonPipe],
  selector: "app-show",
  template: "<div>{{data | json}}</div>"
})
export class ShowComponent {

  @Input ()
  public data;

}
