import {HTTP} from '../utils/http.js'
class ClassicModel extends HTTP {
  getLatest(scallBack) {
    this.request({
      url:"classic/latest",
      success:(res) => {
        scallBack(res)
        this._setLatestIndex(res.index)
        let key = this._getKey(res.index)
        wx.setStorageSync(key, res)
      }
    })
  }
  
  getClassic(index, nextOrPreviours, sCallback) {
    let key = nextOrPreviours == 'next' ? this._getKey(index+1):this._getKey(index - 1)
    let classic = wx.getStorageSync(key)
    if (!classic) {
      this.request({
        url: 'classic/' + index + '/' + nextOrPreviours,
        success: (res) => {
          wx.setStorageSync(this._getKey(res.index), res) 
          sCallback(res)
        }
      })
    } else {
      sCallback(classic)
    } 
    
  }

  isFirst(index) {
    return index == 1
  }

  ifLatest(index) {
    let latestIndex = this._getLatestIndex()
    return latestIndex == index
  }

  _setLatestIndex(index) {
    wx.setStorageSync('latest', index)
  }
  _getLatestIndex(){
    let index = wx.getStorageSync('latest')
    return index
  }

  _getKey(index) {
    let key = "classic-" + index
    return key
  }
}
export {ClassicModel}