import axios from 'axios';

export const axiosWithAuth = () =>
  axios.create({
    baseURL: 'http://localhost:4000/api',
    headers: {
      Authorization: `${localStorage.getItem('token')}`
    }
  });


  axiosWithAuth().interceptors.response.use(
    function(response) {
      return response
    },
    function(error) {
      const errorResponse = error.response
      if (isTokenExpiredError(errorResponse)) {
        return resetTokenAndReattemptRequest(error)
      }
      // If the error is due to other reasons, we just throw it back to axios
      return Promise.reject(error)
    }
  )
  function isTokenExpiredError(errorResponse) {
    // Your own logic to determine if the error is due to JWT token expired returns a boolean value
  }