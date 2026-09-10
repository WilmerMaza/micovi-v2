/**
 * Componente principal del módulo de deportistas.
 *
 * Muestra el listado de deportistas con búsqueda, filtros, paginación,
 * y acciones de ver, editar y eliminar. Utiliza datos reales del backend.
 */
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MATERIAL_IMPORTS } from '../../../../shared/modules/material-imports';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { SportsmanService } from '../../services/sportsman.service';
import { Athlete, AthleteFilters, CatalogItem } from '../../../../view/models/athlete.model';
import { Toast } from '../../../../utils/alert_Toast';

@Component({
  selector: 'app-sportsman',
  standalone: true,
  imports: [CommonModule, FormsModule, MatProgressSpinnerModule, MatButtonModule, ...MATERIAL_IMPORTS],
  templateUrl: './sportsman.component.html',
  styleUrls: ['./sportsman.component.scss'],
})
export class SportsmanComponent implements OnInit {
  athletes: Athlete[] = [];
  categories: CatalogItem[] = [];
  disciplines: CatalogItem[] = [];
  genders: CatalogItem[] = [];

  totalCount = 0;
  currentPage = 1;
  pageSize = 20;
  totalPages = 0;

  searchQuery = '';
  selectedCategory = '';
  selectedDiscipline = '';
  selectedGender = '';

  isLoading = false;
  selectedAthlete: Athlete | null = null;

  constructor(
    private athleteService: SportsmanService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadAthletes();
    this.loadFilters();
  }

  loadAthletes(): void {
    this.isLoading = true;
    const filters: AthleteFilters = {
      page: this.currentPage,
      limit: this.pageSize,
    };

    if (this.searchQuery) filters.search = this.searchQuery;
    if (this.selectedCategory) filters.categoryId = this.selectedCategory;
    if (this.selectedDiscipline) filters.disciplineId = this.selectedDiscipline;
    if (this.selectedGender) filters.genderId = this.selectedGender;

    this.athleteService.getAthletes(filters).subscribe({
      next: (res) => {
        this.athletes = res.data;
        this.totalCount = res.total;
        this.totalPages = res.totalPages;
        this.isLoading = false;
      },
      error: () => {
        this.athletes = [];
        this.isLoading = false;
        Toast.fire({ icon: 'error', title: 'Error al cargar deportistas' });
      },
    });
  }

  private loadFilters(): void {
    this.athleteService.getCategoriesBySchool('current').subscribe({
      next: (res) => (this.categories = res),
      error: () => {},
    });
    this.athleteService.getGenders().subscribe({
      next: (res) => (this.genders = res),
      error: () => {},
    });
  }

  onSearch(): void {
    this.currentPage = 1;
    this.loadAthletes();
  }

  onFilterChange(): void {
    this.currentPage = 1;
    this.loadAthletes();
  }

  clearFilters(): void {
    this.searchQuery = '';
    this.selectedCategory = '';
    this.selectedDiscipline = '';
    this.selectedGender = '';
    this.currentPage = 1;
    this.loadAthletes();
  }

  createAthlete(): void {
    this.router.navigate(['/app/sportsman/create']);
  }

  viewAthlete(athlete: Athlete): void {
    this.selectedAthlete = athlete;
  }

  editAthlete(athlete: Athlete): void {
    this.router.navigate(['/app/sportsman/edit', athlete.id]);
  }

  deleteAthlete(athlete: Athlete): void {
    if (confirm(`¿Está seguro de eliminar a ${athlete.firstName} ${athlete.lastName}?`)) {
      this.athleteService.deleteAthlete(athlete.id).subscribe({
        next: () => {
          Toast.fire({ icon: 'success', title: 'Deportista eliminado' });
          this.loadAthletes();
          if (this.selectedAthlete?.id === athlete.id) {
            this.selectedAthlete = null;
          }
        },
        error: () => {
          Toast.fire({ icon: 'error', title: 'Error al eliminar deportista' });
        },
      });
    }
  }

  closeDetail(): void {
    this.selectedAthlete = null;
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadAthletes();
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadAthletes();
    }
  }

  getPhotoUrl(athlete: Athlete): string {
    if (athlete.photoUrl) {
      return athlete.photoUrl;
    }
    return 'assets/images/default-avatar.png';
  }

  getAge(birthDate: string): number {
    const birth = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  }
}
