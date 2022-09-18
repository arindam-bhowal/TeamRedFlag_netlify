import './legend.scss'

const precipMinMax = {
    hist: {
        min: 1.398,
        max: 12.030
    },
    current: {
        min: 1.200,
        max: 10.824
    },
    rcp45_near: {
        min: 1.441,
        max: 11.357
    },
    rcp45_mid: {
        min: 1.441,
        max: 11.865
    },
    rcp45_far: {
        min: 1.351,
        max: 11.498
    },
    rcp26_near: {
        min: 1.306,
        max: 11.291
    },
    rcp26_mid:{
        min: 1.315,
        max: 11.638
    },
    rcp26_far: {
        min: 1.306,
        max: 10.971
    },
    rcp85_near: {
        min: 1.466,
        max: 11.321
    },
    rcp85_mid: {
        min: 1.422,
        max: 11.543
    },
    rcp85_far: {
        min: 1.317,
        max: 10.353
    }
}


const tmaxMinMax = {
    current: {
        min: -7.09,
        max: 17.83
    },
    rcp45_near: {
        min: -6.46,
        max: 18.48
    },
    rcp45_mid: {
        min: -6.11,
        max: 18.64
    },
    rcp45_far: {
        min: -5.49,
        max: 19.33
    },
    rcp26_near: {
        min: -6.29,
        max: 18.48
    },
    rcp26_mid:{
        min: -6.12,
        max: 18.05
    },
    rcp26_far: {
        min: -6,
        max: 18.76
    },
    rcp85_near: {
        min: -6.15,
        max: 18.65
    },
    rcp85_mid: {
        min: -5.22,
        max: 19.43
    },
    rcp85_far: {
        min: -4.21,
        max: 20.27
    }
}


const Legend = (props) => {

    const { population, precipitation, rcpSenerios, timePeriod, tmax } = props
    return (
        <>
            <div className='legendBox'>
                <h1 style={{ marginLeft: '10px' }}>Legend</h1>
                {population && (<ul class="legend">
                    <h3>Population</h3>
                    <li style={{ borderColor: '#ccc' }}>
                        {/* <em>Dogs</em> */}
                        <span>0</span>
                    </li>
                    <li style={{ borderColor: '#ffffbee' }}>
                        {/* <em>Cats</em> */}
                        <span>1-5</span>
                    </li>
                    <li style={{ borderColor: '#ffff73' }}>
                        {/* <em>Slugs</em> */}
                        <span>6-25</span>
                    </li>
                    <li style={{ borderColor: '#ff0' }}>
                        {/* <em>Aliens</em> */}
                        <span>26-50</span>
                    </li>
                    <li style={{ borderColor: '#fa0' }}>
                        {/* <em>Aliens</em> */}
                        <span>51-100</span>
                    </li>
                    <li style={{ borderColor: '#f60' }}>
                        {/* <em>Aliens</em> */}
                        <span>101-500</span>
                    </li>
                    <li style={{ borderColor: 'red' }}>
                        {/* <em>Aliens</em> */}
                        <span>501-2500</span>
                    </li>
                    <li style={{ borderColor: '#c00' }}>
                        {/* <em>Aliens</em> */}
                        <span>2501-5000</span>
                    </li>
                    <li style={{ borderColor: '#730000' }}>
                        {/* <em>Aliens</em> */}
                        <span>5001-185000</span>
                    </li>
                </ul>)}

                {precipitation && (<>
                    <div style={{ paddingLeft: '10px', backgroundColor: 'white', width: '12.7rem' }}>
                        <h3>Precipitation</h3>
                        <div className="value">
                            <span>Min: &nbsp;
                                {
                                    timePeriod === 'Hist' ? precipMinMax.hist.min :
                                        timePeriod === 'Current' ? precipMinMax.current.min :
                                            (timePeriod === 'Near Future' && rcpSenerios === 'rcp 2.6') ? precipMinMax.rcp26_near.min :
                                                (timePeriod === 'Near Future' && rcpSenerios === 'rcp 4.5') ? precipMinMax.rcp45_near.min :
                                                    (timePeriod === 'Near Future' && rcpSenerios === 'rcp 8.5') ? precipMinMax.rcp85_near.min :
                                                        (timePeriod === 'Mid Future' && rcpSenerios === 'rcp 2.6') ? precipMinMax.rcp26_mid.min :
                                                            (timePeriod === 'Mid Future' && rcpSenerios === 'rcp 4.5') ? precipMinMax.rcp45_mid.min :
                                                                (timePeriod === 'Mid Future' && rcpSenerios === 'rcp 8.5') ? precipMinMax.rcp85_mid.min :
                                                                    (timePeriod === 'Far Future' && rcpSenerios === 'rcp 2.6') ? precipMinMax.rcp26_far.min :
                                                                        (timePeriod === 'Far Future' && rcpSenerios === 'rcp 4.5') ? precipMinMax.rcp45_far.min :
                                                                            (timePeriod === 'Far Future' && rcpSenerios === 'rcp 8.5') ? precipMinMax.rcp85_far.min :
                                                                                0
                                }
                            </span>
                            <span style={{ marginLeft: '1em' }}>Max: &nbsp;
                            {
                                    timePeriod === 'Hist' ? precipMinMax.hist.max :
                                        timePeriod === 'Current' ? precipMinMax.current.max :
                                            (timePeriod === 'Near Future' && rcpSenerios === 'rcp 2.6') ? precipMinMax.rcp26_near.max :
                                                (timePeriod === 'Near Future' && rcpSenerios === 'rcp 4.5') ? precipMinMax.rcp45_near.max :
                                                    (timePeriod === 'Near Future' && rcpSenerios === 'rcp 8.5') ? precipMinMax.rcp85_near.max :
                                                        (timePeriod === 'Mid Future' && rcpSenerios === 'rcp 2.6') ? precipMinMax.rcp26_mid.max :
                                                            (timePeriod === 'Mid Future' && rcpSenerios === 'rcp 4.5') ? precipMinMax.rcp45_mid.max :
                                                                (timePeriod === 'Mid Future' && rcpSenerios === 'rcp 8.5') ? precipMinMax.rcp85_mid.max :
                                                                    (timePeriod === 'Far Future' && rcpSenerios === 'rcp 2.6') ? precipMinMax.rcp26_far.max :
                                                                        (timePeriod === 'Far Future' && rcpSenerios === 'rcp 4.5') ? precipMinMax.rcp45_far.max :
                                                                            (timePeriod === 'Far Future' && rcpSenerios === 'rcp 8.5') ? precipMinMax.rcp85_far.max :
                                                                                0
                                }
                            </span>
                        </div>
                    </div>
                    <ul class="colorScheme colorScheme--cs1 legend precipitation">
                        <li class="colorScheme__item"></li>
                        <li class="colorScheme__item"></li>
                        <li class="colorScheme__item"></li>
                        <li class="colorScheme__item"></li>
                        <li class="colorScheme__item"></li>
                        <li class="colorScheme__item"></li>
                        <li class="colorScheme__item"></li>
                        <li class="colorScheme__item"></li>
                        <li class="colorScheme__item"></li>
                        <li class="colorScheme__item"></li>
                        <li class="colorScheme__item"></li>
                    </ul>
                </>)}


                {tmax && (<>
                    <div style={{ paddingLeft: '10px', backgroundColor: 'white', width: '12.7rem' }}>
                        <h3>Tmax</h3>
                        <div className="value">
                            <span>Min: &nbsp;
                                {
                                        timePeriod === 'Current' ? tmaxMinMax.current.min :
                                            (timePeriod === 'Near Future' && rcpSenerios === 'rcp 2.6') ? tmaxMinMax.rcp26_near.min :
                                                (timePeriod === 'Near Future' && rcpSenerios === 'rcp 4.5') ? tmaxMinMax.rcp45_near.min :
                                                    (timePeriod === 'Near Future' && rcpSenerios === 'rcp 8.5') ? tmaxMinMax.rcp85_near.min :
                                                        (timePeriod === 'Mid Future' && rcpSenerios === 'rcp 2.6') ? tmaxMinMax.rcp26_mid.min :
                                                            (timePeriod === 'Mid Future' && rcpSenerios === 'rcp 4.5') ? tmaxMinMax.rcp45_mid.min :
                                                                (timePeriod === 'Mid Future' && rcpSenerios === 'rcp 8.5') ? tmaxMinMax.rcp85_mid.min :
                                                                    (timePeriod === 'Far Future' && rcpSenerios === 'rcp 2.6') ? tmaxMinMax.rcp26_far.min :
                                                                        (timePeriod === 'Far Future' && rcpSenerios === 'rcp 4.5') ? tmaxMinMax.rcp45_far.min :
                                                                            (timePeriod === 'Far Future' && rcpSenerios === 'rcp 8.5') ? tmaxMinMax.rcp85_far.min :
                                                                                0
                                }
                            </span>
                            <span style={{ marginLeft: '1em' }}>Max: &nbsp;
                            {
                                        timePeriod === 'Current' ? tmaxMinMax.current.max :
                                            (timePeriod === 'Near Future' && rcpSenerios === 'rcp 2.6') ? tmaxMinMax.rcp26_near.max :
                                                (timePeriod === 'Near Future' && rcpSenerios === 'rcp 4.5') ? tmaxMinMax.rcp45_near.max :
                                                    (timePeriod === 'Near Future' && rcpSenerios === 'rcp 8.5') ? tmaxMinMax.rcp85_near.max :
                                                        (timePeriod === 'Mid Future' && rcpSenerios === 'rcp 2.6') ? tmaxMinMax.rcp26_mid.max :
                                                            (timePeriod === 'Mid Future' && rcpSenerios === 'rcp 4.5') ? tmaxMinMax.rcp45_mid.max :
                                                                (timePeriod === 'Mid Future' && rcpSenerios === 'rcp 8.5') ? tmaxMinMax.rcp85_mid.max :
                                                                    (timePeriod === 'Far Future' && rcpSenerios === 'rcp 2.6') ? tmaxMinMax.rcp26_far.max :
                                                                        (timePeriod === 'Far Future' && rcpSenerios === 'rcp 4.5') ? tmaxMinMax.rcp45_far.max :
                                                                            (timePeriod === 'Far Future' && rcpSenerios === 'rcp 8.5') ? tmaxMinMax.rcp85_far.max :
                                                                                0
                                }
                            </span>
                        </div>
                    </div>
                    <ul class="colorScheme colorScheme--cs1 legend tmax">
                        <li class="tmax__item"></li>
                        <li class="tmax__item"></li>
                        <li class="tmax__item"></li>
                        <li class="tmax__item"></li>
                        <li class="tmax__item"></li>
                        <li class="tmax__item"></li>
                        <li class="tmax__item"></li>
                        <li class="tmax__item"></li>
                        <li class="tmax__item"></li>
                        <li class="tmax__item"></li>
                        <li class="tmax__item"></li>
                    </ul>
                </>)}


            </div>
        </>
    )
}

export default Legend