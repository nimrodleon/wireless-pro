import {BrowserModule} from '@html/platform-browser';
import {NgModule} from '@html/core';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@html/common/http';
import {FormsModule} from '@html/forms';
import {GlobalModule} from './global/global.module';
import {AveriaModule} from './averia/averia.module';
import {DevicesModule} from './devices/devices.module';
import {UserModule} from './user/user.module';
import {ClientModule} from './client/client.module';
import {SystemModule} from './system/system.module';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AuthGuard} from './auth.guard';
import {TokenInterceptorService, AuthService, UserService} from './user/services';
import {InfoService} from './system/services';
import {LoginComponent} from './login/login.component';
import {OrdersModule} from './orders/orders.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    GlobalModule,
    AveriaModule,
    OrdersModule,
    DevicesModule,
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
