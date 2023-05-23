import { Marker } from 'mapbox-gl';

export interface MarKerAndColor {
    color: string;
    marker: Marker;
}

export interface PlainMarker{
    color: string;
    lngLat: number[];
}

export interface House {
    title: string;
    description: string;
    lngLat: [number, number];
}