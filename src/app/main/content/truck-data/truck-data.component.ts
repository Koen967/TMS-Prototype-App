import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild
} from '@angular/core';
import { Observable } from 'rxjs/Observable';

import DataSource from 'devextreme/data/data_source';
import CustomStore from 'devextreme/data/custom_store';
import { DxDataGridComponent } from 'devextreme-angular/ui/data-grid';

import { Store, Select } from '@ngxs/store';
import { TruckState } from './store/states/truck.state';
import * as TruckActions from './store/actions/truck.actions';
import * as AuthenticationActions from '../pages/authentication/store/actions/authentication.actions';

import { MatDialog } from '@angular/material';

import { Truck } from '../../models/truck.model';
import { TruckDataService } from './truck-data.service';
import { TruckDataModalComponent } from './truck-data-modal/truck-data-modal.component';
import { Router } from '@angular/router';

import { JwtHelperService } from '@auth0/angular-jwt';

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
  columns: string[];
  dialogRef;

  constructor(
    private service: TruckDataService,
    private store: Store,
    public dialog: MatDialog,
    private router: Router,
    private jwt: JwtHelperService
  ) {
    console.log('Router', this.router.config);
    const self = this;
    let dispatchSubscription;
    let updateSubscription;
    let insertSubscription;
    let removeSubscription;

    this.customStore = new CustomStore({
      // Order into filter ignores onclick filters
      load(loadOptions: any) {
        console.log(loadOptions);
        // Filter
        let filter: string;
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
        } else {
          filter = '';
        }

        // Sorting
        let order: string;
        if (loadOptions.sort) {
          order = loadOptions.sort[0].selector;
          if (loadOptions.sort[0].desc === true) {
            order = loadOptions.sort[0].selector + ' DESC';
          }
        } else {
          order = '';
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
            .subscribe(result => {
              const truckArray = Object.keys(result.truck.trucks).map(
                id => result.truck.trucks[id]
              );
              if (order) {
                const sortedTruckArray = truckArray.sort(
                  self.dynamicSort(order)
                );
                return res({
                  data: sortedTruckArray,
                  totalCount: result.truck.total
                });
              } else {
                return res({
                  data: truckArray,
                  totalCount: result.truck.total
                });
              }
            });
        });
      },
      update(key, values) {
        return new Promise((res, rej) => {
          updateSubscription = self.store
            .dispatch(new TruckActions.UpdateTruck(values))
            .subscribe(result => {
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
              return res();
            });
        });
      },
      onLoaded() {
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
    const header =
      'eyJhbGciOiJSUzI1NiIsImtpZCI6ImIwZjIxOGI0NjJmZDFiMjNiNDlkZDRmNDk5ZDk1NTljIiwidHlwIjoiSldUIn0';
    const payload =
      'eyJuYmYiOjE1MzAyNTcwOTcsImV4cCI6MTUzMDI2MDY5NywiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo1MDAwIiwiYXVkIjpbImh0dHA6Ly9sb2NhbGhvc3Q6NTAwMC9yZXNvdXJjZXMiLCJhcGkxIl0sImNsaWVudF9pZCI6Im12Y3Rlc3RjbGllbnQiLCJzdWIiOiI5MDdlZWM1My05OTFmLTQwN2UtOGJhMS1jY2FlZjBiZTZlNWQiLCJhdXRoX3RpbWUiOjE1MzAyNTcwMTksImlkcCI6ImxvY2FsIiwic2NvcGUiOlsib3BlbmlkIiwicHJvZmlsZSIsImVtYWlsIiwiYXBpMSJdLCJhbXIiOlsicHdkIl19';
    const signature =
      'UzNZA1zHYzbrX4UI-CDLFYCty1Z2PQ9AwYOerO_xizWYB30BGeo33slfJrZrVLXMKMqQKld18vGNYY-u5pE_9ssVXTJaPZ7C8bEqoYClwcpu86jR8FprdrFXRwfhVcHfStALURQieLVG2e13sCzIv3lsDn9YBIGhBDnJLXq2fYOFQZMxYyol3PNiPZBkYK3d0Y6V1IwkV3NJEcrSfojWnFcH5nmkxlY5GJ1olPEaZxpAybjWYBooATLrkQWT-2EbT8ThSxfAU1L1cTo6q-v4mzDtiJxXnoJOlSxIU6TRPi2uozLN37Z2hmU93u8WCRzA3tr8K3Yi1hTU0Jb5itZRWg';
    const token = `${header}.${payload}.${signature}`;
    this.store.dispatch(new AuthenticationActions.Token('THIS IS THE TOKEN'));
    localStorage.setItem('authentication.trial', 'THIS IS THE TRIAL');
    console.log('Storage', localStorage.getItem('authentication.token'));
    this.columns = ['number', 'brand', 'licencePlate', 'chassis', 'rental'];
    console.log(this.jwt.decodeToken(token));
  }

  rowClickEvent(data) {
    this.dialogRef = this.dialog.open(TruckDataModalComponent, {
      data: {
        truck: data.data
      }
    });

    this.dialogRef.afterClosed().subscribe(response => {
      if (!response) {
        return;
      }
      this.customStore.update(response.value.id, response.value);
    });
  }

  dynamicSort(property: string) {
    let sortOrder = 1;
    if (property.includes(' DESC')) {
      sortOrder = -1;
      property = property.split(' ')[0];
    }
    return function(a, b) {
      const result =
        a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
      return result * sortOrder;
    };
  }
}
