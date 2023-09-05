import { Component, OnInit } from '@angular/core';

import moment from 'moment';

import timy from '../../../resources/timy.json';
import zapasy from '../../../resources/zapasy.json';
import { Tim } from 'src/app/api/Tim';
import { Zapas } from 'src/app/api/Zapas';

@Component({
    selector: 'kalendar',
    templateUrl: './kalendar.component.html'
})
export class KalendarComponent implements OnInit {

    timy: Tim[];
    zapasy: Zapas[];
    dni: Date[] = [];
    tim: Tim;

    vsetkyDni: boolean = true;
    dniViditelne: Date[];
    timyViditelne: Tim[];

    zaciatok: Date;
    koniec: Date;

    constructor() {
        moment.locale( 'sk' );
    }

    ngOnInit(): void {
        this.timy = timy;
        this.zapasy = zapasy;
        this.timyViditelne = [ ...timy ];
        this.dniViditelne = [ ...this.dni ];

        this.zaciatok = moment( '2023-09-11' ).toDate();
        this.koniec = moment( '2024-05-31' ).toDate();

        let d: Date = this.zaciatok;
        while ( !moment( d ).isAfter( this.koniec ) ) {
            this.dni.push( d );
            d = moment( d ).add( 1, 'days' ).toDate();
        }
    }

    formatDatum( d: Date ): string {
        return moment( d ).format( 'DD.MM.YYYY' );
    }

    denVTyzdni( d: Date ): string {
        return moment( d ).format( 'dd' );
    }

    formatCas( d: Date ): string {
        return moment( d ).format( 'HH:mm' );
    }

    viditelneDni(): void {
        if ( this.vsetkyDni ) {
            this.dniViditelne = this.dni.filter( d => this.zapasy.some( z => moment( z.datCas ).format( 'DD.MM.YYYY' ) == moment( d ).format( 'DD.MM.YYYY' ) ) );
            this.vsetkyDni = false;
        } else {
            this.dniViditelne = [ ...this.dni ];
            this.vsetkyDni = true;
        }
    }

    timClick( t: Tim ): void {
        if ( this.tim && t.kod == this.tim.kod ) {
            this.tim = undefined;
            this.timyViditelne = [ ...this.timy ];
        } else {
            this.tim = t;
            this.timyViditelne = this.timy.filter( tim => tim.kod == t.kod );
        }
    }

}