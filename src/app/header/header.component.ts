import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  user: any;
  async ngOnInit() {
    await this.getUserInfo();
  }
constructor(private authService: AuthService, private router: Router) {}
  async getUserInfo(): Promise<void> {
    this.authService.getUserUtilisateur().subscribe((data) => {
      this.user = data;
      localStorage.setItem('user', JSON.stringify(this.user));
      console.log(this.user);
    });
  }
  hasRole(id: number): boolean {
    return this.user?.roles?.some((role: any) => role.idRole === id);
  }
}
