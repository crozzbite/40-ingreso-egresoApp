import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  registroForm!: FormGroup;

  constructor( private fb: FormBuilder,
               private authService: AuthService,
               private router: Router
              ) {}

  ngOnInit(): void {
    
    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  crearUsuario(){

    if (this.registroForm.invalid) { return; }

    // loading
    Swal.fire({
  title: "Procesando su solicitud",
  timerProgressBar: true,
  didOpen: () => {
    Swal.showLoading();
  }
}) 
    
    const {nombre, correo, password} = this.registroForm.value;
    // en el servicio dice que regresa una promesa asi que aqui lo volvemos promesa con el .then
    this.authService.crearUsuario(nombre, correo, password).then( credenciales => {
      console.log(credenciales);
      Swal.close();//close loading
      this.router.navigate(['/']);
    })
     .catch((err) => {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: err.message,
              });
      });
  }
}
