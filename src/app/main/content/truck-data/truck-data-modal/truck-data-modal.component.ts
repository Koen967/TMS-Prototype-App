import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'fuse-truck-data-modal',
  templateUrl: './truck-data-modal.component.html',
  styleUrls: ['./truck-data-modal.component.scss']
})
export class TruckDataModalComponent implements OnInit {
  truckForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<TruckDataModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder
  ) {
    console.log(this.data);
    this.truckForm = this.createTruckForm();
  }

  ngOnInit() {}

  createTruckForm() {
    return this.formBuilder.group({
      id: [this.data.truck.id],
      number: [this.data.truck.number],
      brand: [this.data.truck.brand],
      licencePlate: [this.data.truck.licencePlate],
      chassis: [this.data.truck.chassis],
      rental: [this.data.truck.rental]
    });
  }
}
