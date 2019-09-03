import { Component } from "@angular/core";
import * as faker from "faker";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent {
  people;

  constructor() {
    this.people = Array(100)
      .fill(1)
      .map(_ => {
        return {
          image: `https://robohash.org/${faker.name.findName()}`,
          name: faker.name.findName(),
          bio: faker.hacker.phrase()
        };
      });
  }
}
