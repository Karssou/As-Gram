export function HandleAuth() {
  const authstore = useAuthStore();
  const userstore = useUserStore();
  const { addNotification } = useNotificationStore();

  type ValidationErrorResponse = {
    status: string;
    messages: {
      message: string;
      rule: string;
      field: string;
      meta?: Record<string, any>;
    }[];
  };

  const formatValidationErrors = (error: any): Record<string, string[]> => {
    const formattedErrors: Record<string, string[]> = {};

    if (error?.status === "validation_error" && Array.isArray(error.messages)) {
      for (const err of error.messages) {
        if (!formattedErrors[err.field]) {
          formattedErrors[err.field] = [];
        }
        formattedErrors[err.field].push(err.message);
      }
    }

    return formattedErrors;
  };

  function authenticate(result: any) {
    if (result?.token) {
      authstore.token = result.token.token;
    }

    if (result?.user) {
      userstore.user = result.user;
    }
  }

  async function login(payload: Record<string, any>) {
    const result: any = await ApiCall("POST", "auth/login", payload);

    authenticate(result);
  }

  async function register(payload: Record<string, any>) {
    const request: any = await ApiCall("POST", "auth/register", payload);

    authenticate(request);
  }

  async function logout() {
    await ApiCall("DELETE", "auth/logout");

    if (authstore.token) {
      authstore.token = null;
    }

    if (userstore.user) {
      userstore.user = null;
    }
  }

  return { login, register, logout, formatValidationErrors };
}
