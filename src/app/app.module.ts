import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

// 🔹 AngularFire modular imports
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';

// 🔹 Environment
import { environment } from './enviroments/enviroment';
// 🔹 App modules
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './auth/auth.module';
import { IngresoEgresoModule } from './ingreso-egreso/ingreso-egreso.module';
import { SharedModule } from './shared/shared.module';

// 🔹 Components
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,

    // ✅ Módulos de features
    AuthModule,
    IngresoEgresoModule,
    SharedModule
  ],
  providers: [
    // ✅ AngularFire modular (API moderna)
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
