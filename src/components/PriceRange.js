import { useState } from 'react';



const PriceRange = (props) => {

    const [value, setValue] = useState('0$')
    const { getRangeVal } = props;

    const handleChange = (e) => {
        setValue(e.target.value)
        getRangeVal(e.target.value)
    }

    return <div id='range-input'>
        <input type="range" id="price-range" name="price-range" min="0" max="8000" onChange={handleChange} />
        <br />
        Max Price - ${value}
    </div>
}

export default PriceRange;
