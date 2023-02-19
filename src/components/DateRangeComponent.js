import React from 'react'

function DateRangeComponent(props) {


    const handleChange = (e) => {
        props.getDate(e.target.value);
    }


    return (
        <div>
            <form action="/action_page.php">
                <input type="date" id="date" name="date" onChange={handleChange} min="2023-02-19" />
            </form>
        </div>
    )
}

export default DateRangeComponent