import { NgFor } from "@angular/common";
import { Router, ActivatedRoute } from "@angular/router";
import { Component, OnInit, EventEmitter, Output } from "@angular/core";

import { TUser } from "../../utils/types";
import { UserService } from "../../services/user/user-service.service";

@Component({
  selector: "app-navbar",
  standalone: true,
  imports: [NgFor],
  templateUrl: "./navbar.component.html",
  styleUrl: "./navbar.component.scss",
})
export class NavbarComponent implements OnInit {
  users: TUser[] = [];
  selectedUserId: number | null = null;

  @Output() userSelected = new EventEmitter<number>();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.fetchUsers();
  }

  fetchUsers(): void {
    const userId = this.route.snapshot.paramMap.get("userid");
    this.userService.getUsers().subscribe((data: TUser[]) => {
      this.users = data;
      if (this.users.length > 0) {
        this.selectUser(userId ? +userId : this.users[0].id);
      }
    });
  }

  selectUser(userId: number): void {
    this.selectedUserId = userId;
    this.userSelected.emit(userId);
    this.router.navigate(["/user", userId]);
  }
}
