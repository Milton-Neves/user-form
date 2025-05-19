import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-button-default',
  standalone: true,
  imports: [RouterModule],
  template: `
    <button [routerLink]="routerLink" class="btn">
      <ng-content></ng-content>
    </button>
  `,
  styles: [`
    .btn {
      display: flex;
      background-color: #007bff;
      color: white;
      border: none;
      padding: 0.625rem 1rem;
      border-radius: 0.375rem;
      cursor: pointer;
      font-size: 1rem;
      transition: background-color 0.3s ease;
    }

    .btn:hover {
      background-color: #0056b3;
    }
  `]
})
export class ButtonDefaultComponent {
  @Input() routerLink!: string | any[];
}
