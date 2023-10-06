// specific system checks
function isWin () {
  return process.platform === 'win32'
};


export default {
  isWin: isWin()
}