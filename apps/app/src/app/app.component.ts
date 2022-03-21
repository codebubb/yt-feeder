import { Component } from '@angular/core';
import { tap } from 'rxjs';
import { FeedService } from './services/feed.service';
import { YTFeedItem } from './types/YTFeedItem';
import { YTFeedMeta } from './types/YTFeedMeta';

@Component({
  selector: 'yt-feeder-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'app';
  channelId = '';
  channelMeta!: YTFeedMeta;
  channelItems!: YTFeedItem[];
  accordion: { [key: string]: boolean } = {};
  markup: { [key: string]: string } = {};
  content = false;

  constructor(private feedService: FeedService) {}

  handleFormSubmit() {
    console.log(this.channelId);
    this.feedService
      .getFeedData(this.channelId)
      .pipe(
        tap(({ items }) => {
          this.markup['devto'] = items
            .map(this.generateDevToMarkupForVideo)
            .join('');
          this.markup['hashnode'] = items
            .map(this.generateHashNodeMarkupForVideo)
            .join('');
        })
      )
      .subscribe(({ meta, items }) => {
        this.channelMeta = meta;
        this.channelItems = items;
        this.content = true;
      });
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

  toggleAccordion(item: string) {
    this.accordion[item] = !this.accordion?.[item];
  }
}
