export type ErrorResponse = {
  status: "failed" | "error";
  statusCode: number;
  message: string;
  error: {
    name: string;
    description: string;
  };
};

export type SuccessResponse<T> = {
  status: "success";
  statusCode: number;
  message: string;
  data: T;
};
