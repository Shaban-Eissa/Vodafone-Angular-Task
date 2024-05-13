import { Component } from "@angular/core";
import { Router, RouterModule } from "@angular/router";
import { NgClass, NgFor, NgIf } from "@angular/common";

import { PostService } from "../../services/post/post-service.service";
import { LimitCharactersPipe } from "../../pipes/limit-characters.pipe";

import { TComment, TPost, TUser } from "../../utils/types";
import { resetComments, setComments } from "../../utils/comments";

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
  posts: TPost[] = [];
  comments: TComment[] = [];

  postProfileImageURL = POST_PROFILE_IMAGE_URL;
  postBodyImageURL = POST_BODY_IMAGE_URL;

  selectedPostComments: TComment[] = [];
  selectedPostId: number | null = null;
  selectedCardId: number | null = null;

  isLoading = true;
  showComments = false;

  constructor(private router: Router, private postService: PostService) {}

  ngOnInit() {
    this.loadPosts(1);
  }

  showPostDetails(postId: number): void {
    this.router.navigate(["/post", postId]);
  }

  loadPosts(userId: number): void {
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

  loadComments(postId: number): void {
    if (this.showComments && this.selectedPostId === postId) {
      Object.assign(this, resetComments());
    } else {
      this.postService.getCommentsForUserPost(postId).subscribe((data) => {
        Object.assign(this, setComments(data, postId));
      });
    }
  }
}
