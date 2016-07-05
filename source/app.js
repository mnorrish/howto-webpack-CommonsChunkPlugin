// to demonstrate that dependency3 is imported and used
require('./dependency3').doSomething();

// application route logic
function router(routeName, element) {
  // Below we use require.ensure to define split points in the applcation

  if (routeName === 'a') {
    // the routeA module is only loaded when needed
    require.ensure(['./routeA'], (require) => {
      // the code inside this callback is only executed once the routeA module is loaded
      require('./routeA')(element);
    }, 'routeA'); // the final argument gives the chunk a name -- otherwise a number is used

    return;
  }

  if (routeName === 'b') {
    require.ensure(['./routeB'], (require) => {
      require('./routeB')(element);
    }, 'routeB');

    return;
  }

  if (routeName === 'c') {
    require.ensure(['./routeC'], (require) => {
      require('./routeC')(element);
    }, 'routeC');

    return;
  }
}

function init() {
  // the DOM element which the routes will render into
  const contentElement = document.getElementById('content');

  // listen to clicks on the navigation buttons and trigger corresponding routes
  document.getElementById('routeA').addEventListener('click', () => {
    router('a', contentElement);
  });
  document.getElementById('routeB').addEventListener('click', () => {
    router('b', contentElement);
  });
  document.getElementById('routeC').addEventListener('click', () => {
    router('c', contentElement);
  });
}

// initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', init);
