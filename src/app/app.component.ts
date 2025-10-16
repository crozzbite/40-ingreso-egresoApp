import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

// import { Subscription } from 'rxjs';
// import { startWith, pairwise } from 'rxjs/operators';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = '40-ingreso-egresoApp';

  constructor( private authService: AuthService){
    this.authService.initAuthListener();
    
    console.log('appcomponent', this.authService.auth.currentUser);
  }

  
}
