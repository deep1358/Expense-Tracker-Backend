export const error = (err) => ({
  isError: true,
  status: err.response.status,
  message:
    err.response?.data?.error || err.response?.statusText || err.message || 'Something went wrong'
});
