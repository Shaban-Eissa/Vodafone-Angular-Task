import { Component } from "@angular/core";
import { NgClass, NgFor, NgIf } from "@angular/common";
import { Router, RouterModule, ActivatedRoute } from "@angular/router";

import { TComment, TPost, TUser } from "../../utils/types";

import { PostService } from "../../services/post/post-service.service";

import { LimitCharactersPipe } from "../../pipes/limit-characters.pipe";

import {
  POST_PROFILE_IMAGE_URL,
  POST_BODY_IMAGE_URL,
} from "../../utils/constants";

@Component({
  selector: "app-posts",
  standalone: true,
  imports: [NgFor, NgIf, NgClass, LimitCharactersPipe, RouterModule],
  templateUrl: "./posts.component.html",
  styleUrl: "./posts.component.scss",
})
export class PostsComponent {
  isLoading = true;

  posts: TPost[] = [];
  comments: TComment[] = [];

  postBodyImageURL = POST_BODY_IMAGE_URL;
  postProfileImageURL = POST_PROFILE_IMAGE_URL;

  selectedUserId: number = 0;
  selectedPostComments: TComment[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private postService: PostService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.selectedUserId = +params["userid"];
      this.loadPosts(this.selectedUserId);
    });
  }

  showPostDetails(postId: number): void {
    this.router.navigate(["/user", this.selectedUserId, "post", postId]);
  }

  loadPosts(userId: number): void {
    this.selectedUserId = userId;
    this.isLoading = true;
    this.postService.getUserPosts(userId).subscribe((posts) => {
      this.posts = posts;
      posts.forEach((post: TPost) => {
        this.postService.getUser(post.userId).subscribe((user: TUser) => {
          post.user = user;
          this.isLoading = false;
        });
      });
    });
  }
}
