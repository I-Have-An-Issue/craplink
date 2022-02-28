const util = {}

util.randomColor = () => {
  return "#"+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6)
}

util.randomString = (len, arr = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890") => {
  let ans = '';
  for (let i = len; i > 0; i--) {
    ans +=
    arr[Math.floor(Math.random()*arr.length)];
  }
  return ans;
}

module.exports = util