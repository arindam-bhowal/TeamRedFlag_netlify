import Sidebar from '../sidebar/Sidebar'
import './emission.scss'
import cities from '../../Data/cities.json'
import { useEffect, useState } from 'react'


const Emission = () => {



  const [homeLocation, setHomeLocation] = useState('')
  const [workLocation, setWorkLocation] = useState('')
  const [response, setResponse] = useState()
  const [distance, setDistance] = useState()

  const handleHomeChange = (e) => {
    setHomeLocation(e.target.value)
  }

  const handleWorkChange = (e) => {
    setWorkLocation(e.target.value)
  }

  const url = `https://api.mapbox.com/directions-matrix/v1/mapbox/driving/${homeLocation};${workLocation}?sources=0&access_token=pk.eyJ1Ijoic3ByaXRhbiIsImEiOiJjbDd1dGFubTUwNTJ0M3lsaGY1bGNkZ2NsIn0.jWWLPs5fevoroG-O_yAV7g`

  const fetchApiData = () => {
    fetch(url).then(res => res.json()).then((response) => {
      setResponse(response.destinations)
      console.log(response.destinations)
    })
  }

  const handleCalculate = () => {
    response.map(res => {
      console.log(res.distance)
    })
  }

  useEffect(() => {<div className="btn" onClick={handleCalculate}>
  Display Value
</div>
    let result = 0;
    response && response.map(res => {
      result = result + res.distance
    })
    setDistance(result)
  }, [response])
  

  return (
    <>
      <Sidebar />
      <div className='emission'>

<h2>Climate Impact of your private car</h2>

        <form className="search-form">
          <div className="input-container">
            <input type="text" className="search" placeholder="Home City or State" value={homeLocation} onChange={handleHomeChange} />
            <svg className="spinner" width="65px" height="65px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
              <circle className="path" fill="none" strokeWidth="6" stroke-linecap="round" cx="33" cy="33" r="30"></circle>
            </svg>
          </div>
          <div className="suggestions">
            <ul className="suggestions__list">
              <li>Enter Coordinate of Your Home (comma separated value without space)</li>
              <li>Eg:- 47.39062,8.51573 -Zurich</li>
            </ul>
          </div>
        </form>

        <form className="search-form">
          <div className="input-container">
            <input type="text" className="search" placeholder="Work City or State" value={workLocation} onChange={handleWorkChange} />
            <svg className="spinner" width="65px" height="65px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
              <circle className="path" fill="none" strokeWidth="6" stroke-linecap="round" cx="33" cy="33" r="30"></circle>
            </svg>
          </div>
          <div className="suggestions">
            <ul className="suggestions__list">
              <li>Enter Coordinate of Your Work (comma separated value without space)</li>
              <li>Eg- 47.41123,8.56428 </li>
            </ul>
          </div>
        </form>
        <button className="btn" onClick={fetchApiData} >Calculate Value</button>
<br />
<p> The Amount of Artic Ice Lost while you travel to you office annualy:
  <span> &nbsp;
  {distance * 0.128 * 256* 0.003} &nbsp; m^2
  </span>
   </p>
       
        
      </div>
    </>
  )
}

export default Emission