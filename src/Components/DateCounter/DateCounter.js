import {useReducer} from "react";

const initialState = {
    count: 0,
    step: 1,
    toggle: false
}

function reducer(state, action) {
    switch (action.type) {
        case "inc":
            return {...state, count: state.count + state.step}
        case "dec":
            return {...state, count: state.count - state.step}
        case "stepCount":
            return {...state, step: action.payload}
        case "reset":
            return initialState
        case "toggle":
            return {...state, toggle: !state.toggle}
        default:
            throw new Error("Unknown action")
    }
}

function DateCounter() {

    // useReducer
    const [state, dispatch] = useReducer(reducer, initialState)


    // This mutates the date object.
    const date = new Date("june 21 2027");
    date.setDate(date.getDate() + state.count);

    const dec = function () {
        dispatch({type: "dec", payload: -1})
    };

    const inc = function () {
        dispatch({type: "inc", payload: 1})
    };

    const defineCount = function (e) {
        dispatch({type: "setCount", payload: Number(e.target.value)})
    };

    const defineStep = function (e) {
        dispatch({type: "stepCount", payload: Number(e.target.value)})
    };

    const reset = function () {
        dispatch({type: "reset"})
    };

    function handleToggle() {
        dispatch({type: "toggle"})
    }

    return (
        <div className="counter">
            <div>
                <input
                    type="range"
                    min="0"
                    max="10"
                    value={state.step}
                    onChange={defineStep}
                />
                <span>{state.step}</span>
            </div>

            <div>
                <button onClick={dec}>-</button>
                <input value={state.count} onChange={defineCount}/>
                <button onClick={inc}>+</button>
            </div>

            <p>{date.toDateString()}</p>

            <div>
                <button onClick={reset}>Reset</button>
            </div>
            <button onClick={handleToggle}>Toggle</button>
            {state.toggle && <p>toggle on </p>}
        </div>
    );
}

export default DateCounter;
