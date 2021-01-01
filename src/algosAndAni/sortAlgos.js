//merge sort algos

//merge sort animation
export function mergeSortAni(arr) {
 //array of pair of indices compared, in order
 const ani = [];
 //auxiliary array that acts as original copy to refer to in merging
 //and getting indices compared
 const aux = arr.slice();
 //merge sort arr from 0 to length - 1, and store indices compared in ani
 mergeSort(arr, 0, arr.length - 1, aux, ani);
 //end of sort sequence signifier
 ani.push([-1, -1]);
 //return the pairs of indices compared
 return ani;
}

function mergeSort(
 main, start, end, aux, ani,
) {
 //if start is greater than or equal to end, end sort
 //since that means start is past or at mid index, meaning
 //the pseudo-array (pseudo since we didn't really divide anything)
 //at hand is of length 1, which is when to stop recursion and start merging
 if (start === end) return;
 const mid = Math.floor((start+end)/2);

 //aus and main are flipped here, compared to argument list at function header
 mergeSort(aux, start, mid, main, ani);
 mergeSort(aux, mid+1, end, main, ani);
 
 merge(main, start, mid, end, aux, ani);
}

function merge (main, start, mid, end, aux, ani,) {
 //m here is the index value for main array
 let m = start;
 //i here will take on index value from 0 to mid
 let i = start;
 //j here will take on index value from mid + 1 to end
 let j = mid + 1;

 //first copy in values from left half of aux and right half of aux
 //into the main array, based on which element is greater
 //each time an element is copied, increase m by one (index for main array)
 while (i < mid + 1 && j < end + 1) {
  //this is used to toggle comparison colors between bars
  ani.push([i, j]);
  ani.push([i, j]);

  if (aux[i] <= aux[j]) {
   //store the new height at index m, by pushing m, aux[i] to ani
   ani.push([m, aux[i]]);
   //copy in value at aux[i] to main[m] and increase i
   main[m] = aux[i++];
  } else {
   //store the new height at index m, by pushing m, aux[j] to ani
   ani.push([m, aux[j]]);
   //copy in value at aux[j] to main[m] and increase j
   main[m] = aux[j++];
  }
  //increase index to main array by one, to move onto next spot to 
  //put an element into
  m++;
 }

 //now its time to add in any remaining elements into main
 while (i < mid + 1) {
  //animation toggle, again
  ani.push([i, i]);
  ani.push([i, i]);

  //store the new height at index m, by pushing m, aux[i] to ani
  ani.push([m, aux[i]]);

  //add in elements
  main[m++] = aux[i++];
 }

 while (j < end + 1) {
  //toggle
  ani.push([j, j]);
  ani.push([j, j]);

  //store the new height at index m, by pushing m, aux[i] to ani
  ani.push([m, aux[j]]);

  //add in elements
  main[m++] = aux[j++];
 }
}

///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////

//quick sort algos

//quicksort animation
export function quickSortAni(arr) {
    //array of index comparisons in order
    const ani = [];
    //get animation sequence
    quickSort(arr, 0, arr.length-1, ani);
    //end of sort sequence signifier
    ani.push([-1, -1]);
    //return animation sequence
    return ani;
}

//main quick sort function
function quickSort(main, start, end, ani) {
    //if start is past the end, return
    if (start >= end) return;
    //partitioning index
    const pi = partition(main, start, end, ani);
    //recursively quick sort left of partition
    quickSort(main, start, pi - 1, ani);
    //recursively quick sort right of partition
    quickSort(main, pi + 1, end, ani);
}

//partitioning function for quicksort
function partition(arr, start, end, ani) {
    
    //pivot element, chosen as first element in given arr
    const pivot = arr[start];
    //index for first element > pivot
    //from left to right
    let left = start;
    //index for first element <= pivot
    //from right to left
    let right = end;

    //while left does not go past right
    //i.e. at the end of the loop, right will point to
    //the FIRST element > pivot from left to right
    while (left < right) {
        //increment left until element > pivot is found
        while(arr[left] <= pivot) {
            //indices compared
            ani.push([left, start]);
            ani.push([left, start]);
            //filler
            ani.push([-1, -1]);
            ani.push([-1, -1]);
            left++;
        }
        //decrement right until element <= pivot is found
        while(arr[right] > pivot) {
            //indices compared
            ani.push([right, start]);
            ani.push([right, start]);
            //filler
            ani.push([-1, -1]);
            ani.push([-1, -1]);
            right--;
        }
        //if left has not gone past right
        if (left < right) {
            //indices compared 
            ani.push([left, right]);
            ani.push([left, right]);
            //swap bar heights
            ani.push([left, arr[right]]);
            ani.push([right, arr[left]]);
            //swap the elements
            const temp = arr[left];
            arr[left] = arr[right];
            arr[right] = temp;
        }
    }
    //swap bar heights
    //indices compared 
    ani.push([start, right]);
    ani.push([start, right]);
    //swap bar heights
    ani.push([start, arr[right]]);
    ani.push([right, arr[start]]);

    //swap the pivot element to its sorted index
    const temp = arr[start];
    arr[start] = arr[right];
    arr[right] = temp;

    //return pivot's sorted index
    return right;
}

///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////

//bubble sort algos

export function bubbleSortAni(arr) {
    //animation sequence to be returned
    const ani = [];
    bubbleSort(arr, ani);
    return ani;
}

function bubbleSort(arr, ani) {
    //sort stop condition
    let unsorted = true;
    
    //number of sorted elements counter
    let j = 0;
    while (unsorted) {
        //if the if-statement inside for loop below never executes, 
        //then unsorted should stay false, meaning array is now sorted
        unsorted = false;
        //go through all element until last unsorted element
        for (let i = 0; i < arr.length - 1 - j; i++) {
            //animation indices compared added twice to toggle color
            ani.push([i, i+1]);
            ani.push([i, i+1]);
            //if misorder found, swap elements
            if (arr[i] > arr[i+1]) {
                //animation 
                ani.push([i, arr[i+1]]);
                ani.push([i+1, arr[i]]);
                const temp = arr[i];
                arr[i] = arr[i+1];
                arr[i+1] = temp;
                unsorted = true;
            } else {
                //animation index filler
                ani.push([-1, -1]);
                ani.push([-1, -1]);
            }
        }
        //one element is nwo sorted
        j++;
    }

}

///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////

//counting sort algos

//counting sort animation
export function countSortAni(arr, max, min) {
    const ani = [];
    countSort(arr, max, min, ani);
    return ani;
}

function countSort(arr, max, min, ani) {
    //count array
    //with range 0 to max - min + 1
    let ctArr = [];
    //output array
    let output = [];
    //populate with 0 initially
    for (let i = 0; i < max - min + 1; i++) {
        ctArr.push(0);
    }
    for (let i = 0; i < arr.length; i++) {
        output.push(0);
    }

    //increment counter at where the value is indexed at in ctArr
    //i.e. if min = 5 and max = 10, and arr[i] is 7, then
    //ctArr[2] should be incremented by one
    //since 7 is 3rd number in our range
    for (let i = 0; i < arr.length; i++) {
        ctArr[(arr[i] - min)]++;
    }

    //add in indices from left to right
    for (let i = 1; i < ctArr.length; i++) {
        ctArr[i] += ctArr[i-1];
    }

    //for each position in arr starting from start to end
    //the value is arr[i] - min , which adjusts the range of values to ctArr's indexing
    //ctArr[] of that gives us the index where that value should go to in the output array
    //we decrement that idnex value after using it, so the next such value goes to output array
    //index one less than the one just used
    for (let i = 0; i < arr.length; i++) {
        output[ctArr[(arr[i] - min)]--] = arr[i];
        //animation
    }
    
    //copy output array to input array
    for (let i = 0; i < arr.length; i++) {
        arr[i] = output[i];
        //animation
        ani.push([i, output[i]]);
    }
    
    //end of sort signifier
    ani.push([-1, -1]);

    //not much animation related lines here, due to the fact that:
    //i'm not comparing nor swapping anything, but only overwriting arr[i] with output[i]
}

///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////

//heap sort algos

//heapsort animation
export function heapSortAni(arr) {

}

function heapSort() {
    
}