import axios from 'axios';

function getaccesstoken() {
	return axios.get('/token')
  	.then(function (response) {
  		console.log(response.data);
  		return response.data;
  	})
	.catch(function (error) {
   	 	console.log(error);
  	});
}

const Client = { getaccesstoken };
export default Client;