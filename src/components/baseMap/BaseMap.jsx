import 'mapbox-gl/dist/mapbox-gl.css';
import './baseMap.scss'
import { useState, useCallback, useRef } from 'react';
import Map, { Marker, NavigationControl, Source, Layer } from 'react-map-gl';
import Pin from '../pin/Pin'
import ControlPanel from '../controlPanel/ControlPanel';
import SearchPanel from '../searchPanel/SearchPanel'

import geoShpFile from '../../Data/shapeFile.geojson'
import Legend from '../legend/Legend';

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN



export default function BaseMap() {
  

  const [timePeriod, setTimePeriod] = useState('Hist');
  const [rcpSenerios, setRcpSenerios] = useState('rcp 4.5')
  // -------Layers---------  

  const [showOutline, setShowOutline] = useState(true)
  const [population, setPopulation] = useState(false)
  const [precipitation, setPrecipitation] = useState(false)
  const [tmax, setTmax] = useState(false)
  const [tropicalNights, setTropicalNights] = useState(false)

  const [markerCoords, setmarkerCoords] = useState({ lon: '', lat: '' })

  //  ---------_For Marker_---------------

  const [marker, setMarker] = useState({
    latitude: 47.373878,
    longitude: 8.545094
  })
  const [events, logEvents] = useState({})

  const onMarkerDragStart = useCallback(event => {
    logEvents(_events => ({ ..._events, onDragStart: event.lngLat }))
  }, [])

  const onMarkerDrag = useCallback(event => {
    logEvents(_events => ({ ..._events, onDrag: event.lngLat }))

    setMarker({
      longitude: event.lngLat.lng,
      latitude: event.lngLat.lat
    })
  }, [])

  const onMarkerDragEnd = useCallback(event => {
    logEvents(_events => ({ ..._events, onDragEnd: event.lngLat }))
  }, [])

  // ------------Map Sources and Layers-------------

  const boundaryStyle = {
    'id': 'data',
    'type': 'line',
    'paint': {
      'line-color': "#f00"
    }
  }

  const skyLayer = {
    id: "sky",
    type: "sky",
    paint: {
      "sky-type": "atmosphere",
      "sky-atmosphere-sun": [0.0, 0.0],
      "sky-atmosphere-sun-intensity": 15
    }
  }

  // Zoom to city
  const mapRef = useRef()

  const onSelectCity = useCallback((longitude, latitude) => {
    mapRef.current?.flyTo({ center: [longitude, latitude], duration: 2000, zoom: 12 });
  }, []);

  const styleArray = {
    populationStyle: "mapbox://styles/arindambhowal/cl85g0051006t14o6olfggpvo",
    precipitationStyle: {
      hist: "mapbox://styles/arindambhowal/cl862t7m900ga14pmvsrax5w3",
      current: "mapbox://styles/arindambhowal/cl8657qn7000z15qv1pcrn9h9",
      rcp45_near_future: "mapbox://styles/arindambhowal/cl865e4tn005t14l5o4ydvwna",
      rcp45_mid_future: "mapbox://styles/arindambhowal/cl865o64m00b215mli6u1utbx",
      rcf45_far_future: "mapbox://styles/arindambhowal/cl865v7vl006z14nthotdjr4k",
      rcp26_near_future: "mapbox://styles/arindambhowal/cl86617ni000714tcufznzvvg",
      rcp26_mid_future: "mapbox://styles/arindambhowal/cl86660tt000814tcsldrxwna",
      rcp26_far_future: "mapbox://styles/arindambhowal/cl866he7d000k15qdaw0amv3h",
      rcp85_near_future: "mapbox://styles/arindambhowal/cl866wqxa000u14nm8r0i9sqn",
      rcp85_mid_future: "mapbox://styles/arindambhowal/cl8674r2t000c14ob42wezhbe",
      rcp85_far_future: "mapbox://styles/arindambhowal/cl867aq2o000x14pl9t8hkki5"
    },
    tmaxStyle: {
      current: "mapbox://styles/arindambhowal/cl86e7uer007w14phuvocou8l",
      rcp45_near_future: "mapbox://styles/arindambhowal/cl86f7zbl000o16o3s56xbe8d",
      rcp45_mid_future: "mapbox://styles/arindambhowal/cl86f3pqi007j14o6fswzdor6",
      rcf45_far_future: "mapbox://styles/arindambhowal/cl86f0n9i00l214mpe4zhpegh",
      rcp26_near_future: "mapbox://styles/arindambhowal/cl86evbtl000r15qd5d54a74g",
      rcp26_mid_future: "mapbox://styles/arindambhowal/cl86eqkrp000v14qhb9uizd4q",
      rcp26_far_future: "mapbox://styles/arindambhowal/cl86e7uer007w14phuvocou8l",
      rcp85_near_future: "mapbox://styles/arindambhowal/cl86fgzya00gg14pmj88k7bx0",
      rcp85_mid_future: "mapbox://styles/arindambhowal/cl86fegao001315qvl54tq9hp",
      rcp85_far_future: "mapbox://styles/arindambhowal/cl86fbi6x001114nm5ckkjbj8"
    },
    baseStyle: "mapbox://styles/mapbox/streets-v11"
  }

  return (
    <>
      <Map
        ref={mapRef}
        id="mymap"
        initialViewState={{
          latitude: 47.373878,
          longitude: 8.545094,
          zoom: 7,
        }}
        style={{ height: '100vh' }}
        // mapStyle="mapbox://styles/mapbox/dark-v9"
        mapStyle={
          population ? styleArray.populationStyle :

            ((precipitation && timePeriod === 'Hist') ? styleArray.precipitationStyle.hist :
              ((precipitation && timePeriod === 'Current') ? styleArray.precipitationStyle.current :
                ((precipitation && (timePeriod === 'Near Future' && rcpSenerios === 'rcp 2.6')) ? styleArray.precipitationStyle.rcp26_near_future :
                  ((precipitation && (timePeriod === 'Near Future' && rcpSenerios === 'rcp 4.5'))) ? styleArray.precipitationStyle.rcp45_near_future :
                    ((precipitation && (timePeriod === 'Near Future' && rcpSenerios === 'rcp 8.5'))) ? styleArray.precipitationStyle.rcp85_near_future :
                      ((precipitation && (timePeriod === 'Mid Future' && rcpSenerios === 'rcp 2.6'))) ? styleArray.precipitationStyle.rcp26_mid_future :
                        ((precipitation && (timePeriod === 'Mid Future' && rcpSenerios === 'rcp 4.5'))) ? styleArray.precipitationStyle.rcp45_mid_future :
                          ((precipitation && (timePeriod === 'Mid Future' && rcpSenerios === 'rcp 8.5'))) ? styleArray.precipitationStyle.rcp85_mid_future :
                            ((precipitation && (timePeriod === 'Far Future' && rcpSenerios === 'rcp 2.6'))) ? styleArray.precipitationStyle.rcp26_far_future :
                              ((precipitation && (timePeriod === 'Far Future' && rcpSenerios === 'rcp 4.5'))) ? styleArray.precipitationStyle.rcf45_far_future :
                                ((precipitation && (timePeriod === 'Far Future' && rcpSenerios === 'rcp 8.5'))) ? styleArray.precipitationStyle.rcp85_far_future :

                                  (tmax && timePeriod === 'Current') ? styleArray.tmaxStyle.current :
                                    ((tmax && (timePeriod === 'Near Future' && rcpSenerios === 'rcp 2.6')) ? styleArray.tmaxStyle.rcp26_near_future :
                                      ((tmax && (timePeriod === 'Near Future' && rcpSenerios === 'rcp 4.5'))) ? styleArray.tmaxStyle.rcp45_near_future :
                                        ((tmax && (timePeriod === 'Near Future' && rcpSenerios === 'rcp 8.5'))) ? styleArray.tmaxStyle.rcp85_near_future :
                                          ((tmax && (timePeriod === 'Mid Future' && rcpSenerios === 'rcp 2.6'))) ? styleArray.tmaxStyle.rcp26_mid_future :
                                            ((tmax && (timePeriod === 'Mid Future' && rcpSenerios === 'rcp 4.5'))) ? styleArray.tmaxStyle.rcp45_mid_future :
                                              ((tmax && (timePeriod === 'Mid Future' && rcpSenerios === 'rcp 8.5'))) ? styleArray.tmaxStyle.rcp85_mid_future :
                                                ((tmax && (timePeriod === 'Far Future' && rcpSenerios === 'rcp 2.6'))) ? styleArray.tmaxStyle.rcp26_far_future :
                                                  ((tmax && (timePeriod === 'Far Future' && rcpSenerios === 'rcp 4.5'))) ? styleArray.tmaxStyle.rcf45_far_future :
                                                    ((tmax && (timePeriod === 'Far Future' && rcpSenerios === 'rcp 8.5'))) ? styleArray.tmaxStyle.rcp85_far_future :

                                                      styleArray.baseStyle)))
          // population ? "mapbox://styles/arindambhowal/cl85g0051006t14o6olfggpvo" : "mapbox://styles/mapbox/streets-v11"
  )}
        mapboxAccessToken={MAPBOX_TOKEN}
        terrain={{ source: 'mapbox-dem', exaggeration: 1.5 }}
      >

        {showOutline && <Source type="geojson" data={geoShpFile}>
          <Layer {...boundaryStyle} />
        </Source>}

        {/* <Source
          id="tmax"
          type="raster-dem"
          url="mapbox://mapbox.mapbox-terrain-dem-v1"
          tileSize={512}
          maxzoom={14}
        /> */}

        <Source
          id="mapbox-dem"
          type="raster-dem"
          url="mapbox://mapbox.mapbox-terrain-dem-v1"
          tileSize={512}
          maxzoom={14}
        />
        <Layer {...skyLayer} />

        <Marker
          id="marker1"
          ref={mapRef}
          longitude={marker.longitude}
          latitude={marker.latitude}
          anchor="bottom"
          draggable
          onDragStart={onMarkerDragStart}
          onDrag={onMarkerDrag}
          onDragEnd={onMarkerDragEnd}
        >
          <Pin size={40} />
        </Marker>
        {(markerCoords.lon || markerCoords.lat) && <Marker id="marker2" longitude={markerCoords.lon} latitude={markerCoords.lat} color="red" draggable="true" />}

        <NavigationControl />
        <SearchPanel mapboxAccessToken={MAPBOX_TOKEN} position="top-left" />
      </Map>

      <ControlPanel events={events} timePeriod={timePeriod} setTimePeriod={setTimePeriod}
        onSelectCity={onSelectCity} setmarkerCoords={setmarkerCoords} rcpSenerios={rcpSenerios}
        setRcpSenerios={setRcpSenerios}
        layer={{
          'setShowOutline': setShowOutline,
          'showOutline': showOutline,
          'population': population,
          'setPopulation': setPopulation,
          'precipitation': precipitation,
          'setPrecipitation': setPrecipitation,
          'tmax': tmax,
          'setTmax': setTmax,
          'tropicalNights': tropicalNights,
          'setTropicalNights': setTropicalNights
        }}
      />

      <Legend population={population} precipitation={precipitation} timePeriod={timePeriod} rcpSenerios={rcpSenerios} tmax={tmax} />

    </>
  );
}