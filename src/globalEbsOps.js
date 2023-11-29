import axios from "axios";
import Swal from "sweetalert2";

window.reportEBsSignal = (id) => {
  const sessionData = JSON.parse(sessionStorage.getItem('AuthToken'))[0];
  const UserID = sessionData ? sessionData.UserID : null;

  console.log(UserID);
  if (UserID) {
    axios.post(window.SERVER_URL+'ReportCebsSignals', { id: id, UserID: UserID })
      .then(response => {
        if (response.data.success) {
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: response.data.success,
          });
        }

        if (response.data.error_a) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: response.data.error_a,
          });
        }
      })
      .catch(error => {
        if (error.response && error.response.status === 422) {
          const errors = error.response.data.errors;
          for (let field in errors) {
            Swal.fire({
              icon: 'error',
              title: 'Validation Error',
              text: errors[field][0], // Show the first error message for this field
            });
          }
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Something went wrong!',
          });
        }
      });
  } else {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Your account is either not active or malformed, Close the app and try again',
    });
  }
}
