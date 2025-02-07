import { Routes } from "@angular/router";
import { resolveUserTasks, TasksComponent } from "../tasks/tasks.component";
import { canLeaveEditPage, NewTaskComponent } from "../tasks/new-task/new-task.component";
import { resolveTitle } from "./user-tasks/user-tasks.component";

export const userRoutes: Routes = [
    {
        path: '',
        redirectTo: 'tasks',
        pathMatch: 'prefix'
    },
    {
        path: 'tasks', // <your-domain>/users/<uid>/tasks
        component: TasksComponent,
        // runGuardsAndResolvers: 'paramsOrQueryParamsChange', // without this resolver is not running when query params changes
        runGuardsAndResolvers: 'always',
        resolve: {
            userTasks: resolveUserTasks,
        },
        title: resolveTitle
    },
    {
        path: 'tasks/new', // <your-domain>/users/<uid>/tasks/new
        component: NewTaskComponent,
        canDeactivate: [canLeaveEditPage]
    }
]