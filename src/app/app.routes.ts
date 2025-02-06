import { Routes } from "@angular/router";
import { NoTaskComponent } from "./tasks/no-task/no-task.component";
import { resolveUserName, UserTasksComponent } from "./users/user-tasks/user-tasks.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { userRoutes } from "./users/users.routes";

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
        children: userRoutes,
        data: {
            message: 'hello'
        },
        resolve: {
            userName: resolveUserName
        }
    },
    {
        path: '**',
        component: NotFoundComponent
    }
]