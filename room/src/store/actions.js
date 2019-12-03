import axios from 'axios'
import { baseURL } from '@/global.js';

const getUserInfo = params => {
  return axios.post(baseURL+'/three_cloud/user_info/select', JSON.stringify(params)).then(res => {
    return res
  })
}
const getTotalScore = params => {
  return axios.post(baseURL+"/three_cloud/user_total_score/select", JSON.stringify(params))
}

const getStore = name => {
  return window.localStorage[name]
}

export const actions = {
  async getUserInfo({commit, state}) {
    return await getUserInfo({
      user_id: state.userInfo.user_id
    })
  },
}
