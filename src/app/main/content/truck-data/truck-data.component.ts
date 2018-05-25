import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild
} from '@angular/core';

import DataSource from 'devextreme/data/data_source';
import CustomStore from 'devextreme/data/custom_store';
import ArrayStore from 'devextreme/data/array_store';

import { Store, Select } from '@ngxs/store';
import { TruckState } from './store/states/truck.state';
import * as TruckActions from './store/actions/truck.actions';

import { reject, resolve } from 'q';

import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';

import { MatDialog } from '@angular/material';
import { TruckDataModalComponent } from './truck-data-modal/truck-data-modal.component';

import { TruckDataService } from './truck-data.service';
import { Truck } from '../../models/truck.model';
import { $, promise } from 'protractor';
import { DxDataGridComponent } from 'devextreme-angular/ui/data-grid';

@Component({
  selector: 'fuse-truck-data',
  templateUrl: './truck-data.component.html',
  styleUrls: ['./truck-data.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TruckDataComponent implements OnInit {
  @ViewChild('truckGrid') public dataGrid: DxDataGridComponent;

  @Select(TruckState.trucksArray) trucks$: Observable<Truck[]>;

  dataSource = {};
  customStore;
  columns;
  dialogRef;
  totalTrucks;

  constructor(
    private service: TruckDataService,
    private store: Store,
    public dialog: MatDialog
  ) {
    const self = this;
    let dispatchSubscription;
    let selectSubscription;
    let updateSubscription;
    let insertSubscription;
    let removeSubscription;

    this.customStore = new CustomStore({
      // Order into filter ignores onclick filters
      load(loadOptions: any) {
        console.log(loadOptions);
        // Filter
        let filter = '';
        if (loadOptions.filter) {
          if (loadOptions.filter[0] instanceof Array) {
            filter = '';
            loadOptions.filter.forEach(filterOption => {
              if (filterOption instanceof Array) {
                filter += `${filterOption[0]}+${filterOption[1]}+${
                  filterOption[2]
                },`;
              }
            });
            filter = filter.slice(0, filter.length - 1);
          } else {
            filter = `${loadOptions.filter[0]}+${loadOptions.filter[1]}+${
              loadOptions.filter[2]
            }`;
          }
        }

        // Sorting
        let order = null;
        if (loadOptions.sort) {
          order = loadOptions.sort[0].selector;
          if (loadOptions.sort[0].desc === true) {
            order = loadOptions.sort[0].selector + ' DESC';
          }
        } else {
          order = null;
        }

        return new Promise((res, rej) => {
          self.store.dispatch(new TruckActions.GetTotalRows(filter));
          dispatchSubscription = self.store
            .dispatch(
              new TruckActions.GetData(
                loadOptions.take,
                loadOptions.skip,
                order,
                filter
              )
            )
            .subscribe(() => {
              selectSubscription = self.store
                .select(TruckState.gridData)
                .subscribe(response => {
                  console.log(response);
                  return res({
                    data: response.data,
                    totalCount: response.totalCount
                  });
                });
            });
        });
      },
      update(key, values) {
        return new Promise((res, rej) => {
          updateSubscription = self.store
            .dispatch(new TruckActions.UpdateTruck(values))
            .subscribe(result => {
              console.log('UPDATE', result);
              return res({
                key: key,
                result: result
              });
            });
        });
      },
      insert(values) {
        return new Promise((res, rej) => {
          insertSubscription = self.store
            .dispatch(new TruckActions.InsertTruck(values))
            .subscribe(result => {
              console.log('INSERT', values);
              return res({
                value: values
              });
            });
        });
      },
      remove(key) {
        return new Promise((res, rej) => {
          removeSubscription = self.store
            .dispatch(new TruckActions.DeleteTruck(key.id))
            .subscribe(result => {
              console.log('REMOVE', key);
              return res();
            });
        });
      },
      onLoaded() {
        selectSubscription.unsubscribe();
        dispatchSubscription.unsubscribe();
      },
      onUpdated() {
        updateSubscription.unsubscribe();
        self.dataGrid.instance.refresh();
      },
      onRemoved() {
        removeSubscription.unsubscribe();
      },
      onInserted() {
        insertSubscription.unsubscribe();
        self.dataGrid.instance.refresh();
      }
    });
    this.dataSource = new DataSource(this.customStore);
  }

  ngOnInit() {
    this.columns = ['number', 'brand', 'licencePlate', 'chassis', 'rental'];
  }

  loadData(params: any) {
    this.trucks$ = this.service.getTrucks();
  }

  rowClickEvent(data) {
    console.log('Click', data);
    this.dialogRef = this.dialog.open(TruckDataModalComponent, {
      data: {
        truck: data.data
      }
    });

    this.dialogRef.afterClosed().subscribe(response => {
      console.log('TEST');
      if (!response) {
        return;
      }
      this.customStore.update(response.value.id, response.value);
    });
  }

  updateTruck(value) {
    this.store.dispatch(new TruckActions.UpdateTruck(value.value));
    console.log('Update', value);
  }
}
