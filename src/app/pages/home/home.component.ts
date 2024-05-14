import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router, RouterModule } from "@angular/router";

import { UserService } from "../../services/user/user-service.service";

import { PostsComponent } from "../../components/posts/posts.component";
import { NavbarComponent } from "../../components/navbar/navbar.component";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [RouterModule, CommonModule, NavbarComponent, PostsComponent],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.scss",
})
export class HomeComponent implements OnInit {
  userId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.userId = +params["userid"];
      this.handleUser(this.userId);
    });
  }

  handleUser(userId: number): void {
    this.userService.getUser(userId).subscribe(
      (user) => {
        // User found, handle the user data
      },
      (error) => {
        // User not found, navigate to NotFound page
        this.router.navigate(["**"]);
      }
    );
  }
}
