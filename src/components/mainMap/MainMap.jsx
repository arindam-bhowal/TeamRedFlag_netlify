import React from 'react'
import Sidebar from '../sidebar/Sidebar'
import 'mapbox-gl/dist/mapbox-gl.css';
import './mainMap.scss'
import {MapProvider} from 'react-map-gl';
import BaseMap from '../baseMap/BaseMap'
import SearchPanel from '../searchPanel/SearchPanel'


const MainMap = () => {
  return (
    <>
       <Sidebar />
       <div className="mainContainer">
        <MapProvider>
            <BaseMap />
        </MapProvider>
       </div>
    </>
  )
}

export default MainMap