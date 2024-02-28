import { CommonModule } from '@angular/common';
import { Component, Input, inject, input } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-thumbnail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './thumbnail.component.html',
  styleUrl: './thumbnail.component.css'
})
export class ThumbnailComponent {
  @Input() big: boolean = false;
  @Input() summary: boolean = false;
  @Input() src: string = 'assets/monstera.webp';
  @Input() title: string = '';
  @Input() subtitle: string = '';
  route = inject(ActivatedRoute);
  @Input() url: string = '';
}
