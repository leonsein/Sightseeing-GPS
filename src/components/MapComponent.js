import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const MapComponent = ({ locations }) => {
  return (
    <MapContainer center={[19.4326, -99.1332]} zoom={13} className="map">
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {locations.map(location => (
        <Marker
          key={location.id}
          position={[location.coordenadas.lat, location.coordenadas.lng]}
        >
          <Popup>
            <h3>{location.nombre}</h3>
            <p>{location.notas}</p>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapComponent;
