import { Injectable } from "@angular/core";
import { environment } from "@environment/environment";

@Injectable({
    providedIn: 'root'
})
export class EnvironmentService {

    isInPreExpansionSeason() {
        return environment.isInPreExpansionSeason;
    }
}
