import { Component, inject, signal } from '@angular/core'; // 1. Added signal to imports
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HelloWorldBean, WelcomeData } from '../service/data/welcome-data';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-welcome',
  imports: [RouterLink],
  templateUrl: './welcome.html',
  styleUrl: './welcome.css',
})
export class Welcome {
  private route = inject(ActivatedRoute);
  private service = inject(WelcomeData);

  name = this.route.snapshot.params['name'];

  // 2. Changed from string to a signal
  welcomeMessageFromService = signal<string | undefined>(undefined);

  getWelcomeMessage() {
    this.service.executeHelloWorldBeanService().subscribe({
      next: (response) => this.handleSuccessfulResponse(response),
      error: (error) => this.handleErrorResponse(error),
    });
    // console.log('last line of getWelcomeMessage');
  }


  getWelcomeMessageWithParameter() {
      this.service.executeHelloWorldBeanServiceWithPathVariable(this.name).subscribe({
        next: (response) => this.handleSuccessfulResponse(response),
        error: (error) => this.handleErrorResponse(error),
      });
    }


  handleSuccessfulResponse(response: HelloWorldBean) {
    // console.log('RESPONSE part:');
    // console.log(response);
    // console.log(response.message);
    // 3. Use .set() instead of = assignment
    this.welcomeMessageFromService.set(response.message);
  }


  handleErrorResponse(error: HttpErrorResponse) {
    // console.log('ERROR part:');
    // console.log(error);
    // console.log(error.message);
    const msg = error.error?.message || error.message;
    this.welcomeMessageFromService.set(msg);
  }
}
