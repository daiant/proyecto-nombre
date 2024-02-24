import { Component } from '@angular/core';
import { FooterGameComponent } from './footer-game/footer-game.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [FooterGameComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

}
