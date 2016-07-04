// to demonstrate that dependency1 and dependency2 are imported and used
require('./dependency1').doSomething();
require('./dependency2').doSomething();

console.log('routeA loaded');

module.exports = (element) => {
  element.innerHTML = 'Route A!';
};
