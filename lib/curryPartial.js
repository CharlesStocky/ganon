/**
 * `curryPartial` is a generic function that allows either currying (see lib/curry.js)
 * or partial application (see lib/partial.js). The function should be very flexible.
 * After being invoked on a function (mandatory), the function returned by curryPartial(fn) can take arguments or nested calls to `curryPartial`.
 * See test/curryPartial.test.js for details.
 * Inspired by https://codewars.com/kata/currying-vs-partial-application
 *
 * @params {Function} fn The function to be transformed into a curryPartial'ed function.
 * @returns {Function} A version of the input function that allows for both currying and partial application.
 */

let counter = 0

function curryPartial(fn, ...fixedArgs) { 
  counter++
  if(!fn){
    console.log('no function entered!') 
  } 
  const func = fn
  const arity = fn.length 
  if(counter === 1 && fixedArgs.length >= 1){
    if(fixedArgs.length === arity){
      return fn.apply(null, fixedArgs)
    }
    return function(...moreArgs){
      fn.apply(null, fixedArgs.concat(...moreArgs)) 
    }
  }
  if(fixedArgs.length){
    return curryPartial.bind(null, func, ...fixedArgs)
  }
  if(func && !fixedArgs.length){
    return curryPartial.bind(null, func) 
  }
  return fn(...fixedArgs) 
}

function add(a, b, c){
  console.log(a + b + c)
}

curryPartial(add)(1)(2)(3)

module.exports = curryPartial;
