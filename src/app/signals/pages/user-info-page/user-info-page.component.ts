import { Component, OnInit, WritableSignal, computed, inject, signal } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { User } from '../../interfaces/user-request.interface';

@Component({
  selector: 'app-user-info-page',
  templateUrl: './user-info-page.component.html',
  styleUrls: ['./user-info-page.component.css']
})
export class UserInfoPageComponent implements OnInit {

  private usersService: UsersService = inject(UsersService);

  public userId: WritableSignal<number> = signal(1);
  public currentUser: WritableSignal<User | undefined> = signal<User | undefined>(undefined);
  public userWasFound: WritableSignal<boolean> = signal(true);

  public fullName = computed<string>(() => {
    if(!this.currentUser) return 'Usuario no encontrado';
    return `${this.currentUser()?.first_name} ${this.currentUser()?.last_name}`
  });

  ngOnInit(): void {
    this.loadUser(this.userId());
  }

  loadUser(id: number): void {
    if(id <= 0) return;
    this.userId.set(id);
    this.usersService.getUserById(id)
      .subscribe({
        next: (user: User) => {
          this.currentUser.set(user);
          this.userWasFound.set(true);
        },
        error: () => {
          this.currentUser.set(undefined);
          this.userWasFound.set(false);
        }
      });
  }

}
