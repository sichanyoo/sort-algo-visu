import React from 'react';
import './SortAlgoVisu.css';

//interval between visual changes in ms
const SPEED = 1;

//number of values to sort in array
const BARS = 300;

//default color of bars
const DEFAULT_COLOR = 'black';

//color of bars during comparison
const COMP_COLOR = 'blue';

//color of bars at sorted position
const END_COLOR = 'green';

//main class
export default class SortAlgoVisu extends React.Component {
    constructor(props) {
        super(props);
        //set array as member of this.state
        this.state = {arr: [], };
    }

    //randomize array first time website is opened
    componentDidMount() {
        this.initArr();
    }

    //method to re-randomize sorted array
    initArr() {
        //new arr to store randomized arr
        const arr = [];
        for (let i = 0; i < BARS; i++) {
            arr.push(randomIntInInterval(10, 750));
        }
        //reset this.state as newly randomized array using setState()
        this.setState({arr});
    }

    /*//////////////////////////////////////
        sort algo methods 
    *///////////////////////////////////////
    mergeSort() {

    }

    quickSort() {

    }

    heapSort() {

    }

    bubbleSort() {

    }


    //render method
    render() {
        const {arr} = this.state;

        return (
            <div className = "arr-container">
                {arr.map((value, idx) => (
                    <div 
                        className = "arr-bar" 
                        key = {idx} 
                        style = {{
                            height: value, 
                    }}></div>
                ))}
                <button onClick={() => this.initArr()}>Generate New Array</button>
                <button onClick={() => this.mergeSort()}>Merge Sort</button>
                <button onClick={() => this.quickSort()}>Quick Sort</button>
                <button onClick={() => this.heapSort()}>Heap Sort</button>
                <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
            </div>
        );
    }

}

//function to generate random int betweeen min and max, inclusive
function randomIntInInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

