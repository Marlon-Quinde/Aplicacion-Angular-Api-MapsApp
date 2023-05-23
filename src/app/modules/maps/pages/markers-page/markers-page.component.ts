import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { LngLat, Map, Marker } from 'mapbox-gl';
import { MarKerAndColor, PlainMarker } from '../../interfaces/markerAndColor.interface';


@Component({
  templateUrl: './markers-page.component.html',
  styleUrls: ['./markers-page.component.css']
})
export class MarkersPageComponent implements AfterViewInit {

  @ViewChild('map') divMap?: ElementRef;

  public markers: MarKerAndColor[] = []

  public zoom: number = 10;
  public map?: Map;
  public lngLat: LngLat = new LngLat(-79.81845133287717, -2.161659836451591)

  ngAfterViewInit(): void {

    if(!this.divMap) throw 'No existe'
      this.map = new Map({
      container: this.divMap?.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.lngLat, // starting position [lng, lat]
      zoom: 13, // starting zoom
      });

    this.readFromLocalStorage();
    // const markerHtml = document.createElement('div');
    // markerHtml.innerHTML = 'Marlon Quinde'

    // const marker = new Marker({
    //   color: 'red',
    //   element: markerHtml
    // })
    // .setLngLat(this.lngLat).addTo(this.map)

  }

  createMarker(){

    if(!this.map) return

    const color = '#xxxxxx'.replace(/x/g, y=>(Math.random()*16|0).toString(16));
    const lngLat = this.map?.getCenter()
    this.addMarker(lngLat, color)
  }

  addMarker(lngLat: LngLat, color: string){
    if(!this.map) return

    const marker = new Marker({
      color: color,
      draggable: true
    })
      .setLngLat(lngLat)
      .addTo( this.map );


    this.markers.push ({color: color, marker: marker });

    this.saveToLocalStorage();
    marker.on('dragend', () => {
      this.saveToLocalStorage()
    })
  }

  deleteMarker(index: number){
    this.markers[index].marker.remove();
    this.markers.splice(index, 1);
  }

  flyTo(marker: Marker){
    this.map?.flyTo({
      zoom: 14,
      center: marker.getLngLat()      
    })
  }

  saveToLocalStorage(){
    
    const plainMarkers: PlainMarker[] = this.markers.map( ( {color , marker} ) => {
      return {
        color: color,
        lngLat: marker.getLngLat().toArray()
      }
    } );

    localStorage.setItem('plainMarkers', JSON.stringify(plainMarkers))
  }

  readFromLocalStorage(){
    const plainMarkersString = localStorage.getItem('plainMarkers') ?? '[]'
    const plainMarkers: PlainMarker[] = JSON.parse(plainMarkersString)

    plainMarkers!.forEach( ( plainMarker ) => {
      const [ lng, lat ]  = plainMarker.lngLat!
      const coords = new LngLat( lng , lat )
      this.addMarker(coords , plainMarker.color)
    })
  }
}
