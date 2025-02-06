import { Component, computed, DestroyRef, inject, input, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
})
export class UserTasksComponent implements OnInit{
  userId = input.required<string>();
  private userService= inject(UsersService);
  private activatedRoute = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);

  userName = computed(() => this.userService.users.find(user => user.id === this.userId())?.name);

  ngOnInit(): void {
    const subscription = this.activatedRoute.paramMap.subscribe({
      next: paramMap => {
        this.userService.users.find(u => u.id === paramMap.get('user.id'))?.name || '';
      }
    })

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }
}
