import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user-service';
import { Router } from '@angular/router';
import { users } from '../../services/userDataType';

@Component({
  selector: 'app-add-user',
  imports: [ReactiveFormsModule],
  templateUrl: './add-user.html',
  styleUrl: './add-user.css',
})
export class AddUser {
  name= new FormControl("");
  email= new FormControl("");
  age= new FormControl("");

  constructor(private userService:UserService ,private router:Router){}

  addUser(){
  let name= this.name.value;
  let email= this.email.value;
  let age= this.age.value;
  console.log(name,email,age);
  if(name && age && email){
    let data:users={
      name:name,
      email:email,
      age: Number(age)
    }
    this.userService.saveUsers(data).subscribe((resp)=>{
      if(resp){
        this.router.navigate(['/'])
      }
    })
  }
  }
  
  
}
