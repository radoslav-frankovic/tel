import { Component, Input, OnInit } from "@angular/core";
import { Zapas } from "src/app/api/Zapas";

import moment from 'moment';

import { Tim } from "src/app/api/Tim";
import { AppService } from "src/app/services/app.service";

@Component({
    selector: 'zapas',
    templateUrl: './zapas.component.html',
    host: {
        '(click)': 'logo = !logo'
    }
})
export class ZapasComponent implements OnInit {

    @Input() logo: boolean = true;

    @Input() den: Date;
    @Input() tim: Tim;
    vs: Tim;
    doma: boolean;
    
    zapas: Zapas;

    constructor( public appService: AppService ) {}

    ngOnInit(): void {
        this.zapas = this.appService.mapaZapasy.get( moment( this.den ).format( 'DD.MM.YYYY' ) )?.get( this.tim.kod );
        if ( this.zapas ) {
            this.doma = this.zapas.timDom == this.tim.kod;
            this.vs = this.appService.timy.find( t => t.kod == ( this.doma ? this.zapas.timVon : this.zapas.timDom ) );
        }
    }

    formatDatum( d: Date | string ): string {
        return moment( d ).format( 'DD.MM.YYYY' );
    }

    formatCas( d: Date | string ): string {
        return moment( d ).format( 'HH:mm' );
    }

}