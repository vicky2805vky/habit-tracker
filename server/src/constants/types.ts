export type ErrorResponse = {
  status: "failed" | "error";
  statusCode: number;
  message: string;
  error: {
    name: string;
    description: string;
  };
};
