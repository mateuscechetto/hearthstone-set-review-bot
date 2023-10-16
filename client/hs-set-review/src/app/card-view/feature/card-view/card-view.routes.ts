import { Routes } from "@angular/router";
import { CardViewPage } from "./card-view.page";
import { loginGuard, userGuard } from "src/app/shared/guards/user.guard";

export const CARD_VIEW_ROUTES: Routes = [
    {
        path: ':username/view-only',
        component: CardViewPage,
        canActivate: [userGuard, loginGuard]
    },
    {
        path: ':username',
        component: CardViewPage,
        canActivate: [userGuard],
    },
];