import { lazy } from 'react';

const RegisterPage = lazy(() => import('@pages/RegisterPage'));

const LoginPage = lazy(() => import('@pages/LoginPage'));

const DashboardPage = lazy(() => import('@pages/DashboardPage'));

const SettingsPage = lazy(() => import('@pages/SettingsPage'));

const HomePage = lazy(() => import('@pages/HomePage'));

const TermsPage = lazy(() => import('@pages/TermsPage'));

const PrivacyPage = lazy(() => import('@pages/PrivacyPage'));

const Error404 = lazy(() => import('@pages/errors/Error404'));

import { baseURL } from '@api/http/http';

const routes = [
  {
    path: '/register',
    component: RegisterPage,
    title: 'Регистрация',
    description: 'Регистрация',
    url: `${baseURL}/register`,
  },
  {
    path: '/login',
    component: LoginPage,
    title: 'Вход',
    description: 'Регистрация',
    url: `${baseURL}/login`,
    private: false,
  },
  {
    path: '/dashboard',
    component: DashboardPage,
    title: 'Мои доски',
    description: 'Регистрация',
    url: `${baseURL}/dashboard`,
    private: true,
  },
  {
    path: '/settings',
    component: SettingsPage,
    title: 'Настройки',
    description: 'Регистрация',
    url: `${baseURL}/settings`,
    private: true,
  },
  {
    path: '/',
    component: HomePage,
    title: 'Главная',
    description: 'Регистрация',
    url: `${baseURL}/`,
    private: false,
  },
  {
    path: '/terms',
    component: TermsPage,
    title: 'Условия пользования',
    description: 'Регистрация',
    url: `${baseURL}/terms`,
    private: false,
  },
  {
    path: '/privacy',
    component: PrivacyPage,
    title: 'Политика конфиденциальности',
    description: 'Регистрация',
    url: `${baseURL}/privacy`,
    private: false,
  },
  {
    path: '*',
    component: Error404,
    title: 'Ошибка - 404',
    description: 'Ошибка 404',
    url: `${baseURL}/*`,
    private: false,
  },
];

export default routes;
