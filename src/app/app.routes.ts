import { CanMatchFn, RedirectCommand, Router, Routes } from "@angular/router";
import { NoTaskComponent } from "./tasks/no-task/no-task.component";
import { resolveUserName, UserTasksComponent } from "./users/user-tasks/user-tasks.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { userRoutes } from "./users/users.routes";
import { inject } from "@angular/core";

const dummyCanMatch: CanMatchFn = (route, segments) => {
    // return true or of(true);

    const router = inject(Router);
    const shouldGetAccess = Math.random();
    if (shouldGetAccess < 0.5) {
        return true;
    }
    return new RedirectCommand(router.parseUrl('/unauthorized'));
}

export const routes: Routes = [
    {
        path: '', // <your-domain>,
        component: NoTaskComponent,
       // redirectTo: '/users/u1',
       // pathMatch: 'full' // - without full path match there is infinite redirection
       title: 'No task selected'
    },
    {
        path: 'users/:userId', // <your-domain>/users/<uid>
        component: UserTasksComponent,
        children: userRoutes,
        canMatch:[dummyCanMatch],
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