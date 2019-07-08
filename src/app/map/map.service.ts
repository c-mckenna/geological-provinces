import { Injectable } from '@angular/core';
import Feature from 'ol/Feature';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class MapService {
  private onFeatureUpdate = new Subject<Feature[]>();
  private features: Feature[];

  public setFeatures(features: Feature[]): void {
    this.features = features;
    this.onFeatureUpdate.next(this.features);
  }

  public getFeatures(): Feature[] {
    return this.features;
  }

  public get onFeatureUpdate$(): Observable<Feature[]> {
    return this.onFeatureUpdate.asObservable();
  }
}
