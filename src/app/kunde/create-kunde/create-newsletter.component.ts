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

import { Component, Input } from '@angular/core';

import { FormControl } from '@angular/forms';
import type { FormGroup } from '@angular/forms';
import type { OnInit } from '@angular/core';
import log from 'loglevel';

/**
 * Komponente mit dem Tag &lt;hs-create-newsletter&gt;, um das Erfassungsformular
 * f&uuml;r ein neues Kunde zu realisieren.
 */
@Component({
    selector: 'hs-create-newsletter',
    templateUrl: './create-newsletter.component.html',
    styleUrls: ['./create-newsletter.component.scss'],
})
export class CreateNewsletterComponent implements OnInit {
    @Input()
    form!: FormGroup;

    readonly newsletter = new FormControl(false);

    ngOnInit() {
        log.debug('CreateNewsletterComponent.ngOnInit');
        // siehe formControlName innerhalb @Component({templateUrl: ...})
        this.form.addControl('newsletter', this.newsletter);
    }
}
