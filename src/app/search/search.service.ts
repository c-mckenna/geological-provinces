import { Injectable } from '@angular/core';
import * as lunr from 'lunr';
import Feature from 'ol/Feature';
import { MapService } from '../map/map.service';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class SearchService {
  private index;
  private provinces = new Map<string, any>();
  private onClickResults = new Subject<Feature[]>();

  constructor(private mapService: MapService) {
  }

  public createIndex(features: Feature[]): void {
    const provinces = this.provinces;

    this.index = lunr(function() {
      this.field('name');
      this.field('age', { boost: 5 });
      /*this.field('description');
      this.field('age', { boost: 5 });*/

      for (const feature of features) {
        const properties = feature.getProperties();
        provinces.set(properties['PROVINCEID'], feature);

        /*this.add({
          id: properties['PROVINCEID'],
          name: properties['NAME'],
          description: properties['DESCR'],
          age: properties['GEOLHIST']
        });*/
        this.add({
          id: properties['PROVINCEID'],
          name: properties['NAME'],
          age: properties['GEOLHIST']
        });
      }
    });
  }

  doSearch(term: string): void {
    this.mapService.setFeatures(
      this.index.search(term).map((result) => this.provinces.get(result.ref))
    );
  }

  doList(terms: string[]): void {
    const results = [];

    for (const term of terms) {
      results.push(
        ...this.index.query(function(q) {
          term.split(' ').forEach((t) => {
            q.term(t, { presence: lunr.Query.presence.REQUIRED });
          });
        })
      );
    }

    const refs = [...new Set(results.map((r) => r.ref))];

    this.mapService.setFeatures(
      refs.map((result) => this.provinces.get(result))
    );
  }

  setClickResults(features: Feature[]): void {
    this.onClickResults.next(features || []);
  }

  public get onClickResults$(): Observable<Feature[]> {
    return this.onClickResults;
  }
}
