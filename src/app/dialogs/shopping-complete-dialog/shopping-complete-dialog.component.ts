import { Component, Inject, OnDestroy } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

declare var $: any;

@Component({
  selector: 'app-shopping-complete-dialog',
  standalone: false,
  templateUrl: './shopping-complete-dialog.component.html',
  styleUrl: './shopping-complete-dialog.component.scss'
})
export class ShoppingCompleteDialogComponent extends BaseDialog<ShoppingCompleteDialogComponent> {
  constructor(
    dialogRef: MatDialogRef<ShoppingCompleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ShoppingCompleteState,

  ) {
    super(dialogRef);
  }

}

export enum ShoppingCompleteState {
  Yes,
  No
}