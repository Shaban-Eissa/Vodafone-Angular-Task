import { Routes } from "@angular/router";

import { HomeComponent } from "./pages/home/home.component";
import { LandingComponent } from "./pages/landing/landing.component";
import { NotFoundComponent } from "./pages/not-found/notfound.component";
import { PostDetailsComponent } from "./components/post-details/post-details.component";

export const routes: Routes = [
  { path: "", component: LandingComponent },
  { path: "user/:userid", component: HomeComponent },
  { path: "user/:userid/post/:postid", component: PostDetailsComponent },
  { path: "**", component: NotFoundComponent },
];
