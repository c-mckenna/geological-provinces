import { Component } from '@angular/core';
import { SearchService } from '../search/search.service';

@Component({
  selector: 'cm-list',
  templateUrl: 'list.component.html'
})
export class ListComponent {
  constructor(private searchService: SearchService) {
  }

  onSearch(terms: string): void {
    this.searchService.doList(
      terms.toLowerCase().replace(/\r\n/g, '\n').split('\n')
    );
  }
}
