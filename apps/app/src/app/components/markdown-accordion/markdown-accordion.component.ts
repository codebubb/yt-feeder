import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import { YTFeedItem } from '../../types';

@Component({
  selector: 'yt-feeder-markdown-accordion',
  templateUrl: './markdown-accordion.component.html',
  styleUrls: ['./markdown-accordion.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MarkdownAccordionComponent implements OnChanges {
  @Input() feedItems!: YTFeedItem[];
  markup: { [key: string]: string } = {};

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['feedItems']) {
      this.generateMarkup();
    }
  }

  generateMarkup() {
    this.markup['devto'] = this.feedItems
      .map(this.generateDevToMarkupForVideo)
      .join('');
    this.markup['hashnode'] = this.feedItems
      .map(this.generateHashNodeMarkupForVideo)
      .join('');
  }

  copyToClipBoard(item: string) {
    window.navigator.clipboard.writeText(this.markup[item]);
  }

  generateDevToMarkupForVideo(item: YTFeedItem) {
    return `
[${item.title}](https://youtu.be/${item.guid})
{% youtube ${item.guid} %}
`;
  }

  generateHashNodeMarkupForVideo(item: YTFeedItem) {
    return `
[${item.title}](https://youtu.be/${item.guid})

%[https://youtu.be/${item.guid}]
`;
  }
}
