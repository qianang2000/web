import { useState } from 'react';

export default function BadgerSaleItem(props) {

    const[count, setCount] = useState(0);

    function addOne() {
        setCount(a => a + 1);
    }

    function minusOne() {
        setCount(a => a > 0 ? a - 1 : 0);
    }

    function setColor() {
        if (props.featured) return 'lightblue';
        else return 'white';
    }
    return <div style={{ backgroundColor: setColor() }}>
        <h2>{props.name}</h2>
        <p>{'$' + props.price.toFixed(2)}</p>
        <p>{props.description}</p>
        <div>
            <button className="inline" onClick={() => {minusOne();}}>-</button>
            <p className="inline">{count}</p>
            <button className="inline" onClick={() => {addOne();}}>+</button>
        </div>
    </div>
}