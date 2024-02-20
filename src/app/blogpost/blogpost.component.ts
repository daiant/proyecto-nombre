import { NavbarComponent } from '@/components/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThumbnailComponent } from "../components/blog/thumbnail/thumbnail.component";

@Component({
  selector: 'app-blogpost',
  standalone: true,
  templateUrl: './blogpost.component.html',
  styleUrl: './blogpost.component.css',
  imports: [CommonModule, RouterOutlet, NavbarComponent, ThumbnailComponent]
})
export class BlogpostComponent {

}
