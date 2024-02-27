import { ThumbnailComponent } from '@/components/blog/thumbnail/thumbnail.component';
import { NavbarComponent } from '@/components/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { Component, OnDestroy, inject } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router, RouterLink, RouterOutlet } from '@angular/router';
import { MarkdownHeading } from '../lib/markdown.utils';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent, ThumbnailComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnDestroy {
  private _tags: string[] = [];
  route = inject(ActivatedRoute);
  router = inject(Router);
  private subscription = this.router.events.subscribe({
    next: (value) => {
      if (value instanceof NavigationStart) {
        this.searchByTags(value.url);
      }
    }
  })
  loading: boolean = true;
  _posts: MarkdownHeading[] = new Array(0);
  constructor() {
    fetch('assets/posts/posts.json').then(response => response.json()).then(data => {
      this.loading = false;
      this._posts = data.posts;
      this.searchByTags();
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this._tags.splice(0);
  }
  get posts(): MarkdownHeading[] {
    return this._posts.filter(post => this._tags.length <= 0 || this._tags.some(t => post.tags.includes(t)));
  }
  get tags(): string[] {
    return this._tags;
  }
  clearTags($event: MouseEvent) {
    $event.stopPropagation();
    this._tags.splice(0);
  }
  searchByTags(url?: string): void {
    const tags_from_partial_url = (partial_url: string): string | undefined => {
      const url = new URL('https://mock.com' + partial_url);
      return url.searchParams.get('tags') ?? undefined;
    }
    const tags = url ? tags_from_partial_url(url) : this.route.snapshot.queryParams['tags'];
    this._tags = tags?.split(',') ?? [];
  }
}
