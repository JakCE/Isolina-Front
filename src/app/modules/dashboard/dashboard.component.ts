import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { LayoutDashComponent } from '../../components/layout-dash/layout-dash.component';
import { BarTopComponent } from '../../components/bar-top/bar-top.component';
import { NavMenuComponent } from '../../components/nav-menu/nav-menu.component';
import { TuiAlertService, TuiButtonModule, TuiHintModule, TuiModeModule, TuiNotificationModule, TuiSvgModule } from '@taiga-ui/core';
import { TuiRootModule, TuiDialogModule, TuiHostedDropdownModule, TuiDataListModule, TuiExpandModule } from '@taiga-ui/core';
import { TuiInputModule, TuiTabsModule, TuiInputPasswordModule, TuiInputNumberModule, TuiInputPhoneInternationalModule } from '@taiga-ui/kit';
import { TuiBadgeModule, TuiAvatarModule } from '@taiga-ui/kit';
import { TuiCountryIsoCode } from '@taiga-ui/i18n';
import { TuiIconModule, TuiNavigationModule, TuiBadgeNotificationModule, TuiFadeModule } from '@taiga-ui/experimental';
import { ApiService } from '../../services/api/api.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [BarTopComponent, NavMenuComponent, HttpClientModule, RouterOutlet, LayoutDashComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
  registerForm!: FormGroup;
  expanded: boolean=true;
  submenu: boolean=true;
  open: boolean=true;
  userData: any;
  nameUser: string='';

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    public router: Router,
    private alerts: TuiAlertService
  ) {}

  ngOnInit() {
    /*this.registerForm = this.formBuilder.group({
      dniControl: [null,Validators.required],
      nameControl: ['',Validators.required],
      apeControl: ['',Validators.required],
      emailControl: ['',Validators.required],
      telefonoControl: ['',Validators.required],
      direccionControl: ['',Validators.required],
      passControl: ['',Validators.required],
    });*/
    this.apiService.getUser(localStorage.getItem('idUser')).subscribe(data=>{
      this.userData = data;
      this.nameUser = data.Nombres;
      console.log(data);
    })
  }
}
