import {
  contentChild,
  Directive,
  effect,
  ElementRef,
  HostListener,
  inject,
  input,
  OnInit,
  signal,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';

import { TableDirective } from '../table/table.directive';

@Directive({
  standalone: true,
  selector: 'table td[apCell]',
  exportAs: 'apCell',
  host: {
    '[class.focus]': 'hasFocus()',
  }
})
export class CellDirective implements OnInit {
  public readonly _elementRef = inject(ElementRef);
  public readonly _tableDirective = inject(TableDirective);
  private readonly _overlay = inject(Overlay);
  private readonly _viewContainerRef = inject(ViewContainerRef);

  public readonly portalTemplate = contentChild<TemplateRef<any>>('portalTemplate', { read: TemplateRef<any> as any });

  public readonly apCell = input({ row: 0, col: 0 });

  public readonly editMode = signal(false);
  public readonly hasFocus = signal(false);

  @HostListener('click')
  public click(): void {
    if (this.hasFocus()) {
      return;
    }

    this._tableDirective.cells.forEach((cell) => cell.reset());
    this.setFocus();
  }

  @HostListener('dblclick')
  public doubleclick(): void {
    this.editMode.set(true);
  }

  @HostListener('keydown', ['$event'])
  public keydown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'Escape':
        this.editMode.set(false);
        break;
      case 'Enter':
        this.editMode.set(true);
        break;
    }
  }

  public constructor() {
    effect(() => {
      if (this.editMode()) {
        this.showEditOverlay();
      } else {
        this.disposeEditOverlay();
      }
    });
  }

  public ngOnInit(): void {
    const element = this._elementRef.nativeElement as HTMLTableCellElement;
    element.tabIndex = 100 * (this.apCell().row + 1) + this.apCell().col;
  }

  public reset(): void {
    this.editMode.set(false);
    this.hasFocus.set(false);
  }

  public get tabIndex(): number {
    return this._elementRef.nativeElement.tabIndex;
  }

  public setFocus(): void {
    this.hasFocus.set(true);
    this._elementRef.nativeElement.focus();
  }

  private overlayRef?: OverlayRef;

  public showEditOverlay(): void {
    const template = this.portalTemplate();
    if (!template) {
      return;
    }

    const positionStrategy = this._overlay.position()
      .flexibleConnectedTo(this._elementRef)
      .withPositions([{
        originX: 'start', originY: 'top',
        overlayX: 'start', overlayY: 'top',
      }]);

    this.overlayRef = this._overlay.create({
      positionStrategy,
      width: this._elementRef.nativeElement.clientWidth,
      hasBackdrop: true,
      panelClass: 'edit-overlay-container',
      backdropClass: 'backdrop-container',
    });

    const portal = new TemplatePortal(template, this._viewContainerRef);

    this.overlayRef.attach(portal);

    this.overlayRef.backdropClick().subscribe(() => this.overlayRef?.dispose());
  }

  public disposeEditOverlay(): void {
    this.overlayRef?.dispose();
  }
}
