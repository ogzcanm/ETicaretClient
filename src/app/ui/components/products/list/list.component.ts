import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../../services/common/models/product.service';
import { List_Product } from '../../../../contracts/list_product';
import { ActivatedRoute } from '@angular/router';
import { FileService } from '../../../../services/common/models/file.service';
import { BaseUrl } from '../../../../contracts/base_url';
import { BasketService } from '../../../../services/common/models/basket.service';
import { BaseComponent, SpinnerType } from '../../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { Create_Basket_Item } from '../../../../contracts/basket/create_basket_ıtem';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../../../services/ui/custom-toastr.service';

@Component({
  selector: 'app-list',
  standalone: false,
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent extends BaseComponent implements OnInit {
  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private fileService: FileService,
    private basketService: BasketService,
    spinner: NgxSpinnerService,
    private customToastrService : CustomToastrService
  ) {
    super(spinner)
  }

  currentPageNo: number;
  totalProductCount: number;
  totalPageCount: number;
  pageSize: number = 8;
  pageList: number[] = [];
  baseUrl: BaseUrl;

  products: List_Product[];
  async ngOnInit() {
    this.baseUrl = await this.fileService.getBaseStorageUrl();
    this.activatedRoute.params.subscribe(async params => {
      this.currentPageNo = parseInt(params["pageNo"] ?? 1);
      const data: { totalProductCount: number, products: List_Product[] } | null =
        await this.productService.read(
          this.currentPageNo - 1,
          this.pageSize,
          () => { },
          errorMessage => {
            console.error("Ürün verisi alınamadı:", errorMessage);
          }
        );

      if (data && data.products) {
        this.products = data.products;

        this.products = this.products.map<List_Product>(p => {
          const listProduct: List_Product = {
            id: p.id,
            createdDate: p.createdDate,
            updatedDate: p.updatedDate,
            stock: p.stock,
            imagePath: p.productImagesFiles?.length
              ? p.productImagesFiles.find(img => img.showcase)?.path ?? ""
              : "",
            name: p.name,
            price: p.price,
            productImagesFiles: p.productImagesFiles ?? []
          };
          return listProduct;
        });
        this.totalProductCount = data.totalProductCount;
        this.totalPageCount = Math.ceil(this.totalProductCount / this.pageSize);

        this.pageList = [];

        if (this.currentPageNo - 3 <= 0) {
          for (let i = 1; i <= 7 && i <= this.totalPageCount; i++) {
            this.pageList.push(i);
          }
        } else if (this.currentPageNo + 3 >= this.totalPageCount) {
          for (let i = this.totalPageCount - 6; i <= this.totalPageCount; i++) {
            if (i > 0) this.pageList.push(i);
          }
        } else {
          for (
            let i = this.currentPageNo - 3;
            i <= this.currentPageNo + 3;
            i++
          ) {
            this.pageList.push(i);
          }
        }
      }
    });
  }
  async addToBasket(product: List_Product) {
    this.showSpinner(SpinnerType.BallAtom)
    let _basketItem: Create_Basket_Item = new Create_Basket_Item();
    _basketItem.productId = product.id;
    _basketItem.quantity = 1;
    await this.basketService.add(_basketItem)
    this.hideSpinner(SpinnerType.BallAtom)
    this.customToastrService.message("Ürün Sepete Eklendi","Sepete Eklendi",{
      messageType : ToastrMessageType.Success,
      position: ToastrPosition.TopLeft
    })
  }
}
