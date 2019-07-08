import { Component } from '@angular/core';
import { ExportService } from './export/export.service';

@Component({
  selector: 'cm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private exportService: ExportService) {
  }

  onRaster(): void {
    this.exportService.toRaster();
  }

  exportVector(format: string): void {
    this.exportService.toVector(format);
  }
}
