import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AddChatComponent } from './add-chat/add-chat.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatsComponent } from './chats/chats.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { ListeSouchesComponent } from './liste-souches/liste-souches.component';
import { LoginComponent } from './login/login.component';
import { RechercheParNomComponent } from './recherche-par-nom/recherche-par-nom.component';
import { RechercheParSoucheComponent } from './recherche-par-souche/recherche-par-souche.component';
import { TokenInterceptor } from './services/token.interceptor';
import { UpdateChatComponent } from './update-chat/update-chat.component';
import { UpdateSoucheComponent } from './update-souche/update-souche.component';
import { UsersComponent } from './users/users.component';
import { AddUserComponent } from './add-user/add-user.component';
import { VerificationComponent } from './verification/verification.component';
import { UpdateUserComponent } from './update-user/update-user.component';




@NgModule({
  declarations: [
    AppComponent,
    ChatsComponent,
    AddChatComponent,
    UpdateChatComponent,
    RechercheParSoucheComponent,
    RechercheParNomComponent,
    ListeSouchesComponent,
    UpdateSoucheComponent,
    LoginComponent,
    ForbiddenComponent,
    UsersComponent,
    AddUserComponent,
    VerificationComponent,
    UpdateUserComponent,
  


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule

  ],
  
  providers: [{ provide : HTTP_INTERCEPTORS,
    useClass : TokenInterceptor,
    multi : true}
     ],
    
  bootstrap: [AppComponent]
})
export class AppModule { }
