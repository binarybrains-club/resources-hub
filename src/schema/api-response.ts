type ApiError =
  | 'invalid_request_parameters'
  | 'not_found'
  | 'internal_server_error';

type SuccesApiReponse<T> = {
  message: string;
  data: T;
  error?: never;
};

type ErrorApiReponse = {
  error: ApiError;
  message: string | unknown;
  data?: never;
};

export type ApiResponse<T = null> = SuccesApiReponse<T> | ErrorApiReponse;
