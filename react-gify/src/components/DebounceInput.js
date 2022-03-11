import React from 'react';
import { useCallback } from 'react';


export default function DebounceInput(props) {
    const debounce = (func, wait = props.timer) => {
        let timer;
        return function (...args) {
            const context = this;
            if (timer) clearTimeout(timer);
            timer = setTimeout(() => {
                timer = null;
                func.apply(context, args);
            }, wait);
        };
    };
    const handleChange = (e) => {
        props.onInputChange(e);
    }
    const optimizedFn = useCallback(debounce(handleChange, props.timer), []);
    return (<input type="text" placeholder={props.placeHolder} className='form-control' onChange={(e) => optimizedFn(e.target.value)} />)
}
