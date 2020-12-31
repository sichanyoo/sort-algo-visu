import React from 'react';
import './SortAlgoVisu.css';
import {mergeSortAni} from '../algosAndAni/sortAlgos.js';

//interval between visual changes in ms
const SPEED = 3;

//number of values to sort in array
const BARS = 250;

//default color of bars
const DEFAULT_COLOR =  'rgb(161, 161, 161)';

//color of bars during comparison
const COMP_COLOR = 'red';

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
            arr.push(randomIntInInterval(10, 700));
        }
        //reset this.state as newly randomized array using setState()
        this.setState({arr});
    } 

    /*//////////////////////////////////////
        sort algo methods 
    *///////////////////////////////////////
    mergeSort() {
        //array of indices compared to recreate sorting in real time animation
        const ani = mergeSortAni(this.state.arr);

        //loop through all index comparisons in ani
        for (let i = 0; i < ani.length; i++) {
            //get the html collection of bars
            const bars = document.getElementsByClassName('arr-bar');
            //boolean that tells us that at every 3rd value we change heights
            //and at 1st and 2nd we toggle colors
            const toggle = i % 3 != 2;

            //if i reached the last index pair, that means the sort sequence is over
            //then, change the bars from to left to right to be green
            if (i == ani.length -1) {
                //loop from 0 to bars.length-1
                for (let j = 0; j < bars.length; j++) {
                    //offset time by i * SPEED (the moment at which sort sequence ends)
                    //and then add j * SPEED to it
                    setTimeout(() => {
                        bars[j].style.backgroundColor = END_COLOR;
                    }, (i * SPEED) + (j * SPEED));
                }
            } else if (toggle) {
                //if toggle is 0 or 1, then it is just changing color time
                //get the indices of two bars being compared at this instant
                const [one, two] = ani[i];
                //if i % 3 is 0, that means color has to go from default to comp since current color is default (at beginning of comparison)
                //if i % 3 is 1, that means color has to go from comp to default since current color is comp (at end of comparison)
                const color = i % 3 === 0 ? COMP_COLOR : DEFAULT_COLOR;
                //toggle bar colors at set speed (constant at top)
                setTimeout(() => {
                    bars[one].style.backgroundColor = color;
                    bars[two].style.backgroundColor = color;
                }, i * SPEED);
            } else {
                //else here would mean that it is time to overwrite bar height
                setTimeout(() => {
                    const [idx, newHt] = ani[i];
                    const barStyle = bars[idx].style;
                    barStyle.height = newHt + 'px';
                }, i * SPEED);
            }
        }
    }

    quickSort() {

    }

    heapSort() {

    }

    bubbleSort() {

    }

    countingSort() {

    }

    //render method
    render() {
        const {arr} = this.state;

        return (
            <div className = "arr-container">
                <br></br>
                <div className = "toolbar">
                    <button onClick={() => this.initArr()} className = "generate-button">Generate New Array</button>
                    &nbsp;
                    <button onClick={() => this.mergeSort()} className = "button">Merge Sort</button>
                    &nbsp;
                    <button onClick={() => this.quickSort()} className = "button">Quick Sort</button>
                    &nbsp;
                    <button onClick={() => this.heapSort()} className = "button">Heap Sort</button>
                    &nbsp;
                    <button onClick={() => this.bubbleSort()} className = "button">Bubble Sort</button>
                    &nbsp;
                    <button onClick={() => this.countingSort()} className = "button">Counting Sort</button>
                </div>
                <br></br>
                <br></br>
                {arr.map((value, idx) => (
                    <div 
                        className = "arr-bar" 
                        key = {idx} 
                        style = {{
                            height: value, 
                    }}></div>
                ))}
                <br></br>
                <br></br>
            </div>
        );
    }

}

//function to generate random int betweeen min and max, inclusive
function randomIntInInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

