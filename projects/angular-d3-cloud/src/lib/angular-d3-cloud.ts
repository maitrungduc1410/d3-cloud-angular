import {
  Component,
  ElementRef,
  OnChanges,
  SimpleChanges,
  viewChild,
  input,
  output,
} from '@angular/core';
import * as cloud from 'd3-cloud';
import { select } from 'd3-selection';
import 'd3-transition';

import { scaleOrdinal } from 'd3-scale';
import { schemeCategory10 } from 'd3-scale-chromatic';
import { AngularD3Word } from './interfaces';

const fill = scaleOrdinal(schemeCategory10);
const defaultFontSizeMapper: any = (word: AngularD3Word) => word.value;
@Component({
  selector: 'angular-d3-cloud',
  imports: [],
  template: `<div #wordcloud></div>`,
  styles: ``,
})
export class AngularD3Cloud implements OnChanges {
  wordcloud = viewChild<ElementRef<HTMLDivElement>>('wordcloud');
  data = input.required<cloud.Word[]>();
  width = input(700);
  height = input(600);
  padding = input<number | ((datum: cloud.Word, index: number) => number)>(5);
  font = input<string | ((datum: cloud.Word, index: number) => string)>(
    'serif'
  );
  fontSizeMapper = input<(datum: cloud.Word, index: number) => number>(
    defaultFontSizeMapper
  );
  rotate = input<number | ((datum: cloud.Word, index: number) => number)>(0);
  autoFill = input(true);
  fillMapper = input<(datum: cloud.Word, index: number) => string>();
  animations = input(false);
  fontWeight = input<string | number>('normal');

  wordClick = output<{ event: MouseEvent; word: cloud.Word }>();
  wordMouseOver = output<{ event: MouseEvent; word: cloud.Word }>();
  wordMouseOut = output<{ event: MouseEvent; word: cloud.Word }>();

  ngOnChanges(_changes: SimpleChanges): void {
    if (this.wordcloud()?.nativeElement) {
      this.renderCloud();
    }
  }

  renderCloud() {
    select(this.wordcloud()?.nativeElement!).selectAll('*').remove();

    const _cloud = (cloud as any).default() as d3.layout.Cloud<cloud.Word>;
    const layout = _cloud
      .size([this.width(), this.height()])
      .font(this.font() as any)
      .fontWeight(this.fontWeight())
      .words(this.data())
      .padding(this.padding() as any)
      .rotate(this.rotate() as any)
      .fontSize(this.fontSizeMapper())
      .on('end', (words: any) => {
        const texts = select(this.wordcloud()?.nativeElement!)
          .append('svg')
          .attr('width', layout.size()[0])
          .attr('height', layout.size()[1])
          .append('g')
          .attr(
            'transform',
            `translate(${layout.size()[0] / 2},${layout.size()[1] / 2})`
          )
          .selectAll('text')
          .data(words)
          .enter()
          .append('text')
          .style('font-family', this.font() as any)
          .style('font-weight', this.fontWeight())
          .style('fill', (word: any, i) => {
            if (this.autoFill()) {
              const fillMapperFn = this.fillMapper();
              if (fillMapperFn) return fillMapperFn(word, i) ?? null;
              else return fill(i.toString());
            } else {
              return null;
            }
          })
          .attr('text-anchor', 'middle')
          .text((d: any) => d.text);

        if (!this.animations()) {
          texts
            .attr(
              'transform',
              (d: any) => `translate(${[d.x, d.y]})rotate(${d.rotate})`
            )
            .style('font-size', (d: any) => `${d.size}px`)
            .style('fill-opacity', 1);
        } else {
          // Initial status
          texts.style('font-size', 1).style('fill-opacity', 1e-6);

          //Entering and existing words
          texts
            .transition()
            .duration(600)
            .attr(
              'transform',
              (d: any) => `translate(${[d.x, d.y]})rotate(${d.rotate})`
            )
            .style('font-size', (d: any) => `${d.size}px`)
            .style('fill-opacity', 1);
        }

        // Always bind events for output signals
        texts.on('click', (event: MouseEvent, word: any) => {
          this.wordClick.emit({ event, word });
        });
        texts.on('mouseover', (event: MouseEvent, word: any) => {
          this.wordMouseOver.emit({ event, word });
        });
        texts.on('mouseout', (event: MouseEvent, word: any) => {
          this.wordMouseOut.emit({ event, word });
        });
      });
    layout.start();
  }
}
