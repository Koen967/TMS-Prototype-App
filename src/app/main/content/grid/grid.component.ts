import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

import { DxDataGridModule } from 'devextreme-angular';
import CustomStore from 'devextreme/data/custom_store';
import DataSource from 'devextreme/data/data_source';
import ArrayStore from 'devextreme/data/array_store';
import { of } from 'rxjs/internal/observable/of';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'fuse-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {
  dataSource: any = {};

  @Input() columns: String[];
  @Input() data: Object[];

  @Output() gridLoadData = new EventEmitter<Object>();

  constructor() {
    this.dataSource = new ArrayStore({
      data: this.data,
      key: 'id'
    });

    /* this.dataSource.store = new CustomStore({
      load: function(loadOptions: any) {
        const paging = null;
        const sorting = null;
        const filters = null;

        this.loadData(paging, sorting, filters);

        return of(this.data);
      }
    }); */
  }

  ngOnInit() {
    console.log('Grid', this.data);
  }

  loadData(paging, sorting, filters) {
    this.gridLoadData.emit({ paging, sorting, filters });
  }
}
