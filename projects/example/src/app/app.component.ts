import { Component } from '@angular/core';
import { scaleLinear, scaleOrdinal } from 'd3-scale';
import { schemeCategory10, schemeBlues, schemeGreens, schemePastel1, schemePastel2 } from 'd3-scale-chromatic';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  str = 'Exercitation duis ex laboris laboris est aliqua Lorem veniam ad. Minim aliqua enim do exercitation duis eiusmod sunt do exercitation qui ex. Aliqua velit sunt in commodo anim. Sunt labore sunt dolor exercitation non commodo laboris culpa culpa exercitation ex proident laborum.\n\nId dolore commodo occaecat in velit. Aliqua mollit ea qui ad aute est excepteur non aliqua occaecat ad non ea. Labore incididunt excepteur tempor culpa proident ex commodo. Nisi nostrud tempor deserunt ipsum adipisicing aute do adipisicing.\n\nOfficia pariatur eiusmod tempor magna occaecat. Ut proident anim aute aliquip pariatur et. Pariatur ad ea sint ut excepteur amet id do. Labore eu velit non cillum nulla.\n\nIncididunt duis tempor sunt dolor magna occaecat esse elit consequat. Ea sint et labore amet ullamco non tempor. Ad voluptate nisi duis minim elit in adipisicing et laboris nulla culpa ad'
  data: any;

  public rotate: any = 0;
  public fillMapper: any;
  public fillFx: any;
  public title: string = "Welcome to d3-cloud-angular demo";

  private rotateScale;
  public autoFill: boolean = true;

  public schemas: any[] = [
    {"id": 0, "name": "Category10", "schema": schemeCategory10 },
    {"id": 1, "name": "Blues", "schema": schemeBlues[9] },
    {"id": 2, "name": "Greens", "schema": schemeGreens[9] },
    {"id": 3, "name": "Pastel1", "schema": schemePastel1 },
    {"id": 4, "name": "Pastel2", "schema": schemePastel2 },
  ];

  public options: any = {
    autoFill: true,
    rotate: false,
    fillScheme: 0
  };

  constructor() {
    this.rotateScale = scaleLinear().range([-60, 60]);
    this.rotateScale.domain([0,1]);
    this.initData();
    this.applyOptions();
  }

  applyOptions() {
    this.autoFill = this.options.autoFill;
    if (this.options.rotate) {
      this.rotate = () => {
        return this.rotateScale(Math.random());
      }
    } else {
      this.rotate = 0;
    }

    this.fillFx = scaleOrdinal(this.schemas[this.options.fillScheme].schema);

    this.fillMapper = (datum: any, index: number) => {
      return this.fillFx(index.toString());
    }

    this.initData();
  }

  initData() {
    this.data = this.str.split(' ').map((d) => {
      return { text: d, value: 10 + Math.random() * 90, fill: '0' };
    })
  }

  onWordClick(event: any) {
    console.log(event)
  }
}
