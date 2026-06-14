import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { users } from './userDataType';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiURL = "http://localhost:3000/users"
  constructor(private http: HttpClient) { }
  getUsers() {
    return this.http.get<users[]>(this.apiURL);
  }
  saveUsers(data: users) {
    return this.http.post<users>(this.apiURL, data)
  }
  deleteUser(id: number) {
    return this.http.delete(`${this.apiURL}/${id}`)
  }
 getUser(id:string) {
    return this.http.get<users>(`${this.apiURL}/${id}`);
  }
 userEdit(data:users,id:string) {
    return this.http.put<users>(`${this.apiURL}/${id}`,data);
  }
}
