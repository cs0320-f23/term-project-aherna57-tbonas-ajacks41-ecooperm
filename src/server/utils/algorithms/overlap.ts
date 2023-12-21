import { Restaurant, Category } from "@prisma/client";

/**
 * Assesses each value and eliminates any duplicates that appear later on in the
 * list
 * @param l
 */
function uniqRec(l: any[]): any[] {
  return l.filter((value, index, self) => {
    return self.indexOf(value) === index;
  });
}

/**
 * Creates a list of all the categories in the two lists
 * @param categoriesI
 * @param categoriesII
 * @returns
 */
function createVector(
  categoriesI: Category[],
  categoriesII: Category[]
): Category[] {
  return uniqRec(
    categoriesI.concat(categoriesII).map((value) => {
      return value.name.toLowerCase();
    })
  ).sort();
}

/**
 * Counts the number of times a word appears in a list of categories
 * @param st
 * @param categories
 * @returns
 */
function countWords(st: string, categories: Category[]): number {
    console.log("categories: ", categories);    
    if (categories.length === 0) {
        return 0;
    } else {
        
        if (st.toLowerCase() === categories[0].name.toLowerCase() ){
            return 1 + countWords(st, categories.slice(1));
        } else {
            return 0 + countWords(st, categories.slice(1));
        }
    }
}



/**
 * Creates a vector for a single list
 * @param uniqWords
 * @param categories
 * @returns
 */
function individualVectors(
  uniqWords: Category[],
  categories: Category[]
): number[] {

    if (uniqWords.length === 0) {
        return [];
    } else {
        console.log("uniqWords: ", uniqWords);
        console.log("uniqWords[0] type", typeof(uniqWords[1]));
        return [countWords(uniqWords[0], categories)].concat(individualVectors(uniqWords.slice(1), categories));
    }
}

/**
 * Calculates the dot product of two vectors
 * @param alon1 a list of numbers
 * @param alon2 a list of numbers
 * @returns a number
 */
function dotProduct(alon1: number[], alon2: number[]): number {
    if (alon1.length === 0 || alon2.length === 0) {
        return 0;
    } else {
        return (alon1[0] * alon2[0]) + dotProduct(alon1.slice(1), alon2.slice(1));
    }
}

/**
 * Calculates the overlap of two restaurants
 * @param categoriesI
 * @param categoriesII
 * @returns a number between 0 and 1
 */
export function overlap(
  categoriesI: Category[],
  categoriesII: Category[]
): number {
    console.log("categoriesI: ", categoriesI);
    console.log("categoriesII: ", categoriesII);
  const vector = createVector(categoriesI, categoriesII);
  console.log("category vector: ", vector);
  const vectorOne = individualVectors(vector, categoriesI);
  const vectorTwo = individualVectors(vector, categoriesII);
  return (
    dotProduct(vectorOne, vectorTwo) /
    Math.max(
      dotProduct(
        individualVectors(vector, categoriesI),
        individualVectors(vector, categoriesI)
      ),
      dotProduct(
        individualVectors(vector, categoriesII),
        individualVectors(vector, categoriesII)
      )
    )
  );
}
