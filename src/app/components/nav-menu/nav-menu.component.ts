import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TuiSvgModule } from '@taiga-ui/core';
import { TuiIconModule } from '@taiga-ui/experimental';

@Component({
  selector: 'app-nav-menu',
  standalone: true,
  imports: [HttpClientModule, RouterLink, TuiIconModule, TuiSvgModule, RouterLinkActive],
  templateUrl: './nav-menu.component.html',
  styleUrl: './nav-menu.component.css'
})
export class NavMenuComponent {

}
