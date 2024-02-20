import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

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
}
