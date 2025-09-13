import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    // {
    //     path: '',
    //     pathMatch: 'full',
    //     loadComponent: () => {
    //         return import('./home.component')
    //     }
    // },
    {
        path: 'login',
        loadComponent: () => {
            return import('./pages/login-page/login-page.component').then(c => c.LoginPageComponent)
        }
    },
    {
        path: 'search',
        loadComponent: () => {
            return import('./pages/search-result-page/search-result-page.component').then(c => c.SearchResultPageComponent);
        },
        canActivateChild: [AuthGuard]
    },
    {
        path: 'dashboard',
        loadComponent: () => {
            return import('./pages/dashboard-page/dashboard-page.component').then(c => c.DashboardPageComponent)
        },
        canActivate: [AuthGuard],
        // canActivateChild: [AuthGuard],
        // children: [
        // ]
    },
    {
        path: 'merchant/:id',
        loadComponent: () => {
            return import('./features/merchant/pages/merchant-dashboard/merchant-dashboard.component').then(c => c.MerchantDashboardComponent)
        },
        canActivate: [AuthGuard]
    },
    {
        path: 'profile',
        loadComponent: () => {
            return import('./pages/profile-page/profile-page.component').then(c => c.ProfilePageComponent);
        },
        canActivate: [AuthGuard]
    },
    {
        path: '**',
        loadComponent: () => {
            return import('./pages/not-found/not-found.component').then(c => c.NotFoundComponent);
        }
    }
];
