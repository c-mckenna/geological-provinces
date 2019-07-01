import {AfterViewInit, Component} from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import {unByKey} from 'ol/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  private map: Map;

  ngAfterViewInit(): void {
    const source = new VectorSource({
      format: new GeoJSON(),
      url: 'https://callum.id.au/provinces.json'
    });

    const key = source.on('change', () => {
      if (source.getState() === 'ready') {
        console.log(source.getFeatures());
        unByKey(key);
      }
    });

    this.map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new XYZ({
            url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          })
        }),
        new VectorLayer({
          source
        })
      ],
      view: new View({
        center: [0, 0],
        zoom: 2
      })
    });

    this.map.on('click', (e) => {
      console.log(this.map.getFeaturesAtPixel(e.pixel));
    });
  }
}
