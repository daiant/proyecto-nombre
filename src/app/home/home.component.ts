import { ThumbnailComponent } from '@/components/blog/thumbnail/thumbnail.component';
import { NavbarComponent } from '@/components/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent, ThumbnailComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
