import { Component, ViewEncapsulation } from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';
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
  loading = false;
  feedLengthSelected = 10;
  selectedItems!: YTFeedItem[];
  errorMessage!: string;

  constructor(private feedService: FeedService) {}

  setFeedItemLimit(event: MatSliderChange) {
    this.feedLengthSelected = event.value as number;
    this.selectedItems = this.channelItems
      .slice(0, this.feedLengthSelected)
      .reverse();
  }

  handleFormSubmit() {
    this.loading = true;
    this.feedService.getFeedData(this.channelId).subscribe({
      next: ({ meta, items }) => {
        this.loading = false;
        this.channelMeta = meta;
        this.channelItems = items;
        this.content = true;
        this.selectedItems = this.channelItems
          .slice(0, this.feedLengthSelected)
          .reverse();
      },
      error: (e) => {
        this.loading = false;
        this.errorMessage =
          'A problem occurred, check your channel ID and try again.';
      },
    });
  }
}
