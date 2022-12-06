export interface AngularD3Word {
  text: string;
  value: number;  
}

export interface AngularD3CloudOptions {
  data?: AngularD3Word[];
  width?: number;
  height?: number;
  padding?: number | ((word: AngularD3Word, index: number) => number);
  font?: string | ((word: AngularD3Word, index: number) => string);
  fontSizeMapper?: number | ((word: AngularD3Word, index: number) => number)
  rotate?: number | ((word: AngularD3Word, index: number) => number);
  autoFill?: boolean;
  fillMapper?: (word: AngularD3Word, index: number) => string;
  animations?: boolean;
  fontWeight?: string | number | ((word: AngularD3Word, index: number) => string | number);
  mouseClickObserved?: boolean;
  mouseOverObserved?: boolean;
  mouseOutObserved?: boolean;
}