import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { customOptions } from '../../utils/alert_Toast';
import { Validators } from '../../utils/Validators';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="welcome-container">
  <div class="welcome-content">
    <h1 class="welcome-title">¡Bienvenido!</h1>

    <div class="imgDash">
      <img src="./images/dashboard.png" alt="" />
    </div>
    <!-- <p class="welcome-subtitle">Sistema de gestión deportiva y entrenamiento</p> -->
  </div>
</div>

  `,
  styles: `
.welcome-container {
  height: 100%;
  padding: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #F9FAFB;
}

.welcome-content {
  text-align: center;
  max-width: 800px;
  width: 100%;
}

.welcome-title {
  font-size: 3rem;
  font-weight: bold;
  color: #3886F6;
  margin-bottom: 1rem;
  font-family: 'Inria Sans', sans-serif;
}

.welcome-subtitle {
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 3rem;
  font-weight: 300;
}

@media (max-width: 768px) {
  .welcome-container {
    padding: 1rem;
  }

  .welcome-title {
    font-size: 2.5rem;
  }
}

  `,
})
export class Dashboard implements OnInit {
  constructor(private route$: ActivatedRoute) { }

  public ngOnInit(): void {
    const {
      snapshot: {
        queryParams: { newpay },
      },
    } = this.route$;
    if (!Validators.isNullOrUndefined(newpay)) {
      this.newPayCompleted();
    }
  }

  private newPayCompleted(): void {
    Swal.fire(customOptions);
    this.createConfeti();
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
