class Sort {
    constructor(array, visSpeed) {
        this.length = array.length;
        this.array = array;
        this.delay = 1000 / visSpeed;
        this.visMap = [];
        this.visualiserRunning = false;
        this.arraySorted = false;
    }
    heapSort() {
        const heap = (parent, end) => {
           const leftLeaf = 2 * parent + 1,
                 rightLeaf = 2 * parent + 2;
           let realParent = parent;
           if(leftLeaf < end && this.array[leftLeaf] > this.array[realParent]) {
               realParent = leftLeaf;
           }
           if(rightLeaf < end && this.array[rightLeaf] > this.array[realParent]) {
               realParent = rightLeaf;
           }
           if(realParent !== parent) {
               this.swap(parent, realParent, this.array)
               return heap(realParent, end);
           }
        }
        //------------- Heapify --------------
        let pos = Math.floor(this.length / 2);
        while (pos >= 0) {
            heap(pos, this.length);
            pos -= 1
        }
        // -----------------------------------
        
        // ------------- Sort ----------------
        let end = this.length - 1;
        while (end > 0) {
            this.swap(0 , end, this.array)
            heap(0, end)
            end -= 1;
        }
        return this.array;
        // ------------------------------------
    }
    selectionSort() {
        for (let i = 0; i < this.length - 1; i++) {
            let min = i;
            for (let n = i + 1; n < this.length; n++) {
                if(this.array[n] < this.array[min]) {
                    min = n;
                }
            }
            if(min !== i) {
                this.swap(i, min, this.array);
            }
        }
        return this.array;
    }
    bubbleSort() {
        let max = this.length - 1
        for (let i = 0; i < this.length; i++) {
            for (let n = 0; n < max; n++) {
                if(this.array[n] > this.array[n+1]) {
                    this.swap(n, n+1, this.array);
                }
            }
            max -= 1;
        }
        return this.array;
    }
    insertationSort() {
        for (let i = 1; i < this.length; i++) {
            const value = this.array[i];
            let bound = i;
            while (bound > 0 && this.array[bound - 1] > value) {
                this.map([this.array[bound - 1]], bound);
                this.array[bound] = this.array[bound - 1];
                bound -= 1;
            }
            this.map([value] , bound);
            this.array[bound] = value;
        }
        return this.array;
    }

    schellSort() {
        let gap = Math.floor(this.length / 2);
        let left = 0;
        while(gap >= 1) {
            const right = left + gap
            if(right === this.length) {
                gap = Math.floor(gap / 2);
                left = 0;
            }
            if(this.array[left] > this.array[right]) {
                this.swap(left, right, this.array);
            }
            left += 1;
        }
        this.array = this.array
        return this.insertationSort();
    }
    quickSort(left = 0, right = this.length -1) {
        if(left < right) {
            const pivot =  this.array[left];
            
            let i = left;
            let j = right;

            while(i < j) {
                while(this.array[i] <= pivot && i < right) {
                    i++;
                }
                while(this.array[j] > pivot) {
                    j--;
                }
                if(i < j) {
                    this.swap(i, j, this.array);
                }
            }   
            this.swap(left, j, this.array);
            
            this.quickSort(left, j -1 );
            this.quickSort(j+1, right);
        }
          return this.array;       
    }
    mergeSort(left=0, right=this.length - 1) {

        if(left < right){
    
        const mid = Math.floor((right + left) / 2);
        this.mergeSort(left, mid);
        this.mergeSort(mid+1, right);
        
        const arr = [];
        for (let i = 0; i < right - left +1; i++) {
            arr.push(0)
        }
        let l = left,
            r = mid +1,
            k = 0;
        
        
        while(l<= mid && r<= right){
            if(this.array[l] <= this.array[r]){
                arr[k] = this.array[l];
                l++;
            }else{
                arr[k] = {
                    number:this.array[r],
                    moveId: r
                };
                r++;
            }
            k++
        }
        while(l <= mid) {
            arr[k] = this.array[l];
            l++;
            k++;
        }
        while(r <= right) {
            arr[k] = this.array[r];
            r++;
            k++;
        }
        
        for(let i=left; i<=right; i++){
            if(typeof arr[i - left] === 'object') {
                this.map([arr[i - left].number, 0], i, arr[i - left].moveId)
                this.array[i] = arr[i - left].number;
            }else{
                this.map([arr[i - left]], i)
                this.array[i] = arr[i - left];
            }
        }
        return this.array
        }
    }
    countSort() {
        const min = 1;
        const max = 40;
        const count = [];
        const sorted = [...this.array];
        for (let i = min; i < max + 1; i++) {
            count.push(0);
        }
        for (let i = 0; i < this.length; i++) {
            count[this.array[i]-1]++;
        }
        for (let i = 1; i < max; i++) {
            count[i] = count[i-1] + count[i]
        }
        for (let i = 0; i < this.length; i++) {
            const num = this.array[i];
            const pos = count[num - 1] - 1;
            count[num - 1]--;
            sorted[pos] = num;
        }
        this.array = [...sorted];
        return this.array;
    }
    visualizeMap() {
       let start;
       const transition = [];
       const render = time =>{
            const stepps = this.visMap.length > 0;
            const transitions = transition.length > 0;
            let stepp = null;

            if(!stepps && !transitions) {
                document.querySelectorAll('.ElementInside').forEach( el => el.classList.add('Sorted'));
                this.visualiserRunning = false;
                return;
            };

            if(!start) {
                start = time + this.delay
            }

            if(transitions && time >= transition[0].endTransition) {
                stepp = transition.shift();
                stepp.elements.forEach( el => el.style.backgroundColor = '' )
            }

            if(stepps && time >= start) {
                start = time + this.delay
                stepp = this.visMap.shift();
                stepp.endTransition = time + 100;
              
                for (let i = 0; i < stepp.elements.length; i++) {
                    stepp.elements[i].style.backgroundColor = 'orange';
                    stepp.elements[i].style.height = `${stepp.values[i]}px`;
                    if(state.updateValueText) {
                        stepp.elements[i].firstElementChild.textContent = stepp.values[i];
                    } 
                }

                transition.push(stepp);
            }
            this.visualiserRunning = window.requestAnimationFrame(render);
        }
       this.visualiserRunning = window.requestAnimationFrame(render);
    }
    stopVisualiser() {
        if(this.visualiserRunning) { 
            window.cancelAnimationFrame(this.visualiserRunning);
            this.visualiserRunning = false;
            return true;
        }
        return false;
    }
    map(values, ...ids) {
        this.visMap.push({
            elements: ids.map(id => document.getElementById(id)),
            values: values
        });
    }
    swap(idSwap, idWith, arr) {
        const swapEl = arr[idSwap],
              withEl = arr[idWith];    

        arr[idSwap] = withEl;
        arr[idWith] = swapEl;
        this.map([withEl, swapEl], idSwap, idWith)
      
    }
}










