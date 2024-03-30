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
