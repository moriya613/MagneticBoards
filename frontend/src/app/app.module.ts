import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/pages/home/home.component';
import { HeaderComponent } from './components/partials/header/header.component';
import { NgModule } from '@angular/core';
import { ItemPageComponent } from './components/pages/item-page/item-page.component';
import { CartPageComponent } from './components/pages/cart-page/cart-page.component';
import { TitleComponent } from './components/partials/title/title.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { SearchComponent } from './components/partials/search/search.component';
import { TagsComponent } from './components/partials/tags/tags.component';
//import { RatingModule } from 'ng-starrating';
import { HttpClientModule } from '@angular/common/http';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { InputContainerComponent } from './components/partials/input-container/input-container.component';
import { InputValidationComponent } from './components/partials/input-validation/input-validation.component';
import { TextInputComponent } from './components/partials/text-input/text-input.component';
import { DefaultButtonComponent } from './components/partials/default-button/default-button.component';
import { BoardComponent } from './components/partials/board/board.component';
import { FormsModule } from '@angular/forms';
import { RegisterPageComponent } from './components/pages/register-page/register-page.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    ItemPageComponent,
    CartPageComponent,
    TitleComponent,
    SearchComponent,
    TagsComponent,
    LoginPageComponent,
    InputContainerComponent,
    InputValidationComponent,
    TextInputComponent,
    DefaultButtonComponent,
    BoardComponent,
    RegisterPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DragDropModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    ToastrModule.forRoot(
      {
      timeOut:5000,
      positionClass: 'toast-buttom-right',
      newestOnTop: false
    })
    //RatingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }