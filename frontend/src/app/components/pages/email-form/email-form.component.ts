import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../services/order.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-email-form',
  templateUrl: './email-form.component.html',
  styleUrl: './email-form.component.css'
})
export class EmailFormComponent implements OnInit {
  email = '';
  subject = '';
  message = '';

  isSubmitted =false;

  emailForm!: FormGroup;


  constructor(private orderService: OrderService, 
    private cartService:CartService,
     private formBuilder: FormBuilder,) {
    
  }

  get fc(){
    return this.emailForm.controls;
  }


  ngOnInit(): void {
    let name = this.orderService.getOrderNameFromLocalStorage();
    this.email = '@gmail.com';
    this.subject = 'נא לשלוח את הפרטים הבאים להדפסה'

    this.cartService.getCheckoutCart().items.forEach((item, index) =>  this.message += index + ') ' +'שם המוצר: ' + item.item.name + '\t ' + 'גודל המוצר: ' + item.item.width + 'X' + item.item.length + ' \t כמות: ' + item.quantity + '\n');


    this.emailForm = this.formBuilder.group({
      name:[name, Validators.required],
      email:[this.email, Validators.required],
      subject:[this.subject, Validators.required],
      message:[this.message, Validators.required],


      // address:[address, Validators.required]
    });
  }
  autoResize(event: Event): void {
    const textarea = event.target as HTMLTextAreaElement;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  }

  sendEmail() {

    this.isSubmitted=true;

    const emailData = {
      email: this.fc.email.value,
      subject: this.fc.subject.value,
      message: this.fc.message.value
    };

    this.orderService.sendEmail(emailData).subscribe(
      response => {
        console.log('Email sent successfully!', response);
      },
      error => {
        console.error('Error sending email', error);
      }
    );
  }
}