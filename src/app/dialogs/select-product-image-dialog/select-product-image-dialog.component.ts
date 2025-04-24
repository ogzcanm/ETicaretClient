import { Component, Inject, OnInit, Output } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FileUploadOptions } from '../../services/common/file-upload/file-upload.component';
import { ProductService } from '../../services/common/models/product.service';
import { List_Product_Image } from '../../contracts/list_product_image';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from '../../base/base.component';
import { DialogService } from '../../services/common/dialog.service';
import { DeleteDialogComponent, DeleteState } from '../delete-dialog/delete-dialog.component';

declare var $: any

@Component({
  selector: 'app-select-product-image-dialog',
  standalone: false,
  templateUrl: './select-product-image-dialog.component.html',
  styleUrl: './select-product-image-dialog.component.scss'
})
export class SelectProductImageDialogComponent extends BaseDialog<SelectProductImageDialogComponent> implements OnInit {

  @Output() options: Partial<FileUploadOptions>;

  constructor(
    dialogRef: MatDialogRef<SelectProductImageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SelectProductImageState | string,
    private productService: ProductService,
    private spinner: NgxSpinnerService,
    private dialogService: DialogService
  ) {
    super(dialogRef);

    // options'i constructor içinde güncelliyoruz
    this.options = {
      accept: ".png, .jpg, .jpeg, .gif",
      action: "upload",
      controller: "products",
      explanation: "Ürün resmini seçin veya buraya sürükleyin...",
      isAdminPage: true,
      queryString: `id=${this.getDataString()}`
    };
  }
  images: List_Product_Image[];

  async ngOnInit() {
    this.spinner.show(SpinnerType.BallAtom);
    this.images = await this.productService.readImages(this.data as string, () => this.spinner.hide(SpinnerType.BallAtom))

  }

  async deleteImage(imageId: string, event: any) {
    this.dialogService.openDialog({
      componentType: DeleteDialogComponent,
      data: DeleteState.Yes,
      afterClosed: async () => {
        this.spinner.show(SpinnerType.BallAtom);
        const card = $(event.target).closest('.product-image-card');
        card.fadeOut(900, async () => {
          await this.productService.deleteImage(this.data as string, imageId, () => {
            card.remove();
            this.spinner.hide(SpinnerType.BallAtom);
          });
        })
      }
    });
  }
  showCase(imageId: string) {
    this.spinner.show(SpinnerType.BallAtom)
    this.productService.changeShowCaseImage(imageId,this.data as string,()=>{
      this.spinner.hide(SpinnerType.BallAtom)
    })
  }

  // data'yı string'e dönüştüren bir yardımcı fonksiyon
  private getDataString(): string {
    // Enum değeri string'e dönüştürülmeli
    if (typeof this.data === 'string') {
      return this.data; // data zaten string ise direkt döndürülür
    }
    // Enum durumunda toString() kullanarak dönüşüm yapılır
    return this.data.toString();
  }
}

export enum SelectProductImageState {
  Close
}
