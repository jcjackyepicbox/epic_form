function getHomeData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        todo: ['home data 1', 'home data 2'],
      });
    }, 100);
  });
}

export { getHomeData };
