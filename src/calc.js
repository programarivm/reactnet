import helpers  from './helpers.js';

const calc = {
  ips: {
    v4: {
      chart: {
        occurrences: function(obj, data) {
          if (Object.keys(obj.history).length === 0) {
            obj.history = data.ips.v4.conv;
          } else {
            Object.keys(data.ips.v4.conv).forEach((key) => {
              obj.history.hasOwnProperty(key)
                ? obj.history[key] += data.ips.v4.conv[key]
                : obj.history[key] = data.ips.v4.conv[key];
            });
          }
          let items = helpers.countOccurrences(obj.history);
          obj.labels = Object.values(items);
          obj.datasets[0].data = Object.keys(items);
          obj.datasets[0].backgroundColor.push('#'+Math.floor(Math.random()*16777215).toString(16));
          obj.history = helpers.sortObject(obj.history);
        },
        endpoints: function(obj, data) {
          if (obj.history.length === 0) {
            obj.history = data.ips.v4.endpoints;
          } else {
            obj.labels = [];
            obj.datasets[0].data = [];
            obj.datasets[1].data = [];
            obj.datasets[2].data = [];
            obj.datasets[3].data = [];
            obj.datasets[4].data = [];
            obj.datasets[5].data = [];
            for (let endpoint of data.ips.v4.endpoints) {
              let exists = false;
              for (let history of obj.history) {
                if (history.ip === endpoint.ip) {
                  history.packets = +history.packets + +endpoint.packets;
                  history.bytes = +history.bytes + +endpoint.bytes;
                  history.tx_packets = +history.tx_packets + +endpoint.tx_packets;
                  history.tx_bytes = +history.tx_bytes + +endpoint.tx_bytes;
                  history.rx_packets = +history.rx_packets + +endpoint.rx_packets;
                  history.rx_bytes = +history.rx_bytes + +endpoint.rx_bytes;
                  exists = true;
                  break;
                }
              }
              if (!exists) {
                obj.history.push(endpoint);
              }
            }
            obj.history.sort(function (a, b) {
              return b.bytes - a.bytes;
            });
            // the twenty busiest endpoints
            for (let i = 0; i < 20; i++) {
              let item = obj.history[i];
              if (item !== undefined) {
                obj.labels.push(item.ip);
                obj.datasets[0].data.push(item.packets);
                obj.datasets[1].data.push(item.bytes);
                obj.datasets[2].data.push(item.tx_packets);
                obj.datasets[3].data.push(item.tx_bytes);
                obj.datasets[4].data.push(item.rx_packets);
                obj.datasets[5].data.push(item.rx_bytes);
              }
            }
          }
        }
      }
    },
    v6: {
      chart: {
        occurrences: function(obj, data) {
          if (Object.keys(obj.history).length === 0) {
            obj.history = data.ips.v6.conv;
          } else {
            Object.keys(data.ips.v6.conv).forEach((key) => {
              obj.history.hasOwnProperty(key)
                ? obj.history[key] += data.ips.v6.conv[key]
                : obj.history[key] = data.ips.v6.conv[key];
            });
          }
          let items = helpers.countOccurrences(obj.history);
          obj.labels = Object.values(items);
          obj.datasets[0].data = Object.keys(items);
          obj.datasets[0].backgroundColor.push('#'+Math.floor(Math.random()*16777215).toString(16));
          obj.history = helpers.sortObject(obj.history);
        },
        endpoints: function(obj, data) {
          if (obj.history.length === 0) {
            obj.history = data.ips.v6.endpoints;
          } else {
            obj.labels = [];
            obj.datasets[0].data = [];
            obj.datasets[1].data = [];
            obj.datasets[2].data = [];
            obj.datasets[3].data = [];
            obj.datasets[4].data = [];
            obj.datasets[5].data = [];
            for (let endpoint of data.ips.v6.endpoints) {
              let exists = false;
              for (let history of obj.history) {
                if (history.ip === endpoint.ip) {
                  history.packets = +history.packets + +endpoint.packets;
                  history.bytes = +history.bytes + +endpoint.bytes;
                  history.tx_packets = +history.tx_packets + +endpoint.tx_packets;
                  history.tx_bytes = +history.tx_bytes + +endpoint.tx_bytes;
                  history.rx_packets = +history.rx_packets + +endpoint.rx_packets;
                  history.rx_bytes = +history.rx_bytes + +endpoint.rx_bytes;
                  exists = true;
                  break;
                }
              }
              if (!exists) {
                obj.history.push(endpoint);
              }
            }
            obj.history.sort(function (a, b) {
              return b.bytes - a.bytes;
            });
            // the twenty busiest endpoints
            for (let i = 0; i < 20; i++) {
              let item = obj.history[i];
              if (item !== undefined) {
                obj.labels.push(item.ip);
                obj.datasets[0].data.push(item.packets);
                obj.datasets[1].data.push(item.bytes);
                obj.datasets[2].data.push(item.tx_packets);
                obj.datasets[3].data.push(item.tx_bytes);
                obj.datasets[4].data.push(item.rx_packets);
                obj.datasets[5].data.push(item.rx_bytes);
              }
            }
          }
        }
      }
    }
  },
  protocols: function(obj, data) {
    obj.chart.bytes.labels = [];
    obj.chart.frames.labels = [];
    obj.chart.bytes.datasets[0].data = [];
    obj.chart.frames.datasets[0].data = [];
    for (let item of data.protocols) {
      let exists = false;
      for (let protocol of obj.tshark) {
        if (item.name === protocol.name && item.level === protocol.level && item.parent_name === protocol.parent_name) {
          protocol.bytes = +protocol.bytes + +item.bytes;
          protocol.frames = +protocol.frames + +item.frames;
          obj.chart.bytes.labels.push(protocol.name);
          obj.chart.frames.labels.push(protocol.name);
          obj.chart.bytes.datasets[0].data.push(protocol.bytes);
          obj.chart.frames.datasets[0].data.push(protocol.frames);
          exists = true;
          break;
        }
      }
      if (!exists) {
        obj.tshark.push(item);
        obj.chart.bytes.labels.push(item.name);
        obj.chart.frames.labels.push(item.name);
        obj.chart.bytes.datasets[0].data.push(item.bytes);
        obj.chart.frames.datasets[0].data.push(item.frames);
      }
    }
  }
}

export default calc;
