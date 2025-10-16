import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  LoginUsuario() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      interface Credenciales {
        // Define properties based on what credenciales contains, e.g.:
        // uid: string;
        // email: string;
        // Add more as needed
        [key: string]: any;
      }

      interface LoginUsuarioResponse {
        // If loginUsuario returns a Promise<Credenciales>
        // Otherwise, adjust accordingly
        // For now, assume Promise<Credenciales>
      }

        // loading
          Swal.fire({
        title: "Procesando su solicitud",
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
        }
      }) 

      this.authService
        .loginUsuario(email, password)
        .then((credenciales: Credenciales) => {
          console.log(credenciales);
          Swal.close();
          this.router.navigate(['/']);
        })
        .catch((err) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.message,
          });
        });
    } else return;
  }
}
