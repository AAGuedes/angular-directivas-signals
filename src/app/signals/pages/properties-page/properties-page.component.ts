import { Component, EffectRef, WritableSignal, effect, signal } from '@angular/core';
import { User } from '../../interfaces/user-request.interface';

@Component({
  selector: 'app-properties-page',
  templateUrl: './properties-page.component.html',
  styleUrls: ['./properties-page.component.css']
})
export class PropertiesPageComponent {

  public counter: WritableSignal<number> = signal(0);

  public user: WritableSignal<User> = signal<User>({
    id: 1,
    email: "george.bluth@reqres.in",
    first_name: "George",
    last_name: "Bluth",
    avatar: "https://reqres.in/img/faces/1-image.jpg"
  });

  public userChangeEffect: EffectRef = effect(() => {
    console.log(`${this.user().first_name} ${this.counter()}`);
  })

  onFieldUpdated(field: keyof User, value: string): void {
    this.user.mutate(current => {
      switch(field) {
        case 'id':
          current.id = Number(value);
          break;
        case 'email':
          current.email = value;
          break;
        case 'first_name':
          current.first_name = value;
          break;
        case 'last_name':
          current.last_name = value;
          break;
        case 'avatar':
          current.avatar = value;
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

  increaseBy(value: number): void {
    this.counter.update(current => current + value)
  }
}
