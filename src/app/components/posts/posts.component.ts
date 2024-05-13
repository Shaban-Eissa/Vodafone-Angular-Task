import { NgClass, NgFor, NgIf } from "@angular/common";
import { Component } from "@angular/core";

import { LimitCharactersPipe } from "../../pipes/limit-characters.pipe";
import { PostService } from "../../services/post/post-service.service";

import { postProfileImageURL, postBodyImageURL } from "../../utils/constants";
import { TComment, TPost, TUser } from "../../utils/types";
import { resetComments, setComments } from "../../utils/comments";

@Component({
  selector: "app-posts",
  standalone: true,
  imports: [NgFor, NgIf, LimitCharactersPipe, NgClass],
  templateUrl: "./posts.component.html",
  styleUrl: "./posts.component.scss",
})
export class PostsComponent {
  posts: TPost[] = [];
  postProfileImageURL = postProfileImageURL;
  postBodyImageURL = postBodyImageURL;
  comments: TComment[] = [];
  selectedPostComments: any[] = [];
  selectedPostId: number | null = null;
  selectedCardId: number | null = null;
  showComments = false;
  isLoading = true;

  constructor(private postService: PostService) {}

  ngOnInit() {
    this.loadPosts(1);
  }

  loadPosts(userId: number): void {
    this.isLoading = true;
    this.postService.getPosts(userId).subscribe((posts) => {
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
      this.postService.getComments(postId).subscribe((data) => {
        Object.assign(this, setComments(data, postId));
      });
    }
  }
}
