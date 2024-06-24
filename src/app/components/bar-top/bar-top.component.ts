import { Component, Input } from '@angular/core';
import { TuiSvgModule } from '@taiga-ui/core';

@Component({
  selector: 'app-bar-top',
  standalone: true,
  imports: [TuiSvgModule],
  templateUrl: './bar-top.component.html',
  styleUrl: './bar-top.component.css'
})
export class BarTopComponent {
  @Input() name: any;
}
