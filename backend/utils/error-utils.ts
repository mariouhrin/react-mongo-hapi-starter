import Boom from 'boom';

class ErrorWrapper extends Error {
  boomHandler: Function;
  message: string;

  constructor(...args: any[]) {
    super(...args);
    this.message = args[0];
    this.boomHandler = Boom.badImplementation;
  }
}

/**
 * Returns Boom error with message based on type of error provied as parameter
 * Simplifies error handling in hapi handlers
 * @param e
 */
export function getBoomError(e: ErrorWrapper) {
  if (e.boomHandler) {
    return e.boomHandler(e.message);
  }

  return Boom.badImplementation(e.message);
}

export class BadRequestError extends ErrorWrapper {
  constructor(message: string) {
    super(message);
    this.boomHandler = Boom.badRequest;
  }
}

export class ForbiddenError extends ErrorWrapper {
  constructor(message: string) {
    super(message);
    this.boomHandler = Boom.forbidden;
  }
}
export class InternalError extends ErrorWrapper {
  constructor(message: string) {
    super(message);
    this.boomHandler = Boom.internal;
  }
}

export class NotFoundError extends ErrorWrapper {
  constructor(message: string) {
    super(message);
    this.boomHandler = Boom.notFound;
  }
}

export class ConflictError extends ErrorWrapper {
  constructor(message: string) {
    super(message);
    this.boomHandler = Boom.conflict;
  }
}
