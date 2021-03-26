import { UsernamePasswordInput } from "../resolvers/UsernamePasswordInput";
import { ErrorMessage } from "../static/errorMessage";

export const validateRegister = (options: UsernamePasswordInput) => {
  if (!options.email.includes("@")) {
    return [
      {
        field: "email",
        message: ErrorMessage.User.EMAIL_INVALID,
      },
    ];
  }

  if (options.name.length <= 2) {
    return [
      {
        field: "name",
        message: ErrorMessage.User.NAME_MIN,
      },
    ];
  }

  if (options.name.includes("@")) {
    return [
      {
        field: "name",
        message: ErrorMessage.User.NAME_CANNOT_INCLUDE_AN_AT,
      },
    ];
  }

  if (options.password.length <= 2) {
    return [
      {
        field: "password",
        message: ErrorMessage.User.PASSWORD_MIN,
      },
    ];
  }

  return null;
};
