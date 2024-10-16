import axios, { AxiosError } from "axios";
import Swal from "sweetalert2";

export default class AxiosErrorHandler {
  static handleError(error: unknown) {
    let errorMessage = "An unknown error occurred";

    if (axios.isAxiosError(error)) {
      errorMessage =
        error?.response?.data?.message || error.message || errorMessage;
    }

    Swal.fire({
      icon: "error",
      title: "Error",
      text: errorMessage,
      confirmButtonText: "Okay",
    });

    console.error("AxiosError: ", error);
  }
}
