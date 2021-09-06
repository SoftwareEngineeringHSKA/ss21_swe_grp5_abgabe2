import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    Input,
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

// eslint-disable-next-line @typescript-eslint/no-duplicate-imports
import { FormGroup } from '@angular/forms';
import type { OnInit } from '@angular/core';
import log from 'loglevel';

/**
 * Komponente mit dem Tag &lt;hs-create-adresse&gt;, um das Erfassungsformular
 * f&uuml;r ein neues Buch zu realisieren.
 */
@Component({
    selector: 'hs-create-adresse',
    templateUrl: './create-adresse.component.html',
    styleUrls: ['./create-adresse.component.scss'],
})
export class CreateAdresseComponent implements OnInit, AfterViewInit {
    @Input()
    form!: FormGroup;

    // eslint-disable-next-line @typescript-eslint/naming-convention
    readonly PLZ_LENGTH = 5;

    readonly plz = new FormControl(undefined, [
        Validators.required,
        Validators.minLength(this.PLZ_LENGTH),
        Validators.maxLength(this.PLZ_LENGTH),
    ]);

    readonly ort = new FormControl(undefined, [Validators.required]);

    readonly adresseForm = new FormGroup({});

    // eslint-disable-next-line no-empty-function
    constructor(private readonly cd: ChangeDetectorRef) {}

    ngOnInit() {
        log.debug('CreateAdresseComponent.ngOnInit');
        // siehe formControlName innerhalb @Component({templateUrl: ...})
        this.adresseForm.addControl('plz', this.plz);
        this.adresseForm.addControl('ort', this.ort);
        this.form.addControl('adresse', this.adresseForm);
    }

    ngAfterViewInit() {
        this.cd.markForCheck();
        this.cd.detectChanges();
    }
}
