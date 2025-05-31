import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AngularD3Cloud } from 'angular-d3-cloud';
import { scaleLinear, scaleOrdinal } from 'd3-scale';
import {
  schemeCategory10,
  schemeBlues,
  schemeGreens,
  schemePastel1,
  schemePastel2,
} from 'd3-scale-chromatic';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [AngularD3Cloud, FormsModule, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  str = signal(
    'Exercitation duis ex laboris laboris est aliqua Lorem veniam ad. Minim aliqua enim do exercitation duis eiusmod sunt do exercitation qui ex. Aliqua velit sunt in commodo anim. Sunt labore sunt dolor exercitation non commodo laboris culpa culpa exercitation ex proident laborum.\n\nId dolore commodo occaecat in velit. Aliqua mollit ea qui ad aute est excepteur non aliqua occaecat ad non ea. Labore incididunt excepteur tempor culpa proident ex commodo. Nisi nostrud tempor deserunt ipsum adipisicing aute do adipisicing.\n\nOfficia pariatur eiusmod tempor magna occaecat. Ut proident anim aute aliquip pariatur et. Pariatur ad ea sint ut excepteur amet id do. Labore eu velit non cillum nulla.\n\nIncididunt duis tempor sunt dolor magna occaecat esse elit consequat. Ea sint et labore amet ullamco non tempor. Ad voluptate nisi duis minim elit in adipisicing et laboris nulla culpa ad'
  );
  data = signal<any[]>([]);

  rotate = signal<any>(0);
  fillMapper = signal<any>(undefined);
  fillFx = signal<any>(undefined);
  title = signal('Welcome to d3-cloud-angular demo');
  animations = signal(true);

  private rotateScale;
  autoFill = signal(true);
  width = signal(window.innerWidth < 800 ? window.innerWidth - 40 : 800);

  schemas = signal<any[]>([
    { id: 0, name: 'Category10', schema: schemeCategory10 },
    { id: 1, name: 'Blues', schema: schemeBlues[9] },
    { id: 2, name: 'Greens', schema: schemeGreens[9] },
    { id: 3, name: 'Pastel1', schema: schemePastel1 },
    { id: 4, name: 'Pastel2', schema: schemePastel2 },
  ]);

  options = signal<any>({
    autoFill: true,
    rotate: true,
    fillScheme: 0,
    animations: true,
  });

  constructor() {
    this.rotateScale = scaleLinear().range([-90, 90]);
    this.rotateScale.domain([0, 1]);
    this.initData();
    this.applyOptions();
  }

  applyOptions() {
    this.animations.set(this.options().animations);
    this.autoFill.set(this.options().autoFill);
    if (this.options().rotate) {
      this.rotate.set(() => {
        return this.rotateScale(Math.random());
      });
    } else {
      this.rotate.set(0);
    }

    this.fillFx.set(scaleOrdinal(this.schemas()[this.options().fillScheme].schema));

    this.fillMapper.set((datum: any, index: number) => {
      return this.fillFx()(index.toString());
    });
    this.initData();
  }

  initData() {
    this.data.set(
      this.str()
        .split(' ')
        .map((d) => {
          return { text: d, value: 10 + Math.random() * 90, fill: '0' };
        })
    );
  }

  onWordClick(event: any) {
    console.log(event);
  }

  setOption(key: string, value: any) {
    this.options.set({ ...this.options(), [key]: value });
  }

  setFillScheme(value: any) {
    this.options.set({ ...this.options(), fillScheme: value });
  }
}
