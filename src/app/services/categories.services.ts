import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private baseURL = 'http://localhost:4000/merge/categories';
  //http://localhost:4000/merge/categories/getall

  constructor(private http: HttpClient) {

    console.log(`${this.baseURL}/getall`)
  }

  getCategories() {
    return this.http.get(`${this.baseURL}/getall`);
  }

  addCategories(category: any) {
    return this.http.post(`${this.baseURL}/addone`, category);
  }

  putCategories(category: any) {
    return this.http.put(`${this.baseURL}/updateone/${category._id}`, category);
  }

  deleteCategories(_id: string) {
    return this.http.delete(`${this.baseURL}/deleteone/${_id}`);
  }

}
