// to demonstrate that dependency1 and dependency3 are imported and used
require('./dependency1').doSomething();
require('./dependency3').doSomething();

console.log('routeC loaded');

module.exports = (element) => {
  element.innerHTML = 'Route C!';
};
