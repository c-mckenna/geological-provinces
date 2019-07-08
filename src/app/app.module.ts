import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {SearchService} from './search/search.service';
import { SidePanelComponent } from './side-panel/side-panel.component';
import { MapComponent } from './map/map.component';
import { MapService } from './map/map.service';
import { SearchComponent } from './search/search.component';
import { ExportService } from './export/export.service';
import { ListComponent } from './list/list.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    SidePanelComponent,
    SearchComponent,
    ListComponent
  ],
  imports: [
    BrowserModule,
    NgbDropdownModule
  ],
  providers: [
    MapService,
    SearchService,
    ExportService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
