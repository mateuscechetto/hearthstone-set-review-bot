import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';

@Directive({ selector: '[lazyLoad]', standalone: true })
export class LazyLoadDirective implements AfterViewInit {
  @Input() lazyLoadSrc!: string;

  constructor(private readonly el: ElementRef) {}

  ngAfterViewInit() {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          this.el.nativeElement.src = this.lazyLoadSrc;
          observer.disconnect();
        }
      },
      {
        rootMargin: '200px 0px',
      }
    );
    observer.observe(this.el.nativeElement);
  }
}
