import React from 'react';
import './sortAlgoVisu.css';
import {mergeSortAni} from '../algosAndAni/sortAlgos.js';
import {quickSortAni} from '../algosAndAni/sortAlgos.js';
import {bubbleSortAni} from '../algosAndAni/sortAlgos.js';
import {countSortAni} from '../algosAndAni/sortAlgos.js';
import {heapSortAni} from '../algosAndAni/sortAlgos.js';

//interval between visual changes in ms
const SPEED = 2;

//number of values to sort in array
const BARS = 250;

//range of values
const MIN = 10;
const MAX = 700;

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
            arr.push(randomIntInInterval(MIN, MAX));
        }
        const bars = document.getElementsByClassName('arr-bar');
        for (let i = 0; i < bars.length; i++) {
            bars[i].style.backgroundColor = DEFAULT_COLOR;
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
            const toggle = i % 3 !== 2;

            //if i reached the last index pair, that means the sort sequence is over
            //then, change the bars from to left to right to be green
            if (i === ani.length -1) {
                //loop from 0 to bars.length-1
                for (let j = 0; j < bars.length; j++) {
                    //offset time by i * SPEED (the moment at which sort sequence ends)
                    //and then add j * SPEED to it
                    setTimeout(() => {
                        bars[j].style.backgroundColor = END_COLOR;
                    }, (i * SPEED) + (j * 3 * SPEED));
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
        //retrieve animation array
        const ani = quickSortAni(this.state.arr);

        //loop through all index pairs in animation array
        for (let i = 0; i < ani.length; i++) {
            //get the html collection of bars
            const bars = document.getElementsByClassName('arr-bar');
            //1st and 2nd values are color toggles from comparisons
            //3rd and 4th values are new height-index pairs
            //1st and 2nd will always mean toggle, whereas
            //3rd and 4th can be fillers with -1, -1 pair
            const toggle = i % 4 < 2;
            //factored out getting index pair

            if (i === ani.length - 1) {
                //if i reached end of sort sequence signifier (the last [-1, -1] inserted to ani from quickSortAni())
                //make graph turn green from left to right
                for (let j = 0; j < bars.length; j++) {
                    setTimeout(() => {
                        bars[j].style.backgroundColor = END_COLOR;
                    }, (i * SPEED) + (j * 3 * SPEED));
                }
            } else if (toggle) {
                const [one, two] = ani[i];
                //if toggle, change color based on 0 or 1
                const color = i % 4 === 0 ? COMP_COLOR : DEFAULT_COLOR;
                //set it on delay of i*SPEED
                setTimeout(() => {
                    bars[one].style.backgroundColor = color;
                    bars[two].style.backgroundColor = color;
                }, i * SPEED);
            } else {
                const [one, two] = ani[i];
                if (two !== -1) {
                    //only do something is it's not a filler, meaning actual swapping occurred
                    //in this case, one would be index and two would be new height at that index
                    setTimeout(() => {
                        bars[one].style.height = two + 'px';
                    }, i * SPEED);
                }
            }
        }
    }

    heapSort() {
        const ani = heapSortAni(this.state.arr);
        
        //loop through all index pairs in animation array
        for (let i = 0; i < ani.length; i++) {
            //get the html collection of bars
            const bars = document.getElementsByClassName('arr-bar');
            //every 1st value will mean toggle on
            //every 2nd value will mean toggle off
            //every 3rd and 4th value are (idx, new_height)
            //last value will mean end of animation
            const toggle = i % 4 < 2;
            
            if (i === ani.length - 1) {
                //if i reached end of sort sequence [-1, -1] make graph turn green from left to right
                for (let j = 0; j < bars.length; j++) {
                    setTimeout(() => {
                        bars[j].style.backgroundColor = END_COLOR;
                    }, (i * SPEED) + (j * 3 * SPEED));
                }
            } else if (toggle) {
                //toggle colors
                const [one, two] = ani[i];
                //if toggle, change color based on 0 or 1
                const color = i % 4 === 0 ? COMP_COLOR : DEFAULT_COLOR;
                //set it on delay of i*SPEED
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

    bubbleSort() {
        //retrieve animation array
        const ani = bubbleSortAni(this.state.arr);

       //loop through all index pairs in animation array
       for (let i = 0; i < ani.length; i++) {
            //get the html collection of bars
            const bars = document.getElementsByClassName('arr-bar');
            //1st and 2nd values are color toggles from comparisons
            //3rd and 4th values are new height-index pairs
            //1st and 2nd will always mean toggle, whereas
            //3rd and 4th can be fillers with -1, -1 pair
            const toggle = i % 4 < 2;
            //factored out getting index pair

            if (i === ani.length - 1) {
                //if i reached end of sort sequence signifier (the last [-1, -1] inserted to ani from quickSortAni())
                //make graph turn green from left to right
                for (let j = 0; j < bars.length; j++) {
                    setTimeout(() => {
                        bars[j].style.backgroundColor = END_COLOR;
                    }, (i * SPEED) + (j * 3 * SPEED));
                }
            } else if (toggle) {
                const [one, two] = ani[i];
                //if toggle, change color based on 0 or 1
                const color = i % 4 === 0 ? COMP_COLOR : DEFAULT_COLOR;
                //set it on delay of i*SPEED
                setTimeout(() => {
                    bars[one].style.backgroundColor = color;
                    bars[two].style.backgroundColor = color;
                }, i * SPEED);
            } else {
                const [one, two] = ani[i];
                if (two !== -1) {
                    //only do something is it's not a filler, meaning actual swapping occurred
                    //in this case, one would be index and two would be new height at that index
                    setTimeout(() => {
                        bars[one].style.height = two + 'px';
                    }, i * SPEED);
                }
            }
        }
    }

    countingSort() {
        //animation sequence
        const ani = countSortAni(this.state.arr, MAX, MIN);

        //get bars
        const bars = document.getElementsByClassName('arr-bar');

        //loop through overwrites and animate it
        for (let i = 0; i < ani.length; i++) {
            //get bar
            const [idx, ht] = ani[i];
            if (ht === -1) {
                //sequence sort has ended
                //set bar colors as green
                for (let j = 0; j < bars.length; j++) {
                    setTimeout(() => {
                        bars[j].style.backgroundColor = END_COLOR;
                    }, (i * SPEED) + (j * 3 * SPEED));
                }
            } else {
                //overwrite the bar heights
                setTimeout(() => {
                    bars[idx].style.height = ht + 'px';
                }, (i * SPEED));
            }
        }
    }

    /*//////////////////////////////////////
        render() 
    *///////////////////////////////////////

    //render method
    render() {
        const {arr} = this.state;

        return (
            //see if this.state.arr is sorted
            console.log(this.state.arr),
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

