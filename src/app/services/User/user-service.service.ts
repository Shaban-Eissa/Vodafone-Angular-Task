import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable, of } from "rxjs";
import { catchError, shareReplay, tap } from "rxjs/operators";

import { TUser } from "../../utils/types";
import { USERS_URL } from "../../utils/constants";

@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(private http: HttpClient) {}

  users$ = this.http.get<TUser[]>(USERS_URL).pipe(
    tap((users) => localStorage.setItem("users", JSON.stringify(users))),
    shareReplay(1)
  );

  getUsers(): Observable<TUser[]> {
    const users = localStorage.getItem("users");
    if (users) {
      return of(JSON.parse(users) as TUser[]);
    } else {
      return this.users$;
    }
  }

  getUser(userId: number): Observable<TUser> {
    const user = localStorage.getItem(`user-${userId}`);
    if (user) {
      return of(JSON.parse(user) as TUser);
    } else {
      return this.http.get<TUser>(`${USERS_URL}/${userId}`).pipe(
        tap((data) => {
          // Check if the data returned is null or empty.
          if (!data) {
            throw new Error("Not Found");
          } else {
            localStorage.setItem(`user-${userId}`, JSON.stringify(data));
          }
        }),
        catchError((error) => {
          // Handle the error when user is not found
          if (error.status === 404) {
            throw new Error("User Not Found");
          } else {
            throw error;
          }
        }),
        shareReplay(1)
      );
    }
  }
}
