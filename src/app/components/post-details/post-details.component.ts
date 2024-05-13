import { NgFor, NgIf } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { TComment, TPost } from "../../utils/types";
import { PostService } from "../../services/post/post-service.service";

@Component({
  selector: "app-post-details",
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: "./post-details.component.html",
  styleUrls: ["./post-details.component.scss"],
})
export class PostDetailsComponent implements OnInit {
  post?: TPost;
  comments: TComment[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postService: PostService
  ) {}

  ngOnInit() {
    this.loadPostAndComments();
  }

  loadPostAndComments(): void {
    const postId = this.route.snapshot.paramMap.get("id");
    if (postId !== null) {
      this.postService.getPost(Number(postId)).subscribe((post) => {
        this.post = post;

        this.postService
          .getCommentsForUserPost(Number(postId))
          .subscribe((comments) => {
            this.comments = comments;
          });
      });
    }
  }

  goBack(): void {
    this.router.navigate(["/"]);
  }
}
