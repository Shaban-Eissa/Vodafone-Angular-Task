import { Routes } from "@angular/router";

import { MainComponent } from "./components/main/main.component";
import { PostDetailsComponent } from "./components/post-details/post-details.component";

export const routes: Routes = [
  {
    path: "",
    component: MainComponent,
    pathMatch: "full",
  },
  { path: "post/:id", component: PostDetailsComponent },
];
