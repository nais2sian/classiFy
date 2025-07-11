//      node --watch _practice/2025-05-14.js

function multiplyer(a) {
  return a * 2;
}

function geometry(figure, target, a, b) {
  if (figure === "rectangle") {
    if (target === "perimeter") {
      return a*2 + b*2
    }
    if (target === "area") {
      return a*b
    }
  }

  if (figure === "circle") {
    if (target === "perimeter") {
      return Math.PI*a*2
    }
    if (target === "area") {
      return Math.PI*(a*a)
    }
  }

}

console.log(geometry("rectangle", "perimeter", 3, 4)); // 14
console.log(geometry("rectangle", "area", 3, 4)); // 12
console.log(geometry("circle", "perimeter", 2)); // Math.PI * 2 * 2
console.log(geometry("circle", "area", 2)); // Math.PI * 2 ** 2


const animals = ['alligator', 'bear', 'cat', 'dog', 'elephant']

const animalsStartingWithVowels = animals.filter((animal) => {
    if ("aeiou".includes(animal[0])) {
        return true
    }
})