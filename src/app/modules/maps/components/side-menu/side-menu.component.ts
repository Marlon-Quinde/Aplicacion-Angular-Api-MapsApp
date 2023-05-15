import { Component } from '@angular/core';
import { MenuItem } from '../../interfaces/menuItem.interface';

@Component({
  selector: 'maps-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent {

  public menuItem: MenuItem[] = [
    { route: '/maps/fullscreen', name: 'fullScreen' },
    { route: '/maps/zoom-range', name: 'Zoom-Range' },
    { route: '/maps/markers', name: 'Markers' },
    { route: '/maps/properties', name: 'House' },
  ]
}
