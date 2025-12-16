import { CdkFixedSizeVirtualScroll, CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { MatSort, MatSortHeader } from '@angular/material/sort';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Component, inject, OnInit, SecurityContext, signal, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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

import { CellDirective, TableDirective } from '../directives';
import { InputControl } from '../controls/input/input.control';

import { ActaportTableDataSource } from './table.data-source';
import { Contact } from './contact.model';
import { SplitAreaComponent, SplitComponent } from 'angular-split';


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
    FormsModule,
    SplitComponent,
    SplitAreaComponent,
  ],
})
export class AppComponent implements OnInit {
  private readonly _sanitizer = inject(DomSanitizer);

  @ViewChild(CdkVirtualScrollViewport, { static: true })
  public readonly viewport!: CdkVirtualScrollViewport;

  public readonly displayedColumns = [ 'selection', 'firstname', 'lastname', 'birthdate', 'city', 'actions' ];
  public readonly dataSource = new ActaportTableDataSource<Contact>(this.getContacts());
  public readonly selection = new SelectionModel(true);

  public readonly toggle = signal(false);

  public readonly attachments = ['Nachricht', 'Anhang-1', 'Anhang-2', 'Anhang-3'];
  public readonly attachmentUrl = signal<SafeUrl>('');
  public readonly selectedAttachments = signal<Array<string>>([...this.attachments]);
  public readonly selectedAttachment = signal(this.attachments[0]);

  public show(attachment: string): void {
    this.selectedAttachment.set(attachment);
    //this.attachmentUrl.set(this._sanitizer.bypassSecurityTrustResourceUrl(`http://localhost:4200/assets/${attachment}.pdf`));
    this.attachmentUrl.set(this._sanitizer.bypassSecurityTrustResourceUrl(`https://philipp-fritzsche.github.io/angular-table/assets/${attachment}.pdf`));
  }

  public ngOnInit(): void {
    this.dataSource.data = this.getContacts();
    this.show(this.attachments[0]);
  }

  public isAllSelected(): boolean {
    return this.selection.selected.length === this.dataSource.data.length;
  }

  public masterToggleChange(value: boolean): void {
    if (value) {
      if (this.isAllSelected()) {
        return;
      }

      this.selection.setSelection(...this.dataSource.data.map(contact => contact.id));
      return;
    }

    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
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
      }
    ]
  };
}
