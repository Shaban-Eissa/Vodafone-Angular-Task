import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { of } from "rxjs";
import { shareReplay, tap } from "rxjs/operators";

import { POSTS_URL, COMMENTS_URL, USERS_URL } from "../../utils/constants";

@Injectable({
  providedIn: "root",
})
export class PostService {
  constructor(private http: HttpClient) {}

  getPosts(userId: number) {
    const posts = localStorage.getItem(`posts-${userId}`);
    if (posts) {
      return of(JSON.parse(posts));
    } else {
      return this.http.get<any[]>(`${POSTS_URL}?userId=${userId}`).pipe(
        tap((data) =>
          localStorage.setItem(`posts-${userId}`, JSON.stringify(data))
        ),
        shareReplay(1)
      );
    }
  }

  getComments(postId: number) {
    const comments = localStorage.getItem(`comments-${postId}`);
    if (comments) {
      return of(JSON.parse(comments));
    } else {
      return this.http.get<any[]>(`${COMMENTS_URL}?postId=${postId}`).pipe(
        tap((data) =>
          localStorage.setItem(`comments-${postId}`, JSON.stringify(data))
        ),
        shareReplay(1)
      );
    }
  }

  getUser(userId: number) {
    const user = localStorage.getItem(`user-${userId}`);
    if (user) {
      return of(JSON.parse(user));
    } else {
      return this.http.get<any>(`${USERS_URL}/${userId}`).pipe(
        tap((data) =>
          localStorage.setItem(`user-${userId}`, JSON.stringify(data))
        ),
        shareReplay(1)
      );
    }
  }
}
