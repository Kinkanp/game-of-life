const https = require('http');
const fs = require('fs');

https.get('http://www.michurin.net/js/life_map.js', (resp) => {
  let data = '';

  // A chunk of data has been received.
  resp.on('data', (chunk) => {
    data += chunk;
  });

  // The whole response has been received. Print out the result.
  resp.on('end', () => {
    const figures = JSON.parse(data).map(figure => figure.content).flat();

    const mappedFigures = figures.map(({ map }, index) => {
      if (!map) {
        return '';
      }

      const coords = map.map(coords => {
        return `'${coords.replace(/@/g, '1').replace(/\./g, '0')}'`;
      });

      return `[${coords}]`
    }).filter(Boolean)
      .join(', \n ');

    const fileContent = `const figures = [\n${mappedFigures}\n]`;


    fs.writeFile('figures.js', fileContent, (err) => {
      console.log(err);
    });
  });

}).on("error", (err) => {
  console.log("Error: " + err.message);
});
