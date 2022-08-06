import axios from "axios";

axios.defaults.withCredentials = true;

const customAxios = axios.create({
	baseURL: "/api",
	timeout: 10000,
});

const requestHandler = (request) => request;

const responseHandler = (response) => {
	return response;
};

const errorHandler = (error) => {
	if (error.response.status === 401) window.location = "/login";
	else if (error.response.status === 0) alert("Server is not running");
	return Promise.reject(error);
};

customAxios.interceptors.request.use(
	(request) => requestHandler(request),
	(error) => errorHandler(error)
);

customAxios.interceptors.response.use(
	(response) => responseHandler(response),
	(error) => errorHandler(error)
);

export default customAxios;
