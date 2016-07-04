// to demonstrate that dependency1 is imported and used
require('./dependency1').doSomething();

console.log('routeB loaded');

module.exports = (element) => {
  element.innerHTML = 'Route B!';
};
