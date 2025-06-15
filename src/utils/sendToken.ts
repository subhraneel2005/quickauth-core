import type { Response as ExpressResponse } from "express";
import type { FastifyReply } from "fastify";

type ReplyWithCookies = FastifyReply & {
  setCookie: (
    name: string,
    value: string,
    options?: Record<string, any>
  ) => void;
};

type SendTokenOptions = {
  res: ExpressResponse | ReplyWithCookies;
  accessToken: string;
  refreshToken: string;
  message?: string;
};

export const sendToken = ({
  res,
  accessToken,
  refreshToken,
}: Omit<SendTokenOptions, "message">) => {
  const isDev = process.env.NODE_ENV === "development";

  const cookieOptions = {
    httpOnly: true,
    secure: !isDev,
    sameSite: isDev ? "lax" : ("none" as "lax" | "none"),
    path: "/",
  };

  const isFastify = typeof (res as ReplyWithCookies).setCookie === "function";

  if (isFastify) {
    const reply = res as ReplyWithCookies;
    reply.setCookie("refreshToken", refreshToken, {
      ...cookieOptions,
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });
    reply.setCookie("accessToken", accessToken, {
      ...cookieOptions,
      maxAge: 15 * 60, // 15 minutes
    });
  } else {
    const response = res as ExpressResponse;
    response.cookie("refreshToken", refreshToken, {
      ...cookieOptions,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    response.cookie("accessToken", accessToken, {
      ...cookieOptions,
      maxAge: 15 * 60 * 1000,
    });
  }
};
