type Success<T> = { error: false; value: T };
type Failure<E> = { error: true; message: E };

export type Result<T, E> = Success<T> | Failure<E>;
