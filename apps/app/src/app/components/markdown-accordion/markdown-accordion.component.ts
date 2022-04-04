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
    this.markup['markdown'] = this.feedItems
      .map(this.generateStandardMarkdown)
      .join('');
    this.markup['markup'] = this.feedItems
      .map(this.generateHTMLMarkup)
      .join('');
  }

  copyToClipBoard(item: string) {
    window.navigator.clipboard.writeText(this.markup[item]);
  }

  generateHTMLMarkup(item: YTFeedItem) {
    return `
<a href="https://youtu.be/${item.guid}">${item.title}</a><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/${item.guid}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
`;
  }

  generateStandardMarkdown(item: YTFeedItem) {
    return `
    [${item.title}](https://youtu.be/${item.guid})
<iframe width="560" height="315" src="https://www.youtube.com/embed/${item.guid}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
`;
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
