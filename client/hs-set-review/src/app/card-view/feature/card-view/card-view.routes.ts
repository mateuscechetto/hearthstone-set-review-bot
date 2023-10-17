import { Routes } from "@angular/router";
import { loginGuard, userGuard } from "src/app/shared/guards/user.guard";
import { CardViewPage } from "./card-view.page";

export const CARD_VIEW_ROUTES: Routes = [
    {
        path: ':username/view-only',
        component: CardViewPage,
        canActivate: [userGuard]
    },
    {
        path: ':username',
        component: CardViewPage,
        canActivate: [userGuard, loginGuard],
    },
];