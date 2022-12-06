import { NumberValue, scaleLinear, scaleOrdinal } from "d3-scale";
import { schemeCategory10 } from "d3-scale-chromatic";
import { AngularD3CloudOptions, AngularD3Word } from "./angular-d3-cloud.interfaces";

const rotateScale = (range: Iterable<number>, domain: Iterable<NumberValue>) => scaleLinear().range(range).domain(domain);
const fill = (schema: readonly string[]) => scaleOrdinal(schema);
const defaultFill = fill(schemeCategory10);  
const defaultRotateScale = rotateScale([-90, 90], [0, 1]);
const defaultFillMapper = (word: AngularD3Word, index: number): string => defaultFill(index.toString());
const defaultSizeMapper = (word: AngularD3Word, index: number): number => word.value;
const defaultRotate = (): number => defaultRotateScale(Math.random());

export const defaultOptions: AngularD3CloudOptions = {
  data: [],
  width: 700,
  height: 600,
  padding: 5,
  font: 'arial',
  fontSizeMapper: defaultSizeMapper,
  rotate: defaultRotate,
  autoFill: true,
  fillMapper: defaultFillMapper,
  animations: true,
  fontWeight: 'normal',
  mouseClickObserved: false,
  mouseOverObserved: false,
  mouseOutObserved: false
};