import { Component, effect, ElementRef, inject, model, ViewChild } from '@angular/core';

import { CellDirective } from '../../directives';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'input-control',
  templateUrl: './input.control.html',
  styleUrl: './input.control.scss',
  imports: [
    FormsModule
  ]
})
export class InputControl {
  public readonly _apCell = inject(CellDirective);

  public readonly value = model<string>('');

  @ViewChild('input', { static: true })
  public readonly inputElementRef!: ElementRef<HTMLInputElement>;

  public constructor() {
    effect(() => {
      if (this._apCell.editMode()) {
        this.focus();
      }
    });
  }

  public valueChange(value: string): void {
    this.value.set(value);
  }

  public focus(): void {
    const input = this.inputElementRef.nativeElement;

    input.focus();
    input.setSelectionRange(input.value.length, input.value.length);
  }

  public copy(): void {
    navigator.clipboard.writeText(this.value())
      .then(
        () => console.log('Copying to clipboard was successful!'),
        (err) => console.error('Could not copy text: ', err)
      );

    this.focus();
  }

  public clear(): void {
    this.value.set('');
    this.focus();
  }

  public save(): void {
    this.close();
  }

  public close(): void {
    this._apCell.disposeEditOverlay();
  }
}
