import React, { useState } from 'react'
import Sidebar from '../sidebar/Sidebar'
import './chart.scss'
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    Legend
} from "recharts";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import zurich from '../../Data/tropical nights/Zurich_tropical_nights_hot_days.json'
import lausanne from '../../Data/tropical nights/Lausanne_tropical_nights_hot_days.json'
import geneva from '../../Data/tropical nights/Geneva_tropical_nights_hot_days.json'
import bern from '../../Data/tropical nights/Bern_tropical_nights_hot_days.json'
import basel from '../../Data/tropical nights/Basel_tropical_nights_hot_days.json'

const Chart = () => {
    const [city, setCity] = useState('zurich')

    const [parameter, setParameter] = useState('value');

    const handleChange = (event) => {
        setParameter(event.target.value);
    };
    

    return (
        <>
            <Sidebar />
            <div className='charts'>
                <div className="heading">
                    <h2>Graphs</h2>

                    <p>Climate Report for major swiss cities</p>
                </div>
    
    <div style={{display: 'flex', alignItems:'center', justifyContent: 'center'}}>

 
        <Stack spacing={2} direction="row" >

      <Button variant="contained" onClick={() => setCity('zurich')}>zurich</Button>
      <Button variant="contained" onClick={() => setCity('lausanne')}>lausanne</Button>
      <Button variant="contained" onClick={() => setCity('geneva')}>geneva</Button>
      <Button variant="contained" onClick={() => setCity('bern')}>bern</Button>
      <Button variant="contained" onClick={() => setCity('basel')}>basel</Button>
      
    </Stack>
    </div>


                <div className="select">
                <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Parameters</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={parameter}
                            label="Age"
                            onChange={handleChange}
                            style={{color: 'white'}}
                        >
                            <MenuItem value="value">Tropical Nights</MenuItem>
                            <MenuItem value="hot days">Hot Days</MenuItem>
                        </Select>
                    </FormControl>
                </Box >

                </div>

                <div className="graph">
                    <LineChart
                        width={1200}
                        height={450}
                        data={city==='zurich' ? zurich : city==='lausanne' ? lausanne : city==='geneva' ? geneva : city==='bern' ? bern : basel }
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5
                        }}
                    >
                        {/* <CartesianGrid strokeDasharray="3 3" /> */}
                        <XAxis dataKey="year" />
                        <YAxis dataKey={parameter} />
                        <Tooltip />
                        <Legend />
                        <Line
                            type="monotone"
                            dataKey={parameter}
                            stroke="#8884d8"
                            activeDot={{ r: 8 }}
                        />
                    </LineChart>
                </div>
            </div>
        </>
    )
}

export default Chart