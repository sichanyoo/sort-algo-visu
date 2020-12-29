import React from 'react';
import './sortAlgoVisu.css';

//interval between visual changes in ms
const SPEED = 1;

//number of values to sort in array
const BARS = 300;

//default color of bars
const DEFAULT_COLOR = 'white';

//color of bars during comparison
const COMP_COLOR = 'blue';

//color of bars at sorted position
const END_COLOR = 'green';

//main class
export default class sortAlgoVisu extends React.Component {
    constructor(props) {
        super(props);
        //set array as member of this.state
        this.state = {array : [], };
    }

    //randomize array first time website is opened
    componentDidMount() {
        this.initArr();
    }

    //method to re-randomize sorted array
    initArr() {
        //new arr to store randomized arr
        const arr = [];
        for (let i = 0; i < BARS; i++) 
            array.push(randomIntInInterval(10, 1000));
        //reset this.state as newly randomized array using setState()
        this.setState(arr);
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

    }

}

//function to generate random int betweeen min and max, inclusive
function randomIntInInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

