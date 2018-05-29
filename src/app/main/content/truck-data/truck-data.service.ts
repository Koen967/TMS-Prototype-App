import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Filter } from '../../models/filter.model';
import { Truck } from '../../models/truck.model';

@Injectable()
export class TruckDataService {
  private url = 'http://localhost:62665/api/';
  constructor(private http: HttpClient) {}

  getTrucksWithParams(
    limit: number,
    offset: number,
    sorting: string,
    filter: Filter
  ): Observable<Truck[]> {
    return this.http.get<Truck[]>(
      `${
        this.url
      }trucks/tableValues?limit=${limit}&offset=${offset}&order=${sorting}&filter=${filter}`
    );
  }

  getRowCount(filter: Filter): Observable<number> {
    return this.http.get<number>(`${this.url}trucks/RowCount?filter=${filter}`);
  }

  updateTruck(truck: Truck): Observable<Truck> {
    return this.http.put<Truck>(
      `${this.url}trucks/UpdateTruck/${truck.id}`,
      truck
    );
  }

  insertTruck(truck: Truck): Observable<Truck> {
    return this.http.post<Truck>(`${this.url}trucks/InsertTruck`, truck);
  }

  deleteTruck(key: number): Observable<Truck> {
    return this.http.delete<Truck>(`${this.url}trucks/DeleteTruck/${key}`);
  }
}
