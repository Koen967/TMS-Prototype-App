import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'fuse-error-dialog',
  templateUrl: './error-dialog.component.html',
  styleUrls: ['./error-dialog.component.scss']
})
export class ErrorDialogComponent implements OnInit {
  error: any;
  dialogTitle: string;
  errorCode: number;
  errorDescription: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: HttpErrorResponse,
    public dialogRef: MatDialogRef<ErrorDialogComponent>
  ) {
    this.dialogTitle = this.data.name;
    this.errorCode = this.data.status;
    this.errorDescription = this.data.message;
  }

  ngOnInit() {}
}
