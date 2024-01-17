import config from './config.js';
const { API_ENDPOINT } = config;

// error 처리
const REQUEST_ERROR = {
  '500': { msg: '요청실패' },
}

const request = async (url) => {
  try {
    const result = await fetch(url);
    if (result.status === 200) {
      return result.json();
    } else {
      throw REQUEST_ERROR[result.status];
    }
  } catch (error) {
    console.log(error);
    alert(error.msg);
    return { data: null }
  }
}

// TODO: 바닐라 JS로 상태 관리하기
const api = {
  fetchCats: keyword => {
    return request(`${API_ENDPOINT}/api/cats/search?q=${keyword}`);
  },
  fetchCatsPage: (keyword, page) => {
    return request(`${API_ENDPOINT}/api/cats/search?q=${keyword}&page=${page}`);
  },
  fetchRandomCats: () => {
    return request(`${API_ENDPOINT}/api/cats/random50`);
  },
  fetchCatDetail: id => {
    return request(`${API_ENDPOINT}/api/cats/${id}`);
  }
};

export default api;
