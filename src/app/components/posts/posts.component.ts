import { NgClass, NgFor, NgIf } from "@angular/common";
import { Component } from "@angular/core";
import { forkJoin } from 'rxjs';

import { LimitCharactersPipe } from "../../pipes/limit-characters.pipe";
import { PostService } from "../../services/Post/post-service.service";

@Component({
  selector: "app-posts",
  standalone: true,
  imports: [NgFor, NgIf, LimitCharactersPipe, NgClass],
  templateUrl: "./posts.component.html",
  styleUrl: "./posts.component.scss",
})
export class PostsComponent {
  posts: any[] = [];
  comments: any[] = [];
  selectedPostComments: any[] = [];
  selectedPostId: number | null = null;
  selectedCardId: number | null = null;
  showComments = false;
  isLoading = true;

  constructor(private postService: PostService) {}

  ngOnInit() {
    this.loadPosts(1);
  }

  loadPosts(userId: number) {
    this.isLoading = true;
    this.postService.getPosts(userId).subscribe((posts) => {
      this.posts = posts;
      posts.forEach((post: any) => {
        this.postService.getUser(post.userId).subscribe((user) => {
          post.user = user;
          this.isLoading = false;
        });
      });
    });
  }

  loadComments(postId: number) {
    if (this.showComments && this.selectedPostId === postId) {
      this.showComments = false;
      this.selectedPostId = null;
      this.selectedPostComments = [];
      this.selectedCardId = null;
    } else {
      this.postService.getComments(postId).subscribe((data) => {
        this.selectedPostComments = data;
        this.selectedPostId = postId;
        this.showComments = true;
        this.selectedCardId = postId;
      });
    }
  }
}
