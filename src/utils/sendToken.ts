import { Response } from "express";

export const sendToken = (
  res: Response,
  accessToken: string,
  refreshToken: string,
  message?: string
) => {
  const isDev = process.env.NODE_ENV === "development";

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: !isDev,
    sameSite: isDev ? "lax" : "none",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: !isDev,
    sameSite: isDev ? "lax" : "none",
    maxAge: 15 * 60 * 1000,
  });

  if (message) res.json({ message });
};
