const { matchPath } = require('react-router-dom');
const { default: routes } = require('../src/routes');

function fetchDataByRoute(req) {
  return new Promise((resolve, reject) => {
    let promises = null;
    routes.forEach((route) => {
      const match = matchPath(req.path, route);
      if (match && route.loadData) {
        promises = () => route.loadData(match);
      }
    });

    if (promises == null) {
      resolve({ data: [] });
    }

    promises()
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

module.exports = {
  fetchDataByRoute,
};
