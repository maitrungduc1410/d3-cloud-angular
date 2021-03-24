import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import * as cloud from 'd3-cloud'
import { select } from 'd3-selection';
import "d3-transition";

import { scaleOrdinal } from 'd3-scale';
import { schemeCategory10 } from 'd3-scale-chromatic';
import { AngularD3Word } from './interfaces';

const fill = scaleOrdinal(schemeCategory10);
const defaultFontSizeMapper: any = (word: AngularD3Word) => word.value;
@Component({
  selector: 'angular-d3-cloud',
  templateUrl: './angular-d3-cloud.component.html',
  styleUrls: ['./angular-d3-cloud.component.css']
})
export class AngularD3CloudComponent implements OnChanges, OnInit {
  @ViewChild('wordcloud') wordcloud: ElementRef<HTMLDivElement> | undefined;
  @Input() data: cloud.Word[] = []
  @Input() width?: number = 700
  @Input() height?: number = 600
  @Input() padding?: number | ((datum: cloud.Word, index: number) => number) = 5
  @Input() font?: string | ((datum: cloud.Word, index: number) => string) = 'serif'
  @Input() fontSizeMapper?: (datum: cloud.Word, index: number) => number = defaultFontSizeMapper
  @Input() rotate?: number | ((datum: cloud.Word, index: number) => number) = 0
  @Input() autoFill?: boolean = true
  @Input() fillMapper?: (datum: cloud.Word, index: number) => string;
  @Input() animations?: boolean = false;

  @Output() wordClick = new EventEmitter<{ event: MouseEvent, word: cloud.Word }>()
  @Output() wordMouseOver = new EventEmitter<{ event: MouseEvent, word: cloud.Word }>()
  @Output() wordMouseOut = new EventEmitter<{ event: MouseEvent, word: cloud.Word }>()

  private isMouseClickUsed = false
  private isMouseOverUsed = false
  private isMouseOutUsed = false
  private static TAG = '[AngularD3CloudComponent]'

  ngOnInit(): void {
    this.isMouseClickUsed = this.wordClick.observers.length > 0
    this.isMouseOverUsed = this.wordMouseOver.observers.length > 0
    this.isMouseOutUsed = this.wordMouseOut.observers.length > 0
  }

  ngAfterViewInit() {
    this.renderCloud()
  }

  ngOnChanges(_changes: SimpleChanges): void {
    if (this.wordcloud) {
      this.renderCloud()
    }
  }

  renderCloud() {
    this.validateProps()

    select(this.wordcloud?.nativeElement!)
      .selectAll('*')
      .remove();

    const layout = cloud()
      .size([this.width!, this.height!])
      .font(this.font as any)
      .words(this.data)
      .padding(this.padding as any)
      .rotate(this.rotate as any)
      .fontSize(this.fontSizeMapper!)
      .on('end', words => {
        const texts = select(this.wordcloud?.nativeElement!)
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
          .style('font-family', this.font as any)
          .style('fill', (word, i) => {
            if (this.autoFill) {
              if (this.fillMapper)
                return this.fillMapper(word, i)
              else
                return fill(i.toString())
            } else {
              return null
            }
          })
          .attr('text-anchor', 'middle')
          .text((d: any) => d.text);

          if (!this.animations) {
            texts
            .attr('transform', d => `translate(${[d.x, d.y]})rotate(${d.rotate})`)
            .style('font-size', d => `${d.size}px`)
            .style("fill-opacity", 1)

          } else {
            // Initial status
            texts
            .style('font-size', 1)
            .style("fill-opacity", 1e-6);

            //Entering and existing words
            texts
            .transition()
                .duration(600)
                .attr('transform', d => `translate(${[d.x, d.y]})rotate(${d.rotate})`)
                .style('font-size', d => `${d.size}px`)
                .style("fill-opacity", 1);

            //Exiting words
            texts
            .exit()
            .transition()
                .duration(200)
                .style('fill-opacity', 1e-6)
                .attr('font-size', 1)
                .remove();
          }

          if (this.isMouseClickUsed) {
            texts.on('click', (event: MouseEvent, word: cloud.Word) => {
              this.wordClick.emit({ event, word })
            })
          }
          if (this.isMouseOverUsed) {
            texts.on('mouseover', (event: MouseEvent, word: cloud.Word) => {
              this.wordMouseOver.emit({ event, word })
            })
          }

          if (this.isMouseOutUsed) {
            texts.on('mouseout', (event: MouseEvent, word: cloud.Word) => {
              this.wordMouseOut.emit({ event, word })
            })
          }
        });
    layout.start()
  }

  private validateProps(): void {
    if (!this.data || !Array.isArray(this.data)) {
      throw new TypeError(`${AngularD3CloudComponent.TAG}: [data] must be an array. Current value is: [${this.data}]`);
    }

    if (this.height === null || this.height === undefined || isNaN(this.height) || this.height <= 0) {
      throw new TypeError(`${AngularD3CloudComponent.TAG}: [height] must be a positive number (greater than 0). Current value is: [${this.height}]`)
    }

    if (this.width === null || this.width === undefined || isNaN(this.width) || this.width <= 0) {
      throw new TypeError(`${AngularD3CloudComponent.TAG}: [width] must be a positive number (greater than 0). Current value is: [${this.width}]`)
    }

    if (this.padding == null || this.padding === undefined || !['number', 'function'].includes(typeof this.padding) || this.padding < 0) {
      throw new TypeError(`${AngularD3CloudComponent.TAG}: [padding] must be a positive number or function. Current value is: [${this.padding}]`)
    }

    if (this.font === null || this.font === undefined || !['string', 'function'].includes(typeof this.font)) {
      throw new TypeError(`${AngularD3CloudComponent.TAG}: [font] must be a positive string or function. Current value is: [${this.font}]`)
    }

    if (!this.fontSizeMapper || typeof this.fontSizeMapper !== 'function') {
      throw new TypeError(`${AngularD3CloudComponent.TAG}: [fontSizeMapper] must be a function. Current value is: [${this.fontSizeMapper}]`)
    }

    if (this.fillMapper && typeof this.fillMapper !== 'function') {
      throw new TypeError(`${AngularD3CloudComponent.TAG}: [fillMapper] must be a function. Current value is: [${this.fillMapper}]`)
    }

    if (this.rotate === null || this.rotate === undefined || !['number', 'function'].includes(typeof this.rotate) || this.rotate < 0) {
      throw new TypeError(`${AngularD3CloudComponent.TAG}: [rotate] must be a positive number or function. Current value is: [${this.rotate}]`)
    }

    if (this.autoFill === null || this.autoFill === undefined || typeof this.autoFill !== 'boolean') {
      throw new TypeError(`${AngularD3CloudComponent.TAG}: [autoFill] must be boolean. Current value is: [${this.autoFill}]`)
    }
  }
}
