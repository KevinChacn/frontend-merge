import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";

import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';


import swal from "sweetalert2";

import { CategoriesService } from '../app/services/categories.services';
import { ProductService } from '../app/services/products.services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  formProducts = new FormGroup({
    _id: new FormControl(""),
    name: new FormControl(""),
    valor: new FormControl(""),
    stock: new FormControl(""),
    id_category: new FormControl(""),
  })

  formCategories = new FormGroup({
    _id: new FormControl(""),
    name: new FormControl(""),
    description: new FormControl(""),
  })


  public ProductsList: Array<any> = [];
  public CategoriesList: Array<any> = [];


  @ViewChild('productsTableSort') public productsTableSort!: MatSort;
  @ViewChild('CategoriesTableSort') public CategoriesTableSort!: MatSort;

  dataSourceCategories: any;
  displayedColumnsCategories: string[] = ['_id', 'name', 'description', 'actions'];

  dataSourceProducts: any;
  displayedColumnsProducts: string[] = ['_id', 'name', 'valor', 'stock', 'id_category', 'actions'];

  @ViewChild('paginator') paginator1!: MatPaginator;
  @ViewChild('paginator2') paginator2!: MatPaginator;

  constructor(
    public CategoriesService: CategoriesService,
    public ProductService: ProductService,
  ) { }

  ngOnInit() {
    this.getCategories();
    this.getProducts();
  }


  getCategories() {
    this.CategoriesService.getCategories().subscribe({
      next: (data) => {
        this.CategoriesList = data as [];
        console.log('this.CategoriesList', this.CategoriesList);

        this.dataSourceCategories = new MatTableDataSource<any>(this.CategoriesList);
        this.dataSourceCategories.paginator = this.paginator1;
      }, error: (err) => {
        console.log('err', err);
      }
    })
  }

  addCategories() {
    if (this.formCategories.get('_id')?.value) {
      swal.fire({
        title: 'Cargando...',
        showCancelButton: false,
        showConfirmButton: false,
        allowOutsideClick: false,
        html: '<i class="fa fa-refresh fa-spin fa-3x fa-fw"></i>' +
          '<span class="sr-only">Loading...</span>'
      })
      this.CategoriesService.putCategories(this.formCategories.value)
        .subscribe(res => {
          swal.close();
          swal.fire('Categoria Actualizada');
          this.getCategories();
          this.formCategories.reset();
        });
    } else {

      this.CategoriesService.addCategories(this.formCategories.value)
        .subscribe(res => {
          swal.close();
          swal.fire('Categoria Guardada');
          this.getCategories();
          this.formCategories.reset();
        });
    }
  }

  editCategories(categorie: any) {
    this.formCategories.patchValue(categorie);
    const element = document.getElementById("name");
    if (element) {
      element.focus();
    }
  }

  DeleteOneCategories(_id: any) {
    swal.fire({
      title: '¿Está seguro de eliminar?',
      icon: 'warning',
      showCancelButton: true,
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger',
      },
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
      buttonsStyling: false
    }).then((result) => {
      if (result.value) {

        this.CategoriesService.deleteCategories(_id).subscribe({
          next: (data) => {
            this.getCategories();
          }, error: (err) => {
            console.log('Algo ha salido mal!', err)
          }
        });

        swal.fire(
          {
            title: 'Eliminado!',
            icon: 'success',
            customClass: {
              confirmButton: "btn btn-success",
            },
            buttonsStyling: false
          }
        )
      }
    })
  }


  getProducts() {
    this.ProductService.getProduct().subscribe({
      next: (data) => {
        this.ProductsList = data as [];
        console.log('this.ProductsList', this.ProductsList);

        this.dataSourceProducts = new MatTableDataSource<any>(this.ProductsList);
        this.dataSourceProducts.paginator = this.paginator2;
      }, error: (err) => {
        console.log('err', err);
      }
    })
  }

  addProducts() {
    if (this.formProducts.get('_id')?.value) {
      swal.fire({
        title: 'Cargando...',
        showCancelButton: false,
        showConfirmButton: false,
        allowOutsideClick: false,
        html: '<i class="fa fa-refresh fa-spin fa-3x fa-fw"></i>' +
          '<span class="sr-only">Loading...</span>'
      })
      this.ProductService.putProduct(this.formProducts.value)
        .subscribe(res => {
          swal.close();
          swal.fire('Producto Actualizado');
          this.getProducts();
          this.formProducts.reset();
        });
    } else {
      this.ProductService.addProduct(this.formProducts.value)
        .subscribe(res => {
          swal.close();
          swal.fire('Producto Guardado');
          this.getProducts();
          this.formProducts.reset();
        });
    }
  }

  editProducts(product: any) {
    this.formCategories.patchValue(product);
    const element = document.getElementById("name");
    if (element) {
      element.focus();
    }
  }

  DeleteOneProducts(_id: any) {
    swal.fire({
      title: '¿Está seguro de eliminar?',
      icon: 'warning',
      showCancelButton: true,
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger',
      },
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
      buttonsStyling: false
    }).then((result) => {
      if (result.value) {

        this.ProductService.deleteProduct(_id).subscribe({
          next: (data) => {
            this.getProducts();
          }, error: (err) => {
            console.log('Algo ha salido mal!', err)
          }
        });

        swal.fire(
          {
            title: 'Eliminado!',
            icon: 'success',
            customClass: {
              confirmButton: "btn btn-success",
            },
            buttonsStyling: false
          }
        )
      }
    })
  }


}
