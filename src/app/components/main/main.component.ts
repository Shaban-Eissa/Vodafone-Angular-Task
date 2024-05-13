import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";

import { NavbarComponent } from "../navbar/navbar.component";
import { PostsComponent } from "../posts/posts.component";

@Component({
  selector: "app-main",
  standalone: true,
  imports: [RouterModule, CommonModule, NavbarComponent, PostsComponent],
  templateUrl: "./main.component.html",
  styleUrl: "./main.component.scss",
})
export class MainComponent {}
