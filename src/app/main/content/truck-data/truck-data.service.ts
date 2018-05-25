import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Filter } from '../../models/filter.model';
import { Truck } from '../../models/truck.model';
import { catchError } from 'rxjs/operators';

@Injectable()
export class TruckDataService {
  private url = 'http://localhost:62665/api/';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  constructor(private http: HttpClient) {}

  getTrucks(): Observable<any> {
    return this.http.get<any>(this.url + 'trucks/GetValues');
  }

  getTrucksWithParams(
    limit: number,
    offset: number,
    sorting: any,
    filter: any
  ): Observable<any> {
    return this.http.get<any>(
      this.url +
        'trucks/TableValues?limit=' +
        limit +
        '&offset=' +
        offset +
        '&order=' +
        sorting +
        '&filter=' +
        filter
    );
  }

  getRowCount(filter: Filter) {
    return this.http.get<number>(this.url + 'trucks/RowCount?filter=' + filter);
  }

  updateTruck(truck: Truck) {
    return this.http.put<Truck>(
      this.url + 'trucks/UpdateTruck/' + truck.id,
      truck
    );
  }

  insertTruck(truck: Truck) {
    return this.http.post<Truck>(this.url + 'trucks/InsertTruck', truck);
  }

  deleteTruck(key: number) {
    return this.http.delete<any>(this.url + 'trucks/DeleteTruck/' + key);
  }
}
