import {Component, OnInit} from '@angular/core';
import {BaseLink} from 'src/app/global/base-link';

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.scss']
})
export class ReportListComponent implements OnInit {
  links: Array<BaseLink> = [
    {
      icon: 'fas fa-users',
      title: 'Clientes por Cobrar',
      detail: 'Lista de Clientes por Cobrar',
      link: '/report/receivable'
    },
    {
      icon: 'fas fa-network-wired',
      title: 'Cantidad de Equipos',
      detail: 'Equipos por Planes de Servicio',
      link: '/report/number-of-devices'
    },
    {
      icon: 'fas fa-money-check-alt',
      title: 'Servicios Sin Registro de Pago',
      detail: 'Lista de Servición sin registro de Pago',
      link: '/report/services-without-payment'
    },
    {
      icon: 'fas fa-window-close',
      title: 'Clientes Archivados',
      detail: 'Lista de Clientes Archivados',
      link: '/report/disconnected-clients'
    },
    {
      icon: 'fas fa-door-closed',
      title: 'Servicios Suspendidos',
      detail: 'Lista de Servicios Suspendidos',
      link: '/report/disconnected-services'
    },
    {
      icon: 'fas fa-users',
      title: 'Clientes Activos',
      detail: 'Lista de Clientes Activos',
      link: '/report/active-clients'
    },
    {
      icon: 'far fa-credit-card',
      title: 'Diario de Pagos',
      detail: 'Lista de Pagos diario',
      link: '/report/payment-journal'
    },
    {
      icon: 'fas fa-wifi',
      title: 'Instalación Diaria',
      detail: 'Lista de Instalaciones por dia',
      link: '/report/daily-installation'
    },
    {
      icon: 'fas fa-chart-pie',
      title: 'Total Clientes',
      detail: 'Grafico Total Clientes',
      link: '/report/total-clients'
    },
  ];

  constructor() {
  }

  ngOnInit(): void {
  }

}
