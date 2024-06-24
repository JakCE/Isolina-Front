import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TuiInputModule } from '@taiga-ui/kit';
import { TuiInputPasswordModule, TuiInputNumberModule, TuiInputPhoneInternationalModule } from '@taiga-ui/kit';
import { Router, RouterLink } from '@angular/router';
import { TuiAlertService, TuiButtonModule, TuiModeModule, TuiNotificationModule } from '@taiga-ui/core';
import {TuiCountryIsoCode} from '@taiga-ui/i18n';
import { ApiService } from '../../services/api/api.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [TuiButtonModule, TuiInputPhoneInternationalModule, TuiInputNumberModule, 
    RouterLink, ReactiveFormsModule, TuiInputModule, TuiInputPasswordModule, 
    TuiNotificationModule, TuiModeModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{
  registerForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    public router: Router,
    private alerts: TuiAlertService
  ) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      dniControl: [null,Validators.required],
      nameControl: ['',Validators.required],
      apeControl: ['',Validators.required],
      emailControl: ['',Validators.required],
      telefonoControl: ['',Validators.required],
      direccionControl: ['',Validators.required],
      passControl: ['',Validators.required],
    });
  }

  readonly countries = Object.values(TuiCountryIsoCode);
 
  countryIsoCode = TuiCountryIsoCode.PE;

  registrarUser(){
    const user = {
      DNI: this.registerForm.value.dniControl,
      Nombres: this.registerForm.value.nameControl,
      Apellidos: this.registerForm.value.apeControl,
      Email: this.registerForm.value.emailControl,
      Telefono: Number(this.registerForm.value.telefonoControl.split("+")[1]),
      Direccion: this.registerForm.value.direccionControl,
      Passw: this.registerForm.value.passControl
    }
    console.log(user);
    this.apiService.postUsuario(user).subscribe(data => {
      console.log(data);
      if(data.status===409){
        this.alerts.open(data.response).subscribe({
          complete: () => {
            console.log('Notification is closed');
          },
        });
      }else{
        this.alerts.open("Usuario registrado correctamente").subscribe({
          complete: () => {
            console.log('Notification is closed');
          },
        });

        this.router.navigate(['/login']);
      }
    })
  }

  async searchDni(){
    try {
      const resultadoConsulta = await this.apiService.consultarDNI(this.registerForm.value.dniControl);
      //console.log(resultadoConsulta);
      this.registerForm.get("nameControl")?.setValue(resultadoConsulta.nombres);
      this.registerForm.get("apeControl")?.setValue(resultadoConsulta.apellidoPaterno + " " + resultadoConsulta.apellidoMaterno);
    } catch (error) {
      console.error('Error consultando el API', error);
    }
  }
}
