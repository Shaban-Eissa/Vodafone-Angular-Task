import { Routes } from "@angular/router";

import { MainComponent } from "./components/main/main.component";
import { PostDetailsComponent } from "./components/post-details/post-details.component";

export const routes: Routes = [
  { path: "user/:userid", component: MainComponent },
  { path: "user/:userid/post/:postid", component: PostDetailsComponent },
];
