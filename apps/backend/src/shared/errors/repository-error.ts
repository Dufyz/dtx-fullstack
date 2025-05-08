import { DatabaseError, InvalidParameterError } from '.';

export type RepositoryErrors = InvalidParameterError | DatabaseError;

export const getRepositoryError = <T extends Error>(
  err: T,
): RepositoryErrors => {
  return new DatabaseError(err.message);
};
