const fetch = require('node-fetch');

async function getHomeData(): Promise<any> {
  try {
    const data = await fetch('https://jsonplaceholder.typicode.com/todos');
    const jsonData = await data.json();
    return {
      status: 1,
      data: jsonData,
    };
  } catch (err) {
    return {
      status: 0,
      msg: err,
    };
  }
}

export { getHomeData };
