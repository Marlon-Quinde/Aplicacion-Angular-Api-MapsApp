import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuItem } from '../../../maps/interfaces/menuItem.interface';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'side-menu',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent {

  public menuItem: MenuItem[] = [
    { route: '/maps/fullscreen', name: 'fullScreen' },
    { route: '/maps/zoom-range', name: 'Zoom-Range' },
    { route: '/maps/markers', name: 'Markers' },
    { route: '/maps/porperties', name: 'House' },
    { route: '/alone', name: 'Along Page' },
  ]
}
