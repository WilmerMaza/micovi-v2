import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Validators } from '../../utils/Validators';
import Swal from 'sweetalert2';
import { customOptions } from '../../utils/alert_Toast';
import { ActivatedRoute } from '@angular/router';
import { SpinnerService } from '../../shared/services/spinner.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit {
  constructor(
    private route$: ActivatedRoute,
    private spinner: SpinnerService
  ) {}
  public ngOnInit(): void {
    const {
      snapshot: {
        queryParams: { newpay },
      },
    } = this.route$;
    if (!Validators.isNullOrUndefined(newpay)) {
      this.newPayCompleted();
    }

    // this.spinner.show(); // activa el loading
    // setTimeout(() => {
    //   this.spinner.hide(); // desactiva tras 3s
    // }, 3000000);
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
