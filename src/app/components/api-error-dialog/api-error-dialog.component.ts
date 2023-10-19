import { Component } from '@angular/core';
import { DialogService, DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-api-error-dialog',
  templateUrl: './api-error-dialog.component.html',
  styleUrls: ['./api-error-dialog.component.scss']
})
export class ApiErrorDialogComponent {
  messages: Array<any>;

  constructor(private dialogConfig: DynamicDialogConfig) {
    this.messages = this.dialogConfig.data;
  }
}
