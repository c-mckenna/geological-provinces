import { MapService } from '../map/map.service';
import { Injectable } from '@angular/core';
import { GeoJSON, KML, WKT } from 'ol/format';
import FeatureFormat from 'ol/format/Feature';
import { saveAs } from 'file-saver';

@Injectable()
export class ExportService {
  private formats = new Map<string, any>([
    ['GeoJSON', GeoJSON],
    ['KML', KML],
    ['WKT', WKT]
  ]);

  constructor(private mapService: MapService) {
  }

  public toRaster(): void {
    console.log(this.mapService.getFeatures().map((feature) => feature.getProperties()['PROVINCEID']));
  }

  public toVector(format: string): void {
    const features = this.mapService.getFeatures();
    const formatClass = this.formats.get(format);

    if (formatClass && features) {
      const formatter: FeatureFormat = new formatClass();
      const blob = new Blob([
        formatter.writeFeatures(features, {
          dataProjection: 'EPSG:4326',
          featureProjection: 'EPSG:3857'
        })
      ], {type: 'text/plain;charset=utf-8'});

      saveAs(blob, `export.${format.toLowerCase()}`);
    }
  }
}
