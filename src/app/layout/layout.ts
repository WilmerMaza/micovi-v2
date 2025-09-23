import { CommonModule } from '@angular/common';
import { Component, signal, WritableSignal, HostListener, OnDestroy } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Sidenav } from './components/sidenav/sidenav';
import { Nav } from './components/nav/nav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { Spinner } from '../shared/components/spinner/spinner';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule,
    MatSidenavModule,
    RouterOutlet,
    Nav,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatSidenavModule,
    Sidenav,
    Spinner,
  ],
  templateUrl: './layout.html',
  styleUrls: ['./layout.scss'],
})
export class Layout implements OnDestroy {
  private readonly STORAGE_KEY = 'sidebar-collapsed';
  
  readonly collapsed = signal(this.getSavedState());
  readonly isMobile = signal(this.checkIsMobile());
  
  toggle = () => {
    this.collapsed.update((v) => {
      const newValue = !v;
      this.saveState(newValue);
      return newValue;
    });
    
    // En móvil, manejar el scroll del body
    if (this.isMobile()) {
      this.toggleBodyScroll();
    }
  };
  
  // Cerrar con clic en backdrop (solo móvil)
  onBackdropClick = () => {
    if (this.isMobile() && !this.collapsed()) {
      this.toggle();
    }
  };
  
  // Cerrar sidebar cuando se emite desde el componente hijo (navegación en móvil)
  onCloseSidebar = () => {
    if (this.isMobile() && !this.collapsed()) {
      this.toggle();
    }
  };

  private getSavedState(): boolean {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(this.STORAGE_KEY);
      const isMobile = window.innerWidth < 768;
      
      // En móvil, siempre empezar colapsado
      if (isMobile) {
        return true;
      }
      
      return saved ? JSON.parse(saved) : false;
    }
    return false;
  }

  private saveState(state: boolean): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(state));
    }
  }
  
  private checkIsMobile(): boolean {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 768;
    }
    return false;
  }
  
  private toggleBodyScroll(): void {
    if (typeof document !== 'undefined') {
      if (this.collapsed()) {
        // Sidebar cerrado - permitir scroll
        document.body.style.overflow = '';
        document.body.style.position = '';
      } else {
        // Sidebar abierto - bloquear scroll
        document.body.style.overflow = 'hidden';
        document.body.style.position = 'fixed';
      }
    }
  }
  
  // Escuchar cambios de tamaño de ventana
  @HostListener('window:resize')
  onResize() {
    const wasMobile = this.isMobile();
    const isNowMobile = this.checkIsMobile();
    
    this.isMobile.set(isNowMobile);
    
    // Si cambió de móvil a desktop, restaurar scroll
    if (wasMobile && !isNowMobile) {
      document.body.style.overflow = '';
      document.body.style.position = '';
    }
  }
  
  // Cerrar con tecla Esc
  @HostListener('window:keydown.escape')
  onEscapeKey() {
    if (this.isMobile() && !this.collapsed()) {
      this.toggle();
    }
  }
  
  ngOnDestroy() {
    // Restaurar scroll al destruir componente
    if (typeof document !== 'undefined') {
      document.body.style.overflow = '';
      document.body.style.position = '';
    }
  }
}
