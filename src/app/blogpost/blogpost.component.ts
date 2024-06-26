import { NavbarComponent } from '@/components/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { Component, OnDestroy, ViewEncapsulation, inject } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router, RouterLink, RouterOutlet } from '@angular/router';
import { ThumbnailComponent } from "../components/blog/thumbnail/thumbnail.component";
import { MarkdownModule } from 'ngx-markdown';
import { MarkdownHeading, getMarkdownBody, getMarkdownHeading } from '../lib/markdown.utils';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-blogpost',
  standalone: true,
  templateUrl: './blogpost.component.html',
  styleUrl: './blogpost.component.css',
  imports: [CommonModule, RouterOutlet, NavbarComponent, ThumbnailComponent, MarkdownModule, RouterLink],
  encapsulation: ViewEncapsulation.None
})
export class BlogpostComponent {
  route = inject(ActivatedRoute);
  heading: MarkdownHeading | undefined;
  article: string | undefined;
  loading: boolean = true;
  title = inject(Title)
  meta = inject(Meta);

  constructor() {
    const id = this.route.snapshot.params['article'];
    fetch('assets/posts/' + id + '.md')
      .then(response => response.ok ? response.text() : undefined)
      .then(data => this.parseData(data))
      .catch(error => { console.warn(error); this.loading = false });
  }
  parseData(data: string | undefined): void {
    if (!data) { this.loading = false; return; };
    this.heading = getMarkdownHeading(data);
    this.article = getMarkdownBody(data);
    this.loading = false;
    this.setMeta(this.heading);
  }

  setMeta(heading: MarkdownHeading | undefined): void {
    if (!heading) return;
    this.title.setTitle(heading.subtitle + ' | Bloguesillo de Daiant');
    this.meta.removeTag('property="og:image"');
    console.log(this.meta.addTag({ property: 'og:image', content: 'https://daiant.github.io/proyecto-nombre/' + heading.img }));

  }

  getHeadings(): HTMLHeadingElement[] {
    const headings: HTMLHeadingElement[] = [];
    globalThis.document.querySelectorAll('article h2').forEach(h => {
      headings.push(h as HTMLHeadingElement);
    })
    return headings;
  }

  getDate(): string {
    return new Intl.DateTimeFormat('es', { dateStyle: 'full' }).format(new Date(this.heading?.date ?? new Date()))
  }

  getTagUrl(tag: string): string {
    return `/blog?tags=${tag}`;
  }

  handleScrollIntoView(h: HTMLHeadingElement) {
    h.scrollIntoView({ behavior: 'smooth' });
  }
}
