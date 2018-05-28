import { Truck } from 'app/main/models/truck.model';

export class GetData {
  static readonly type = '[TRUCK] Get data';
  constructor(
    public limit: number,
    public offset: number,
    public order: any,
    public filter: any
  ) {}
}

export class GetDataSuccess {
  static readonly type = '[TRUCK] Get data success';
  constructor(public readonly trucks: any) {}
}

export class GetDataFailed {
  static readonly type = '[TRUCK] Get data failed';
  constructor(public readonly error: any) {}
}

export class GetTotalRows {
  static readonly type = '[TRUCK] Get total rows';
  constructor(public readonly filter: any) {}
}

export class GetTotalRowsSuccess {
  static readonly type = '[TRUCK] Get Total Rows Success';
  constructor(public readonly rows: number) {}
}

export class UpdateTruck {
  static readonly type = '[TRUCK] Update truck';
  constructor(public readonly truck: Truck) {}
}

export class UpdateTuckSuccess {
  static readonly type = '[TRUCK] Update Tuck Success';
  constructor(public readonly truck: Truck) {}
}

export class InsertTruck {
  static readonly type = '[TRUCK] Insert truck';
  constructor(public readonly truck: Truck) {}
}

export class InsertTruckSuccess {
  static readonly type = '[TRUCK] Insert Truck Success';
  constructor(public readonly truck: Truck) {}
}

export class DeleteTruck {
  static readonly type = '[TRUCK] Delete truck';
  constructor(public readonly key: number) {}
}

export class DeleteTruckSuccess {
  static readonly type = '[TRUCK] Delete Truck Success';
  constructor(public readonly key: number) {}
}

export class ActionFailed {
  static readonly type = '[TRUCK] ActionFailed';
  constructor(public readonly error: any) {}
}
