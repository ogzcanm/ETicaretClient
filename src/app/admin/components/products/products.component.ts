import { Component, OnInit } from '@angular/core';
import { BaseComponent, SpinnerType } from '../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpClientService } from '../../../services/common/http-client.service';
import { stopCoverage } from 'v8';
import { Product } from '../../../contracts/product';

@Component({
  selector: 'app-products',
  standalone: false,
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent extends BaseComponent implements OnInit {
  constructor(spinner :NgxSpinnerService, private httpClientService: HttpClientService){
    super(spinner)
  }
  ngOnInit(): void {
    this.showSpinner(SpinnerType.BallAtom)
    this.httpClientService.get<Product[]>({
      controller : "products"
    }).subscribe(data=>console.log(data));

    // this.httpClientService.post({
    //   controller:"products"
    // },{
    //   name:"KAlem",
    //   stock:100,
    //   price:15
    // }).subscribe();

    // this.httpClientService.put({
    //   controller:"products",
    // },{
    //   id:"0195693d-261d-7b93-800c-26dff60965c2",
    //   name:"Defter2",
    //   stock:30,
    //   price:2522
    // }).subscribe();

    // this.httpClientService.delete({
    //   controller:"products"
    // },"0195693d-261d-7b93-800c-26dff60965c2").subscribe();

    //  this.httpClientService.get({
    //    fullEndPoint:"https://jsonplaceholder.typicode.com/posts"
    //  }).subscribe(data=>console.log(data));
  }
}
