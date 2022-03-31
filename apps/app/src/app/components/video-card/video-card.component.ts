import { Component, Input } from '@angular/core';
import { YTFeedItem } from '../../types';

@Component({
  selector: 'yt-feeder-video-card',
  templateUrl: './video-card.component.html',
})
export class VideoCardComponent {
  @Input() feedItem!: YTFeedItem;
}
