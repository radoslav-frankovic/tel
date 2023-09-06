import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import moment from 'moment';

import { Tim } from 'src/app/api/Tim';
import { Zapas } from 'src/app/api/Zapas';
import { AppService } from 'src/app/services/app.service';

@Component({
    selector: 'kalendar',
    templateUrl: './kalendar.component.html'
})
export class KalendarComponent implements OnInit, AfterViewInit {

    @ViewChild( 'dniDiv' ) dniDiv: ElementRef;

    dni: Date[] = [];
    tim: Tim;

    dniViditelne: Date[];
    timyViditelne: Tim[];

    zaciatok: Date;
    koniec: Date;

    najblizsiHraciDen: Date;

    constructor( public appService: AppService ) {
        moment.locale( 'sk' );
    }

    ngOnInit(): void {
        this.timyViditelne = [ ...this.appService.timy ];

        this.zaciatok = moment( '2023-09-11' ).toDate();
        this.koniec = moment( '2024-05-31' ).toDate();

        let d: Date = this.zaciatok;
        while ( !moment( d ).isAfter( this.koniec ) ) {
            this.dni.push( d );
            d = moment( d ).add( 1, 'days' ).toDate();
        }
        this.dniViditelne = [ ...this.dni ];
    }
    
    ngAfterViewInit(): void {
        let rozdielVDnoch: number = moment().weekday(0).diff( moment( this.zaciatok ), 'day' );
        this.dniDiv.nativeElement.scrollTo( rozdielVDnoch*50, 0 );
        this.scroll();
    }

    formatDatum( d: Date ): string {
        return moment( d ).format( 'DD.MM.' );
    }

    denVTyzdni( d: Date ): string {
        return moment( d ).format( 'dd' );
    }

    formatCas( d: Date ): string {
        return moment( d ).format( 'HH:mm' );
    }

    viditelneDni( $event: boolean ): void {
        this.appService.hracieDni = $event;
        if ( this.appService.hracieDni ) {
            this.dniViditelne = this.dni.filter( d => this.appService.zapasy.some( z => moment( z.datCas ).format( 'DD.MM.YYYY' ) == moment( d ).format( 'DD.MM.YYYY' ) ) );
        } else {
            this.dniViditelne = [ ...this.dni ];
        }
    }

    timClick( t: Tim ): void {
        if ( this.tim && t.kod == this.tim.kod ) {
            this.tim = undefined;
            this.timyViditelne = [ ...this.appService.timy ];
        } else {
            this.tim = t;
            this.timyViditelne = this.appService.timy.filter( tim => tim.kod == t.kod );
        }
    }

    scroll(): void {
        let ix: number = Math.floor( this.dniDiv.nativeElement.scrollLeft / 50 );
        this.najblizsiHraciDen = this.dniViditelne[ ix ];
        while ( !this.appService.zapasy.some( z => moment( z.datCas ).format( 'DD.MM.YYY' ) == moment( this.najblizsiHraciDen ).format( 'DD.MM.YYY' ) ) ) {
            ix++;
            if ( ix == this.dniViditelne.length ) {
                this.najblizsiHraciDen = undefined;
                break;
            }
            this.najblizsiHraciDen = this.dniViditelne[ ix ];
        }
    }

    hraTimNajblizsiHraciDen( tim: Tim ): boolean {
        if ( !!this.tim || !this.najblizsiHraciDen || ( this.appService.domaceZapasy && this.appService.vonkuZapasy ) || ( !this.appService.domaceZapasy && !this.appService.vonkuZapasy ) )
            return true;
        let najblizsiZapas: Zapas = this.appService.zapasy.find( z => moment( z.datCas ).format( 'DD.MM.YYY' ) == moment( this.najblizsiHraciDen ).format( 'DD.MM.YYY' ) && ( tim.kod == z.timDom || tim.kod == z.timVon ) );
        return !!najblizsiZapas && this.appService.domaceZapasy && tim.kod == najblizsiZapas.timDom || this.appService.vonkuZapasy && tim.kod == najblizsiZapas.timVon;
    }

}