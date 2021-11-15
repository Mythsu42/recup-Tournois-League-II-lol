const axios = require("axios");

axios
  .get("https://division2lol.fr/resultats")
  .then((response) => {
    let data = response.data;
    data = data.replace(/\s+/g, "");
    let position = [];
    const findArray = [
      '"name">',
      '"name-responsive">',
      '"played">',
      '"winned">',
      '"lossed">',
      '"points">',
    ];
    const property = [
      "name",
      "acronym",
      "played",
      "winned",
      "lossed",
      "points",
    ];
    let idx = data.indexOf('"ranking-row">');
    let rank = [];

    while (idx != -1) {
      position.push(idx);
      idx = data.indexOf('"ranking-row">', idx + 1);
    }

    function recupStr(index, data) {
      let info = "";
      for (let i = index; data[i] != "<"; i++) {
        info += data[i];
      }
      return info;
    }

    for (let i = 0; i < position.length; i++) {
      rank.push({});
      for (let j = 0; j < findArray.length; j++) {
        idx = data.indexOf(findArray[j], position[i]) + findArray[j].length;
        rank[i][property[j]] = recupStr(idx, data);
      }
    }

    console.log(rank);
  })
  .catch((error) => {
    console.log(error);
  });
