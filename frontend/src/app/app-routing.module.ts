import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { ItemPageComponent } from './components/pages/item-page/item-page.component';
import { CartPageComponent } from './components/pages/cart-page/cart-page.component';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { RegisterPageComponent } from './components/pages/register-page/register-page.component';
import { ViewUsersComponent } from './components/pages/view-users/view-users.component';
import { CheckoutPageComponent } from './components/pages/checkout-page/checkout-page.component';
import { AuthGuard } from './auth/guards/auth.guard';
import { PaymentPageComponent } from './components/pages/payment-page/payment-page.component';
import { OrderTrackPageComponent } from './components/pages/order-track-page/order-track-page.component';
import { MyBoardsComponent } from './components/pages/my-boards/my-boards.component';
import { OrdersToConfirmComponent } from './components/pages/orders-to-confirm/orders-to-confirm.component';
import { ViewOrdersComponent } from './components/pages/view-orders/view-orders.component';
import { EmailFormComponent } from './components/pages/email-form/email-form.component';
import { BoardSummaryComponent } from './components/pages/board-summary/board-summary.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'search/:searchTerm', component: HomeComponent},
  {path: 'tag/:tag', component: HomeComponent},
  {path: 'school-character/:character', component: HomeComponent},

  {path: 'item/:id', component: ItemPageComponent},
  {path: 'cart-page', component: CartPageComponent},
  {path: 'login', component: LoginPageComponent},
  {path: 'register', component: RegisterPageComponent},
  {path: 'send-email', component: EmailFormComponent},

  {path: 'view-users', component: ViewUsersComponent},
  {path: 'checkout', component: CheckoutPageComponent, canActivate:[AuthGuard]},
  {path: 'summary', component: BoardSummaryComponent, canActivate:[AuthGuard]},

  {path: 'payment', component: PaymentPageComponent, canActivate:[AuthGuard] },
  {path: 'track/:orderId', component: OrderTrackPageComponent, canActivate:[AuthGuard] },
  {path: 'my-boards', component: MyBoardsComponent, canActivate:[AuthGuard] },
  {path: 'ordersToConfirm', component: OrdersToConfirmComponent, canActivate:[AuthGuard] },
  {path: 'view-orders', component: ViewOrdersComponent, canActivate:[AuthGuard] }


  




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
