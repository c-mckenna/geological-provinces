import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { SearchService } from './search.service';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'cm-search',
  templateUrl: 'search.component.html'
})
export class SearchComponent {
  private doSearch = new Subject<string>();

  constructor(private searchService: SearchService) {
    this.doSearch.pipe(
      debounceTime(300)
    ).subscribe((term) => this.searchService.doSearch(term));
  }

  onSearch(target): void {
    this.doSearch.next(target.value);
  }
}
