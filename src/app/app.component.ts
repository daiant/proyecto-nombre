import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "@/components/navbar/navbar.component";
import { ThumbnailComponent } from "@/components/blog/thumbnail/thumbnail.component";
import { FooterComponent } from "./components/footer/footer.component";

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [CommonModule, RouterOutlet, NavbarComponent, ThumbnailComponent, FooterComponent]
})
export class AppComponent {
}
