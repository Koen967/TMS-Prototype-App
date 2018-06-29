export class Login {
  static readonly type = '[AUTHENTICATION] Login';
  constructor(public readonly user) {}
}

export class Logout {
  static readonly type = '[AUTHENTICATION] Logout';
}

export class Token {
  static readonly type = '[AUTH] Token]';
  constructor(public readonly token: string) {}
}
