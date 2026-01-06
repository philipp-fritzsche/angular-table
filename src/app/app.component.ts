import { CdkFixedSizeVirtualScroll, CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { MatSort, MatSortHeader } from '@angular/material/sort';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Component, inject, OnInit, signal, ViewChild } from '@angular/core';
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
import { SplitAreaComponent, SplitComponent } from 'angular-split';

import { CellDirective, TableDirective } from '../directives';
import { InputControl } from '../controls/input/input.control';

import { ActaportTableDataSource } from './table.data-source';
import { Entity } from './entity.model';
import { Document } from './documents.model';


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

  public readonly displayedColumnsDocuments = [ 'name', 'akte', 'ordner', 'benutzer' ];
  public readonly dataSourceDocuments = new ActaportTableDataSource<Document>(this.getDocuments());

  public readonly displayedColumnsEntities = [ 'type', 'date', 'title', 'attachments', 'actions' ];
  public readonly dataSourceEntities = new ActaportTableDataSource<Entity>(this.getEntities());

  public readonly selection = new SelectionModel(true);

  public readonly toggle = signal(false);

  public readonly attachments = ['Nachricht', 'Anhang-1', 'Anhang-2', 'Anhang-3'];
  public readonly attachmentUrl = signal<SafeUrl>('');
  public readonly selectedAttachments = signal<Array<string>>([...this.attachments]);
  public readonly selectedAttachment = signal(this.attachments[0]);

  public show(attachment: string): void {
    this.selectedAttachment.set(attachment);
    this.attachmentUrl.set(this._sanitizer.bypassSecurityTrustResourceUrl(`https://philipp-fritzsche.github.io/angular-table/assets/${attachment}.pdf`));
  }

  public ngOnInit(): void {
    this.show(this.attachments[0]);
  }

  public isAllSelected(): boolean {
    return this.selection.selected.length === this.dataSourceDocuments.data.length;
  }

  public masterToggleChange(value: boolean): void {
    if (value) {
      if (this.isAllSelected()) {
        return;
      }

      this.selection.setSelection(...this.dataSourceDocuments.data.map(contact => contact.id));
      return;
    }

    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
  }

  private getDocuments(): Array<Document> {
    return [
      {
        id: 1,
        name: 'Nachricht',
        akte: '1/26',
        ordner: 'Dokumente',
        benutzer: 'Harry Potter',
      },
      {
        id: 2,
        name: 'Anhang 1',
        akte: '1/26',
        ordner: 'Dokumente',
        benutzer: 'Harry Potter',
      },
      {
        id: 3,
        name: 'Anhang 2',
        akte: '1/26',
        ordner: 'Dokumente',
        benutzer: 'Harry Potter',
      },
      {
        id: 4,
        name: 'Anhang 3',
        akte: '1/26',
        ordner: 'Dokumente',
        benutzer: 'Harry Potter',
      },
    ]
  };

  private getEntities(): Array<Entity> {
    return [
      {
        id: 1,
        type: 'Frist',
        date: '01.01.2026',
        title: 'Berufung',
        attachments: 'Anhang 1',
      },
      {
        id: 2,
        type: 'Frist',
        date: '10.01.2026',
        title: 'Klage',
        attachments: 'Anhang 1, Anhang 2',
      },
      {
        id: 3,
        type: 'Aufgabe',
        date: '13.05.2026',
        title: 'Schriftsatz prüfen',
        attachments: '',
      },
    ]
  };
}
