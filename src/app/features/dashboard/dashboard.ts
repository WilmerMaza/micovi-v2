import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Validators } from '../../utils/Validators';
import Swal from 'sweetalert2';
import { customOptions } from '../../utils/alert_Toast';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div id="conten-dashboard">
      <div class="dashboard" id="dashboard">
        <div class="imgDash">
          <img src="./images/dashboard.png" alt="" />
        </div>
      </div>
    </div>
  `,
  styles: `
#conten-dashboard {
  height: 100%; /* llena el alto del content */
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f7f7f9;
  .dashboard {
    width: 100%;
    height: 100%; /* ¡clave! ocupa todo */
    border-radius: 15px;
    background: #ffffff;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.15);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .imgDash img {
    max-width: 100%;
    height: auto;
    object-fit: contain;
  }
}
/* Responsive (si quieres distinto comportamiento en mobile) */
@media (max-width: 768px) {
  #conten-dashboard {
    padding: 12px;
  }
  #conten-dashboard .dashboard {
    border-radius: 8px;
  }
}
  `,
})
export class Dashboard implements OnInit {
  constructor(private route$: ActivatedRoute) {}

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
