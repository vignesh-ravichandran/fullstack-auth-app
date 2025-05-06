import { Response } from 'express';

export const sendSuccess = (res: Response, message: string, data?: any) => {
  const response: any = {
    success: true,
    message,
  };
  if (data !== undefined && data !== null) {
    response.data = data;
  }
  return res.status(200).json(response);
};

export const sendError = (res: Response, message: string, statusCode: number = 500) => {
  return res.status(statusCode).json({
    success: false,
    message,
  });
};
