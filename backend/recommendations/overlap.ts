// fun uniq-rec(l :: List<Any>) -> List<Any>:
//   #doc: "Assesses each value and eliminates any duplicates that appear later on in the list"
//   #doc: "Sourced from the textbook"
//   cases (List) l:
//     | empty => empty
//     | link(f, r) =>
//       if r.member(f):
//         uniq-rec(r)
//       else:
//         link(f, uniq-rec(r))
//       end
//   end
// end

/**
 * Assesses each value and eliminates any duplicates that appear later on in the
 * list
 * @param l 
 */
function uniqRec(l : any[]): any[] {
    return l.filter((value, index, self) => {
        return self.indexOf(value) === index;
    });
}

// fun create-vector(doc1 :: List<String>, doc2 :: List<String>) -> List<String>: 
//   sort(
//     uniq-rec(
//       map(string-tolower, append(doc1, doc2))))
// where:
//   create-vector([list: "a", "b", "c"], [list: "d", "d", "d", "b"]) is [list: "a", "b", "c", "d"]
// end

/**
 * Creates a vector from two documents
 * @param doc1
 * @param doc2
 * @returns
 */
function createVector(categoriesI : string[], categoriesII : string[]): string[] {
    return uniqRec(categoriesI.concat(categoriesII).map((value) => { 
        return value.toLowerCase();
    })).sort();
}

// fun count-words(st :: String, docu :: List<String>):
//   cases (List) docu:
//     | empty      => 0
//     | link(f, r) => 
//       if string-equal(string-tolower(st), string-tolower(docu.first)):
//         (1 + count-words(st, docu.rest))
//       else:
//         (0 + count-words(st, docu.rest))
//       end
//   end
// where:
//   count-words("d", [list: "d", "d", "d", "b"]) is 3
// end

/**
 * Counts the number of times a word appears in a document
 * @param st
 * @param docu
 * @returns
 */
function countWords(st : string, categories : string[]): number {
    return categories.filter((value) => {
        return value.toLowerCase() === st.toLowerCase();
    }).length;  
}


// fun individual-vectors(uniq-words :: List<String>, doc :: List<String>) -> List<Number>:
//   cases (List) uniq-words:
//     | empty => empty
//     | link(f, r) => link(count-words(uniq-words.first, doc), individual-vectors(uniq-words.rest, doc))
//   end
// where:
//   individual-vectors([list: "a", "b", "c", "d"], [list: "d", "d", "d", "b"]) is [list: 0, 1, 0, 3]
// end

/**
 * Creates a vector for a single document
 * @param uniqWords
 * @param categories
 * @returns
 */
function individualVectors(uniqWords : string[], categories : string[]): number[] {
    return uniqWords.map((value) => {
        return countWords(value, categories);
    });
}

// fun dot-product(alon1 :: List<Number>, alon2 :: List<Number>) -> Number:
//   cases (List) alon1:
//     | empty => 0
//     | link(f, r) => 
//       (alon1.first * alon2.first) + 
//       dot-product(alon1.rest, alon2.rest)
//   end
// where:
//   dot-product([list: 1, 1, 1, 0], [list: 0, 1, 0, 3]) is 1
//   dot-product([list: 1, 1, 1, 0], [list: 1, 1, 1, 0]) is 3
//   dot-product([list: 0, 1, 0, 3], [list: 0, 1, 0, 3]) is 10
// end

/**
 * Calculates the dot product of two vectors
 * @param alon1 a list of numbers 
 * @param alon2 a list of numbers
 * @returns a number
 */
function dotProduct(alon1 : number[], alon2 : number[]): number {
    return (alon1[0]! * alon2[0]!) + dotProduct(alon1.slice(1), alon2.slice(1));
}

// fun overlap(doc1 :: List<String>, doc2 :: List<String>) -> Number:

//   vector = create-vector(doc1, doc2)

//   dot-product(
//     individual-vectors(vector, doc1), 
//     individual-vectors(vector, doc2)) / 
//   num-max(
//     dot-product(
//       individual-vectors(vector, doc1),
//       individual-vectors(vector, doc1)),
//     dot-product(
//       individual-vectors(vector, doc2),
//       individual-vectors(vector, doc2))
//     )
// end


/**
 * Calculates the overlap of two restaurants
 * @param categoriesI
 * @param categoriesII
 * @returns a number between 0 and 1
 */
function overlap(categoriesI : string[], categoriesII : string[]): number {
    const vector = createVector(categoriesI, categoriesII);
    const vectorOne = individualVectors(vector, categoriesI);
    const vectorTwo = individualVectors(vector, categoriesII);
    return dotProduct(vectorOne, vectorTwo) / Math.max(
        dotProduct(vectorOne, vectorOne), 
        dotProduct(vectorTwo, vectorTwo));
}




/**
 * Form the restaurant pairs. For example in this example the restaurant pairs are 
 * (Restaurant_1, Restaurant_2), (Restaurant_1, Restaurant_3), and 
 * (Restaurant_2, Restaurant_3). Select each restaurant to pair one by one. After 
 * this, we find all the users who have rated for both the restaurants in the restaurant 
 * pair. Form a vector for each restaurant and calculate the similarity between the 
 * two restaurants using the overlap formula defined above.
 */


//Now, in this step we calculate the ratings that are missing in the table.
