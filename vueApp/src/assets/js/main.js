let settings = {
  servUrl: 'http://127.0.0.1:8000',
  userToken: '13303309-d941-486f-b600-3e90929ac50f',
  restId: '3a1e6dc1-465f-4c8e-b9a5-a94de93a60c9',
}
export {settings}

const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl))


