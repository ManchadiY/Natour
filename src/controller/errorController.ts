const globalErrorHandler = (err: any, req: any, res: any, next: any) => {
  err.statuscode = err.statuscode || 400;
  err.status = err.status || "failed";
  res.status(err.statuscode).json({
    status: err.status,
    message: err.message,
  });
};

export default globalErrorHandler;
