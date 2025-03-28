import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { NavbarComponent } from "../navbar/navbar.component";
@Component({
  selector: 'app-details',
  standalone: true,
  imports: [MatTableModule,
    MatPaginatorModule,
    MatSortModule, NavbarComponent],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent {
  displayedColumns: string[] = ['name', 'email', 'phone', 'address1', 'state', 'postalCode', 'country'];
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    this.loadData();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadData() {
    const storedData = localStorage.getItem('obj');
    if (storedData) {
      this.dataSource.data = [JSON.parse(storedData)];
    }
  }
}
