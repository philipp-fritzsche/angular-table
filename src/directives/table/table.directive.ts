import { ContentChildren, Directive, HostListener, QueryList } from '@angular/core';

import { CellDirective } from '../cell/cell.directive';


@Directive({
  standalone: true,
  selector: 'table[apTable]'
})
export class TableDirective {
  @ContentChildren(CellDirective)
  public readonly cells!: QueryList<CellDirective>;

  @HostListener('keydown', ['$event'])
  public keydown(event: KeyboardEvent) {
    let tabIndex = (event.target as HTMLElement).tabIndex;

    switch (event.key) {
      case 'ArrowUp':
        tabIndex -= 100;
        break;
      case 'ArrowDown':
        tabIndex += 100;
        break;
      case 'ArrowLeft':
        tabIndex -= 1;
        break;
      case 'ArrowRight':
        tabIndex += 1;
        break;
      case 'Tab':
      default:
        return;
    }

    const cells = this.cells.toArray();
    cells.forEach((cell) => cell.reset());

    const cell = cells.find(c => c.tabIndex === tabIndex);
    if (cell) {
      cell.setFocus();
    }
  }
}
