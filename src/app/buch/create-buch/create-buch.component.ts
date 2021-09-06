/*
 * Copyright (C) 2015 - present Juergen Zimmermann, Hochschule Karlsruhe
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import { Buch, BuchService, SaveError } from '../shared';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { first, tap } from 'rxjs/operators';

import type { BuchForm } from '../shared/buch';
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HOME_PATH } from '../../shared';
import type { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import log from 'loglevel';

/**
 * Komponente mit dem Tag &lt;create-buch&gt;, um das Erfassungsformular
 * f&uuml;r ein neues Buch zu realisieren.
 */
@Component({
    selector: 'hs-create-buch',
    templateUrl: './create-buch.component.html',
    styleUrls: ['./create-buch.component.scss'],
})
export class CreateBuchComponent implements OnInit {
    form = new FormGroup({});

    showWarning = false;

    fertig = false;

    errorMsg: string | undefined = undefined;

    constructor(
        private readonly buchService: BuchService,
        private readonly router: Router,
        private readonly titleService: Title,
    ) {
        log.debug(
            'CreateBuchComponent.constructor(): Injizierter Router:',
            router,
        );
    }

    ngOnInit() {
        this.titleService.setTitle('Neues Buch');
    }

    /**
     * Die Methode <code>save</code> realisiert den Event-Handler, wenn das
     * Formular abgeschickt wird, um ein neues Buch anzulegen.
     * @return false, um das durch den Button-Klick ausgel&ouml;ste Ereignis
     *         zu konsumieren.
     */
    onSave() {
        // In einem Control oder in einer FormGroup gibt es u.a. folgende
        // Properties
        //    value     JSON-Objekt mit den IDs aus der FormGroup als
        //              Schluessel und den zugehoerigen Werten
        //    errors    Map<string,any> mit den Fehlern, z.B. {'required': true}
        //    valid/invalid     fuer valide Werte
        //    dirty/pristine    falls der Wert geaendert wurde

        if (this.form.invalid) {
            log.debug(
                'CreateBuchComponent.onSave(): Validierungsfehler',
                this.form,
            );
        }

        const buchForm: BuchForm = this.form.value; // eslint-disable-line @typescript-eslint/no-unsafe-assignment
        const neuesBuch = Buch.fromForm(buchForm);
        log.debug('CreateBuchComponent.onSave(): neuesBuch=', neuesBuch);

        this.buchService
            .save(neuesBuch)
            .pipe(
                tap(result => this.setProps(result)),
                first(),
            )
            .subscribe({ next: () => this.next() });
    }

    private setProps(result: SaveError | string) {
        if (result instanceof SaveError) {
            this.handleError(result);
            return;
        }

        this.fertig = true;
        this.showWarning = false;
        this.errorMsg = undefined;

        const id = result;
        log.debug(`CreateBuchComponent.onSave(): id=${id}`);
    }

    private handleError(err: SaveError) {
        const { statuscode } = err;
        log.debug(
            `CreateBuchComponent.handleError(): statuscode=${statuscode}, err=`,
            err,
        );

        switch (statuscode) {
            case HttpStatusCode.BadRequest: {
                const { cause } = err;
                // TODO Aufbereitung der Fehlermeldung: u.a. Anfuehrungszeichen
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                this.errorMsg =
                    cause instanceof HttpErrorResponse
                        ? cause.error
                        : JSON.stringify(cause);
                break;
            }

            case HttpStatusCode.TooManyRequests:
                this.errorMsg =
                    'Zu viele Anfragen. Bitte versuchen Sie es später noch einmal.';
                break;

            case HttpStatusCode.GatewayTimeout:
                this.errorMsg = 'Ein interner Fehler ist aufgetreten.';
                log.error('Laeuft der Appserver? Port-Forwarding?');
                break;

            default:
                this.errorMsg = 'Ein unbekannter Fehler ist aufgetreten.';
                break;
        }
    }

    private async next() {
        if (this.errorMsg === undefined) {
            log.debug('CreateBuchComponent.next(): Navigation');
            await this.router.navigate([HOME_PATH]);
        }
    }
}
