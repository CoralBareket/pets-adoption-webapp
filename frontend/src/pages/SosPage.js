import React, { useEffect, useState, useCallback, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '../../src/assets/styles/SosPage.css';

const SosPage = () => {
  const mapRef = useRef(null);
  const [markers, setMarkers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newMarker, setNewMarker] = useState({ type: 'dog', message: '', position: null });
  const [tempMarker, setTempMarker] = useState(null);

  useEffect(() => {
    // Load markers from local storage
    const storedMarkers = JSON.parse(localStorage.getItem('sosMarkers') || '[]');
    setMarkers(storedMarkers);
  }, []);

  useEffect(() => {
    // Save markers to local storage whenever they change
    localStorage.setItem('sosMarkers', JSON.stringify(markers));
  }, [markers]);

  const handleMapClick = useCallback((e) => {
    const { lat, lng } = e.latlng;
    setNewMarker(prev => ({ ...prev, position: [lat, lng] }));
    
    if (tempMarker) {
      mapRef.current.removeLayer(tempMarker);
    }
    
    const icon = L.divIcon({
      className: `custom-div-icon ${newMarker.type}-icon`,
      html: `<div class="marker-dot"></div>`,
      iconSize: [10, 10],
      iconAnchor: [5, 5]
    });
    
    const marker = L.marker([lat, lng], { icon }).addTo(mapRef.current);
    setTempMarker(marker);
    setShowForm(true);
  }, [newMarker.type, tempMarker]);

  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = L.map('map').setView([31.97029367440093, 34.77054189275909], 15);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(mapRef.current);
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.on('click', handleMapClick);
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.off('click', handleMapClick);
      }
    };
  }, [handleMapClick]);

  useEffect(() => {
    if (mapRef.current) {
      // Clear existing markers
      mapRef.current.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
          mapRef.current.removeLayer(layer);
        }
      });

      // Add markers
      markers.forEach(marker => {
        const icon = L.divIcon({
          className: `custom-div-icon ${marker.type}-icon`,
          html: `<div class="marker-dot"></div>`,
          iconSize: [10, 10],
          iconAnchor: [5, 5]
        });

        const leafletMarker = L.marker(marker.position, { icon })
          .addTo(mapRef.current)
          .bindPopup(createPopupContent(marker));

        leafletMarker.on('popupopen', () => {
          const deleteButton = document.getElementById(`delete-${marker.id}`);
          if (deleteButton) {
            deleteButton.addEventListener('click', () => handleDeleteMarker(marker.id));
          }
        });
      });
    }
  }, [markers]);

  const createPopupContent = (marker) => {
    const isCreator = marker.creatorId === localStorage.getItem('userId');
    return `
      <div>
        <p>${marker.message}</p>
        ${isCreator ? `<button id="delete-${marker.id}" class="delete-marker-btn">הסרה</button>` : ''}
      </div>
    `;
  };

  const handleDeleteMarker = (markerId) => {
    setMarkers(prevMarkers => prevMarkers.filter(marker => marker.id !== markerId));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (newMarker.position) {
      const userId = localStorage.getItem('userId') || Math.random().toString(36);
      localStorage.setItem('userId', userId);

      const markerWithId = {
        ...newMarker,
        id: Math.random().toString(36),
        creatorId: userId
      };

      setMarkers(prev => [...prev, markerWithId]);
      setShowForm(false);
      setNewMarker({ type: 'dog', message: '', position: null });
      if (tempMarker) {
        mapRef.current.removeLayer(tempMarker);
        setTempMarker(null);
      }
    } else {
      alert('נא לבחור מיקום על המפה');
    }
  };

  return (
    <div className="sos-page">
      <div className="sos-header">
        <h1>SOS - חיות אבודות</h1>
        <p>לחץ על המפה כדי לדווח על חיה אבודה</p>
      </div>
      <div className="map-legend-container">
        <div className="legend">
          <h3>מקרא</h3>
          <div className="legend-item">
            <div className="legend-color dog-color"></div>
            <span className="legend-text">כלב אבוד</span>
          </div>
          <div className="legend-item">
            <div className="legend-color cat-color"></div>
            <span className="legend-text">חתול אבוד</span>
          </div>
        </div>
        <div className="map-container" id="map"></div>
      </div>
      {showForm && (
        <div className="form-overlay">
          <form onSubmit={handleFormSubmit}>
            <select
              value={newMarker.type}
              onChange={(e) => setNewMarker(prev => ({...prev, type: e.target.value}))}
            >
              <option value="dog">כלב</option>
              <option value="cat">חתול</option>
            </select>
            <input
              type="text"
              value={newMarker.message}
              onChange={(e) => setNewMarker(prev => ({...prev, message: e.target.value}))}
              placeholder="הוסף תיאור"
              required
            />
            <button type="submit" className="sos-button pulse-animation">הוסף דיווח</button>
            <button type="button" className="cancel-button" onClick={() => {
              setShowForm(false);
              if (tempMarker) {
                mapRef.current.removeLayer(tempMarker);
                setTempMarker(null);
              }
            }}>ביטול</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default SosPage;