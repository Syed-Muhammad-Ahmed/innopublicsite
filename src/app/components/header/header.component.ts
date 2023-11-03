import { AfterViewInit, Component, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements AfterViewInit, OnDestroy {
  toggleButton: any;

  constructor() {}

  ngAfterViewInit(): void {
    this.toggleButton = document.getElementsByClassName('toggle-button')[0];
    const options = document.getElementsByClassName('options')[0];

    this.toggleButton.addEventListener('click', (e: any) => {
      e.stopPropagation(); // stop event propagation
      options.classList.toggle('active');
    });

    document.addEventListener('click', (e: any) => {
      if (
        options.classList.contains('active') &&
        !e.target.classList.contains('toggle-button')
      ) {
        options.classList.remove('active');
      }
    });
  }

  collapseNavbar = () => {
    let navbarCollapse = document.getElementById('navbarResponsive')!;
    if (navbarCollapse.classList.contains('active')) {
      navbarCollapse.classList.remove('active');
    }
  };

  ngOnDestroy(): void {
    document.removeEventListener('click', () => {});
    this.toggleButton.removeEventListener('click', () => {});
  }
}
