import type { NextApiRequest } from 'next'
import type { NextFetchEvent, NextRequest } from 'next/server'

export const initAnalytics = ({
  request,
  event
}: {
  request: NextRequest | NextApiRequest | Request
  event?: NextFetchEvent
}) => {
  const endpoint = process.env.VERCEL_URL;

  return {
    track: async (eventName: string, data?: Record<string, unknown>) => {
      // Changed `any` to `Record<string, unknown>`
      try {
        if (!endpoint && process.env.NODE_ENV === "development") {
          console.log(
            `[Vercel Web Analytics] Track "${eventName}"` +
              (data ? ` with data ${JSON.stringify(data)}` : ""), // Removed `|| {}` as it's redundant with the type change
          );
          return;
        }

        const headers: { [key: string]: string } = {};
        Object.entries(request.headers).forEach(([key, value]) => {
          // Changed `map` to `forEach` as we are not returning a new array
          if (typeof value === "string") {
            // Ensure that the value is a string
            headers[key] = value;
          }
        });

        const body = {
          o: headers.referer,
          ts: new Date().getTime(),
          r: "",
          en: eventName,
          ed: data,
        };

        const promise = fetch(
          `https://${process.env.VERCEL_URL}/_vercel/insights/event`,
          {
            headers: {
              "content-type": "application/json",
              "user-agent": headers["user-agent"] as string,
              "x-forwarded-for": headers["x-forwarded-for"] as string,
              "x-va-server": "1",
            },
            body: JSON.stringify(body),
            method: "POST",
          },
        );

        if (event) {
          event.waitUntil(promise);
        }
        await promise;
      } catch (err) {
        console.error(err);
      }
    },
  };
}