import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Observable, of } from "rxjs";
import { shareReplay, tap } from "rxjs/operators";

import { USERS_URL } from "../../utils/constants";
import { TUser } from "../../utils/types";

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
}
