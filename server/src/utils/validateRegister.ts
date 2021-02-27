import { UsernamePasswordInput } from "../resolvers/UsernamePasswordInput";

export const validateRegister = (options: UsernamePasswordInput) => {
  if (options.email && !options.email.includes("@")) {
    return [
      {
        field: "email",
        message: "invalid email",
      },
    ];
  }

  if (options.name && options.name.length <= 2) {
    return [
      {
        field: "name",
        message: "length must be greater than 2",
      },
    ];
  }

  if (options.name && options.name.includes("@")) {
    return [
      {
        field: "name",
        message: "cannot include an @",
      },
    ];
  }

  if (options.password && options.password.length <= 2) {
    return [
      {
        field: "password",
        message: "length must be greater than 2",
      },
    ];
  }

  return null;
};
