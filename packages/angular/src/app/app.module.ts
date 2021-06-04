import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
// Import Modules.
import {GlobalModule} from './global/global.module';
import {AveriaModule} from './averia/averia.module';
import {TasksModule} from './tasks/tasks.module';
import {DevicesModule} from './devices/devices.module';
import {ReportModule} from './report/report.module';
import {UserModule} from './user/user.module';
import {ClientModule} from './client/client.module';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AuthGuard} from './auth.guard';
// Import Auth Services.
import {TokenInterceptorService} from './user/token-interceptor.service';
import {AuthService} from './user/auth.service';
import {UserService} from './user/user.service';
// Import Services.
import {InfoService} from './general/info.service';
// Import Components.
import {SystemComponent} from './system/system.component';
import {SystemOptionComponent} from './system/system-option/system-option.component';
import {GeneralComponent} from './general/general.component';
import {TicketComponent} from './ticket/ticket.component';
import {LoginComponent} from './login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    SystemComponent,
    SystemOptionComponent,
    GeneralComponent,
    TicketComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    GlobalModule,
    AveriaModule,
    TasksModule,
    DevicesModule,
    ReportModule,
    UserModule,
    ClientModule
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    AuthService,
    UserService,
    InfoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
