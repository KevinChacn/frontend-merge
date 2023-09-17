import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    private baseURL = 'http://localhost:4000/merge/products';

    constructor(private http: HttpClient) { }

    getProduct() {
        return this.http.get(`${this.baseURL}/getall`);
    }

    getProductByIdCategory = (id: string) => {
        return this.http.get(`${this.baseURL}/getProductByIdCategory` + `/${id}`);
    }

    addProduct(product: any) {
        return this.http.post(`${this.baseURL}/addone`, product);
    }

    putProduct(product: any) {
        return this.http.put(`${this.baseURL}/updateone` + `/${product._id}`, product);
    }

    deleteProduct(_id: string) {
        return this.http.delete(`${this.baseURL}/deleteone` + `/${_id}`);
    }

}
