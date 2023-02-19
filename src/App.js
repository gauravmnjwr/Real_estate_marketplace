import { useEffect, useState } from 'react';
import { arr } from './data/data';
import DateRangeComp from './components/DateRangeComponent';
import PriceRange from './components/PriceRange';

function App() {

    const [list, setList] = useState([]);
    const [term, setTerm] = useState({ location: '', date: { dateFrom: '', dateTo: '' }, rangeVal: 0, propType: '' })
    const [searchVal, setSearchVal] = useState('');

    // console.log(arr[0]);

    function fetchProperties() {
        const renderedList = arr.map((a, index) => {
            return (
                <div id='property' key={index}>
                    <div id='img-div'><img src={a.image} alt="" height="50px" width="100px" /></div>
                    <div id='info-box'>
                        <div id='price'>$ {a.price}</div>
                        <div id='title'>{a.title}</div>
                        <div id='address'>{a.address}</div>
                    </div>
                    <hr />
                    <div id='room-info'>
                        <div><img src="https://cdn-icons-png.flaticon.com/512/495/495009.png" alt="bed" /><span>{a.roomData.beds} Beds</span></div>
                        <div><img src="https://cdn-icons-png.flaticon.com/512/1275/1275508.png" alt="" /><span>{a.roomData.bathroom} Bathrooms</span></div>
                        <div><img src="https://cdn-icons-png.flaticon.com/512/7069/7069952.png" alt="" /><span>{a.roomData.area}m<sup>2</sup></span> </div>
                    </div>
                </div>
            )
        })
        setList(renderedList)
    }

    useEffect(function () {
        fetchProperties();
    }, [])




    const handlelocationChange = (e) => {
        let { value } = e.target
        console.log(value)
        setTerm((prevState) => ({
            ...prevState,
            location: value
        }))

    }
    const handlePropTypeChange = (e) => {
        let { value } = e.target
        console.log(value)
        setTerm((prevState) => ({
            ...prevState,
            propType: value
        }))

    }

    const handleSearch = () => {
        const { location, date, rangeVal, propType } = term;
        const renderedList = arr.filter((el) => {
            // console.log(date.dateFrom, date.dateTo, date.dateFrom === date.dateTo)
            console.log(date.dateFrom, el.dateFrom)
            return (
                (location === '' || location === el.location)
                &&
                (+rangeVal === 0 || +el.price <= +rangeVal)
                &&
                (propType === '' || propType === el.propertyType)
                &&
                ((date.dateFrom === '') || ((date.dateFrom <= el.dateFrom)))
            )
        })
        console.log(renderedList);
        const filteredList = renderedList.map((a, index) => {
            return (
                <div id='property' key={index}>
                    <div id='img-div'><img src={a.image} alt="" height="50px" width="100px" /></div>
                    <div id='info-box'>
                        <div id='price'>$ {a.price}</div>
                        <div id='title'>{a.title}</div>
                        <div id='address'>{a.address}</div>
                    </div>
                    <hr />
                    <div id='room-info'>
                        <div><img src="https://cdn-icons-png.flaticon.com/512/495/495009.png" alt="bed" /><span>{a.roomData.beds} Beds</span></div>
                        <div><img src="https://cdn-icons-png.flaticon.com/512/1275/1275508.png" alt="" /><span>{a.roomData.bathroom} Bathrooms</span></div>
                        <div><img src="https://cdn-icons-png.flaticon.com/512/7069/7069952.png" alt="" /><span>{a.roomData.area}m<sup>2</sup></span> </div>
                    </div>
                </div>
            )
        })
        setList(filteredList)
    }

    const handleDate = (from) => {
        console.log(from)
        setTerm((prevState) => ({
            ...prevState,
            date: {
                dateFrom: from,
            }
        }))
    }

    const handleRange = (val) => {
        console.log(val)
        setTerm((prevState) => ({
            ...prevState,
            rangeVal: val
        }))
    }

    const handleReset = () => {
        setTerm({ location: '', date: { dateFrom: '', dateTo: '' }, rangeVal: 0, propType: '' });
        window.location.reload(true);
    }
    const setSearchValue = (e) => {
        setSearchVal(e.target.value);
        const filteredList = arr.filter((a) => {
            return a.title.toLowerCase().includes(searchVal.toLowerCase());
        })
        const renderedList = filteredList.map((a, index) => {
            return (
                <div id='property' key={index}>
                    <div id='img-div'><img src={a.image} alt="" height="50px" width="100px" /></div>
                    <div id='info-box'>
                        <div id='price'>$ {a.price}</div>
                        <div id='title'>{a.title}</div>
                        <div id='address'>{a.address}</div>
                    </div>
                    <hr />
                    <div id='room-info'>
                        <div><img src="https://cdn-icons-png.flaticon.com/512/495/495009.png" alt="bed" /><span>{a.roomData.beds} Beds</span></div>
                        <div><img src="https://cdn-icons-png.flaticon.com/512/1275/1275508.png" alt="" /><span>{a.roomData.bathroom} Bathrooms</span></div>
                        <div><img src="https://cdn-icons-png.flaticon.com/512/7069/7069952.png" alt="" /><span>{a.roomData.area}m<sup>2</sup></span> </div>
                    </div>
                </div>
            )
        })

        setList(renderedList)
    }

    return (
        <div>
            <div className='navbar'></div>
            <div id='heading-bar'>
                <h1>Search Properties to rent</h1>
                <input type="text" id='search-term' placeholder='Search for Properties' onChange={setSearchValue} />
            </div>
            <div id='filter-box'>
                <div id="location">
                    <select id="custom-select" onChange={handlelocationChange}>
                        <option value="">Select Location</option>
                        <option value="New York">New York</option>
                        <option value="New Jersey">New Jersey</option>
                    </select>
                </div>
                <div id="date">
                    <DateRangeComp getDate={handleDate} />
                </div>
                <div id="slider">
                    <PriceRange getRangeVal={handleRange} />
                </div>
                <div id="propType">
                    <select id="custom-select" onChange={handlePropTypeChange}>
                        <option value="">Property Type</option>
                        <option value="Houses">Houses</option>
                        <option value="Apartments">Apartments</option>
                    </select>
                </div>
                <button id='search' onClick={handleSearch}>Search</button>
                <button onClick={handleReset}>Clear All</button>
            </div>
            <br />
            <div id='content-box'>
                {list}
            </div>

        </div>
    )
}

export default App