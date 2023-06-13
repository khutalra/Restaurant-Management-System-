import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  baseURL = " http://localhost:3000/posts";
  // post data
  PostRestaurant(data: any) {
    return this.http.post<any>(this.baseURL, data).pipe(map((res: any) => {
      return res;
    }))
  }
  // get data
  GetRestaurant() {
    return this.http.get<any>(this.baseURL).pipe(map((res: any) => {
      return res;
    }))
  }

  // update resturant
  UpdateRestaurant(data: any, id: number) {
    return this.http.put<any>("http://localhost:3000/posts/"+ id, data).pipe(map((res: any) => {
      return res;
    }))
  }
  // delete restaurant details
  DeleteRestaurant(id: number) {
    return this.http.delete<any>("http://localhost:3000/posts/"+ id).pipe(map((res: any) => {
      return res;
    }))
  }

}
