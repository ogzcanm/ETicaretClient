import { Component, ViewChild } from '@angular/core';
import { BaseComponent, SpinnerType } from '../../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProductService } from '../../../../services/common/models/product.service';
import { AlertifyService, MessageType, Position } from '../../../../services/admin/alertify.service';
import { DialogService } from '../../../../services/common/dialog.service';
import { List_Product } from '../../../../contracts/list_product';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SelectProductImageDialogComponent } from '../../../../dialogs/select-product-image-dialog/select-product-image-dialog.component';
import { List_Order } from '../../../../contracts/order/list_order';
import { OrderService } from '../../../../services/common/models/order.service';
import { OrderDetailDialogComponent, OrderDetailDialogState } from '../../../../dialogs/order-detail-dialog/order-detail-dialog.component';

@Component({
  selector: 'app-list',
  standalone: false,
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent extends BaseComponent{
  constructor(spinner : NgxSpinnerService,
      private alertifyService:AlertifyService,
      private orderService : OrderService,
      private dialogService : DialogService
    ){
      super(spinner)
    }
  
    displayedColumns: string[] = ['orderCode','userName','totalPrice','createdDate','viewdetail','delete'];
    dataSource : MatTableDataSource<List_Order> = null;
    @ViewChild(MatPaginator) paginator: MatPaginator;
  
    async getOrders(){
      this.showSpinner(SpinnerType.BallAtom)
      const allOrders :{totalOrderCount:number,orders:List_Order[]} = await this.orderService.getAllOrders(this.paginator? this.paginator.pageIndex: 0,this.paginator? this.paginator.pageSize:5, 
        ()=>this.hideSpinner(SpinnerType.BallAtom),errorMessage=>
        this.alertifyService.message(errorMessage,{
        dismissOthers:true,
        messageType:MessageType.Error,
        position:Position.TopRight
      }));
      this.dataSource = new MatTableDataSource<List_Order>(allOrders.orders);
      this.paginator.length=allOrders.totalOrderCount;
    }
  
    async pageChanged(){
      await this.getOrders();
    }
  
    async ngOnInit(){
      await this.getOrders();
    }
    showDetail(id:string){
      this.dialogService.openDialog({
        componentType : OrderDetailDialogComponent,
        data : id,
        options:{
          width : "750px"
        }
      })
    }
}
