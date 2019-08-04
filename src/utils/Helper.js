class Helper {
  static sort(obj) {
    let result = {}
    Object.entries(obj).sort(function(a, b) {
      return b[1] - a[1];
    }).forEach((item) => {
      result[item[0]] = item[1];
    });

    return result;
  }

  static count(obj) {
    let result = {};
    let keys = Object.keys(obj);
    for (let i = 0; i < keys.length; i++) {
      !result.hasOwnProperty(obj[keys[i]]) ? result[obj[keys[i]]] = 1 : result[obj[keys[i]]] += 1;
    }

    return result;
  }
}

export default Helper;
