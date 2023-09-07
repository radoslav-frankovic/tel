import { Injectable } from "@angular/core";

import moment from 'moment';

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

    mapaZapasy: Map<string, Map<string, Zapas>> = new Map<string, Map<string, Zapas>>();
    hracieDni: Date[];

    domaceZapasy: boolean = true;
    vonkuZapasy: boolean = true;
    loga: boolean = true;
    ibaHracieDni: boolean = false;

    constructor() {
        this.timy = timy;
        this.zapasy = zapasy;

        this.hracieDni = this.zapasy.map( z => moment( z.datCas ).toDate() ).filter( ( z, ix, arr ) => arr.findIndex( d => moment( d ).format( 'DD.MM.YYYY' ) === moment( z ).format( 'DD.MM.YYYY' ) ) === ix );
        this.zapasy.forEach( z => {
            if ( !this.mapaZapasy.has( moment( z.datCas ).format( 'DD.MM.YYYY' ) ) ) {
                this.mapaZapasy.set( moment( z.datCas ).format( 'DD.MM.YYYY' ), new Map<string, Zapas>() );
            }
            this.mapaZapasy.get( moment( z.datCas ).format( 'DD.MM.YYYY' ) ).set( z.timDom, z );
            this.mapaZapasy.get( moment( z.datCas ).format( 'DD.MM.YYYY' ) ).set( z.timVon, z );
        } )
    }

}