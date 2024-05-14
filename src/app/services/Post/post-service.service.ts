import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable, of } from "rxjs";
import { catchError, shareReplay, tap } from "rxjs/operators";

import { TPost, TComment } from "../../utils/types";
import { POSTS_URL, COMMENTS_URL } from "../../utils/constants";

@Injectable({
  providedIn: "root",
})
export class PostService {
  constructor(private http: HttpClient) {}

  getUserPosts(userId: number): Observable<TPost[]> {
    const posts = localStorage.getItem(`posts-${userId}`);
    if (posts) {
      return of(JSON.parse(posts) as TPost[]);
    } else {
      return this.http.get<TPost[]>(`${POSTS_URL}?userId=${userId}`).pipe(
        tap((data) =>
          localStorage.setItem(`posts-${userId}`, JSON.stringify(data))
        ),
        shareReplay(1)
      );
    }
  }

  getCommentsForUserPost(postId: number): Observable<TComment[]> {
    const comments = localStorage.getItem(`comments-${postId}`);
    if (comments) {
      return of(JSON.parse(comments) as TComment[]);
    } else {
      return this.http.get<TComment[]>(`${COMMENTS_URL}?postId=${postId}`).pipe(
        tap((data) =>
          localStorage.setItem(`comments-${postId}`, JSON.stringify(data))
        ),
        shareReplay(1)
      );
    }
  }

  getPost(postId: number): Observable<TPost> {
    const post = localStorage.getItem(`post-${postId}`);
    if (post) {
      return of(JSON.parse(post) as TPost);
    } else {
      return this.http.get<TPost>(`${POSTS_URL}/${postId}`).pipe(
        tap((data) => {
          if (!data) {
            throw new Error("Post not found");
          }
          localStorage.setItem(`post-${postId}`, JSON.stringify(data));
        }),
        catchError((error) => {
          // Handle the error when post is not found
          if (error.status === 404) {
            throw new Error("Post not found");
          } else {
            throw error;
          }
        }),
        shareReplay(1)
      );
    }
  }
}
