import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';

@Component({
  selector: 'footer-game',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer-game.component.html',
  styleUrl: './footer-game.component.css'
})
export class FooterGameComponent implements AfterViewInit, OnDestroy {
  private sub: any;
  pills = new Array(70);
  @ViewChild('canvas') canvas!: ElementRef<HTMLElement>;
  ngAfterViewInit(): void {
    this.sub = this.canvas.nativeElement.addEventListener('mousemove', (ev) => this.setPosition(ev));
  }
  ngOnDestroy(): void {
    this.canvas.nativeElement.removeEventListener('mousemove', this.sub);
  }
  x: number = 0;
  y: number = 0;
  setPosition(ev: MouseEvent): void {
    const rect = this.canvas.nativeElement.getBoundingClientRect()
    this.x = (ev.clientX - rect.left) * 100 / rect.width;
    this.y = (ev.clientY - rect.top) * 100 / rect.height;
  }
}