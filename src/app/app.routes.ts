import { Routes } from "@angular/router";
import { NoTaskComponent } from "./tasks/no-task/no-task.component";
import { UserTasksComponent } from "./users/user-tasks/user-tasks.component";
import { NewTaskComponent } from "./tasks/new-task/new-task.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { TasksComponent } from "./tasks/tasks.component";

export const routes: Routes = [
    {
        path: '', // <your-domain>,
        component: NoTaskComponent,
       // redirectTo: '/users/u1',
       // pathMatch: 'full' // - without full path match there is infinite redirection
    },
    {
        path: 'users/:userId', // <your-domain>/users/<uid>
        component: UserTasksComponent,
        children: [
            {
                path: '',
                redirectTo: 'tasks',
                pathMatch: 'prefix'
            },
            {
                path: 'tasks', // <your-domain>/users/<uid>/tasks
                component: TasksComponent,
            },
            {
                path: 'tasks/new', // <your-domain>/users/<uid>/tasks/new
                component: NewTaskComponent,
            }
        ]
    },
    {
        path: '**',
        component: NotFoundComponent
    }
]