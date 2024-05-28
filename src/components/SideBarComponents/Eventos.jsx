import React, { useEffect } from 'react';
import NavigationBar from '../NavigationBar';
import { Loader } from '@googlemaps/js-api-loader';

const loader = new Loader({
  apiKey: "AIzaSyDXRxAgMqLPZudSmizsUgkQfXSGhwuh02g",
  version: "weekly",
});

export const Eventos = () => {
  useEffect(() => {
    loader.load().then(async () => {
      if (typeof google !== 'undefined') {
        const { Map } = await google.maps.importLibrary('maps');

        new Map(document.getElementById('map'), {
          center: { lat: -10.941024823047577,  lng: -74.80405616314602 },
          zoom: 8,
        });
      } else {
        console.error('Google Maps no está disponible.');
      }
    }).catch(e => {
      console.error('Error al cargar Google Maps:', e);
    });
  }, []);

  return (
    <div className=''>
      <NavigationBar />
      <div id="map" style={{ height: '50vh', width: '55%' }} />
    </div>
  );
};

export default Eventos;
