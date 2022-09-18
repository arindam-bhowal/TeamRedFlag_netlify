import * as React from "react"
import './controlPanel.scss'
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import CITIES from '../../Data/cities.json';

const eventNames = ["onDragStart", "onDrag", "onDragEnd"]


function round5(value) {
  return (Math.round(value * 1e5) / 1e5).toFixed(5)
}

function ControlPanel(props) {

  const { timePeriod, setTimePeriod, layer, onSelectCity, setmarkerCoords } = props;

  return (
    <div className="control-panel">
      <div className="locationInfo">
        <h3>Location of Marker Info</h3>
        <div>
          {eventNames.map(eventName => {
            const { events = {} } = props
            const lngLat = events[eventName]
            return (
              <div key={eventName}>
                <strong>{eventName}:</strong>{" "}
                {lngLat ? (
                  `${round5(lngLat.lng)}, ${round5(lngLat.lat)}`
                ) : (
                  <em>null</em>
                )}
              </div>
            )
          })}
        </div>
      </div>

      <div className="topCities">
        <h3>MAZOR CITIES OF SWITZERLAND</h3>
        <div className="cities">
          <FormControl>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              onChange={(e) => {
                let city = CITIES.filter(city => city.name === e.target.value)
                onSelectCity(city[0].lng, city[0].lat)
                setmarkerCoords({ lon: city[0].lng, lat: city[0].lat })
              }}
            >
              <FormControlLabel value="Zürich" control={<Radio />} label="Zürich" />
              <FormControlLabel value="Geneva" control={<Radio />} label="Geneva" />
              <FormControlLabel value="Lucerne" control={<Radio />} label="Lucerne" />
              <FormControlLabel value="Winterthur" control={<Radio />} label="Winterthur" />
              <FormControlLabel value="Basel" control={<Radio />} label="Basel" />
              <FormControlLabel value="La Chaux-de-Fonds" control={<Radio />} label="La Chaux-de-Fonds" />
            </RadioGroup>
          </FormControl>
        </div>
      </div>

      <div className="timeYear">
        <div className="input">
          <Box sx={{ minWidth: 120 }} style={{ marginTop: '15px' }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Time Period</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={timePeriod}
                label={<strong>"Time Period"</strong>}
                onChange={(e) => { setTimePeriod(e.target.value) }}
              >
                <MenuItem value="Hist">HIST </MenuItem>
                <MenuItem value="Current">CURRENT</MenuItem>
                <MenuItem value="Near Future">NEAR FUTURE </MenuItem>
                <MenuItem value="Mid Future">MID FUTURE</MenuItem>
                <MenuItem value="Far Future">FAR FUTURE</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </div>
      </div>


      <div className="RCP_Senerios">
        <div className="input">
          <Box sx={{ minWidth: 120 }} style={{ marginTop: '15px' }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label-rcp">SCENARIOS</InputLabel>
              <Select
                labelId="demo-simple-select-label-rcp"
                id="demo-simple-select-rcp"
                value={props.rcpSenerios}
                label={<strong>"RCP SCENARIOS"</strong>}
                onChange={(e) => { props.setRcpSenerios(e.target.value)}}
              >
                <MenuItem value="rcp 2.6">Concerted Mitigation Efforts (RCP 2.6)</MenuItem>
                <MenuItem value="rcp 4.5">Limited Mitigation Efforts(RCP 4.5)</MenuItem>
                <MenuItem value="rcp 8.5">No Mitigation Efforts (RCP 8.5)</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </div>
      </div>

      <div className="Layers">
        <h3>LAYERS</h3>

        <div className="input">
          <FormGroup>
            <FormControlLabel control={<Checkbox onChange={(e) => layer.setShowOutline(!layer.showOutline)} defaultChecked />} label="Show Outline" />
            <FormControlLabel control={<Checkbox onChange={e => layer.setPopulation(!layer.population)} />} label="Population" />
            <FormControlLabel control={<Checkbox onChange={e => layer.setPrecipitation(!layer.precipitation)} />} label="Preipitation" />
            <FormControlLabel control={<Checkbox onChange={e => layer.setTmax(!layer.tmax)} />} label="Tmax" />
            {/* <FormControlLabel control={<Checkbox onChange={e => layer.setTropicalNights(!layer.tropicalNights)} />} label="Tropical Nights" /> */}
          </FormGroup>
        </div>
      </div>
    </div>
  )
}

export default React.memo(ControlPanel)
