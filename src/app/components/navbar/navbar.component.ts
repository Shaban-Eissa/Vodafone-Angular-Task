import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { NgFor } from "@angular/common";

import { UserService } from "../../services/User/user-service.service";
import { TUser } from "../../utils/types";

@Component({
  selector: "app-navbar",
  standalone: true,
  imports: [NgFor],
  templateUrl: "./navbar.component.html",
  styleUrl: "./navbar.component.scss",
})
export class NavbarComponent implements OnInit {
  users: TUser[] = [];
  @Output() userSelected = new EventEmitter<number>();

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.userService.getUsers().subscribe((data: TUser[]) => {
      this.users = data;
    });
  }

  selectUser(userId: number): void {
    this.userSelected.emit(userId);
  }
}
