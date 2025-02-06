import { Component, computed, DestroyRef, inject, input, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { ActivatedRoute, ActivatedRouteSnapshot, ResolveFn, RouterLink, RouterOutlet, RouterStateSnapshot } from '@angular/router';

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
})
export class UserTasksComponent implements OnInit {
  userId = input.required<string>();
  message = input.required<string>();
  private userService = inject(UsersService);
  private activatedRoute = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);

  //userName = computed(() => this.userService.users.find(user => user.id === this.userId())?.name);
  userName = input.required<string>();

  ngOnInit(): void {
    const subscription = this.activatedRoute.paramMap.subscribe({
      next: paramMap => {
        this.userService.users.find(u => u.id === paramMap.get('user.id'))?.name || '';
      }
    })

    const dataSubscription = this.activatedRoute.data.subscribe(() => {
      next: (data: any) => {
        // data combines static data and dynamically resolved
        console.log(data);
      }
    })

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
      dataSubscription.unsubscribe();
    });
  }
}

export const resolveUserName: ResolveFn<string> = (activatedRoute: ActivatedRouteSnapshot, routerState: RouterStateSnapshot) => {
  const userService = inject(UsersService);
  const userName = userService.users.find(u => u.id === activatedRoute.paramMap.get('userId'))?.name || '';
  return userName;
}
