import { Component, Input, OnInit } from "@angular/core";
import { Zapas } from "src/app/api/Zapas";

import moment from 'moment';

import zapasy from '../../../resources/zapasy.json';
import { Tim } from "src/app/api/Tim";

@Component({
    selector: 'zapas',
    templateUrl: './zapas.component.html'
})
export class ZapasComponent implements OnInit {

    @Input() den: Date;
    @Input() tim: Tim;
    vs: string;
    
    zapas: Zapas;

    ngOnInit(): void {
        this.zapas = zapasy.find( z => moment( this.den ).format( 'DD.MM.YYYY' ) == moment( z.datCas ).format( 'DD.MM.YYYY' ) && ( this.tim.kod == z.timDom || this.tim.kod == z.timVon ) );
        if ( this.zapas ) {
            this.vs = this.zapas.timDom == this.tim.kod ? this.zapas.timVon : this.zapas.timDom;
        }
    }

    formatDatum( d: Date | string ): string {
        return moment( d ).format( 'DD.MM.YYYY' );
    }

    formatCas( d: Date | string ): string {
        return moment( d ).format( 'HH:mm' );
    }

}