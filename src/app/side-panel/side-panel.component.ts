import { Component } from '@angular/core';
import { SearchService } from '../search/search.service';
import { Subject } from 'rxjs';
import { filter, map } from 'rxjs/operators';

type Mode = 'FILTER'|'LIST';

@Component({
  selector: 'cm-side-panel',
  templateUrl: 'side-panel.component.html'
})
export class SidePanelComponent {
  mode: Mode = 'FILTER';
  results$ = new Subject<any>();

  constructor(private searchService: SearchService) {
    searchService.onClickResults$.pipe(
      filter((arr) => !!arr),
      map((arr) => arr.map((results) => results.getProperties()))
    ).subscribe(this.results$);
  }

  setMode(mode: Mode): void {
    this.mode = mode;
  }
}
