/*
 * Copyright (C) 2019 - present Juergen Zimmermann, Hochschule Karlsruhe
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

import { MatButtonModule } from '@angular/material/button';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { UpdateAdresseModule } from './update-adresse.module';
import { UpdateEmailModule } from './update-email.module';
import { UpdateFamilienstandModule } from './update-familienstand.module';
import { UpdateGeburtsdatumModule } from './update-geburtsdatum.module';
import { UpdateGeschlechtTypeModule } from './update-geschlechtType.module';
import { UpdateNachnameModule } from './update-nachname.module';
import { UpdateStammdatenComponent } from './update-stammdaten.component';

@NgModule({
    declarations: [UpdateStammdatenComponent],
    exports: [UpdateStammdatenComponent],
    imports: [
        MatButtonModule,
        ReactiveFormsModule,
        UpdateAdresseModule,
        UpdateEmailModule,
        UpdateFamilienstandModule,
        UpdateGeburtsdatumModule,
        UpdateGeschlechtTypeModule,
        UpdateNachnameModule,
    ],
})
export class UpdateStammdatenModule {}
