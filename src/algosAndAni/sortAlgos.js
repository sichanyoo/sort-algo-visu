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
 ani.push([0, 0]);
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

