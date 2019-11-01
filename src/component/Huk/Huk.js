import React, { useState } from 'react';

export default function Huk(props) {
    const [ count, setCount] = useState(0);
    // console.log( useState())
    console.log(this, props)
    return (
        <div onClick={() => setCount(count + 1)} >{count}</div>
    )
}