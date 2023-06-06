import { Component, WritableSignal, signal } from '@angular/core';
import { User } from '../../interfaces/user-request.interface';

@Component({
  selector: 'app-properties-page',
  templateUrl: './properties-page.component.html',
  styleUrls: ['./properties-page.component.css']
})
export class PropertiesPageComponent {

  public user: WritableSignal<User> = signal<User>({
    id: 1,
    email: "george.bluth@reqres.in",
    first_name: "George",
    last_name: "Bluth",
    avatar: "https://reqres.in/img/faces/1-image.jpg"
  });

  onFieldUpdated(field: keyof User, value: string): void {
    this.user.mutate(mutate => {
      switch(field) {
        case 'id':
          mutate.id = Number(value);
          break;
        case 'email':
          mutate.email = value;
          break;
        case 'first_name':
          mutate.first_name = value;
          break;
        case 'last_name':
          mutate.last_name = value;
          break;
        case 'avatar':
          mutate.avatar = value;
          break;
      }
    });

    // this.user.update(update => {
    //   return {
    //     ...update,
    //     [field]: value
    //   };
    // });

    // this.user.set({
    //   ...this.user(),
    //   [field]: value,
    // });
  }

}
