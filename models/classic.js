import {HTTP} from '../utils/http.js'
class ClassicModel extends HTTP {
  getLatest(scallBack) {
    this.request({
      url:"classic/latest",
      success:(res) => {
        scallBack(res)
      }
    })
  }
}
export {ClassicModel}