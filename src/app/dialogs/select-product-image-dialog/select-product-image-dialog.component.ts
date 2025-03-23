import { Component, Inject, Output } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FileUploadOptions } from '../../services/common/file-upload/file-upload.component';

@Component({
  selector: 'app-select-product-image-dialog',
  standalone: false,
  templateUrl: './select-product-image-dialog.component.html',
  styleUrl: './select-product-image-dialog.component.scss'
})
export class SelectProductImageDialogComponent extends BaseDialog<SelectProductImageDialogComponent> {
  
  @Output() options: Partial<FileUploadOptions>;

  constructor(
    dialogRef: MatDialogRef<SelectProductImageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SelectProductImageState | string,
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
