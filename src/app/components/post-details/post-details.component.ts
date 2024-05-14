import { NgFor, NgIf } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { TComment, TPost } from "../../utils/types";
import { POST_BODY_IMAGE_URL } from "../../utils/constants";

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

  postBodyImageURL = POST_BODY_IMAGE_URL;

  userId: number | null = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private postService: PostService
  ) {}

  ngOnInit() {
    const userId = this.route.snapshot.paramMap.get("userid");
    const postId = this.route.snapshot.paramMap.get("postid");
    if (userId !== null && postId !== null) {
      this.userId = +userId;
      this.loadPostAndComments(Number(postId));
    }
  }

  loadPostAndComments(postId: number): void {
    this.postService.getPost(postId).subscribe((post) => {
      this.post = post;

      this.postService.getCommentsForUserPost(postId).subscribe((comments) => {
        this.comments = comments;
      });
    });
  }

  goBack(): void {
    this.router.navigate(["/user", this.userId]);
  }
}
