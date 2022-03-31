import { Component, ViewEncapsulation } from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';
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
  panelOpenState = false;
  channelId = '';
  channelMeta!: YTFeedMeta;
  channelItems!: YTFeedItem[];
  accordion: { [key: string]: boolean } = {};
  content = false;
  feedLengthSelected = 10;
  selectedItems!: YTFeedItem[];

  constructor(private feedService: FeedService) {}

  setFeedItemLimit(event: MatSliderChange) {
    this.feedLengthSelected = event.value as number;
    this.selectedItems = this.channelItems.slice(0, this.feedLengthSelected);
  }

  handleFormSubmit() {
    this.feedService
      .getFeedData(this.channelId)
      .subscribe(({ meta, items }) => {
        this.channelMeta = meta;
        this.channelItems = items.reverse();
        this.content = true;
        this.selectedItems = this.channelItems.slice(
          0,
          this.feedLengthSelected
        );
      });
  }
}
