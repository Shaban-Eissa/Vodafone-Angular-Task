import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable, of } from "rxjs";
import { shareReplay, tap } from "rxjs/operators";

import { TPost, TComment, TUser } from "../../utils/types";
import { POSTS_URL, COMMENTS_URL, USERS_URL } from "../../utils/constants";

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

  getUser(userId: number): Observable<TUser> {
    const user = localStorage.getItem(`user-${userId}`);
    if (user) {
      return of(JSON.parse(user) as TUser);
    } else {
      return this.http.get<TUser>(`${USERS_URL}/${userId}`).pipe(
        tap((data) =>
          localStorage.setItem(`user-${userId}`, JSON.stringify(data))
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
        tap((data) =>
          localStorage.setItem(`post-${postId}`, JSON.stringify(data))
        ),
        shareReplay(1)
      );
    }
  }
}
