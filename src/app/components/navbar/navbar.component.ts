import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { NgFor } from "@angular/common";

import { UserService } from "../../services/User/user-service.service";

@Component({
  selector: "app-navbar",
  standalone: true,
  imports: [NgFor],
  templateUrl: "./navbar.component.html",
  styleUrl: "./navbar.component.scss",
})
export class NavbarComponent implements OnInit {
  users: any[] = [];
  @Output() userSelected = new EventEmitter<number>();

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getUsers().subscribe((data: any) => {
      this.users = data;
    });
  }

  selectUser(userId: number) {
    this.userSelected.emit(userId);
  }
}
