module.exports = class ApiError extends Error {
  status;
  errors;

  constructor(status, message, errors = []) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  // konspiracijos tikslais
  // kad niekas nesuprastu :D
  static NoContent() {
    return new ApiError(204, 'No content');
  }

  static BadRequest(message, errors = []) {
    return new ApiError(400, message, errors);
  }

  // 401 - kai nėra arba neteisingi
  // autorizavimo/autentifikavimo duomenys
  static UnauthorizedError() {
    return new ApiError(401, 'Unauthorized user');
  }

  // 403 - kai autorizavimo/autentifikavimo duomenys yra,
  // bet nėra leidimo
  static Forbidden() {
    return new ApiError(403, 'No permission');
  }

  static ConflictError(message, errors = []) {
    return new ApiError(409, message, errors);
  }
};
