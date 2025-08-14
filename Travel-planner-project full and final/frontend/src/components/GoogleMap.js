import { Wrapper, Status } from '@googlemaps/react-wrapper';
import { useEffect, useRef } from 'react';

const MapComponent = ({ destinations }) => {
  const ref = useRef();

  useEffect(() => {
    const map = new window.google.maps.Map(ref.current, {
      center: { lat: 40.7128, lng: -74.0060 }, // Default to NYC
      zoom: 8,
    });

    destinations.forEach((destination) => {
      if (destination.latitude && destination.longitude) {
        new window.google.maps.Marker({
          position: { lat: destination.latitude, lng: destination.longitude },
          map,
          title: destination.location,
        });
      }
    });
  }, [destinations]);

  return <div ref={ref} style={{ width: '100%', height: '400px' }} />;
};

const render = (status) => {
  switch (status) {
    case Status.LOADING:
      return <div>Loading...</div>;
    case Status.FAILURE:
      return <div>Error loading map</div>;
    case Status.SUCCESS:
      return <MapComponent />;
    default:
      return null;
  }
};

const GoogleMap = ({ destinations = [] }) => {
  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  
  if (!apiKey || apiKey === 'your_google_maps_api_key_here') {
    return <div>Google Maps API key not configured</div>;
  }

  return (
    <Wrapper apiKey={apiKey} render={render}>
      <MapComponent destinations={destinations} />
    </Wrapper>
  );
};

export default GoogleMap;