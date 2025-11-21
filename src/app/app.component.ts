import { CdkFixedSizeVirtualScroll, CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { MatSort, MatSortHeader } from '@angular/material/sort';
import { Component, OnInit, signal, ViewChild } from '@angular/core';
import { CdkPortal } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
} from '@angular/material/table';
import { tap } from 'rxjs';

import { CellDirective, TableDirective } from '../directives';
import { InputControl } from '../controls/input/input.control';

import { ActaportTableDataSource } from './table.data-source';
import { Contact } from './contact.model';


@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [
    CellDirective,
    CommonModule,
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatCell,
    MatCellDef,
    MatHeaderRow,
    MatRow,
    MatHeaderRowDef,
    MatRowDef,
    TableDirective,
    MatSortHeader,
    MatSort,
    CdkVirtualScrollViewport,
    CdkFixedSizeVirtualScroll,
    InputControl,
  ],
})
export class AppComponent implements OnInit {
  @ViewChild(CdkVirtualScrollViewport, { static: true })
  public readonly viewport!: CdkVirtualScrollViewport;

  public readonly displayedColumns = [ 'selection', 'firstname', 'lastname', 'birthdate', 'city', 'street', 'country', 'actions' ];
  public readonly dataSource = new ActaportTableDataSource<Contact>(this.getContacts());

  private readonly contacts = signal<Array<Contact>>([]);

  public ngOnInit(): void {
    this.viewport.scrolledIndexChange
      .pipe(
        tap(index => {
          if (index > 4) {
            this.contacts.set([...this.dataSource.data, ...this.getContacts()]);

            this.dataSource.data = this.contacts();
          }
        }),
      )
      .subscribe();
  }

  private getContacts(): Array<Contact> {
    return [
      {
        id: 1,
        firstname: 'Homer',
        lastname: 'Simpson',
        birthdate: '1982-01-30',
        city: 'Springfield',
        street: '742 Evergreen Terrace',
        country: 'USA',
      },
      {
        id: 2,
        firstname: 'Marge',
        lastname: 'Simpson',
        birthdate: '1985-04-11',
        city: 'Springfield',
        street: '742 Evergreen Terrace',
        country: 'USA',
      },
      {
        id: 3,
        firstname: 'Bart',
        lastname: 'Simpson',
        birthdate: '2000-12-03',
        city: 'Springfield',
        street: '742 Evergreen Terrace',
        country: 'USA',
      },
      {
        id: 4,
        firstname: 'Lisa',
        lastname: 'Simpson',
        birthdate: '2003-01-28',
        city: 'Springfield',
        street: '742 Evergreen Terrace',
        country: 'USA',
      },
      {
        id: 5,
        firstname: 'Ned',
        lastname: 'Flanders',
        birthdate: '1979-08-28',
        city: 'Springfield',
        street: '743 Evergreen Terrace',
        country: 'USA',
      },
      {
        id: 6,
        firstname: 'Toad',
        lastname: 'Flanders',
        birthdate: '2002-07-17',
        city: 'Springfield',
        street: '743 Evergreen Terrace',
        country: 'USA',
      },
      {
        id: 7,
        firstname: 'Carl',
        lastname: 'Carlson',
        birthdate: '2002-07-17',
        city: 'Springfield',
        street: '45 Carl & Lenny Street',
        country: 'USA',
      },
      {
        id: 8,
        firstname: 'Chief',
        lastname: 'Wiggum',
        birthdate: '1983-08-17',
        city: 'Springfield',
        street: '342 Police Department',
        country: 'USA',
      },
      {
        id: 9,
        firstname: 'Fat',
        lastname: 'Toni',
        birthdate: '1974-03-14',
        city: 'Springfield',
        street: '123 Mafia Street',
        country: 'USA',
      },
      {
        id: 10,
        firstname: 'Nelson',
        lastname: 'Muntz',
        birthdate: '1998-11-02',
        city: 'Springfield',
        street: '23 Motel One Street',
        country: 'USA',
      },
      {
        id: 11,
        firstname: 'Milhouse',
        lastname: 'van Houten',
        birthdate: '2004-01-03',
        city: 'Springfield',
        street: '23 Milhouse Way',
        country: 'USA',
      },
      {
        id: 12,
        firstname: 'Homer',
        lastname: 'Simpson',
        birthdate: '1982-01-30',
        city: 'Springfield',
        street: '742 Evergreen Terrace',
        country: 'USA',
      },
      {
        id: 13,
        firstname: 'Marge',
        lastname: 'Simpson',
        birthdate: '1985-04-11',
        city: 'Springfield',
        street: '742 Evergreen Terrace',
        country: 'USA',
      },
      {
        id: 14,
        firstname: 'Bart',
        lastname: 'Simpson',
        birthdate: '2000-12-03',
        city: 'Springfield',
        street: '742 Evergreen Terrace',
        country: 'USA',
      },
      {
        id: 15,
        firstname: 'Lisa',
        lastname: 'Simpson',
        birthdate: '2003-01-28',
        city: 'Springfield',
        street: '742 Evergreen Terrace',
        country: 'USA',
      },
      {
        id: 16,
        firstname: 'Ned',
        lastname: 'Flanders',
        birthdate: '1979-08-28',
        city: 'Springfield',
        street: '743 Evergreen Terrace',
        country: 'USA',
      },
      {
        id: 17,
        firstname: 'Toad',
        lastname: 'Flanders',
        birthdate: '2002-07-17',
        city: 'Springfield',
        street: '743 Evergreen Terrace',
        country: 'USA',
      },
      {
        id: 18,
        firstname: 'Carl',
        lastname: 'Carlson',
        birthdate: '2002-07-17',
        city: 'Springfield',
        street: '45 Carl & Lenny Street',
        country: 'USA',
      },
      {
        id: 19,
        firstname: 'Chief',
        lastname: 'Wiggum',
        birthdate: '1983-08-17',
        city: 'Springfield',
        street: '342 Police Department',
        country: 'USA',
      },
      {
        id: 20,
        firstname: 'Fat',
        lastname: 'Toni',
        birthdate: '1974-03-14',
        city: 'Springfield',
        street: '123 Mafia Street',
        country: 'USA',
      },
      {
        id: 21,
        firstname: 'Nelson',
        lastname: 'Muntz Muntz Muntz Muntz Muntz Muntz Muntz Muntz Muntz',
        birthdate: '1998-11-02',
        city: 'Springfield',
        street: '23 Motel One Street',
        country: 'USA',
      },
      {
        id: 22,
        firstname: 'Milhouse',
        lastname: 'van Houten',
        birthdate: '2004-01-03',
        city: 'Springfield',
        street: '23 Milhouse Way',
        country: 'USA',
      },
    ]
  };
}
