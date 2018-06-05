import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'fuse-truck-data-modal',
  templateUrl: './truck-data-modal.component.html',
  styleUrls: ['./truck-data-modal.component.scss']
})
export class TruckDataModalComponent {
  truckForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<TruckDataModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder
  ) {
    this.truckForm = this.createTruckForm();
  }

  createTruckForm() {
    return this.formBuilder.group({
      id: [this.data.truck.id, Validators.required],
      number: [this.data.truck.number, Validators.required],
      brand: [this.data.truck.brand, Validators.required],
      licencePlate: [this.data.truck.licencePlate, Validators.required],
      chassis: [this.data.truck.chassis, Validators.required],
      rental: [this.data.truck.rental]
    });
  }
}
