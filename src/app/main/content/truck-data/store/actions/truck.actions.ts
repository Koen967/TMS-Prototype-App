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
  constructor(public trucks: any) {}
}

export class GetDataFailed {
  static readonly type = '[TRUCK] Get data failed';
  constructor(public error: any) {}
}

export class GetTotalRows {
  static readonly type = '[TRUCK] Get total rows';
  constructor(public filter: any) {}
}

export class UpdateTruck {
  static readonly type = '[TRUCK] Update truck';
  constructor(public truck: Truck) {}
}

export class InsertTruck {
  static readonly type = '[TRUCK] Insert truck';
  constructor(public truck: Truck) {}
}

export class DeleteTruck {
  static readonly type = '[TRUCK] Delete truck';
  constructor(public key: number) {}
}
