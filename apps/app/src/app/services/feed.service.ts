import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { YTFeedItem } from '../types/YTFeedItem';
import { map, of, tap } from 'rxjs';
import { YTFeedMeta } from '../types/YTFeedMeta';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FeedService {
  baseFeedUrl =
    'https://api.rss2json.com/v1/api.json?rss_url=https://www.youtube.com/feeds/videos.xml?channel_id=';
  constructor(private http: HttpClient) {}

  getFeedData(channel_id: string) {
    if (environment.cacheFeed && localStorage.getItem('feedData')) {
      console.log('Restored from cache');
      return of(
        JSON.parse(localStorage.getItem('feedData') as string) as {
          meta: YTFeedMeta;
          items: YTFeedItem[];
        }
      );
    }

    return this.http
      .get<{ feed: YTFeedMeta; items: YTFeedItem[] }>(
        `${this.baseFeedUrl}${channel_id}`
      )
      .pipe(
        map(({ feed, items }) => ({
          meta: feed,
          items: items.map((item) => this.mapGuidInItem(item)),
        })),
        tap((data) => {
          if (environment.cacheFeed) {
            localStorage.setItem('feedData', JSON.stringify(data));
          }
        })
      );
  }

  mapGuidInItem(item: YTFeedItem) {
    return {
      ...item,
      guid: item.guid.split(':')[2],
    };
  }
}
