//Zahtjeva account
import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100%',
};

const defaultCenter = {
  lat: 45.815,
  lng: 15.9819,
};

const GoogleMapComponent = ({ events }) => {
  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={defaultCenter}
        zoom={12}
      >
        {events.map((event) => (
          <Marker
            key={event.id}
            position={{
              lat: event.coordinates.lat,
              lng: event.coordinates.lng,
            }}
            title={`${event.teamA} vs ${event.teamB}`}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default GoogleMapComponent;
