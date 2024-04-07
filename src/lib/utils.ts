import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

type ReturnSearchParams =
    | {
          found: true;
          queries: SearchParams;
      }
    | {
          found: false;
          missingParam: string;
      };

export function getSearchParams(
    params: SearchParams,
    ...desiredParams: string[]
): ReturnSearchParams {
    if (!params) {
        return { found: false, missingParam: "params" };
    }

    for (const param of desiredParams) {
        if (!params[param]) {
            return { found: false, missingParam: param };
        }
    }
    return { found: true, queries: params };
}
