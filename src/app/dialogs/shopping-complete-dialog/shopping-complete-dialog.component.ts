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
export class ShoppingCompleteDialogComponent extends BaseDialog<ShoppingCompleteDialogComponent> implements OnDestroy{
  constructor(
    dialogRef: MatDialogRef<ShoppingCompleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ShoppingCompleteState,

  ) {
    super(dialogRef);
  }
  show: boolean = false;
  complete() {
    this.show = true;
  }

  ngOnDestroy(): void {
    if (!this.show)
      $("#basketModal").modal("show");
  }
}

export enum ShoppingCompleteState {
  Yes,
  No
}