/*
 * Copyright (C) 2016 - present Juergen Zimmermann, Hochschule Karlsruhe
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

import { HeaderComponent } from './header.component';
import { LogoModule } from './logo.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavModule } from './nav.module';
import { NgModule } from '@angular/core';

// single component module

@NgModule({
    declarations: [HeaderComponent],
    exports: [HeaderComponent],
    imports: [LogoModule, MatToolbarModule, NavModule],
})
export class HeaderModule {}
