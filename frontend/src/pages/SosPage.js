import React, { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import AdoptionForm from '../components/AdoptionForm';
import '../../src/assets/styles/SearchResultsPage.css';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const SosPage = () => {
    useEffect(() => {
      const mapContainer = document.getElementById('map');
  
      if (mapContainer && !mapContainer._leaflet_id) {
        const map = L.map('map').setView([31.97029367440093, 34.77054189275909], 15);
  
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
  
        L.marker([51.505, -0.09]).addTo(map)
          .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
          .openPopup();

           // add markers
      const markers = [
        { position: [31.969782723588914, 34.77108271354341], message: 'כלב אבוד' },
        { position: [31.98324260566256, 34.77125360521737], message: 'כלב אבוד' },
      ];

      markers.forEach(marker => {
        L.marker(marker.position).addTo(map)
          .bindPopup(marker.message)
          .openPopup();
      });
      }
    }, []);
  
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div id="map" style={{ height: '400px', width: '80%', maxWidth: '800px', marginTop: '50px' }}></div>
      </div>
    );
  };
  
  export default SosPage;