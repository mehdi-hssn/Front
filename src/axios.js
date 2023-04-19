import axios from 'axios';
axios.interceptors.response.use(
    (resp) => {
      let fe_version = resp.headers['fe-version'] || 'default'
      if(fe_version !== localStorage.getItem('fe-version') && resp.config.method == 'get'){
        localStorage.setItem('fe-version', fe_version)
        window.location.reload() // For new version, simply reload on any get
      }
      return Promise.resolve(resp)
    },
  )
  
axios.defaults.baseURL = process.env.VUE_APP_ENV_AXIOS_BASEURL;
axios.defaults.headers.common['Authorization'] = 'Bearer '+localStorage.getItem('token');
