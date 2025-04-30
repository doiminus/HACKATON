import React, { useState, useRef, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import EventCardMap from './EventCardMap';
import { useSelector } from 'react-redux';
import 'bootstrap-icons/font/bootstrap-icons.css';

const LeafletMapComponent = ({ events }) => {

  const selected_event = useSelector(state => state.data.selected_event);

  useEffect(() => {
    if (selected_event !== 0) {
        console.log('Selected event changed to:', selected_event);
    }
}, [selected_event])


  const [showAllPopups, setShowAllPopups] = useState(true);
  const popupRefs = useRef([]);

  useEffect(() => {
    popupRefs.current.forEach((ref, index) => {
      if (ref) {
        const marker = ref._source;
        if (showAllPopups) {
          marker.openPopup();
        } else {
          marker.closePopup();
        }
      }
    });
  }, [showAllPopups]);

  useEffect(() => {
    if (selected_event !== 0 && popupRefs.current.length > 0) {
      const selectedIndex = events.findIndex(event => event.id === selected_event);
      if (selectedIndex !== -1 && popupRefs.current[selectedIndex]) {
        popupRefs.current[selectedIndex]._source.openPopup();
      }
    }
  }, [selected_event, events]);
  

  const togglePopups = () => {
    setShowAllPopups((prev) => !prev);
  };

  return (
    <div className="relative h-full w-full z-[00]">
      <button
        onClick={togglePopups}
        className="absolute z-[1000] top-4 right-4 bg-white text-zagreb-blue border border-zagreb-blue px-3 py-1 rounded shadow-md hover:bg-zagreb-blue hover:text-white transition"
      >
        <i className={`bi ${showAllPopups ? 'bi-eye-slash' : 'bi-eye'} mr-2`}></i>
        {showAllPopups ? 'Sakrij' : 'Prikaži'}
      </button>

      <MapContainer center={[45.815, 15.9819]} zoom={12} style={{ width: '100%', height: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {events.map((event, index) => (
          <Marker
            key={event.id}
            position={[event.coordinates.lat, event.coordinates.lng]}
            icon={L.icon({
              iconUrl: 'https://unpkg.com/leaflet/dist/images/marker-icon.png',
              iconSize: [25, 41],
              iconAnchor: [12, 41],
            })}
          >
            <Popup
              ref={(ref) => (popupRefs.current[index] = ref)}
              maxWidth={350}
              className="custom-popup"
            >
              <div
                style={{
                  marginLeft: '-21px',
                  marginRight: '-26px',
                  marginTop: '20px',
                  marginBottom: '-15px',
                  width: '350px',
                }}
              >
                <EventCardMap
                  sport={event.sport}
                  teamA={event.teamA}
                  teamB={event.teamB}
                  venue={event.venue}
                  date={event.date}
                  time={event.time}
                  imageUrl={event.imageUrl}
                  teamAScore={event.score_home}
                  teamBScore={event.score_away}
                />
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default LeafletMapComponent;
