import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { AngularD3CloudModule, AngularD3Word } from 'angular-d3-cloud';

@Component({
  selector: 'app-simple',
  templateUrl: './simple.component.html',
  styleUrls: ['./simple.component.css'],
  standalone: true,
  imports: [AngularD3CloudModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SimpleComponent implements OnInit {
  @Input() data!: AngularD3Word[];

  private words = ['Exercitation', 'duis', 'ex', 'laboris', 'laboris', 'est', 'aliqua', 'Lorem', 'veniam', 'ad.', 'Minim', 'aliqua', 'enim', 'do', 'exercitation', 'duis', 'eiusmod', 'sunt', 'do', 'exercitation', 'qui', 'ex.', 'Aliqua', 'velit', 'sunt', 'in', 'commodo', 'anim.', 'Sunt', 'labore', 'sunt', 'dolor', 'exercitation', 'non', 'commodo', 'laboris', 'culpa', 'culpa', 'exercitation', 'ex', 'proident', 'laborum.\n\nId', 'dolore', 'commodo', 'occaecat', 'in', 'velit.', 'Aliqua', 'mollit', 'ea', 'qui', 'ad', 'aute', 'est', 'excepteur', 'non', 'aliqua', 'occaecat', 'ad', 'non', 'ea.', 'Labore', 'incididunt', 'excepteur', 'tempor', 'culpa', 'proident', 'ex', 'commodo.', 'Nisi', 'nostrud', 'tempor', 'deserunt', 'ipsum', 'adipisicing', 'aute', 'do', 'adipisicing.\n\nOfficia', 'pariatur', 'eiusmod', 'tempor', 'magna', 'occaecat.', 'Ut', 'proident', 'anim', 'aute', 'aliquip', 'pariatur', 'et.', 'Pariatur', 'ad', 'ea', 'sint', 'ut', 'excepteur', 'amet', 'id', 'do.', 'Labore', 'eu', 'velit', 'non', 'cillum', 'nulla.\n\nIncididunt', 'duis', 'tempor', 'sunt', 'dolor', 'magna', 'occaecat', 'esse', 'elit', 'consequat.', 'Ea', 'sint', 'et', 'labore', 'amet', 'ullamco', 'non', 'tempor.', 'Ad', 'voluptate', 'nisi', 'duis', 'minim', 'elit', 'in', 'adipisicing', 'et', 'laboris', 'nulla', 'culpa', 'ad'];

  ngOnInit(): void {
    this.refresh();
  } 

  refresh(): void {
    this.data = this.words.map((word) => {
      return { text: word, value: 10 + Math.random() * 90 };
    });
  }

}
