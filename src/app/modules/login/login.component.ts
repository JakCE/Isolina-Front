import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TuiInputModule } from '@taiga-ui/kit';
import { TuiInputPasswordModule } from '@taiga-ui/kit';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { TuiAlertService, TuiButtonModule, TuiModeModule, TuiNotificationModule } from '@taiga-ui/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [TuiButtonModule, ReactiveFormsModule, TuiInputModule, TuiInputPasswordModule, TuiNotificationModule, TuiModeModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit{
  loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    public router: Router,
    private alerts: TuiAlertService
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      usuario: ['',Validators.required],
      contraseña: ['',Validators.required]
    });
  }

  logIn(){
    const user = {
      Email: this.loginForm.value.usuario,
      Passw: this.loginForm.value.contraseña
    }
    this.authService.postLogin(user).subscribe(data=>{
      localStorage.setItem('token',data.token);
      this.router.navigate(['app']);
    },(error)=>{
      //console.log(error);
      this.alerts.open(error.error).subscribe({
        complete: () => {
          console.log('Notification is closed');
        },
      });
    });
  }
}
