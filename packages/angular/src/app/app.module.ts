import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
// Import Modules.
import {GlobalModule} from './global/global.module';
import {AveriaModule} from './averia/averia.module';
import {TasksModule} from './tasks/tasks.module';
import {DevicesModule} from './devices/devices.module';
import {UserModule} from './user/user.module';
import {ClientModule} from './client/client.module';
import {SystemModule} from './system/system.module';
import {ReportModule} from './report/report.module';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AuthGuard} from './auth.guard';
// Import Auth Services.
import {TokenInterceptorService} from './user/services/token-interceptor.service';
import {AuthService} from './user/services/auth.service';
import {UserService} from './user/services/user.service';
// Import Services.
import {InfoService} from './general/info.service';
// Import Components.
import {GeneralComponent} from './general/general.component';
import {TicketComponent} from './ticket/ticket.component';
import {LoginComponent} from './login/login.component';


@NgModule({
  declarations: [
    AppComponent,
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
    ClientModule,
    SystemModule
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
