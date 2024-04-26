import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CadastroService } from './cadastro.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from "ngx-bootstrap/modal";
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { NgxPaginationModule } from 'ngx-pagination'; // Importe NgxPaginationModule
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NoopAnimationsModule } from '@angular/platform-browser/animations'; // Importe BrowserAnimationsModule

@NgModule({
  declarations: [
    AppComponent,
    CadastroComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule,
    NgxPaginationModule, // Adicione NgxPaginationModule aos imports
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    NoopAnimationsModule,
    ModalModule.forRoot() //para a aplicação inteira
  ],
  providers: [HttpClientModule,CadastroService],
  bootstrap: [AppComponent]
})
export class AppModule { }
