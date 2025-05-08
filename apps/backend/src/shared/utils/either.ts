/* eslint-disable no-underscore-dangle */
/* eslint-disable max-classes-per-file */

/**
 * Represents a value of one of two possible types (a disjoint union).
 *
 * An instance of Either is either an instance of Success or Failure.
 *
 * @example
 *
 * ```typescript
 * const either: Either<string, number> = success(1);
 *
 * if (either.isFailure()) {
 *  // Handle the error
 * }
 *
 * const value = either.value;
 * // The value will be 1
 *
 * ```
 */
export type Either<F, S> = Failure<F, S> | Success<F, S>;

/**
 * A Failure value represents the unsuccessful result of a computation.
 *
 * It can be created using the failure() helper function and accessed using the value property.
 *
 * @example
 *
 * ```typescript
 * const failure: Either<string, number> = failure("Invalid number");
 *
 * if (failure.isFailure()) {
 *  // The failure value is valid
 *  // Handle the error
 *  const error = failure.value;
 * }
 * // The success value is invalid
 * ```
 *
 */
export class Failure<F, S> {
  readonly value: F;

  constructor(value: F) {
    this.value = value;
  }

  /**
   * Returns `true` if this instance of Either is a `Failure`, otherwise returns `false`.
   */
  isFailure(): this is Failure<F, S> {
    return true;
  }

  /**
   * Returns `true` if this instance of Either is a `Success`, otherwise returns `false`.
   */
  isSuccess(): this is Success<F, S> {
    return false;
  }
}

/**
 * A Success value represents the successful result of a computation.
 *
 * It can be created using the success() helper function and accessed using the value property.
 *
 * @example
 *
 * ```typescript
 * const success: Either<string, number> = success(1);
 *
 * if (success.isSuccess()) {
 *  // The value will be 1
 *  // The success value is valid
 *  const value = success.value;
 * }
 * // Handle the error
 * ```
 *
 */
export class Success<F, S> {
  readonly value: S;

  constructor(value: S) {
    this.value = value;
  }

  /**
   * Returns `true` if this instance of Either is a `Failure`, otherwise returns `false`.
   */
  isFailure(): this is Failure<F, S> {
    return false;
  }

  /**
   * Returns `true` if this instance of Either is a `Success`, otherwise returns `false`.
   */
  isSuccess(): this is Success<F, S> {
    return true;
  }
}

/**
 * Returns a new `Failure` instance with the given value.
 */
export const failure = <F, S>(f: F): Either<F, S> => {
  return new Failure(f);
};

/**
 * Returns a new `Success` instance with the given value.
 */
export const success = <F, S>(s: S): Either<F, S> => {
  return new Success<F, S>(s);
};

/**
 * Returns an error if any of the given promises reject, or an array of the values of the given promises.
 *
 * @param promises - An array promises to be resolved with either an error or a value.
 * @returns An error if any of the promises reject, or an array of the values of the promises.
 *
 * @example
 *
 * ```typescript
 * const promises = [
 *   Promise.resolve(1),
 *   Promise.resolve(2),
 *   Promise.reject('Error'),
 * ];
 *
 * const valuesOrError = await mergeManyAsync(promises);
 *
 * if (valuesOrError.isFailure()) {
 *   // Handle the error
 * }
 *
 * const values = valuesOrError.value;
 * // The values array will contain the values of the first two promises
 *
 * ```
 */
export async function mergeManyAsync<F, S>(
  promises: Promise<Either<F, S>>[]
): Promise<Either<F, S[]>> {
  const valuesOrError = await Promise.all(promises);

  const errorOrSuccesses = valuesOrError.reduce(
    (acc, valueOrError) => {
      if (valueOrError.isSuccess()) {
        acc.success.push(valueOrError.value);
      } else {
        acc.failure = valueOrError.value;
      }
      return acc;
    },
    {} as {
      success: S[];
      failure: F;
    }
  );
  if (errorOrSuccesses.failure) {
    return failure(errorOrSuccesses.failure);
  }
  const { success: values } = errorOrSuccesses;

  return success(values as S[]);
}

/**
 * Wraps an array of values that can container a failure or be successes values.
 *
 * @param valuesOrError - An array values that can container a failure or be successes values.
 * @returns An error if any of the values is an error, or an array of the success values.
 *
 * @example
 *
 * ```typescript
 * const values = [
 *   "success",
 *   "success 2",
 *   new Error("Error"),
 * ];
 *
 * const valuesOrError = mergeMany(promises);
 *
 * if (valuesOrError.isFailure()) {
 *   // Handle the error
 * }
 *
 * const values = valuesOrError.value;
 * // The values array will contain the values of the first two promises
 *
 * ```
 */
export function mergeMany<F, S>(valuesOrError: Either<F, S>[]): Either<F, S[]> {
  const errorOrSuccesses = valuesOrError.reduce(
    (acc, valueOrError) => {
      if (valueOrError.isSuccess()) {
        acc.success.push(valueOrError.value);
      } else {
        acc.failure = valueOrError.value;
      }
      return acc;
    },
    {} as {
      success: S[];
      failure: F;
    }
  );
  if (errorOrSuccesses.failure) {
    return failure(errorOrSuccesses.failure);
  }
  const { success: values } = errorOrSuccesses;

  return success(values as S[]);
}

export async function attempt<S, E = Error>(
  fn: () => S
): Promise<Either<E, Awaited<S>>> {
  try {
    const value = await fn();
    return success(value);
  } catch (error: any) {
    return failure(error);
  }
}
