import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AngularD3CloudModule, AngularD3Word } from 'angular-d3-cloud';
import { NumberValue, scaleLinear, scaleOrdinal } from 'd3-scale';
import { schemeBlues, schemeCategory10, schemeGreens, schemePastel1, schemePastel2 } from 'd3-scale-chromatic';

const rotateScale = (range: Iterable<number>, domain: Iterable<NumberValue>) => scaleLinear().range(range).domain(domain);
const fill = (schema: readonly string[]) => scaleOrdinal(schema);
const rotate = rotateScale([-90, 90], [0, 1]);

@Component({
  selector: 'app-advanced',
  templateUrl: './advanced.component.html',
  styleUrls: ['./advanced.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, AngularD3CloudModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdvancedComponent implements OnInit {
  @Input() data!: AngularD3Word[];

  public schemas: any[] = [
    {"id": 0, "name": "Category10", "schema": schemeCategory10 },
    {"id": 1, "name": "Blues", "schema": schemeBlues[9] },
    {"id": 2, "name": "Greens", "schema": schemeGreens[9] },
    {"id": 3, "name": "Pastel1", "schema": schemePastel1 }
  ];
  public fonts: string[] = ["Arial", "Verdana", "Impact", "Times New Roman", "Georgia", "Courier", "Lucida", "Monaco", "Comic Sans MS" ];
  public paddings: number[] = [0, 1, 2, 3, 4, 5];

  public rotate!: number | ((word: AngularD3Word, index: number) => number);
  public fillMapper!: (word: AngularD3Word, index: number) => string; 
  public animations: boolean = true;
  public autoFill: boolean = true;
  private _rotation: boolean = true;
  public get rotation(): boolean {
    return this._rotation;
  }
  public set rotation(value: boolean) {
    this._rotation = value;
    this.applyOptions();
  }
  private _fillScheme: number = 0;
  public get fillScheme(): number {
    return this._fillScheme;
  }
  public set fillScheme(value: number) {
    this._fillScheme = value;
    this.applyOptions();
  }
  private _font: string = "Arial";
  public get font(): string {
    return this._font;
  }
  public set font(value: string) {
    this._font = value;
    this.applyOptions();
  }
  private _padding: number = 5;
  public get padding(): number {
    return parseInt(this._padding.toString());
  }
  public set padding(value: number) {
    this._padding = parseInt(value.toString());
    this.applyOptions();
  }

  private words = ['Exercitation', 'duis', 'ex', 'laboris', 'laboris', 'est', 'aliqua', 'Lorem', 'veniam', 'ad.', 'Minim', 'aliqua', 'enim', 'do', 'exercitation', 'duis', 'eiusmod', 'sunt', 'do', 'exercitation', 'qui', 'ex.', 'Aliqua', 'velit', 'sunt', 'in', 'commodo', 'anim.', 'Sunt', 'labore', 'sunt', 'dolor', 'exercitation', 'non', 'commodo', 'laboris', 'culpa', 'culpa', 'exercitation', 'ex', 'proident', 'laborum.\n\nId', 'dolore', 'commodo', 'occaecat', 'in', 'velit.', 'Aliqua', 'mollit', 'ea', 'qui', 'ad', 'aute', 'est', 'excepteur', 'non', 'aliqua', 'occaecat', 'ad', 'non', 'ea.', 'Labore', 'incididunt', 'excepteur', 'tempor', 'culpa', 'proident', 'ex', 'commodo.', 'Nisi', 'nostrud', 'tempor', 'deserunt', 'ipsum', 'adipisicing', 'aute', 'do', 'adipisicing.\n\nOfficia', 'pariatur', 'eiusmod', 'tempor', 'magna', 'occaecat.', 'Ut', 'proident', 'anim', 'aute', 'aliquip', 'pariatur', 'et.', 'Pariatur', 'ad', 'ea', 'sint', 'ut', 'excepteur', 'amet', 'id', 'do.', 'Labore', 'eu', 'velit', 'non', 'cillum', 'nulla.\n\nIncididunt', 'duis', 'tempor', 'sunt', 'dolor', 'magna', 'occaecat', 'esse', 'elit', 'consequat.', 'Ea', 'sint', 'et', 'labore', 'amet', 'ullamco', 'non', 'tempor.', 'Ad', 'voluptate', 'nisi', 'duis', 'minim', 'elit', 'in', 'adipisicing', 'et', 'laboris', 'nulla', 'culpa', 'ad'];

  ngOnInit(): void {
    this.applyOptions();
  } 

  applyOptions() {        
    this.rotate = (this.rotation) ? () => rotate(Math.random()) : 0;
    const fillFunction = fill(this.schemas[this.fillScheme].schema);
    this.fillMapper = (word: AngularD3Word, index: number): string => {
      return fillFunction(index.toString()) as string;
    }   
    this.data = this.words.map((word) => {
      return { text: word, value: 10 + Math.random() * 90 };
    });
  }
}
