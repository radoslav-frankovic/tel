import { Injectable } from "@angular/core";

import timy from '../../resources/timy.json';
import zapasy from '../../resources/zapasy.json';
import { Tim } from "../api/Tim";
import { Zapas } from "../api/Zapas";

@Injectable({
    providedIn: "root"
})
export class AppService {
    
    timy: Tim[];
    zapasy: Zapas[];

    domaceZapasy: boolean = true;
    vonkuZapasy: boolean = true;
    loga: boolean = true;
    hracieDni: boolean = false;

    constructor() {
        this.timy = timy;
        this.zapasy = zapasy;
    }

}