import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import VectorLayer from 'ol/layer/Vector';
import { unByKey } from 'ol/Observable';
import Map from 'ol/Map';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import View from 'ol/View';
import { SearchService } from '../search/search.service';
import { MapService } from './map.service';
import { Subscription } from 'rxjs';
import Feature from 'ol/Feature';

@Component({
  selector: 'cm-map',
  template: `<div #map></div>`
})
export class MapComponent implements AfterViewInit, OnDestroy {
  @ViewChild('map', {
    static: true
  })
  private mapEl: ElementRef<HTMLDivElement>;
  private map: Map;
  private layer: VectorLayer;
  private subscription: Subscription;

  constructor(private searchService: SearchService, private mapService: MapService) {
    this.subscription = mapService.onFeatureUpdate$.subscribe((features) => {
      const updatedSource = new VectorSource({
        features
      });

      this.layer.setSource(updatedSource);
    });
  }

  ngAfterViewInit(): void {
    const source = new VectorSource({
      format: new GeoJSON(),
      url: 'assets/provinces.json'
    });
    this.layer = new VectorLayer({
      source
    });

    const key = source.on('change', () => {
      if (source.getState() === 'ready') {
        unByKey(key);

        this.searchService.createIndex(source.getFeatures());
      }
    });

    this.map = new Map({
      target: this.mapEl.nativeElement,
      layers: [
        new TileLayer({
          source: new XYZ({
            url: 'https://{a-d}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png'
          })
        }),
        this.layer
      ],
      view: new View({
        center: [15417749, -3259484],
        zoom: 4
      })
    });

    this.map.on('click', (e) => {
      this.searchService.setClickResults(
        this.map.getFeaturesAtPixel(e.pixel) as Feature[]
      );
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
