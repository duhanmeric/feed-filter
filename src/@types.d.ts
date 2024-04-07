type ActionReturn<T> =
    | {
          success: true;
          data: T;
      }
    | {
          success: false;
          message: string;
          data: null;
      };

type SearchParams = { [key: string]: string };

type Params = {
    searchParams: SearchParams;
};
