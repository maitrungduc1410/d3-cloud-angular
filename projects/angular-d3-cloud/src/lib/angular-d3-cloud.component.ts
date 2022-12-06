import { Component, ElementRef, EventEmitter, Input, OnChanges, AfterViewInit, Output, SimpleChanges, ViewChild, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AngularD3CloudOptions, AngularD3Word } from './angular-d3-cloud.interfaces';
import { AngularD3CloudService } from './angular-d3-cloud.service';
import { defaultOptions } from './utility';

@Component({
  selector: 'angular-d3-cloud',
  templateUrl: './angular-d3-cloud.component.html',
  styleUrls: ['./angular-d3-cloud.component.css']
})
export class AngularD3CloudComponent implements OnChanges, AfterViewInit, OnDestroy {
  @ViewChild('wordcloud', { static: false }) wordcloud: ElementRef<HTMLDivElement> | undefined;

  @Input() data?: AngularD3Word[] = [];
  @Input() width?: number = defaultOptions.width;
  @Input() height?: number = defaultOptions.height;
  @Input() padding?: number | ((word: AngularD3Word, index: number) => number) = defaultOptions.padding;
  @Input() font?: string | ((word: AngularD3Word, index: number) => string) = defaultOptions.font;
  @Input() fontSizeMapper?: number | ((word: AngularD3Word, index: number) => number) = defaultOptions.fontSizeMapper;
  @Input() rotate?: number | ((word: AngularD3Word, index: number) => number) = defaultOptions.rotate;
  @Input() autoFill?: boolean = defaultOptions.autoFill;
  @Input() fillMapper?: (word: AngularD3Word, index: number) => string = defaultOptions.fillMapper;
  @Input() animations?: boolean = defaultOptions.animations;
  @Input() fontWeight?: string | number | ((word: AngularD3Word, index: number) => string | number) = defaultOptions.fontWeight;

  @Output() wordClick = new EventEmitter<{ event: MouseEvent, word: AngularD3Word }>();
  @Output() wordMouseOver = new EventEmitter<{ event: MouseEvent, word: AngularD3Word }>();
  @Output() wordMouseOut = new EventEmitter<{ event: MouseEvent, word: AngularD3Word }>();

  private wordMouseClickSubscriber: Subscription;
  private wordMouseOverSubscriber: Subscription;
  private wordMouseOutSubscriber: Subscription;

  constructor(private cloudService: AngularD3CloudService) { 
    this.wordMouseClickSubscriber = this.cloudService.wordMouseClick.subscribe((data) => {
      this.wordClick.emit(data);
    });   
    this.wordMouseOverSubscriber = this.cloudService.wordMouseOver.subscribe((data) => {
      this.wordMouseOver.emit(data);
    });
    this.wordMouseOutSubscriber = this.cloudService.wordMouseOut.subscribe((data) => {
      this.wordMouseOut.emit(data);
    });
  }

  ngAfterViewInit(): Promise<void> {
    return this.renderCloudAsync(); 
  }

  ngOnChanges(changes: SimpleChanges): Promise<void> {
    return this.renderCloudAsync();
  }

  ngOnDestroy(): void {
    if(this.wordMouseClickSubscriber) {
      this.wordMouseClickSubscriber.unsubscribe();
    }  
    
    if(this.wordMouseOverSubscriber) {
      this.wordMouseOverSubscriber.unsubscribe();
    } 

    if(this.wordMouseOutSubscriber) {
      this.wordMouseOutSubscriber.unsubscribe();
    } 
  }

  private renderCloudAsync(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.wordcloud) {
        this.cloudService.renderCloudAsync(this.wordcloud?.nativeElement!, this.createOptions())
        .then(() => resolve())
        .catch((reason) => {
          console.error(reason);
          resolve();
        });
      } else {        
        resolve();
      }      
    });  
  }

  private cloneData(values: AngularD3Word[] | undefined): AngularD3Word[] {
    if(!values) {
      return [];
    }
    const result: AngularD3Word[] = [];
    values.forEach(value => result.push(Object.assign({}, value)));
    return result;
  }

  private createOptions(): AngularD3CloudOptions {
    return {
      data: this.cloneData(this.data),
      width: this.width,
      height: this.height,
      padding: this.padding,
      font: this.font,
      fontSizeMapper: this.fontSizeMapper,
      rotate: this.rotate,
      autoFill: this.autoFill,
      fillMapper: this.fillMapper,
      animations: this.animations,
      fontWeight: this.fontWeight,
      mouseClickObserved: this.wordClick.observed,
      mouseOverObserved: this.wordMouseOver.observed,
      mouseOutObserved: this.wordMouseOut.observed,
    };
  }
}
