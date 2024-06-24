import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TuiInputModule, TuiStepperModule } from '@taiga-ui/kit';
import { TuiInputPasswordModule, TuiInputNumberModule, TuiInputPhoneInternationalModule } from '@taiga-ui/kit';
import { Router, RouterLink } from '@angular/router';
import { TuiAlertService, TuiButtonModule, TuiCalendarModule, TuiModeModule, TuiNotificationModule } from '@taiga-ui/core';
import {TuiCountryIsoCode} from '@taiga-ui/i18n';
import { ApiService } from '../../services/api/api.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-reservas',
  standalone: true,
  imports: [TuiButtonModule, TuiInputPhoneInternationalModule, TuiInputNumberModule, 
    RouterLink, ReactiveFormsModule, TuiInputModule, TuiInputPasswordModule, 
    TuiNotificationModule, TuiModeModule, TuiStepperModule, NgIf, TuiCalendarModule],
  templateUrl: './reservas.component.html',
  styleUrl: './reservas.component.css'
})
export class ReservasComponent implements OnInit{
  reservasForm!: FormGroup;
  opcActive: number = 1;
  personas: number[] = [2,3,4,5,6,7,8]
  horas: string[] = [
    "12:00 PM",
    "12:15 PM",
    "12:30 PM",
    "12:45 PM",
    "1:00 PM",
    "7:00 PM",
    "7:15 PM",
    "7:30 PM",
    "7:45 PM",
    "8:00 PM",
    "8:15 PM",
    "8:30 PM",
    "8:45 PM"
  ];

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    public router: Router,
    private alerts: TuiAlertService
  ) {}

  ngOnInit() {
    this.reservasForm = this.formBuilder.group({
      dniControl: [null,Validators.required],
      nameControl: ['',Validators.required],
      apeControl: ['',Validators.required],
      emailControl: ['',Validators.required],
      telefonoControl: ['',Validators.required],
      direccionControl: ['',Validators.required],
      passControl: ['',Validators.required],
    });
  }

}
