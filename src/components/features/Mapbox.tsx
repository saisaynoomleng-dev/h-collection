'use client';

import Map, { Marker } from 'react-map-gl/mapbox';

import { env } from '@/lib/env/client';
import clsx from 'clsx';

import 'mapbox-gl/dist/mapbox-gl.css';

const MAPBOX_TOKEN = env.NEXT_PUBLIC_REACT_MAP_GL_TOKEN;

export default function Mapbox({ className }: { className?: string }) {
  const lat = 39.072841;
  const lng = -84.338625;
  return (
    <div className={clsx('overflow-hidden', className)}>
      <Map
        initialViewState={{
          latitude: lat,
          longitude: lng,
          zoom: 15,
        }}
        style={{ width: 1000, height: 500 }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxAccessToken={MAPBOX_TOKEN}
        scrollZoom={false}
      >
        <Marker longitude={lng} latitude={lat} color="red" />
      </Map>
    </div>
  );
}
