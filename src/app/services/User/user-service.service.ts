import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { of } from "rxjs";
import { shareReplay, tap } from "rxjs/operators";

import { USERS_URL } from "../../utils/constants";

@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(private http: HttpClient) {}

  users$ = this.http.get<any[]>(USERS_URL).pipe(
    tap((users) => localStorage.setItem("users", JSON.stringify(users))),
    shareReplay(1)
  );

  getUsers() {
    const users = localStorage.getItem("users");
    if (users) {
      return of(JSON.parse(users));
    } else {
      return this.users$;
    }
  }
}
