import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user-service';
import { users } from '../../services/userDataType';

@Component({
  selector: 'app-edit-user',
  imports: [ReactiveFormsModule],
  templateUrl: './edit-user.html',
  styleUrl: './edit-user.css',
})
export class EditUser {
  name = new FormControl("");
  email = new FormControl("");
  age = new FormControl("");
  userId: number | undefined;

  constructor(
    private activeRoute: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.activeRoute.snapshot.paramMap.get('id');
    if (id) {
      this.userId = Number(id);
      this.userService.getUser(id).subscribe((user:users) => {
        if (user) {
          this.name.setValue(user.name);
          this.email.setValue(user.email);
          this.age.setValue(String(user.age));
        }
      });
    }
  }

  editUser() {
    const name = this.name.value;
    const email = this.email.value;
    const age = this.age.value;
    const id = this.activeRoute.snapshot.paramMap.get('id')

    if (id && name && age && email) {
      const data: users = {
        id: this.userId,
        name: name,
        email: email,
        age: Number(age),
      };
      this.userService.userEdit(data,id).subscribe((item) => {
        if (item) {
          this.router.navigate(['/']);
        }
      });
    }
  }
}
