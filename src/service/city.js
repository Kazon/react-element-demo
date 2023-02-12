import http from "../network/http";

export const getCityList = async () => {
  return await http({
    url: '/v1/cities',
    method: 'GET',
    loading: true,
    params: {
      type: 'group'
    }
  })
}
// cityGuess 
export const guessCity = async () => {
  return await http({
    url: '/v1/cities',
    method: 'GET',
    loading: true,
    params: {
      type: 'guess'
    }
  })
}
// hotcity 
export const hotcity = async () => {
  return await http({
    url: '/v1/cities',
    method: 'GET',
    loading: true,
    params: {
      type: 'hot'
    }
  })
}

export const getCurrentCity = async number => {
  return await http({
    url: '/v1/cities/' + number,
    loading: true,
  })
}

export const getPois = async data => {
  return await http({
    url: '/v1/pois/',
    method: 'GET',
    params: data,
    loading: true,
  })
}

/**
 * 获取home页面食品分类列表
 * @param {geohash} 当前定位经纬度
 * @returns 
 */
export const msiteFoodTypes = async geohash => {
  return await http({
    url: '/v2/index_entry', 
    method: 'GET',
    params: {
      geohash,
      group_type: '1',
      'flags[]': 'F'
    },
    loading: true
  });
}