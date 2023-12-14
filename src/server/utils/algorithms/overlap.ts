import { Restaurant, Category } from "@prisma/client";

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

/**
 * Creates a vector from two lists
 * @param categoriesI
 * @param categoriesII
 * @returns
 */
function createVector(categoriesI : Category[], categoriesII : Category[]): Category[] {
    return uniqRec(categoriesI.concat(categoriesII).map((value) => { 
        return value.name.toLowerCase();
    })).sort();
}


/**
 * Counts the number of times a word appears in a list of categories
 * @param st
 * @param categories
 * @returns
 */
function countWords(st : string, categories : Category[]): number {
    return categories.filter((value) => {
        return value.name.toLowerCase() === st.toLowerCase();
    }).length;  
}

/**
 * Creates a vector for a single list
 * @param uniqWords
 * @param categories
 * @returns
 */
function individualVectors(uniqWords : Category[], categories : Category[]): number[] {
    return uniqWords.map((value) => {
        return countWords(value.name, categories);
    });
}

/**
 * Calculates the dot product of two vectors
 * @param alon1 a list of numbers 
 * @param alon2 a list of numbers
 * @returns a number
 */
function dotProduct(alon1 : number[], alon2 : number[]): number {
    return (alon1[0]! * alon2[0]!) + dotProduct(alon1.slice(1), alon2.slice(1));
}


/**
 * Calculates the overlap of two restaurants
 * @param categoriesI
 * @param categoriesII
 * @returns a number between 0 and 1
 */
export function overlap(categoriesI : Category[], categoriesII : Category[]): number {
    const vector = createVector(categoriesI, categoriesII);
    const vectorOne = individualVectors(vector, categoriesI);
    const vectorTwo = individualVectors(vector, categoriesII);
    return dotProduct(vectorOne, vectorTwo) / Math.max(
        dotProduct(vectorOne, vectorOne), 
        dotProduct(vectorTwo, vectorTwo));
}




