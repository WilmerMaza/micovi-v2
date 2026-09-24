/**
 * Home / dashboard de entrada al producto Micovi.
 *
 * Cabina densa: saludo, empty state con CTA a deportistas, KPI de cumplimiento
 * (placeholders) en franja única y atajos a rutas reales del menú.
 * Conserva el flujo newpay + Swal/confeti sin cambios.
 *
 * Ruteado por `/inicio` (features/home/home.routes).
 */
import { CommonModule } from '@angular/common';
import { afterNextRender, Component, OnInit } from '@angular/core';
import { prefetchSecondaryRoutes } from '../../core/loading/route-prefetch';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth';
import { APP_ROUTES } from '../../core/navigation/routes';
import { fireNewPayCelebration } from '../../utils/alert_Toast';
import { Validators } from '../../utils/Validators';

interface DashShortcut {
  label: string;
  hint: string;
  url: string;
  icon: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit {
  greetingLine = 'Hola';
  todayLabel = '';
  todayIso = '';
  shortcuts: DashShortcut[] = [];

  constructor(
    private route$: ActivatedRoute,
    private auth: AuthService,
  ) {
    afterNextRender(() => prefetchSecondaryRoutes());
  }

  public ngOnInit(): void {
    this.buildGreeting();
    this.buildDate();
    this.buildShortcuts();

    const {
      snapshot: {
        queryParams: { newpay },
      },
    } = this.route$;
    if (!Validators.isNullOrUndefined(newpay)) {
      this.newPayCompleted();
    }
  }

  private buildGreeting(): void {
    const user = this.auth.getUser();
    if (user?.email) {
      const local = user.email.split('@')[0]?.trim();
      this.greetingLine = local ? `Hola, ${local}` : 'Hola';
      return;
    }
    this.greetingLine = 'Hola';
  }

  private buildDate(): void {
    const now = new Date();
    this.todayIso = now.toISOString().slice(0, 10);
    this.todayLabel = new Intl.DateTimeFormat('es', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    }).format(now);
  }

  private buildShortcuts(): void {
    // Rutas reales del menú / home.routes (no hay /resultados ni /sesion aún).
    this.shortcuts = [
      {
        label: 'Deportistas',
        hint: 'Entra al listado para planificar y dosificar',
        url: APP_ROUTES.deportistas,
        icon: 'directions_run',
      },
      {
        label: 'Sesión de hoy',
        hint: 'Sin sesión cargada — elige un deportista',
        url: APP_ROUTES.sesiones,
        icon: 'today',
      },
      {
        label: 'Resultados',
        hint: 'Sin datos aún — registra ejecución desde el deportista',
        url: APP_ROUTES.desempenoReportes,
        icon: 'insights',
      },
    ];
  }

  private newPayCompleted(): void {
    void fireNewPayCelebration().then(() => this.createConfeti());
  }

  private createConfeti(): void {
    const container = document.querySelector('.my-swal-container');
    const colores = [
      '#f00',
      '#0f0',
      '#00f',
      '#ff0',
      '#0ff',
      '#f0f',
      '#ff5733',
      '#33ff57',
    ];

    const style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = `
    @keyframes fall {
      0% {
        transform: translateY(0) rotateY(0deg);
      }
      30% {
        transform:translateY(30vh) rotateY(360deg);
      }
      70% {
        transform:translateY(70vh) rotateX(0deg);
      }
      100%{
        transform: translateY(100vh) rotateX(360deg);
      }
    }
    `;

    document.head.appendChild(style);

    for (let i = 0; i < 50; i++) {
      const colorAleatorio =
        colores[Math.floor(Math.random() * colores.length)];
      const confeti = document.createElement('div');
      confeti.classList.add('confeti');
      confeti.style.left = `${Math.random() * 100}%`;
      container?.appendChild(confeti);
      confeti.style.position = 'absolute';
      confeti.style.top = '0';
      confeti.style.width = '10px';
      confeti.style.height = '10px';
      confeti.style.backgroundColor = colorAleatorio;
      confeti.style.borderRadius = '50%';
      confeti.style.animation = `fall ${Math.random() + 2}s linear infinite`;
    }
  }
}
