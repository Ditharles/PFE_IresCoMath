
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Doctorant
 * 
 */
export type Doctorant = $Result.DefaultSelection<Prisma.$DoctorantPayload>
/**
 * Model RequestDoctorant
 * 
 */
export type RequestDoctorant = $Result.DefaultSelection<Prisma.$RequestDoctorantPayload>
/**
 * Model Master
 * 
 */
export type Master = $Result.DefaultSelection<Prisma.$MasterPayload>
/**
 * Model RequestMaster
 * 
 */
export type RequestMaster = $Result.DefaultSelection<Prisma.$RequestMasterPayload>
/**
 * Model EnseignantChercheur
 * 
 */
export type EnseignantChercheur = $Result.DefaultSelection<Prisma.$EnseignantChercheurPayload>
/**
 * Model RequestEnseignantChercheur
 * 
 */
export type RequestEnseignantChercheur = $Result.DefaultSelection<Prisma.$RequestEnseignantChercheurPayload>
/**
 * Model Admin
 * 
 */
export type Admin = $Result.DefaultSelection<Prisma.$AdminPayload>
/**
 * Model Session
 * 
 */
export type Session = $Result.DefaultSelection<Prisma.$SessionPayload>
/**
 * Model Notification
 * 
 */
export type Notification = $Result.DefaultSelection<Prisma.$NotificationPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const RequestStatus: {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED'
};

export type RequestStatus = (typeof RequestStatus)[keyof typeof RequestStatus]


export const NotificationStatus: {
  UNREAD: 'UNREAD',
  READ: 'READ'
};

export type NotificationStatus = (typeof NotificationStatus)[keyof typeof NotificationStatus]


export const Grade: {
  Assistant: 'Assistant',
  MaitreAssistant: 'MaitreAssistant',
  MaitreDeConference: 'MaitreDeConference',
  Professeur: 'Professeur'
};

export type Grade = (typeof Grade)[keyof typeof Grade]


export const Role: {
  ADMIN: 'ADMIN',
  DOCTORANT: 'DOCTORANT',
  MASTER: 'MASTER',
  ENSEIGNANT: 'ENSEIGNANT',
  DIRECTEUR: 'DIRECTEUR'
};

export type Role = (typeof Role)[keyof typeof Role]

}

export type RequestStatus = $Enums.RequestStatus

export const RequestStatus: typeof $Enums.RequestStatus

export type NotificationStatus = $Enums.NotificationStatus

export const NotificationStatus: typeof $Enums.NotificationStatus

export type Grade = $Enums.Grade

export const Grade: typeof $Enums.Grade

export type Role = $Enums.Role

export const Role: typeof $Enums.Role

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.doctorant`: Exposes CRUD operations for the **Doctorant** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Doctorants
    * const doctorants = await prisma.doctorant.findMany()
    * ```
    */
  get doctorant(): Prisma.DoctorantDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.requestDoctorant`: Exposes CRUD operations for the **RequestDoctorant** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RequestDoctorants
    * const requestDoctorants = await prisma.requestDoctorant.findMany()
    * ```
    */
  get requestDoctorant(): Prisma.RequestDoctorantDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.master`: Exposes CRUD operations for the **Master** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Masters
    * const masters = await prisma.master.findMany()
    * ```
    */
  get master(): Prisma.MasterDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.requestMaster`: Exposes CRUD operations for the **RequestMaster** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RequestMasters
    * const requestMasters = await prisma.requestMaster.findMany()
    * ```
    */
  get requestMaster(): Prisma.RequestMasterDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.enseignantChercheur`: Exposes CRUD operations for the **EnseignantChercheur** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more EnseignantChercheurs
    * const enseignantChercheurs = await prisma.enseignantChercheur.findMany()
    * ```
    */
  get enseignantChercheur(): Prisma.EnseignantChercheurDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.requestEnseignantChercheur`: Exposes CRUD operations for the **RequestEnseignantChercheur** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RequestEnseignantChercheurs
    * const requestEnseignantChercheurs = await prisma.requestEnseignantChercheur.findMany()
    * ```
    */
  get requestEnseignantChercheur(): Prisma.RequestEnseignantChercheurDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.admin`: Exposes CRUD operations for the **Admin** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Admins
    * const admins = await prisma.admin.findMany()
    * ```
    */
  get admin(): Prisma.AdminDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.session`: Exposes CRUD operations for the **Session** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Sessions
    * const sessions = await prisma.session.findMany()
    * ```
    */
  get session(): Prisma.SessionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.notification`: Exposes CRUD operations for the **Notification** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Notifications
    * const notifications = await prisma.notification.findMany()
    * ```
    */
  get notification(): Prisma.NotificationDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.7.0
   * Query Engine version: 173f8d54f8d52e692c7e27e72a88314ec7aeff60
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Doctorant: 'Doctorant',
    RequestDoctorant: 'RequestDoctorant',
    Master: 'Master',
    RequestMaster: 'RequestMaster',
    EnseignantChercheur: 'EnseignantChercheur',
    RequestEnseignantChercheur: 'RequestEnseignantChercheur',
    Admin: 'Admin',
    Session: 'Session',
    Notification: 'Notification'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "doctorant" | "requestDoctorant" | "master" | "requestMaster" | "enseignantChercheur" | "requestEnseignantChercheur" | "admin" | "session" | "notification"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Doctorant: {
        payload: Prisma.$DoctorantPayload<ExtArgs>
        fields: Prisma.DoctorantFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DoctorantFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorantPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DoctorantFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorantPayload>
          }
          findFirst: {
            args: Prisma.DoctorantFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorantPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DoctorantFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorantPayload>
          }
          findMany: {
            args: Prisma.DoctorantFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorantPayload>[]
          }
          create: {
            args: Prisma.DoctorantCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorantPayload>
          }
          createMany: {
            args: Prisma.DoctorantCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DoctorantCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorantPayload>[]
          }
          delete: {
            args: Prisma.DoctorantDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorantPayload>
          }
          update: {
            args: Prisma.DoctorantUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorantPayload>
          }
          deleteMany: {
            args: Prisma.DoctorantDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DoctorantUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DoctorantUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorantPayload>[]
          }
          upsert: {
            args: Prisma.DoctorantUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorantPayload>
          }
          aggregate: {
            args: Prisma.DoctorantAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDoctorant>
          }
          groupBy: {
            args: Prisma.DoctorantGroupByArgs<ExtArgs>
            result: $Utils.Optional<DoctorantGroupByOutputType>[]
          }
          count: {
            args: Prisma.DoctorantCountArgs<ExtArgs>
            result: $Utils.Optional<DoctorantCountAggregateOutputType> | number
          }
        }
      }
      RequestDoctorant: {
        payload: Prisma.$RequestDoctorantPayload<ExtArgs>
        fields: Prisma.RequestDoctorantFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RequestDoctorantFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RequestDoctorantPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RequestDoctorantFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RequestDoctorantPayload>
          }
          findFirst: {
            args: Prisma.RequestDoctorantFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RequestDoctorantPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RequestDoctorantFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RequestDoctorantPayload>
          }
          findMany: {
            args: Prisma.RequestDoctorantFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RequestDoctorantPayload>[]
          }
          create: {
            args: Prisma.RequestDoctorantCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RequestDoctorantPayload>
          }
          createMany: {
            args: Prisma.RequestDoctorantCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RequestDoctorantCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RequestDoctorantPayload>[]
          }
          delete: {
            args: Prisma.RequestDoctorantDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RequestDoctorantPayload>
          }
          update: {
            args: Prisma.RequestDoctorantUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RequestDoctorantPayload>
          }
          deleteMany: {
            args: Prisma.RequestDoctorantDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RequestDoctorantUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RequestDoctorantUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RequestDoctorantPayload>[]
          }
          upsert: {
            args: Prisma.RequestDoctorantUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RequestDoctorantPayload>
          }
          aggregate: {
            args: Prisma.RequestDoctorantAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRequestDoctorant>
          }
          groupBy: {
            args: Prisma.RequestDoctorantGroupByArgs<ExtArgs>
            result: $Utils.Optional<RequestDoctorantGroupByOutputType>[]
          }
          count: {
            args: Prisma.RequestDoctorantCountArgs<ExtArgs>
            result: $Utils.Optional<RequestDoctorantCountAggregateOutputType> | number
          }
        }
      }
      Master: {
        payload: Prisma.$MasterPayload<ExtArgs>
        fields: Prisma.MasterFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MasterFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MasterPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MasterFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MasterPayload>
          }
          findFirst: {
            args: Prisma.MasterFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MasterPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MasterFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MasterPayload>
          }
          findMany: {
            args: Prisma.MasterFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MasterPayload>[]
          }
          create: {
            args: Prisma.MasterCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MasterPayload>
          }
          createMany: {
            args: Prisma.MasterCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MasterCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MasterPayload>[]
          }
          delete: {
            args: Prisma.MasterDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MasterPayload>
          }
          update: {
            args: Prisma.MasterUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MasterPayload>
          }
          deleteMany: {
            args: Prisma.MasterDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MasterUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MasterUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MasterPayload>[]
          }
          upsert: {
            args: Prisma.MasterUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MasterPayload>
          }
          aggregate: {
            args: Prisma.MasterAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMaster>
          }
          groupBy: {
            args: Prisma.MasterGroupByArgs<ExtArgs>
            result: $Utils.Optional<MasterGroupByOutputType>[]
          }
          count: {
            args: Prisma.MasterCountArgs<ExtArgs>
            result: $Utils.Optional<MasterCountAggregateOutputType> | number
          }
        }
      }
      RequestMaster: {
        payload: Prisma.$RequestMasterPayload<ExtArgs>
        fields: Prisma.RequestMasterFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RequestMasterFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RequestMasterPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RequestMasterFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RequestMasterPayload>
          }
          findFirst: {
            args: Prisma.RequestMasterFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RequestMasterPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RequestMasterFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RequestMasterPayload>
          }
          findMany: {
            args: Prisma.RequestMasterFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RequestMasterPayload>[]
          }
          create: {
            args: Prisma.RequestMasterCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RequestMasterPayload>
          }
          createMany: {
            args: Prisma.RequestMasterCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RequestMasterCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RequestMasterPayload>[]
          }
          delete: {
            args: Prisma.RequestMasterDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RequestMasterPayload>
          }
          update: {
            args: Prisma.RequestMasterUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RequestMasterPayload>
          }
          deleteMany: {
            args: Prisma.RequestMasterDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RequestMasterUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RequestMasterUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RequestMasterPayload>[]
          }
          upsert: {
            args: Prisma.RequestMasterUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RequestMasterPayload>
          }
          aggregate: {
            args: Prisma.RequestMasterAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRequestMaster>
          }
          groupBy: {
            args: Prisma.RequestMasterGroupByArgs<ExtArgs>
            result: $Utils.Optional<RequestMasterGroupByOutputType>[]
          }
          count: {
            args: Prisma.RequestMasterCountArgs<ExtArgs>
            result: $Utils.Optional<RequestMasterCountAggregateOutputType> | number
          }
        }
      }
      EnseignantChercheur: {
        payload: Prisma.$EnseignantChercheurPayload<ExtArgs>
        fields: Prisma.EnseignantChercheurFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EnseignantChercheurFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnseignantChercheurPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EnseignantChercheurFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnseignantChercheurPayload>
          }
          findFirst: {
            args: Prisma.EnseignantChercheurFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnseignantChercheurPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EnseignantChercheurFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnseignantChercheurPayload>
          }
          findMany: {
            args: Prisma.EnseignantChercheurFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnseignantChercheurPayload>[]
          }
          create: {
            args: Prisma.EnseignantChercheurCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnseignantChercheurPayload>
          }
          createMany: {
            args: Prisma.EnseignantChercheurCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EnseignantChercheurCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnseignantChercheurPayload>[]
          }
          delete: {
            args: Prisma.EnseignantChercheurDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnseignantChercheurPayload>
          }
          update: {
            args: Prisma.EnseignantChercheurUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnseignantChercheurPayload>
          }
          deleteMany: {
            args: Prisma.EnseignantChercheurDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EnseignantChercheurUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.EnseignantChercheurUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnseignantChercheurPayload>[]
          }
          upsert: {
            args: Prisma.EnseignantChercheurUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnseignantChercheurPayload>
          }
          aggregate: {
            args: Prisma.EnseignantChercheurAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEnseignantChercheur>
          }
          groupBy: {
            args: Prisma.EnseignantChercheurGroupByArgs<ExtArgs>
            result: $Utils.Optional<EnseignantChercheurGroupByOutputType>[]
          }
          count: {
            args: Prisma.EnseignantChercheurCountArgs<ExtArgs>
            result: $Utils.Optional<EnseignantChercheurCountAggregateOutputType> | number
          }
        }
      }
      RequestEnseignantChercheur: {
        payload: Prisma.$RequestEnseignantChercheurPayload<ExtArgs>
        fields: Prisma.RequestEnseignantChercheurFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RequestEnseignantChercheurFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RequestEnseignantChercheurPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RequestEnseignantChercheurFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RequestEnseignantChercheurPayload>
          }
          findFirst: {
            args: Prisma.RequestEnseignantChercheurFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RequestEnseignantChercheurPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RequestEnseignantChercheurFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RequestEnseignantChercheurPayload>
          }
          findMany: {
            args: Prisma.RequestEnseignantChercheurFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RequestEnseignantChercheurPayload>[]
          }
          create: {
            args: Prisma.RequestEnseignantChercheurCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RequestEnseignantChercheurPayload>
          }
          createMany: {
            args: Prisma.RequestEnseignantChercheurCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RequestEnseignantChercheurCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RequestEnseignantChercheurPayload>[]
          }
          delete: {
            args: Prisma.RequestEnseignantChercheurDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RequestEnseignantChercheurPayload>
          }
          update: {
            args: Prisma.RequestEnseignantChercheurUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RequestEnseignantChercheurPayload>
          }
          deleteMany: {
            args: Prisma.RequestEnseignantChercheurDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RequestEnseignantChercheurUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RequestEnseignantChercheurUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RequestEnseignantChercheurPayload>[]
          }
          upsert: {
            args: Prisma.RequestEnseignantChercheurUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RequestEnseignantChercheurPayload>
          }
          aggregate: {
            args: Prisma.RequestEnseignantChercheurAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRequestEnseignantChercheur>
          }
          groupBy: {
            args: Prisma.RequestEnseignantChercheurGroupByArgs<ExtArgs>
            result: $Utils.Optional<RequestEnseignantChercheurGroupByOutputType>[]
          }
          count: {
            args: Prisma.RequestEnseignantChercheurCountArgs<ExtArgs>
            result: $Utils.Optional<RequestEnseignantChercheurCountAggregateOutputType> | number
          }
        }
      }
      Admin: {
        payload: Prisma.$AdminPayload<ExtArgs>
        fields: Prisma.AdminFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AdminFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AdminFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>
          }
          findFirst: {
            args: Prisma.AdminFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AdminFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>
          }
          findMany: {
            args: Prisma.AdminFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>[]
          }
          create: {
            args: Prisma.AdminCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>
          }
          createMany: {
            args: Prisma.AdminCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AdminCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>[]
          }
          delete: {
            args: Prisma.AdminDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>
          }
          update: {
            args: Prisma.AdminUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>
          }
          deleteMany: {
            args: Prisma.AdminDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AdminUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AdminUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>[]
          }
          upsert: {
            args: Prisma.AdminUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>
          }
          aggregate: {
            args: Prisma.AdminAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAdmin>
          }
          groupBy: {
            args: Prisma.AdminGroupByArgs<ExtArgs>
            result: $Utils.Optional<AdminGroupByOutputType>[]
          }
          count: {
            args: Prisma.AdminCountArgs<ExtArgs>
            result: $Utils.Optional<AdminCountAggregateOutputType> | number
          }
        }
      }
      Session: {
        payload: Prisma.$SessionPayload<ExtArgs>
        fields: Prisma.SessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SessionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SessionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findFirst: {
            args: Prisma.SessionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SessionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findMany: {
            args: Prisma.SessionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          create: {
            args: Prisma.SessionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          createMany: {
            args: Prisma.SessionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SessionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          delete: {
            args: Prisma.SessionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          update: {
            args: Prisma.SessionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          deleteMany: {
            args: Prisma.SessionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SessionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SessionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          upsert: {
            args: Prisma.SessionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          aggregate: {
            args: Prisma.SessionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSession>
          }
          groupBy: {
            args: Prisma.SessionGroupByArgs<ExtArgs>
            result: $Utils.Optional<SessionGroupByOutputType>[]
          }
          count: {
            args: Prisma.SessionCountArgs<ExtArgs>
            result: $Utils.Optional<SessionCountAggregateOutputType> | number
          }
        }
      }
      Notification: {
        payload: Prisma.$NotificationPayload<ExtArgs>
        fields: Prisma.NotificationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.NotificationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.NotificationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          findFirst: {
            args: Prisma.NotificationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.NotificationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          findMany: {
            args: Prisma.NotificationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>[]
          }
          create: {
            args: Prisma.NotificationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          createMany: {
            args: Prisma.NotificationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.NotificationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>[]
          }
          delete: {
            args: Prisma.NotificationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          update: {
            args: Prisma.NotificationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          deleteMany: {
            args: Prisma.NotificationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.NotificationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.NotificationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>[]
          }
          upsert: {
            args: Prisma.NotificationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          aggregate: {
            args: Prisma.NotificationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateNotification>
          }
          groupBy: {
            args: Prisma.NotificationGroupByArgs<ExtArgs>
            result: $Utils.Optional<NotificationGroupByOutputType>[]
          }
          count: {
            args: Prisma.NotificationCountArgs<ExtArgs>
            result: $Utils.Optional<NotificationCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    doctorant?: DoctorantOmit
    requestDoctorant?: RequestDoctorantOmit
    master?: MasterOmit
    requestMaster?: RequestMasterOmit
    enseignantChercheur?: EnseignantChercheurOmit
    requestEnseignantChercheur?: RequestEnseignantChercheurOmit
    admin?: AdminOmit
    session?: SessionOmit
    notification?: NotificationOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    sessions: number
    notifications: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sessions?: boolean | UserCountOutputTypeCountSessionsArgs
    notifications?: boolean | UserCountOutputTypeCountNotificationsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountNotificationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NotificationWhereInput
  }


  /**
   * Count Type EnseignantChercheurCountOutputType
   */

  export type EnseignantChercheurCountOutputType = {
    doctorants: number
    masters: number
    requestsMaster: number
    requestsDoctorant: number
  }

  export type EnseignantChercheurCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    doctorants?: boolean | EnseignantChercheurCountOutputTypeCountDoctorantsArgs
    masters?: boolean | EnseignantChercheurCountOutputTypeCountMastersArgs
    requestsMaster?: boolean | EnseignantChercheurCountOutputTypeCountRequestsMasterArgs
    requestsDoctorant?: boolean | EnseignantChercheurCountOutputTypeCountRequestsDoctorantArgs
  }

  // Custom InputTypes
  /**
   * EnseignantChercheurCountOutputType without action
   */
  export type EnseignantChercheurCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EnseignantChercheurCountOutputType
     */
    select?: EnseignantChercheurCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * EnseignantChercheurCountOutputType without action
   */
  export type EnseignantChercheurCountOutputTypeCountDoctorantsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DoctorantWhereInput
  }

  /**
   * EnseignantChercheurCountOutputType without action
   */
  export type EnseignantChercheurCountOutputTypeCountMastersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MasterWhereInput
  }

  /**
   * EnseignantChercheurCountOutputType without action
   */
  export type EnseignantChercheurCountOutputTypeCountRequestsMasterArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RequestMasterWhereInput
  }

  /**
   * EnseignantChercheurCountOutputType without action
   */
  export type EnseignantChercheurCountOutputTypeCountRequestsDoctorantArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RequestDoctorantWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    password: string | null
    role: $Enums.Role | null
    createdAt: Date | null
    bankData: string | null
    signature: string | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    password: string | null
    role: $Enums.Role | null
    createdAt: Date | null
    bankData: string | null
    signature: string | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    password: number
    role: number
    createdAt: number
    bankData: number
    signature: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    password?: true
    role?: true
    createdAt?: true
    bankData?: true
    signature?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    password?: true
    role?: true
    createdAt?: true
    bankData?: true
    signature?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    password?: true
    role?: true
    createdAt?: true
    bankData?: true
    signature?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    password: string
    role: $Enums.Role
    createdAt: Date
    bankData: string | null
    signature: string | null
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    createdAt?: boolean
    bankData?: boolean
    signature?: boolean
    sessions?: boolean | User$sessionsArgs<ExtArgs>
    notifications?: boolean | User$notificationsArgs<ExtArgs>
    doctorant?: boolean | User$doctorantArgs<ExtArgs>
    master?: boolean | User$masterArgs<ExtArgs>
    enseignant?: boolean | User$enseignantArgs<ExtArgs>
    admin?: boolean | User$adminArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    createdAt?: boolean
    bankData?: boolean
    signature?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    createdAt?: boolean
    bankData?: boolean
    signature?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    createdAt?: boolean
    bankData?: boolean
    signature?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "password" | "role" | "createdAt" | "bankData" | "signature", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sessions?: boolean | User$sessionsArgs<ExtArgs>
    notifications?: boolean | User$notificationsArgs<ExtArgs>
    doctorant?: boolean | User$doctorantArgs<ExtArgs>
    master?: boolean | User$masterArgs<ExtArgs>
    enseignant?: boolean | User$enseignantArgs<ExtArgs>
    admin?: boolean | User$adminArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      sessions: Prisma.$SessionPayload<ExtArgs>[]
      notifications: Prisma.$NotificationPayload<ExtArgs>[]
      doctorant: Prisma.$DoctorantPayload<ExtArgs> | null
      master: Prisma.$MasterPayload<ExtArgs> | null
      enseignant: Prisma.$EnseignantChercheurPayload<ExtArgs> | null
      admin: Prisma.$AdminPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      password: string
      role: $Enums.Role
      createdAt: Date
      bankData: string | null
      signature: string | null
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    sessions<T extends User$sessionsArgs<ExtArgs> = {}>(args?: Subset<T, User$sessionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    notifications<T extends User$notificationsArgs<ExtArgs> = {}>(args?: Subset<T, User$notificationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    doctorant<T extends User$doctorantArgs<ExtArgs> = {}>(args?: Subset<T, User$doctorantArgs<ExtArgs>>): Prisma__DoctorantClient<$Result.GetResult<Prisma.$DoctorantPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    master<T extends User$masterArgs<ExtArgs> = {}>(args?: Subset<T, User$masterArgs<ExtArgs>>): Prisma__MasterClient<$Result.GetResult<Prisma.$MasterPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    enseignant<T extends User$enseignantArgs<ExtArgs> = {}>(args?: Subset<T, User$enseignantArgs<ExtArgs>>): Prisma__EnseignantChercheurClient<$Result.GetResult<Prisma.$EnseignantChercheurPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    admin<T extends User$adminArgs<ExtArgs> = {}>(args?: Subset<T, User$adminArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'Role'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly bankData: FieldRef<"User", 'String'>
    readonly signature: FieldRef<"User", 'String'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.sessions
   */
  export type User$sessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    cursor?: SessionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * User.notifications
   */
  export type User$notificationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    where?: NotificationWhereInput
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    cursor?: NotificationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * User.doctorant
   */
  export type User$doctorantArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Doctorant
     */
    select?: DoctorantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Doctorant
     */
    omit?: DoctorantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorantInclude<ExtArgs> | null
    where?: DoctorantWhereInput
  }

  /**
   * User.master
   */
  export type User$masterArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Master
     */
    select?: MasterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Master
     */
    omit?: MasterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MasterInclude<ExtArgs> | null
    where?: MasterWhereInput
  }

  /**
   * User.enseignant
   */
  export type User$enseignantArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EnseignantChercheur
     */
    select?: EnseignantChercheurSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EnseignantChercheur
     */
    omit?: EnseignantChercheurOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnseignantChercheurInclude<ExtArgs> | null
    where?: EnseignantChercheurWhereInput
  }

  /**
   * User.admin
   */
  export type User$adminArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminInclude<ExtArgs> | null
    where?: AdminWhereInput
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Doctorant
   */

  export type AggregateDoctorant = {
    _count: DoctorantCountAggregateOutputType | null
    _avg: DoctorantAvgAggregateOutputType | null
    _sum: DoctorantSumAggregateOutputType | null
    _min: DoctorantMinAggregateOutputType | null
    _max: DoctorantMaxAggregateOutputType | null
  }

  export type DoctorantAvgAggregateOutputType = {
    annee_these: number | null
  }

  export type DoctorantSumAggregateOutputType = {
    annee_these: number | null
  }

  export type DoctorantMinAggregateOutputType = {
    id: string | null
    nom: string | null
    prenom: string | null
    annee_these: number | null
    directeur_these_id: string | null
    photo: string | null
    userId: string | null
  }

  export type DoctorantMaxAggregateOutputType = {
    id: string | null
    nom: string | null
    prenom: string | null
    annee_these: number | null
    directeur_these_id: string | null
    photo: string | null
    userId: string | null
  }

  export type DoctorantCountAggregateOutputType = {
    id: number
    nom: number
    prenom: number
    annee_these: number
    directeur_these_id: number
    photo: number
    userId: number
    _all: number
  }


  export type DoctorantAvgAggregateInputType = {
    annee_these?: true
  }

  export type DoctorantSumAggregateInputType = {
    annee_these?: true
  }

  export type DoctorantMinAggregateInputType = {
    id?: true
    nom?: true
    prenom?: true
    annee_these?: true
    directeur_these_id?: true
    photo?: true
    userId?: true
  }

  export type DoctorantMaxAggregateInputType = {
    id?: true
    nom?: true
    prenom?: true
    annee_these?: true
    directeur_these_id?: true
    photo?: true
    userId?: true
  }

  export type DoctorantCountAggregateInputType = {
    id?: true
    nom?: true
    prenom?: true
    annee_these?: true
    directeur_these_id?: true
    photo?: true
    userId?: true
    _all?: true
  }

  export type DoctorantAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Doctorant to aggregate.
     */
    where?: DoctorantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Doctorants to fetch.
     */
    orderBy?: DoctorantOrderByWithRelationInput | DoctorantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DoctorantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Doctorants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Doctorants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Doctorants
    **/
    _count?: true | DoctorantCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DoctorantAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DoctorantSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DoctorantMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DoctorantMaxAggregateInputType
  }

  export type GetDoctorantAggregateType<T extends DoctorantAggregateArgs> = {
        [P in keyof T & keyof AggregateDoctorant]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDoctorant[P]>
      : GetScalarType<T[P], AggregateDoctorant[P]>
  }




  export type DoctorantGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DoctorantWhereInput
    orderBy?: DoctorantOrderByWithAggregationInput | DoctorantOrderByWithAggregationInput[]
    by: DoctorantScalarFieldEnum[] | DoctorantScalarFieldEnum
    having?: DoctorantScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DoctorantCountAggregateInputType | true
    _avg?: DoctorantAvgAggregateInputType
    _sum?: DoctorantSumAggregateInputType
    _min?: DoctorantMinAggregateInputType
    _max?: DoctorantMaxAggregateInputType
  }

  export type DoctorantGroupByOutputType = {
    id: string
    nom: string
    prenom: string
    annee_these: number
    directeur_these_id: string
    photo: string | null
    userId: string
    _count: DoctorantCountAggregateOutputType | null
    _avg: DoctorantAvgAggregateOutputType | null
    _sum: DoctorantSumAggregateOutputType | null
    _min: DoctorantMinAggregateOutputType | null
    _max: DoctorantMaxAggregateOutputType | null
  }

  type GetDoctorantGroupByPayload<T extends DoctorantGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DoctorantGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DoctorantGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DoctorantGroupByOutputType[P]>
            : GetScalarType<T[P], DoctorantGroupByOutputType[P]>
        }
      >
    >


  export type DoctorantSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nom?: boolean
    prenom?: boolean
    annee_these?: boolean
    directeur_these_id?: boolean
    photo?: boolean
    userId?: boolean
    directeur_these?: boolean | EnseignantChercheurDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["doctorant"]>

  export type DoctorantSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nom?: boolean
    prenom?: boolean
    annee_these?: boolean
    directeur_these_id?: boolean
    photo?: boolean
    userId?: boolean
    directeur_these?: boolean | EnseignantChercheurDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["doctorant"]>

  export type DoctorantSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nom?: boolean
    prenom?: boolean
    annee_these?: boolean
    directeur_these_id?: boolean
    photo?: boolean
    userId?: boolean
    directeur_these?: boolean | EnseignantChercheurDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["doctorant"]>

  export type DoctorantSelectScalar = {
    id?: boolean
    nom?: boolean
    prenom?: boolean
    annee_these?: boolean
    directeur_these_id?: boolean
    photo?: boolean
    userId?: boolean
  }

  export type DoctorantOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nom" | "prenom" | "annee_these" | "directeur_these_id" | "photo" | "userId", ExtArgs["result"]["doctorant"]>
  export type DoctorantInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    directeur_these?: boolean | EnseignantChercheurDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type DoctorantIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    directeur_these?: boolean | EnseignantChercheurDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type DoctorantIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    directeur_these?: boolean | EnseignantChercheurDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $DoctorantPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Doctorant"
    objects: {
      directeur_these: Prisma.$EnseignantChercheurPayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      nom: string
      prenom: string
      annee_these: number
      directeur_these_id: string
      photo: string | null
      userId: string
    }, ExtArgs["result"]["doctorant"]>
    composites: {}
  }

  type DoctorantGetPayload<S extends boolean | null | undefined | DoctorantDefaultArgs> = $Result.GetResult<Prisma.$DoctorantPayload, S>

  type DoctorantCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DoctorantFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DoctorantCountAggregateInputType | true
    }

  export interface DoctorantDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Doctorant'], meta: { name: 'Doctorant' } }
    /**
     * Find zero or one Doctorant that matches the filter.
     * @param {DoctorantFindUniqueArgs} args - Arguments to find a Doctorant
     * @example
     * // Get one Doctorant
     * const doctorant = await prisma.doctorant.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DoctorantFindUniqueArgs>(args: SelectSubset<T, DoctorantFindUniqueArgs<ExtArgs>>): Prisma__DoctorantClient<$Result.GetResult<Prisma.$DoctorantPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Doctorant that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DoctorantFindUniqueOrThrowArgs} args - Arguments to find a Doctorant
     * @example
     * // Get one Doctorant
     * const doctorant = await prisma.doctorant.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DoctorantFindUniqueOrThrowArgs>(args: SelectSubset<T, DoctorantFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DoctorantClient<$Result.GetResult<Prisma.$DoctorantPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Doctorant that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DoctorantFindFirstArgs} args - Arguments to find a Doctorant
     * @example
     * // Get one Doctorant
     * const doctorant = await prisma.doctorant.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DoctorantFindFirstArgs>(args?: SelectSubset<T, DoctorantFindFirstArgs<ExtArgs>>): Prisma__DoctorantClient<$Result.GetResult<Prisma.$DoctorantPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Doctorant that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DoctorantFindFirstOrThrowArgs} args - Arguments to find a Doctorant
     * @example
     * // Get one Doctorant
     * const doctorant = await prisma.doctorant.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DoctorantFindFirstOrThrowArgs>(args?: SelectSubset<T, DoctorantFindFirstOrThrowArgs<ExtArgs>>): Prisma__DoctorantClient<$Result.GetResult<Prisma.$DoctorantPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Doctorants that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DoctorantFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Doctorants
     * const doctorants = await prisma.doctorant.findMany()
     * 
     * // Get first 10 Doctorants
     * const doctorants = await prisma.doctorant.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const doctorantWithIdOnly = await prisma.doctorant.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DoctorantFindManyArgs>(args?: SelectSubset<T, DoctorantFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DoctorantPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Doctorant.
     * @param {DoctorantCreateArgs} args - Arguments to create a Doctorant.
     * @example
     * // Create one Doctorant
     * const Doctorant = await prisma.doctorant.create({
     *   data: {
     *     // ... data to create a Doctorant
     *   }
     * })
     * 
     */
    create<T extends DoctorantCreateArgs>(args: SelectSubset<T, DoctorantCreateArgs<ExtArgs>>): Prisma__DoctorantClient<$Result.GetResult<Prisma.$DoctorantPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Doctorants.
     * @param {DoctorantCreateManyArgs} args - Arguments to create many Doctorants.
     * @example
     * // Create many Doctorants
     * const doctorant = await prisma.doctorant.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DoctorantCreateManyArgs>(args?: SelectSubset<T, DoctorantCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Doctorants and returns the data saved in the database.
     * @param {DoctorantCreateManyAndReturnArgs} args - Arguments to create many Doctorants.
     * @example
     * // Create many Doctorants
     * const doctorant = await prisma.doctorant.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Doctorants and only return the `id`
     * const doctorantWithIdOnly = await prisma.doctorant.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DoctorantCreateManyAndReturnArgs>(args?: SelectSubset<T, DoctorantCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DoctorantPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Doctorant.
     * @param {DoctorantDeleteArgs} args - Arguments to delete one Doctorant.
     * @example
     * // Delete one Doctorant
     * const Doctorant = await prisma.doctorant.delete({
     *   where: {
     *     // ... filter to delete one Doctorant
     *   }
     * })
     * 
     */
    delete<T extends DoctorantDeleteArgs>(args: SelectSubset<T, DoctorantDeleteArgs<ExtArgs>>): Prisma__DoctorantClient<$Result.GetResult<Prisma.$DoctorantPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Doctorant.
     * @param {DoctorantUpdateArgs} args - Arguments to update one Doctorant.
     * @example
     * // Update one Doctorant
     * const doctorant = await prisma.doctorant.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DoctorantUpdateArgs>(args: SelectSubset<T, DoctorantUpdateArgs<ExtArgs>>): Prisma__DoctorantClient<$Result.GetResult<Prisma.$DoctorantPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Doctorants.
     * @param {DoctorantDeleteManyArgs} args - Arguments to filter Doctorants to delete.
     * @example
     * // Delete a few Doctorants
     * const { count } = await prisma.doctorant.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DoctorantDeleteManyArgs>(args?: SelectSubset<T, DoctorantDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Doctorants.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DoctorantUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Doctorants
     * const doctorant = await prisma.doctorant.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DoctorantUpdateManyArgs>(args: SelectSubset<T, DoctorantUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Doctorants and returns the data updated in the database.
     * @param {DoctorantUpdateManyAndReturnArgs} args - Arguments to update many Doctorants.
     * @example
     * // Update many Doctorants
     * const doctorant = await prisma.doctorant.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Doctorants and only return the `id`
     * const doctorantWithIdOnly = await prisma.doctorant.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends DoctorantUpdateManyAndReturnArgs>(args: SelectSubset<T, DoctorantUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DoctorantPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Doctorant.
     * @param {DoctorantUpsertArgs} args - Arguments to update or create a Doctorant.
     * @example
     * // Update or create a Doctorant
     * const doctorant = await prisma.doctorant.upsert({
     *   create: {
     *     // ... data to create a Doctorant
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Doctorant we want to update
     *   }
     * })
     */
    upsert<T extends DoctorantUpsertArgs>(args: SelectSubset<T, DoctorantUpsertArgs<ExtArgs>>): Prisma__DoctorantClient<$Result.GetResult<Prisma.$DoctorantPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Doctorants.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DoctorantCountArgs} args - Arguments to filter Doctorants to count.
     * @example
     * // Count the number of Doctorants
     * const count = await prisma.doctorant.count({
     *   where: {
     *     // ... the filter for the Doctorants we want to count
     *   }
     * })
    **/
    count<T extends DoctorantCountArgs>(
      args?: Subset<T, DoctorantCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DoctorantCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Doctorant.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DoctorantAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DoctorantAggregateArgs>(args: Subset<T, DoctorantAggregateArgs>): Prisma.PrismaPromise<GetDoctorantAggregateType<T>>

    /**
     * Group by Doctorant.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DoctorantGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DoctorantGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DoctorantGroupByArgs['orderBy'] }
        : { orderBy?: DoctorantGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DoctorantGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDoctorantGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Doctorant model
   */
  readonly fields: DoctorantFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Doctorant.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DoctorantClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    directeur_these<T extends EnseignantChercheurDefaultArgs<ExtArgs> = {}>(args?: Subset<T, EnseignantChercheurDefaultArgs<ExtArgs>>): Prisma__EnseignantChercheurClient<$Result.GetResult<Prisma.$EnseignantChercheurPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Doctorant model
   */
  interface DoctorantFieldRefs {
    readonly id: FieldRef<"Doctorant", 'String'>
    readonly nom: FieldRef<"Doctorant", 'String'>
    readonly prenom: FieldRef<"Doctorant", 'String'>
    readonly annee_these: FieldRef<"Doctorant", 'Int'>
    readonly directeur_these_id: FieldRef<"Doctorant", 'String'>
    readonly photo: FieldRef<"Doctorant", 'String'>
    readonly userId: FieldRef<"Doctorant", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Doctorant findUnique
   */
  export type DoctorantFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Doctorant
     */
    select?: DoctorantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Doctorant
     */
    omit?: DoctorantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorantInclude<ExtArgs> | null
    /**
     * Filter, which Doctorant to fetch.
     */
    where: DoctorantWhereUniqueInput
  }

  /**
   * Doctorant findUniqueOrThrow
   */
  export type DoctorantFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Doctorant
     */
    select?: DoctorantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Doctorant
     */
    omit?: DoctorantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorantInclude<ExtArgs> | null
    /**
     * Filter, which Doctorant to fetch.
     */
    where: DoctorantWhereUniqueInput
  }

  /**
   * Doctorant findFirst
   */
  export type DoctorantFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Doctorant
     */
    select?: DoctorantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Doctorant
     */
    omit?: DoctorantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorantInclude<ExtArgs> | null
    /**
     * Filter, which Doctorant to fetch.
     */
    where?: DoctorantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Doctorants to fetch.
     */
    orderBy?: DoctorantOrderByWithRelationInput | DoctorantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Doctorants.
     */
    cursor?: DoctorantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Doctorants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Doctorants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Doctorants.
     */
    distinct?: DoctorantScalarFieldEnum | DoctorantScalarFieldEnum[]
  }

  /**
   * Doctorant findFirstOrThrow
   */
  export type DoctorantFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Doctorant
     */
    select?: DoctorantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Doctorant
     */
    omit?: DoctorantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorantInclude<ExtArgs> | null
    /**
     * Filter, which Doctorant to fetch.
     */
    where?: DoctorantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Doctorants to fetch.
     */
    orderBy?: DoctorantOrderByWithRelationInput | DoctorantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Doctorants.
     */
    cursor?: DoctorantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Doctorants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Doctorants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Doctorants.
     */
    distinct?: DoctorantScalarFieldEnum | DoctorantScalarFieldEnum[]
  }

  /**
   * Doctorant findMany
   */
  export type DoctorantFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Doctorant
     */
    select?: DoctorantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Doctorant
     */
    omit?: DoctorantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorantInclude<ExtArgs> | null
    /**
     * Filter, which Doctorants to fetch.
     */
    where?: DoctorantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Doctorants to fetch.
     */
    orderBy?: DoctorantOrderByWithRelationInput | DoctorantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Doctorants.
     */
    cursor?: DoctorantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Doctorants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Doctorants.
     */
    skip?: number
    distinct?: DoctorantScalarFieldEnum | DoctorantScalarFieldEnum[]
  }

  /**
   * Doctorant create
   */
  export type DoctorantCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Doctorant
     */
    select?: DoctorantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Doctorant
     */
    omit?: DoctorantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorantInclude<ExtArgs> | null
    /**
     * The data needed to create a Doctorant.
     */
    data: XOR<DoctorantCreateInput, DoctorantUncheckedCreateInput>
  }

  /**
   * Doctorant createMany
   */
  export type DoctorantCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Doctorants.
     */
    data: DoctorantCreateManyInput | DoctorantCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Doctorant createManyAndReturn
   */
  export type DoctorantCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Doctorant
     */
    select?: DoctorantSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Doctorant
     */
    omit?: DoctorantOmit<ExtArgs> | null
    /**
     * The data used to create many Doctorants.
     */
    data: DoctorantCreateManyInput | DoctorantCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorantIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Doctorant update
   */
  export type DoctorantUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Doctorant
     */
    select?: DoctorantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Doctorant
     */
    omit?: DoctorantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorantInclude<ExtArgs> | null
    /**
     * The data needed to update a Doctorant.
     */
    data: XOR<DoctorantUpdateInput, DoctorantUncheckedUpdateInput>
    /**
     * Choose, which Doctorant to update.
     */
    where: DoctorantWhereUniqueInput
  }

  /**
   * Doctorant updateMany
   */
  export type DoctorantUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Doctorants.
     */
    data: XOR<DoctorantUpdateManyMutationInput, DoctorantUncheckedUpdateManyInput>
    /**
     * Filter which Doctorants to update
     */
    where?: DoctorantWhereInput
    /**
     * Limit how many Doctorants to update.
     */
    limit?: number
  }

  /**
   * Doctorant updateManyAndReturn
   */
  export type DoctorantUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Doctorant
     */
    select?: DoctorantSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Doctorant
     */
    omit?: DoctorantOmit<ExtArgs> | null
    /**
     * The data used to update Doctorants.
     */
    data: XOR<DoctorantUpdateManyMutationInput, DoctorantUncheckedUpdateManyInput>
    /**
     * Filter which Doctorants to update
     */
    where?: DoctorantWhereInput
    /**
     * Limit how many Doctorants to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorantIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Doctorant upsert
   */
  export type DoctorantUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Doctorant
     */
    select?: DoctorantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Doctorant
     */
    omit?: DoctorantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorantInclude<ExtArgs> | null
    /**
     * The filter to search for the Doctorant to update in case it exists.
     */
    where: DoctorantWhereUniqueInput
    /**
     * In case the Doctorant found by the `where` argument doesn't exist, create a new Doctorant with this data.
     */
    create: XOR<DoctorantCreateInput, DoctorantUncheckedCreateInput>
    /**
     * In case the Doctorant was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DoctorantUpdateInput, DoctorantUncheckedUpdateInput>
  }

  /**
   * Doctorant delete
   */
  export type DoctorantDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Doctorant
     */
    select?: DoctorantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Doctorant
     */
    omit?: DoctorantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorantInclude<ExtArgs> | null
    /**
     * Filter which Doctorant to delete.
     */
    where: DoctorantWhereUniqueInput
  }

  /**
   * Doctorant deleteMany
   */
  export type DoctorantDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Doctorants to delete
     */
    where?: DoctorantWhereInput
    /**
     * Limit how many Doctorants to delete.
     */
    limit?: number
  }

  /**
   * Doctorant without action
   */
  export type DoctorantDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Doctorant
     */
    select?: DoctorantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Doctorant
     */
    omit?: DoctorantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorantInclude<ExtArgs> | null
  }


  /**
   * Model RequestDoctorant
   */

  export type AggregateRequestDoctorant = {
    _count: RequestDoctorantCountAggregateOutputType | null
    _avg: RequestDoctorantAvgAggregateOutputType | null
    _sum: RequestDoctorantSumAggregateOutputType | null
    _min: RequestDoctorantMinAggregateOutputType | null
    _max: RequestDoctorantMaxAggregateOutputType | null
  }

  export type RequestDoctorantAvgAggregateOutputType = {
    annee_these: number | null
  }

  export type RequestDoctorantSumAggregateOutputType = {
    annee_these: number | null
  }

  export type RequestDoctorantMinAggregateOutputType = {
    id: string | null
    nom: string | null
    prenom: string | null
    email: string | null
    annee_these: number | null
    createdAt: Date | null
    directeur_these_id: string | null
    status: $Enums.RequestStatus | null
    rejectionReason: string | null
    photo: string | null
    isConfirm: boolean | null
  }

  export type RequestDoctorantMaxAggregateOutputType = {
    id: string | null
    nom: string | null
    prenom: string | null
    email: string | null
    annee_these: number | null
    createdAt: Date | null
    directeur_these_id: string | null
    status: $Enums.RequestStatus | null
    rejectionReason: string | null
    photo: string | null
    isConfirm: boolean | null
  }

  export type RequestDoctorantCountAggregateOutputType = {
    id: number
    nom: number
    prenom: number
    email: number
    annee_these: number
    createdAt: number
    directeur_these_id: number
    status: number
    rejectionReason: number
    photo: number
    isConfirm: number
    _all: number
  }


  export type RequestDoctorantAvgAggregateInputType = {
    annee_these?: true
  }

  export type RequestDoctorantSumAggregateInputType = {
    annee_these?: true
  }

  export type RequestDoctorantMinAggregateInputType = {
    id?: true
    nom?: true
    prenom?: true
    email?: true
    annee_these?: true
    createdAt?: true
    directeur_these_id?: true
    status?: true
    rejectionReason?: true
    photo?: true
    isConfirm?: true
  }

  export type RequestDoctorantMaxAggregateInputType = {
    id?: true
    nom?: true
    prenom?: true
    email?: true
    annee_these?: true
    createdAt?: true
    directeur_these_id?: true
    status?: true
    rejectionReason?: true
    photo?: true
    isConfirm?: true
  }

  export type RequestDoctorantCountAggregateInputType = {
    id?: true
    nom?: true
    prenom?: true
    email?: true
    annee_these?: true
    createdAt?: true
    directeur_these_id?: true
    status?: true
    rejectionReason?: true
    photo?: true
    isConfirm?: true
    _all?: true
  }

  export type RequestDoctorantAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RequestDoctorant to aggregate.
     */
    where?: RequestDoctorantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RequestDoctorants to fetch.
     */
    orderBy?: RequestDoctorantOrderByWithRelationInput | RequestDoctorantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RequestDoctorantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RequestDoctorants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RequestDoctorants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RequestDoctorants
    **/
    _count?: true | RequestDoctorantCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RequestDoctorantAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RequestDoctorantSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RequestDoctorantMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RequestDoctorantMaxAggregateInputType
  }

  export type GetRequestDoctorantAggregateType<T extends RequestDoctorantAggregateArgs> = {
        [P in keyof T & keyof AggregateRequestDoctorant]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRequestDoctorant[P]>
      : GetScalarType<T[P], AggregateRequestDoctorant[P]>
  }




  export type RequestDoctorantGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RequestDoctorantWhereInput
    orderBy?: RequestDoctorantOrderByWithAggregationInput | RequestDoctorantOrderByWithAggregationInput[]
    by: RequestDoctorantScalarFieldEnum[] | RequestDoctorantScalarFieldEnum
    having?: RequestDoctorantScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RequestDoctorantCountAggregateInputType | true
    _avg?: RequestDoctorantAvgAggregateInputType
    _sum?: RequestDoctorantSumAggregateInputType
    _min?: RequestDoctorantMinAggregateInputType
    _max?: RequestDoctorantMaxAggregateInputType
  }

  export type RequestDoctorantGroupByOutputType = {
    id: string
    nom: string
    prenom: string
    email: string
    annee_these: number
    createdAt: Date
    directeur_these_id: string
    status: $Enums.RequestStatus
    rejectionReason: string | null
    photo: string | null
    isConfirm: boolean
    _count: RequestDoctorantCountAggregateOutputType | null
    _avg: RequestDoctorantAvgAggregateOutputType | null
    _sum: RequestDoctorantSumAggregateOutputType | null
    _min: RequestDoctorantMinAggregateOutputType | null
    _max: RequestDoctorantMaxAggregateOutputType | null
  }

  type GetRequestDoctorantGroupByPayload<T extends RequestDoctorantGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RequestDoctorantGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RequestDoctorantGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RequestDoctorantGroupByOutputType[P]>
            : GetScalarType<T[P], RequestDoctorantGroupByOutputType[P]>
        }
      >
    >


  export type RequestDoctorantSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nom?: boolean
    prenom?: boolean
    email?: boolean
    annee_these?: boolean
    createdAt?: boolean
    directeur_these_id?: boolean
    status?: boolean
    rejectionReason?: boolean
    photo?: boolean
    isConfirm?: boolean
    directeur_these?: boolean | EnseignantChercheurDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["requestDoctorant"]>

  export type RequestDoctorantSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nom?: boolean
    prenom?: boolean
    email?: boolean
    annee_these?: boolean
    createdAt?: boolean
    directeur_these_id?: boolean
    status?: boolean
    rejectionReason?: boolean
    photo?: boolean
    isConfirm?: boolean
    directeur_these?: boolean | EnseignantChercheurDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["requestDoctorant"]>

  export type RequestDoctorantSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nom?: boolean
    prenom?: boolean
    email?: boolean
    annee_these?: boolean
    createdAt?: boolean
    directeur_these_id?: boolean
    status?: boolean
    rejectionReason?: boolean
    photo?: boolean
    isConfirm?: boolean
    directeur_these?: boolean | EnseignantChercheurDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["requestDoctorant"]>

  export type RequestDoctorantSelectScalar = {
    id?: boolean
    nom?: boolean
    prenom?: boolean
    email?: boolean
    annee_these?: boolean
    createdAt?: boolean
    directeur_these_id?: boolean
    status?: boolean
    rejectionReason?: boolean
    photo?: boolean
    isConfirm?: boolean
  }

  export type RequestDoctorantOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nom" | "prenom" | "email" | "annee_these" | "createdAt" | "directeur_these_id" | "status" | "rejectionReason" | "photo" | "isConfirm", ExtArgs["result"]["requestDoctorant"]>
  export type RequestDoctorantInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    directeur_these?: boolean | EnseignantChercheurDefaultArgs<ExtArgs>
  }
  export type RequestDoctorantIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    directeur_these?: boolean | EnseignantChercheurDefaultArgs<ExtArgs>
  }
  export type RequestDoctorantIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    directeur_these?: boolean | EnseignantChercheurDefaultArgs<ExtArgs>
  }

  export type $RequestDoctorantPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RequestDoctorant"
    objects: {
      directeur_these: Prisma.$EnseignantChercheurPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      nom: string
      prenom: string
      email: string
      annee_these: number
      createdAt: Date
      directeur_these_id: string
      status: $Enums.RequestStatus
      rejectionReason: string | null
      photo: string | null
      isConfirm: boolean
    }, ExtArgs["result"]["requestDoctorant"]>
    composites: {}
  }

  type RequestDoctorantGetPayload<S extends boolean | null | undefined | RequestDoctorantDefaultArgs> = $Result.GetResult<Prisma.$RequestDoctorantPayload, S>

  type RequestDoctorantCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RequestDoctorantFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RequestDoctorantCountAggregateInputType | true
    }

  export interface RequestDoctorantDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RequestDoctorant'], meta: { name: 'RequestDoctorant' } }
    /**
     * Find zero or one RequestDoctorant that matches the filter.
     * @param {RequestDoctorantFindUniqueArgs} args - Arguments to find a RequestDoctorant
     * @example
     * // Get one RequestDoctorant
     * const requestDoctorant = await prisma.requestDoctorant.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RequestDoctorantFindUniqueArgs>(args: SelectSubset<T, RequestDoctorantFindUniqueArgs<ExtArgs>>): Prisma__RequestDoctorantClient<$Result.GetResult<Prisma.$RequestDoctorantPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one RequestDoctorant that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RequestDoctorantFindUniqueOrThrowArgs} args - Arguments to find a RequestDoctorant
     * @example
     * // Get one RequestDoctorant
     * const requestDoctorant = await prisma.requestDoctorant.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RequestDoctorantFindUniqueOrThrowArgs>(args: SelectSubset<T, RequestDoctorantFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RequestDoctorantClient<$Result.GetResult<Prisma.$RequestDoctorantPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RequestDoctorant that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RequestDoctorantFindFirstArgs} args - Arguments to find a RequestDoctorant
     * @example
     * // Get one RequestDoctorant
     * const requestDoctorant = await prisma.requestDoctorant.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RequestDoctorantFindFirstArgs>(args?: SelectSubset<T, RequestDoctorantFindFirstArgs<ExtArgs>>): Prisma__RequestDoctorantClient<$Result.GetResult<Prisma.$RequestDoctorantPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RequestDoctorant that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RequestDoctorantFindFirstOrThrowArgs} args - Arguments to find a RequestDoctorant
     * @example
     * // Get one RequestDoctorant
     * const requestDoctorant = await prisma.requestDoctorant.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RequestDoctorantFindFirstOrThrowArgs>(args?: SelectSubset<T, RequestDoctorantFindFirstOrThrowArgs<ExtArgs>>): Prisma__RequestDoctorantClient<$Result.GetResult<Prisma.$RequestDoctorantPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more RequestDoctorants that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RequestDoctorantFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RequestDoctorants
     * const requestDoctorants = await prisma.requestDoctorant.findMany()
     * 
     * // Get first 10 RequestDoctorants
     * const requestDoctorants = await prisma.requestDoctorant.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const requestDoctorantWithIdOnly = await prisma.requestDoctorant.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RequestDoctorantFindManyArgs>(args?: SelectSubset<T, RequestDoctorantFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RequestDoctorantPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a RequestDoctorant.
     * @param {RequestDoctorantCreateArgs} args - Arguments to create a RequestDoctorant.
     * @example
     * // Create one RequestDoctorant
     * const RequestDoctorant = await prisma.requestDoctorant.create({
     *   data: {
     *     // ... data to create a RequestDoctorant
     *   }
     * })
     * 
     */
    create<T extends RequestDoctorantCreateArgs>(args: SelectSubset<T, RequestDoctorantCreateArgs<ExtArgs>>): Prisma__RequestDoctorantClient<$Result.GetResult<Prisma.$RequestDoctorantPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many RequestDoctorants.
     * @param {RequestDoctorantCreateManyArgs} args - Arguments to create many RequestDoctorants.
     * @example
     * // Create many RequestDoctorants
     * const requestDoctorant = await prisma.requestDoctorant.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RequestDoctorantCreateManyArgs>(args?: SelectSubset<T, RequestDoctorantCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RequestDoctorants and returns the data saved in the database.
     * @param {RequestDoctorantCreateManyAndReturnArgs} args - Arguments to create many RequestDoctorants.
     * @example
     * // Create many RequestDoctorants
     * const requestDoctorant = await prisma.requestDoctorant.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RequestDoctorants and only return the `id`
     * const requestDoctorantWithIdOnly = await prisma.requestDoctorant.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RequestDoctorantCreateManyAndReturnArgs>(args?: SelectSubset<T, RequestDoctorantCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RequestDoctorantPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a RequestDoctorant.
     * @param {RequestDoctorantDeleteArgs} args - Arguments to delete one RequestDoctorant.
     * @example
     * // Delete one RequestDoctorant
     * const RequestDoctorant = await prisma.requestDoctorant.delete({
     *   where: {
     *     // ... filter to delete one RequestDoctorant
     *   }
     * })
     * 
     */
    delete<T extends RequestDoctorantDeleteArgs>(args: SelectSubset<T, RequestDoctorantDeleteArgs<ExtArgs>>): Prisma__RequestDoctorantClient<$Result.GetResult<Prisma.$RequestDoctorantPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one RequestDoctorant.
     * @param {RequestDoctorantUpdateArgs} args - Arguments to update one RequestDoctorant.
     * @example
     * // Update one RequestDoctorant
     * const requestDoctorant = await prisma.requestDoctorant.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RequestDoctorantUpdateArgs>(args: SelectSubset<T, RequestDoctorantUpdateArgs<ExtArgs>>): Prisma__RequestDoctorantClient<$Result.GetResult<Prisma.$RequestDoctorantPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more RequestDoctorants.
     * @param {RequestDoctorantDeleteManyArgs} args - Arguments to filter RequestDoctorants to delete.
     * @example
     * // Delete a few RequestDoctorants
     * const { count } = await prisma.requestDoctorant.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RequestDoctorantDeleteManyArgs>(args?: SelectSubset<T, RequestDoctorantDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RequestDoctorants.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RequestDoctorantUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RequestDoctorants
     * const requestDoctorant = await prisma.requestDoctorant.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RequestDoctorantUpdateManyArgs>(args: SelectSubset<T, RequestDoctorantUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RequestDoctorants and returns the data updated in the database.
     * @param {RequestDoctorantUpdateManyAndReturnArgs} args - Arguments to update many RequestDoctorants.
     * @example
     * // Update many RequestDoctorants
     * const requestDoctorant = await prisma.requestDoctorant.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more RequestDoctorants and only return the `id`
     * const requestDoctorantWithIdOnly = await prisma.requestDoctorant.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RequestDoctorantUpdateManyAndReturnArgs>(args: SelectSubset<T, RequestDoctorantUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RequestDoctorantPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one RequestDoctorant.
     * @param {RequestDoctorantUpsertArgs} args - Arguments to update or create a RequestDoctorant.
     * @example
     * // Update or create a RequestDoctorant
     * const requestDoctorant = await prisma.requestDoctorant.upsert({
     *   create: {
     *     // ... data to create a RequestDoctorant
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RequestDoctorant we want to update
     *   }
     * })
     */
    upsert<T extends RequestDoctorantUpsertArgs>(args: SelectSubset<T, RequestDoctorantUpsertArgs<ExtArgs>>): Prisma__RequestDoctorantClient<$Result.GetResult<Prisma.$RequestDoctorantPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of RequestDoctorants.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RequestDoctorantCountArgs} args - Arguments to filter RequestDoctorants to count.
     * @example
     * // Count the number of RequestDoctorants
     * const count = await prisma.requestDoctorant.count({
     *   where: {
     *     // ... the filter for the RequestDoctorants we want to count
     *   }
     * })
    **/
    count<T extends RequestDoctorantCountArgs>(
      args?: Subset<T, RequestDoctorantCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RequestDoctorantCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RequestDoctorant.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RequestDoctorantAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RequestDoctorantAggregateArgs>(args: Subset<T, RequestDoctorantAggregateArgs>): Prisma.PrismaPromise<GetRequestDoctorantAggregateType<T>>

    /**
     * Group by RequestDoctorant.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RequestDoctorantGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RequestDoctorantGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RequestDoctorantGroupByArgs['orderBy'] }
        : { orderBy?: RequestDoctorantGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RequestDoctorantGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRequestDoctorantGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RequestDoctorant model
   */
  readonly fields: RequestDoctorantFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RequestDoctorant.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RequestDoctorantClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    directeur_these<T extends EnseignantChercheurDefaultArgs<ExtArgs> = {}>(args?: Subset<T, EnseignantChercheurDefaultArgs<ExtArgs>>): Prisma__EnseignantChercheurClient<$Result.GetResult<Prisma.$EnseignantChercheurPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the RequestDoctorant model
   */
  interface RequestDoctorantFieldRefs {
    readonly id: FieldRef<"RequestDoctorant", 'String'>
    readonly nom: FieldRef<"RequestDoctorant", 'String'>
    readonly prenom: FieldRef<"RequestDoctorant", 'String'>
    readonly email: FieldRef<"RequestDoctorant", 'String'>
    readonly annee_these: FieldRef<"RequestDoctorant", 'Int'>
    readonly createdAt: FieldRef<"RequestDoctorant", 'DateTime'>
    readonly directeur_these_id: FieldRef<"RequestDoctorant", 'String'>
    readonly status: FieldRef<"RequestDoctorant", 'RequestStatus'>
    readonly rejectionReason: FieldRef<"RequestDoctorant", 'String'>
    readonly photo: FieldRef<"RequestDoctorant", 'String'>
    readonly isConfirm: FieldRef<"RequestDoctorant", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * RequestDoctorant findUnique
   */
  export type RequestDoctorantFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RequestDoctorant
     */
    select?: RequestDoctorantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RequestDoctorant
     */
    omit?: RequestDoctorantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RequestDoctorantInclude<ExtArgs> | null
    /**
     * Filter, which RequestDoctorant to fetch.
     */
    where: RequestDoctorantWhereUniqueInput
  }

  /**
   * RequestDoctorant findUniqueOrThrow
   */
  export type RequestDoctorantFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RequestDoctorant
     */
    select?: RequestDoctorantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RequestDoctorant
     */
    omit?: RequestDoctorantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RequestDoctorantInclude<ExtArgs> | null
    /**
     * Filter, which RequestDoctorant to fetch.
     */
    where: RequestDoctorantWhereUniqueInput
  }

  /**
   * RequestDoctorant findFirst
   */
  export type RequestDoctorantFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RequestDoctorant
     */
    select?: RequestDoctorantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RequestDoctorant
     */
    omit?: RequestDoctorantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RequestDoctorantInclude<ExtArgs> | null
    /**
     * Filter, which RequestDoctorant to fetch.
     */
    where?: RequestDoctorantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RequestDoctorants to fetch.
     */
    orderBy?: RequestDoctorantOrderByWithRelationInput | RequestDoctorantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RequestDoctorants.
     */
    cursor?: RequestDoctorantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RequestDoctorants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RequestDoctorants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RequestDoctorants.
     */
    distinct?: RequestDoctorantScalarFieldEnum | RequestDoctorantScalarFieldEnum[]
  }

  /**
   * RequestDoctorant findFirstOrThrow
   */
  export type RequestDoctorantFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RequestDoctorant
     */
    select?: RequestDoctorantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RequestDoctorant
     */
    omit?: RequestDoctorantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RequestDoctorantInclude<ExtArgs> | null
    /**
     * Filter, which RequestDoctorant to fetch.
     */
    where?: RequestDoctorantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RequestDoctorants to fetch.
     */
    orderBy?: RequestDoctorantOrderByWithRelationInput | RequestDoctorantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RequestDoctorants.
     */
    cursor?: RequestDoctorantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RequestDoctorants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RequestDoctorants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RequestDoctorants.
     */
    distinct?: RequestDoctorantScalarFieldEnum | RequestDoctorantScalarFieldEnum[]
  }

  /**
   * RequestDoctorant findMany
   */
  export type RequestDoctorantFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RequestDoctorant
     */
    select?: RequestDoctorantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RequestDoctorant
     */
    omit?: RequestDoctorantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RequestDoctorantInclude<ExtArgs> | null
    /**
     * Filter, which RequestDoctorants to fetch.
     */
    where?: RequestDoctorantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RequestDoctorants to fetch.
     */
    orderBy?: RequestDoctorantOrderByWithRelationInput | RequestDoctorantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RequestDoctorants.
     */
    cursor?: RequestDoctorantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RequestDoctorants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RequestDoctorants.
     */
    skip?: number
    distinct?: RequestDoctorantScalarFieldEnum | RequestDoctorantScalarFieldEnum[]
  }

  /**
   * RequestDoctorant create
   */
  export type RequestDoctorantCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RequestDoctorant
     */
    select?: RequestDoctorantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RequestDoctorant
     */
    omit?: RequestDoctorantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RequestDoctorantInclude<ExtArgs> | null
    /**
     * The data needed to create a RequestDoctorant.
     */
    data: XOR<RequestDoctorantCreateInput, RequestDoctorantUncheckedCreateInput>
  }

  /**
   * RequestDoctorant createMany
   */
  export type RequestDoctorantCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RequestDoctorants.
     */
    data: RequestDoctorantCreateManyInput | RequestDoctorantCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RequestDoctorant createManyAndReturn
   */
  export type RequestDoctorantCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RequestDoctorant
     */
    select?: RequestDoctorantSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RequestDoctorant
     */
    omit?: RequestDoctorantOmit<ExtArgs> | null
    /**
     * The data used to create many RequestDoctorants.
     */
    data: RequestDoctorantCreateManyInput | RequestDoctorantCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RequestDoctorantIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * RequestDoctorant update
   */
  export type RequestDoctorantUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RequestDoctorant
     */
    select?: RequestDoctorantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RequestDoctorant
     */
    omit?: RequestDoctorantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RequestDoctorantInclude<ExtArgs> | null
    /**
     * The data needed to update a RequestDoctorant.
     */
    data: XOR<RequestDoctorantUpdateInput, RequestDoctorantUncheckedUpdateInput>
    /**
     * Choose, which RequestDoctorant to update.
     */
    where: RequestDoctorantWhereUniqueInput
  }

  /**
   * RequestDoctorant updateMany
   */
  export type RequestDoctorantUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RequestDoctorants.
     */
    data: XOR<RequestDoctorantUpdateManyMutationInput, RequestDoctorantUncheckedUpdateManyInput>
    /**
     * Filter which RequestDoctorants to update
     */
    where?: RequestDoctorantWhereInput
    /**
     * Limit how many RequestDoctorants to update.
     */
    limit?: number
  }

  /**
   * RequestDoctorant updateManyAndReturn
   */
  export type RequestDoctorantUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RequestDoctorant
     */
    select?: RequestDoctorantSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RequestDoctorant
     */
    omit?: RequestDoctorantOmit<ExtArgs> | null
    /**
     * The data used to update RequestDoctorants.
     */
    data: XOR<RequestDoctorantUpdateManyMutationInput, RequestDoctorantUncheckedUpdateManyInput>
    /**
     * Filter which RequestDoctorants to update
     */
    where?: RequestDoctorantWhereInput
    /**
     * Limit how many RequestDoctorants to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RequestDoctorantIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * RequestDoctorant upsert
   */
  export type RequestDoctorantUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RequestDoctorant
     */
    select?: RequestDoctorantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RequestDoctorant
     */
    omit?: RequestDoctorantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RequestDoctorantInclude<ExtArgs> | null
    /**
     * The filter to search for the RequestDoctorant to update in case it exists.
     */
    where: RequestDoctorantWhereUniqueInput
    /**
     * In case the RequestDoctorant found by the `where` argument doesn't exist, create a new RequestDoctorant with this data.
     */
    create: XOR<RequestDoctorantCreateInput, RequestDoctorantUncheckedCreateInput>
    /**
     * In case the RequestDoctorant was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RequestDoctorantUpdateInput, RequestDoctorantUncheckedUpdateInput>
  }

  /**
   * RequestDoctorant delete
   */
  export type RequestDoctorantDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RequestDoctorant
     */
    select?: RequestDoctorantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RequestDoctorant
     */
    omit?: RequestDoctorantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RequestDoctorantInclude<ExtArgs> | null
    /**
     * Filter which RequestDoctorant to delete.
     */
    where: RequestDoctorantWhereUniqueInput
  }

  /**
   * RequestDoctorant deleteMany
   */
  export type RequestDoctorantDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RequestDoctorants to delete
     */
    where?: RequestDoctorantWhereInput
    /**
     * Limit how many RequestDoctorants to delete.
     */
    limit?: number
  }

  /**
   * RequestDoctorant without action
   */
  export type RequestDoctorantDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RequestDoctorant
     */
    select?: RequestDoctorantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RequestDoctorant
     */
    omit?: RequestDoctorantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RequestDoctorantInclude<ExtArgs> | null
  }


  /**
   * Model Master
   */

  export type AggregateMaster = {
    _count: MasterCountAggregateOutputType | null
    _avg: MasterAvgAggregateOutputType | null
    _sum: MasterSumAggregateOutputType | null
    _min: MasterMinAggregateOutputType | null
    _max: MasterMaxAggregateOutputType | null
  }

  export type MasterAvgAggregateOutputType = {
    annee_master: number | null
  }

  export type MasterSumAggregateOutputType = {
    annee_master: number | null
  }

  export type MasterMinAggregateOutputType = {
    id: string | null
    nom: string | null
    prenom: string | null
    encadrant_id: string | null
    annee_master: number | null
    photo: string | null
    userId: string | null
  }

  export type MasterMaxAggregateOutputType = {
    id: string | null
    nom: string | null
    prenom: string | null
    encadrant_id: string | null
    annee_master: number | null
    photo: string | null
    userId: string | null
  }

  export type MasterCountAggregateOutputType = {
    id: number
    nom: number
    prenom: number
    encadrant_id: number
    annee_master: number
    photo: number
    userId: number
    _all: number
  }


  export type MasterAvgAggregateInputType = {
    annee_master?: true
  }

  export type MasterSumAggregateInputType = {
    annee_master?: true
  }

  export type MasterMinAggregateInputType = {
    id?: true
    nom?: true
    prenom?: true
    encadrant_id?: true
    annee_master?: true
    photo?: true
    userId?: true
  }

  export type MasterMaxAggregateInputType = {
    id?: true
    nom?: true
    prenom?: true
    encadrant_id?: true
    annee_master?: true
    photo?: true
    userId?: true
  }

  export type MasterCountAggregateInputType = {
    id?: true
    nom?: true
    prenom?: true
    encadrant_id?: true
    annee_master?: true
    photo?: true
    userId?: true
    _all?: true
  }

  export type MasterAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Master to aggregate.
     */
    where?: MasterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Masters to fetch.
     */
    orderBy?: MasterOrderByWithRelationInput | MasterOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MasterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Masters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Masters.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Masters
    **/
    _count?: true | MasterCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MasterAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MasterSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MasterMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MasterMaxAggregateInputType
  }

  export type GetMasterAggregateType<T extends MasterAggregateArgs> = {
        [P in keyof T & keyof AggregateMaster]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMaster[P]>
      : GetScalarType<T[P], AggregateMaster[P]>
  }




  export type MasterGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MasterWhereInput
    orderBy?: MasterOrderByWithAggregationInput | MasterOrderByWithAggregationInput[]
    by: MasterScalarFieldEnum[] | MasterScalarFieldEnum
    having?: MasterScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MasterCountAggregateInputType | true
    _avg?: MasterAvgAggregateInputType
    _sum?: MasterSumAggregateInputType
    _min?: MasterMinAggregateInputType
    _max?: MasterMaxAggregateInputType
  }

  export type MasterGroupByOutputType = {
    id: string
    nom: string
    prenom: string
    encadrant_id: string
    annee_master: number
    photo: string | null
    userId: string
    _count: MasterCountAggregateOutputType | null
    _avg: MasterAvgAggregateOutputType | null
    _sum: MasterSumAggregateOutputType | null
    _min: MasterMinAggregateOutputType | null
    _max: MasterMaxAggregateOutputType | null
  }

  type GetMasterGroupByPayload<T extends MasterGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MasterGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MasterGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MasterGroupByOutputType[P]>
            : GetScalarType<T[P], MasterGroupByOutputType[P]>
        }
      >
    >


  export type MasterSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nom?: boolean
    prenom?: boolean
    encadrant_id?: boolean
    annee_master?: boolean
    photo?: boolean
    userId?: boolean
    encadrant?: boolean | EnseignantChercheurDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["master"]>

  export type MasterSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nom?: boolean
    prenom?: boolean
    encadrant_id?: boolean
    annee_master?: boolean
    photo?: boolean
    userId?: boolean
    encadrant?: boolean | EnseignantChercheurDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["master"]>

  export type MasterSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nom?: boolean
    prenom?: boolean
    encadrant_id?: boolean
    annee_master?: boolean
    photo?: boolean
    userId?: boolean
    encadrant?: boolean | EnseignantChercheurDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["master"]>

  export type MasterSelectScalar = {
    id?: boolean
    nom?: boolean
    prenom?: boolean
    encadrant_id?: boolean
    annee_master?: boolean
    photo?: boolean
    userId?: boolean
  }

  export type MasterOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nom" | "prenom" | "encadrant_id" | "annee_master" | "photo" | "userId", ExtArgs["result"]["master"]>
  export type MasterInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    encadrant?: boolean | EnseignantChercheurDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type MasterIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    encadrant?: boolean | EnseignantChercheurDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type MasterIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    encadrant?: boolean | EnseignantChercheurDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $MasterPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Master"
    objects: {
      encadrant: Prisma.$EnseignantChercheurPayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      nom: string
      prenom: string
      encadrant_id: string
      annee_master: number
      photo: string | null
      userId: string
    }, ExtArgs["result"]["master"]>
    composites: {}
  }

  type MasterGetPayload<S extends boolean | null | undefined | MasterDefaultArgs> = $Result.GetResult<Prisma.$MasterPayload, S>

  type MasterCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MasterFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MasterCountAggregateInputType | true
    }

  export interface MasterDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Master'], meta: { name: 'Master' } }
    /**
     * Find zero or one Master that matches the filter.
     * @param {MasterFindUniqueArgs} args - Arguments to find a Master
     * @example
     * // Get one Master
     * const master = await prisma.master.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MasterFindUniqueArgs>(args: SelectSubset<T, MasterFindUniqueArgs<ExtArgs>>): Prisma__MasterClient<$Result.GetResult<Prisma.$MasterPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Master that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MasterFindUniqueOrThrowArgs} args - Arguments to find a Master
     * @example
     * // Get one Master
     * const master = await prisma.master.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MasterFindUniqueOrThrowArgs>(args: SelectSubset<T, MasterFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MasterClient<$Result.GetResult<Prisma.$MasterPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Master that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MasterFindFirstArgs} args - Arguments to find a Master
     * @example
     * // Get one Master
     * const master = await prisma.master.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MasterFindFirstArgs>(args?: SelectSubset<T, MasterFindFirstArgs<ExtArgs>>): Prisma__MasterClient<$Result.GetResult<Prisma.$MasterPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Master that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MasterFindFirstOrThrowArgs} args - Arguments to find a Master
     * @example
     * // Get one Master
     * const master = await prisma.master.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MasterFindFirstOrThrowArgs>(args?: SelectSubset<T, MasterFindFirstOrThrowArgs<ExtArgs>>): Prisma__MasterClient<$Result.GetResult<Prisma.$MasterPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Masters that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MasterFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Masters
     * const masters = await prisma.master.findMany()
     * 
     * // Get first 10 Masters
     * const masters = await prisma.master.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const masterWithIdOnly = await prisma.master.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MasterFindManyArgs>(args?: SelectSubset<T, MasterFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MasterPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Master.
     * @param {MasterCreateArgs} args - Arguments to create a Master.
     * @example
     * // Create one Master
     * const Master = await prisma.master.create({
     *   data: {
     *     // ... data to create a Master
     *   }
     * })
     * 
     */
    create<T extends MasterCreateArgs>(args: SelectSubset<T, MasterCreateArgs<ExtArgs>>): Prisma__MasterClient<$Result.GetResult<Prisma.$MasterPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Masters.
     * @param {MasterCreateManyArgs} args - Arguments to create many Masters.
     * @example
     * // Create many Masters
     * const master = await prisma.master.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MasterCreateManyArgs>(args?: SelectSubset<T, MasterCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Masters and returns the data saved in the database.
     * @param {MasterCreateManyAndReturnArgs} args - Arguments to create many Masters.
     * @example
     * // Create many Masters
     * const master = await prisma.master.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Masters and only return the `id`
     * const masterWithIdOnly = await prisma.master.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MasterCreateManyAndReturnArgs>(args?: SelectSubset<T, MasterCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MasterPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Master.
     * @param {MasterDeleteArgs} args - Arguments to delete one Master.
     * @example
     * // Delete one Master
     * const Master = await prisma.master.delete({
     *   where: {
     *     // ... filter to delete one Master
     *   }
     * })
     * 
     */
    delete<T extends MasterDeleteArgs>(args: SelectSubset<T, MasterDeleteArgs<ExtArgs>>): Prisma__MasterClient<$Result.GetResult<Prisma.$MasterPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Master.
     * @param {MasterUpdateArgs} args - Arguments to update one Master.
     * @example
     * // Update one Master
     * const master = await prisma.master.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MasterUpdateArgs>(args: SelectSubset<T, MasterUpdateArgs<ExtArgs>>): Prisma__MasterClient<$Result.GetResult<Prisma.$MasterPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Masters.
     * @param {MasterDeleteManyArgs} args - Arguments to filter Masters to delete.
     * @example
     * // Delete a few Masters
     * const { count } = await prisma.master.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MasterDeleteManyArgs>(args?: SelectSubset<T, MasterDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Masters.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MasterUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Masters
     * const master = await prisma.master.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MasterUpdateManyArgs>(args: SelectSubset<T, MasterUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Masters and returns the data updated in the database.
     * @param {MasterUpdateManyAndReturnArgs} args - Arguments to update many Masters.
     * @example
     * // Update many Masters
     * const master = await prisma.master.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Masters and only return the `id`
     * const masterWithIdOnly = await prisma.master.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MasterUpdateManyAndReturnArgs>(args: SelectSubset<T, MasterUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MasterPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Master.
     * @param {MasterUpsertArgs} args - Arguments to update or create a Master.
     * @example
     * // Update or create a Master
     * const master = await prisma.master.upsert({
     *   create: {
     *     // ... data to create a Master
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Master we want to update
     *   }
     * })
     */
    upsert<T extends MasterUpsertArgs>(args: SelectSubset<T, MasterUpsertArgs<ExtArgs>>): Prisma__MasterClient<$Result.GetResult<Prisma.$MasterPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Masters.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MasterCountArgs} args - Arguments to filter Masters to count.
     * @example
     * // Count the number of Masters
     * const count = await prisma.master.count({
     *   where: {
     *     // ... the filter for the Masters we want to count
     *   }
     * })
    **/
    count<T extends MasterCountArgs>(
      args?: Subset<T, MasterCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MasterCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Master.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MasterAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MasterAggregateArgs>(args: Subset<T, MasterAggregateArgs>): Prisma.PrismaPromise<GetMasterAggregateType<T>>

    /**
     * Group by Master.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MasterGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MasterGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MasterGroupByArgs['orderBy'] }
        : { orderBy?: MasterGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MasterGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMasterGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Master model
   */
  readonly fields: MasterFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Master.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MasterClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    encadrant<T extends EnseignantChercheurDefaultArgs<ExtArgs> = {}>(args?: Subset<T, EnseignantChercheurDefaultArgs<ExtArgs>>): Prisma__EnseignantChercheurClient<$Result.GetResult<Prisma.$EnseignantChercheurPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Master model
   */
  interface MasterFieldRefs {
    readonly id: FieldRef<"Master", 'String'>
    readonly nom: FieldRef<"Master", 'String'>
    readonly prenom: FieldRef<"Master", 'String'>
    readonly encadrant_id: FieldRef<"Master", 'String'>
    readonly annee_master: FieldRef<"Master", 'Int'>
    readonly photo: FieldRef<"Master", 'String'>
    readonly userId: FieldRef<"Master", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Master findUnique
   */
  export type MasterFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Master
     */
    select?: MasterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Master
     */
    omit?: MasterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MasterInclude<ExtArgs> | null
    /**
     * Filter, which Master to fetch.
     */
    where: MasterWhereUniqueInput
  }

  /**
   * Master findUniqueOrThrow
   */
  export type MasterFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Master
     */
    select?: MasterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Master
     */
    omit?: MasterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MasterInclude<ExtArgs> | null
    /**
     * Filter, which Master to fetch.
     */
    where: MasterWhereUniqueInput
  }

  /**
   * Master findFirst
   */
  export type MasterFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Master
     */
    select?: MasterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Master
     */
    omit?: MasterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MasterInclude<ExtArgs> | null
    /**
     * Filter, which Master to fetch.
     */
    where?: MasterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Masters to fetch.
     */
    orderBy?: MasterOrderByWithRelationInput | MasterOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Masters.
     */
    cursor?: MasterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Masters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Masters.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Masters.
     */
    distinct?: MasterScalarFieldEnum | MasterScalarFieldEnum[]
  }

  /**
   * Master findFirstOrThrow
   */
  export type MasterFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Master
     */
    select?: MasterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Master
     */
    omit?: MasterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MasterInclude<ExtArgs> | null
    /**
     * Filter, which Master to fetch.
     */
    where?: MasterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Masters to fetch.
     */
    orderBy?: MasterOrderByWithRelationInput | MasterOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Masters.
     */
    cursor?: MasterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Masters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Masters.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Masters.
     */
    distinct?: MasterScalarFieldEnum | MasterScalarFieldEnum[]
  }

  /**
   * Master findMany
   */
  export type MasterFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Master
     */
    select?: MasterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Master
     */
    omit?: MasterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MasterInclude<ExtArgs> | null
    /**
     * Filter, which Masters to fetch.
     */
    where?: MasterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Masters to fetch.
     */
    orderBy?: MasterOrderByWithRelationInput | MasterOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Masters.
     */
    cursor?: MasterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Masters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Masters.
     */
    skip?: number
    distinct?: MasterScalarFieldEnum | MasterScalarFieldEnum[]
  }

  /**
   * Master create
   */
  export type MasterCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Master
     */
    select?: MasterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Master
     */
    omit?: MasterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MasterInclude<ExtArgs> | null
    /**
     * The data needed to create a Master.
     */
    data: XOR<MasterCreateInput, MasterUncheckedCreateInput>
  }

  /**
   * Master createMany
   */
  export type MasterCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Masters.
     */
    data: MasterCreateManyInput | MasterCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Master createManyAndReturn
   */
  export type MasterCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Master
     */
    select?: MasterSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Master
     */
    omit?: MasterOmit<ExtArgs> | null
    /**
     * The data used to create many Masters.
     */
    data: MasterCreateManyInput | MasterCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MasterIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Master update
   */
  export type MasterUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Master
     */
    select?: MasterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Master
     */
    omit?: MasterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MasterInclude<ExtArgs> | null
    /**
     * The data needed to update a Master.
     */
    data: XOR<MasterUpdateInput, MasterUncheckedUpdateInput>
    /**
     * Choose, which Master to update.
     */
    where: MasterWhereUniqueInput
  }

  /**
   * Master updateMany
   */
  export type MasterUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Masters.
     */
    data: XOR<MasterUpdateManyMutationInput, MasterUncheckedUpdateManyInput>
    /**
     * Filter which Masters to update
     */
    where?: MasterWhereInput
    /**
     * Limit how many Masters to update.
     */
    limit?: number
  }

  /**
   * Master updateManyAndReturn
   */
  export type MasterUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Master
     */
    select?: MasterSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Master
     */
    omit?: MasterOmit<ExtArgs> | null
    /**
     * The data used to update Masters.
     */
    data: XOR<MasterUpdateManyMutationInput, MasterUncheckedUpdateManyInput>
    /**
     * Filter which Masters to update
     */
    where?: MasterWhereInput
    /**
     * Limit how many Masters to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MasterIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Master upsert
   */
  export type MasterUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Master
     */
    select?: MasterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Master
     */
    omit?: MasterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MasterInclude<ExtArgs> | null
    /**
     * The filter to search for the Master to update in case it exists.
     */
    where: MasterWhereUniqueInput
    /**
     * In case the Master found by the `where` argument doesn't exist, create a new Master with this data.
     */
    create: XOR<MasterCreateInput, MasterUncheckedCreateInput>
    /**
     * In case the Master was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MasterUpdateInput, MasterUncheckedUpdateInput>
  }

  /**
   * Master delete
   */
  export type MasterDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Master
     */
    select?: MasterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Master
     */
    omit?: MasterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MasterInclude<ExtArgs> | null
    /**
     * Filter which Master to delete.
     */
    where: MasterWhereUniqueInput
  }

  /**
   * Master deleteMany
   */
  export type MasterDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Masters to delete
     */
    where?: MasterWhereInput
    /**
     * Limit how many Masters to delete.
     */
    limit?: number
  }

  /**
   * Master without action
   */
  export type MasterDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Master
     */
    select?: MasterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Master
     */
    omit?: MasterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MasterInclude<ExtArgs> | null
  }


  /**
   * Model RequestMaster
   */

  export type AggregateRequestMaster = {
    _count: RequestMasterCountAggregateOutputType | null
    _avg: RequestMasterAvgAggregateOutputType | null
    _sum: RequestMasterSumAggregateOutputType | null
    _min: RequestMasterMinAggregateOutputType | null
    _max: RequestMasterMaxAggregateOutputType | null
  }

  export type RequestMasterAvgAggregateOutputType = {
    annee_master: number | null
  }

  export type RequestMasterSumAggregateOutputType = {
    annee_master: number | null
  }

  export type RequestMasterMinAggregateOutputType = {
    id: string | null
    nom: string | null
    prenom: string | null
    email: string | null
    annee_master: number | null
    createdAt: Date | null
    encadrant_id: string | null
    status: $Enums.RequestStatus | null
    rejectionReason: string | null
    photo: string | null
    isConfirm: boolean | null
  }

  export type RequestMasterMaxAggregateOutputType = {
    id: string | null
    nom: string | null
    prenom: string | null
    email: string | null
    annee_master: number | null
    createdAt: Date | null
    encadrant_id: string | null
    status: $Enums.RequestStatus | null
    rejectionReason: string | null
    photo: string | null
    isConfirm: boolean | null
  }

  export type RequestMasterCountAggregateOutputType = {
    id: number
    nom: number
    prenom: number
    email: number
    annee_master: number
    createdAt: number
    encadrant_id: number
    status: number
    rejectionReason: number
    photo: number
    isConfirm: number
    _all: number
  }


  export type RequestMasterAvgAggregateInputType = {
    annee_master?: true
  }

  export type RequestMasterSumAggregateInputType = {
    annee_master?: true
  }

  export type RequestMasterMinAggregateInputType = {
    id?: true
    nom?: true
    prenom?: true
    email?: true
    annee_master?: true
    createdAt?: true
    encadrant_id?: true
    status?: true
    rejectionReason?: true
    photo?: true
    isConfirm?: true
  }

  export type RequestMasterMaxAggregateInputType = {
    id?: true
    nom?: true
    prenom?: true
    email?: true
    annee_master?: true
    createdAt?: true
    encadrant_id?: true
    status?: true
    rejectionReason?: true
    photo?: true
    isConfirm?: true
  }

  export type RequestMasterCountAggregateInputType = {
    id?: true
    nom?: true
    prenom?: true
    email?: true
    annee_master?: true
    createdAt?: true
    encadrant_id?: true
    status?: true
    rejectionReason?: true
    photo?: true
    isConfirm?: true
    _all?: true
  }

  export type RequestMasterAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RequestMaster to aggregate.
     */
    where?: RequestMasterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RequestMasters to fetch.
     */
    orderBy?: RequestMasterOrderByWithRelationInput | RequestMasterOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RequestMasterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RequestMasters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RequestMasters.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RequestMasters
    **/
    _count?: true | RequestMasterCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RequestMasterAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RequestMasterSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RequestMasterMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RequestMasterMaxAggregateInputType
  }

  export type GetRequestMasterAggregateType<T extends RequestMasterAggregateArgs> = {
        [P in keyof T & keyof AggregateRequestMaster]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRequestMaster[P]>
      : GetScalarType<T[P], AggregateRequestMaster[P]>
  }




  export type RequestMasterGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RequestMasterWhereInput
    orderBy?: RequestMasterOrderByWithAggregationInput | RequestMasterOrderByWithAggregationInput[]
    by: RequestMasterScalarFieldEnum[] | RequestMasterScalarFieldEnum
    having?: RequestMasterScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RequestMasterCountAggregateInputType | true
    _avg?: RequestMasterAvgAggregateInputType
    _sum?: RequestMasterSumAggregateInputType
    _min?: RequestMasterMinAggregateInputType
    _max?: RequestMasterMaxAggregateInputType
  }

  export type RequestMasterGroupByOutputType = {
    id: string
    nom: string
    prenom: string
    email: string
    annee_master: number
    createdAt: Date
    encadrant_id: string
    status: $Enums.RequestStatus
    rejectionReason: string | null
    photo: string | null
    isConfirm: boolean
    _count: RequestMasterCountAggregateOutputType | null
    _avg: RequestMasterAvgAggregateOutputType | null
    _sum: RequestMasterSumAggregateOutputType | null
    _min: RequestMasterMinAggregateOutputType | null
    _max: RequestMasterMaxAggregateOutputType | null
  }

  type GetRequestMasterGroupByPayload<T extends RequestMasterGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RequestMasterGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RequestMasterGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RequestMasterGroupByOutputType[P]>
            : GetScalarType<T[P], RequestMasterGroupByOutputType[P]>
        }
      >
    >


  export type RequestMasterSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nom?: boolean
    prenom?: boolean
    email?: boolean
    annee_master?: boolean
    createdAt?: boolean
    encadrant_id?: boolean
    status?: boolean
    rejectionReason?: boolean
    photo?: boolean
    isConfirm?: boolean
    encadrant?: boolean | EnseignantChercheurDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["requestMaster"]>

  export type RequestMasterSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nom?: boolean
    prenom?: boolean
    email?: boolean
    annee_master?: boolean
    createdAt?: boolean
    encadrant_id?: boolean
    status?: boolean
    rejectionReason?: boolean
    photo?: boolean
    isConfirm?: boolean
    encadrant?: boolean | EnseignantChercheurDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["requestMaster"]>

  export type RequestMasterSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nom?: boolean
    prenom?: boolean
    email?: boolean
    annee_master?: boolean
    createdAt?: boolean
    encadrant_id?: boolean
    status?: boolean
    rejectionReason?: boolean
    photo?: boolean
    isConfirm?: boolean
    encadrant?: boolean | EnseignantChercheurDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["requestMaster"]>

  export type RequestMasterSelectScalar = {
    id?: boolean
    nom?: boolean
    prenom?: boolean
    email?: boolean
    annee_master?: boolean
    createdAt?: boolean
    encadrant_id?: boolean
    status?: boolean
    rejectionReason?: boolean
    photo?: boolean
    isConfirm?: boolean
  }

  export type RequestMasterOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nom" | "prenom" | "email" | "annee_master" | "createdAt" | "encadrant_id" | "status" | "rejectionReason" | "photo" | "isConfirm", ExtArgs["result"]["requestMaster"]>
  export type RequestMasterInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    encadrant?: boolean | EnseignantChercheurDefaultArgs<ExtArgs>
  }
  export type RequestMasterIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    encadrant?: boolean | EnseignantChercheurDefaultArgs<ExtArgs>
  }
  export type RequestMasterIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    encadrant?: boolean | EnseignantChercheurDefaultArgs<ExtArgs>
  }

  export type $RequestMasterPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RequestMaster"
    objects: {
      encadrant: Prisma.$EnseignantChercheurPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      nom: string
      prenom: string
      email: string
      annee_master: number
      createdAt: Date
      encadrant_id: string
      status: $Enums.RequestStatus
      rejectionReason: string | null
      photo: string | null
      isConfirm: boolean
    }, ExtArgs["result"]["requestMaster"]>
    composites: {}
  }

  type RequestMasterGetPayload<S extends boolean | null | undefined | RequestMasterDefaultArgs> = $Result.GetResult<Prisma.$RequestMasterPayload, S>

  type RequestMasterCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RequestMasterFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RequestMasterCountAggregateInputType | true
    }

  export interface RequestMasterDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RequestMaster'], meta: { name: 'RequestMaster' } }
    /**
     * Find zero or one RequestMaster that matches the filter.
     * @param {RequestMasterFindUniqueArgs} args - Arguments to find a RequestMaster
     * @example
     * // Get one RequestMaster
     * const requestMaster = await prisma.requestMaster.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RequestMasterFindUniqueArgs>(args: SelectSubset<T, RequestMasterFindUniqueArgs<ExtArgs>>): Prisma__RequestMasterClient<$Result.GetResult<Prisma.$RequestMasterPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one RequestMaster that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RequestMasterFindUniqueOrThrowArgs} args - Arguments to find a RequestMaster
     * @example
     * // Get one RequestMaster
     * const requestMaster = await prisma.requestMaster.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RequestMasterFindUniqueOrThrowArgs>(args: SelectSubset<T, RequestMasterFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RequestMasterClient<$Result.GetResult<Prisma.$RequestMasterPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RequestMaster that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RequestMasterFindFirstArgs} args - Arguments to find a RequestMaster
     * @example
     * // Get one RequestMaster
     * const requestMaster = await prisma.requestMaster.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RequestMasterFindFirstArgs>(args?: SelectSubset<T, RequestMasterFindFirstArgs<ExtArgs>>): Prisma__RequestMasterClient<$Result.GetResult<Prisma.$RequestMasterPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RequestMaster that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RequestMasterFindFirstOrThrowArgs} args - Arguments to find a RequestMaster
     * @example
     * // Get one RequestMaster
     * const requestMaster = await prisma.requestMaster.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RequestMasterFindFirstOrThrowArgs>(args?: SelectSubset<T, RequestMasterFindFirstOrThrowArgs<ExtArgs>>): Prisma__RequestMasterClient<$Result.GetResult<Prisma.$RequestMasterPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more RequestMasters that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RequestMasterFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RequestMasters
     * const requestMasters = await prisma.requestMaster.findMany()
     * 
     * // Get first 10 RequestMasters
     * const requestMasters = await prisma.requestMaster.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const requestMasterWithIdOnly = await prisma.requestMaster.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RequestMasterFindManyArgs>(args?: SelectSubset<T, RequestMasterFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RequestMasterPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a RequestMaster.
     * @param {RequestMasterCreateArgs} args - Arguments to create a RequestMaster.
     * @example
     * // Create one RequestMaster
     * const RequestMaster = await prisma.requestMaster.create({
     *   data: {
     *     // ... data to create a RequestMaster
     *   }
     * })
     * 
     */
    create<T extends RequestMasterCreateArgs>(args: SelectSubset<T, RequestMasterCreateArgs<ExtArgs>>): Prisma__RequestMasterClient<$Result.GetResult<Prisma.$RequestMasterPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many RequestMasters.
     * @param {RequestMasterCreateManyArgs} args - Arguments to create many RequestMasters.
     * @example
     * // Create many RequestMasters
     * const requestMaster = await prisma.requestMaster.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RequestMasterCreateManyArgs>(args?: SelectSubset<T, RequestMasterCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RequestMasters and returns the data saved in the database.
     * @param {RequestMasterCreateManyAndReturnArgs} args - Arguments to create many RequestMasters.
     * @example
     * // Create many RequestMasters
     * const requestMaster = await prisma.requestMaster.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RequestMasters and only return the `id`
     * const requestMasterWithIdOnly = await prisma.requestMaster.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RequestMasterCreateManyAndReturnArgs>(args?: SelectSubset<T, RequestMasterCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RequestMasterPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a RequestMaster.
     * @param {RequestMasterDeleteArgs} args - Arguments to delete one RequestMaster.
     * @example
     * // Delete one RequestMaster
     * const RequestMaster = await prisma.requestMaster.delete({
     *   where: {
     *     // ... filter to delete one RequestMaster
     *   }
     * })
     * 
     */
    delete<T extends RequestMasterDeleteArgs>(args: SelectSubset<T, RequestMasterDeleteArgs<ExtArgs>>): Prisma__RequestMasterClient<$Result.GetResult<Prisma.$RequestMasterPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one RequestMaster.
     * @param {RequestMasterUpdateArgs} args - Arguments to update one RequestMaster.
     * @example
     * // Update one RequestMaster
     * const requestMaster = await prisma.requestMaster.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RequestMasterUpdateArgs>(args: SelectSubset<T, RequestMasterUpdateArgs<ExtArgs>>): Prisma__RequestMasterClient<$Result.GetResult<Prisma.$RequestMasterPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more RequestMasters.
     * @param {RequestMasterDeleteManyArgs} args - Arguments to filter RequestMasters to delete.
     * @example
     * // Delete a few RequestMasters
     * const { count } = await prisma.requestMaster.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RequestMasterDeleteManyArgs>(args?: SelectSubset<T, RequestMasterDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RequestMasters.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RequestMasterUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RequestMasters
     * const requestMaster = await prisma.requestMaster.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RequestMasterUpdateManyArgs>(args: SelectSubset<T, RequestMasterUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RequestMasters and returns the data updated in the database.
     * @param {RequestMasterUpdateManyAndReturnArgs} args - Arguments to update many RequestMasters.
     * @example
     * // Update many RequestMasters
     * const requestMaster = await prisma.requestMaster.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more RequestMasters and only return the `id`
     * const requestMasterWithIdOnly = await prisma.requestMaster.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RequestMasterUpdateManyAndReturnArgs>(args: SelectSubset<T, RequestMasterUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RequestMasterPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one RequestMaster.
     * @param {RequestMasterUpsertArgs} args - Arguments to update or create a RequestMaster.
     * @example
     * // Update or create a RequestMaster
     * const requestMaster = await prisma.requestMaster.upsert({
     *   create: {
     *     // ... data to create a RequestMaster
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RequestMaster we want to update
     *   }
     * })
     */
    upsert<T extends RequestMasterUpsertArgs>(args: SelectSubset<T, RequestMasterUpsertArgs<ExtArgs>>): Prisma__RequestMasterClient<$Result.GetResult<Prisma.$RequestMasterPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of RequestMasters.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RequestMasterCountArgs} args - Arguments to filter RequestMasters to count.
     * @example
     * // Count the number of RequestMasters
     * const count = await prisma.requestMaster.count({
     *   where: {
     *     // ... the filter for the RequestMasters we want to count
     *   }
     * })
    **/
    count<T extends RequestMasterCountArgs>(
      args?: Subset<T, RequestMasterCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RequestMasterCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RequestMaster.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RequestMasterAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RequestMasterAggregateArgs>(args: Subset<T, RequestMasterAggregateArgs>): Prisma.PrismaPromise<GetRequestMasterAggregateType<T>>

    /**
     * Group by RequestMaster.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RequestMasterGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RequestMasterGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RequestMasterGroupByArgs['orderBy'] }
        : { orderBy?: RequestMasterGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RequestMasterGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRequestMasterGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RequestMaster model
   */
  readonly fields: RequestMasterFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RequestMaster.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RequestMasterClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    encadrant<T extends EnseignantChercheurDefaultArgs<ExtArgs> = {}>(args?: Subset<T, EnseignantChercheurDefaultArgs<ExtArgs>>): Prisma__EnseignantChercheurClient<$Result.GetResult<Prisma.$EnseignantChercheurPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the RequestMaster model
   */
  interface RequestMasterFieldRefs {
    readonly id: FieldRef<"RequestMaster", 'String'>
    readonly nom: FieldRef<"RequestMaster", 'String'>
    readonly prenom: FieldRef<"RequestMaster", 'String'>
    readonly email: FieldRef<"RequestMaster", 'String'>
    readonly annee_master: FieldRef<"RequestMaster", 'Int'>
    readonly createdAt: FieldRef<"RequestMaster", 'DateTime'>
    readonly encadrant_id: FieldRef<"RequestMaster", 'String'>
    readonly status: FieldRef<"RequestMaster", 'RequestStatus'>
    readonly rejectionReason: FieldRef<"RequestMaster", 'String'>
    readonly photo: FieldRef<"RequestMaster", 'String'>
    readonly isConfirm: FieldRef<"RequestMaster", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * RequestMaster findUnique
   */
  export type RequestMasterFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RequestMaster
     */
    select?: RequestMasterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RequestMaster
     */
    omit?: RequestMasterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RequestMasterInclude<ExtArgs> | null
    /**
     * Filter, which RequestMaster to fetch.
     */
    where: RequestMasterWhereUniqueInput
  }

  /**
   * RequestMaster findUniqueOrThrow
   */
  export type RequestMasterFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RequestMaster
     */
    select?: RequestMasterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RequestMaster
     */
    omit?: RequestMasterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RequestMasterInclude<ExtArgs> | null
    /**
     * Filter, which RequestMaster to fetch.
     */
    where: RequestMasterWhereUniqueInput
  }

  /**
   * RequestMaster findFirst
   */
  export type RequestMasterFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RequestMaster
     */
    select?: RequestMasterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RequestMaster
     */
    omit?: RequestMasterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RequestMasterInclude<ExtArgs> | null
    /**
     * Filter, which RequestMaster to fetch.
     */
    where?: RequestMasterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RequestMasters to fetch.
     */
    orderBy?: RequestMasterOrderByWithRelationInput | RequestMasterOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RequestMasters.
     */
    cursor?: RequestMasterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RequestMasters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RequestMasters.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RequestMasters.
     */
    distinct?: RequestMasterScalarFieldEnum | RequestMasterScalarFieldEnum[]
  }

  /**
   * RequestMaster findFirstOrThrow
   */
  export type RequestMasterFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RequestMaster
     */
    select?: RequestMasterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RequestMaster
     */
    omit?: RequestMasterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RequestMasterInclude<ExtArgs> | null
    /**
     * Filter, which RequestMaster to fetch.
     */
    where?: RequestMasterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RequestMasters to fetch.
     */
    orderBy?: RequestMasterOrderByWithRelationInput | RequestMasterOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RequestMasters.
     */
    cursor?: RequestMasterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RequestMasters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RequestMasters.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RequestMasters.
     */
    distinct?: RequestMasterScalarFieldEnum | RequestMasterScalarFieldEnum[]
  }

  /**
   * RequestMaster findMany
   */
  export type RequestMasterFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RequestMaster
     */
    select?: RequestMasterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RequestMaster
     */
    omit?: RequestMasterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RequestMasterInclude<ExtArgs> | null
    /**
     * Filter, which RequestMasters to fetch.
     */
    where?: RequestMasterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RequestMasters to fetch.
     */
    orderBy?: RequestMasterOrderByWithRelationInput | RequestMasterOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RequestMasters.
     */
    cursor?: RequestMasterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RequestMasters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RequestMasters.
     */
    skip?: number
    distinct?: RequestMasterScalarFieldEnum | RequestMasterScalarFieldEnum[]
  }

  /**
   * RequestMaster create
   */
  export type RequestMasterCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RequestMaster
     */
    select?: RequestMasterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RequestMaster
     */
    omit?: RequestMasterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RequestMasterInclude<ExtArgs> | null
    /**
     * The data needed to create a RequestMaster.
     */
    data: XOR<RequestMasterCreateInput, RequestMasterUncheckedCreateInput>
  }

  /**
   * RequestMaster createMany
   */
  export type RequestMasterCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RequestMasters.
     */
    data: RequestMasterCreateManyInput | RequestMasterCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RequestMaster createManyAndReturn
   */
  export type RequestMasterCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RequestMaster
     */
    select?: RequestMasterSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RequestMaster
     */
    omit?: RequestMasterOmit<ExtArgs> | null
    /**
     * The data used to create many RequestMasters.
     */
    data: RequestMasterCreateManyInput | RequestMasterCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RequestMasterIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * RequestMaster update
   */
  export type RequestMasterUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RequestMaster
     */
    select?: RequestMasterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RequestMaster
     */
    omit?: RequestMasterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RequestMasterInclude<ExtArgs> | null
    /**
     * The data needed to update a RequestMaster.
     */
    data: XOR<RequestMasterUpdateInput, RequestMasterUncheckedUpdateInput>
    /**
     * Choose, which RequestMaster to update.
     */
    where: RequestMasterWhereUniqueInput
  }

  /**
   * RequestMaster updateMany
   */
  export type RequestMasterUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RequestMasters.
     */
    data: XOR<RequestMasterUpdateManyMutationInput, RequestMasterUncheckedUpdateManyInput>
    /**
     * Filter which RequestMasters to update
     */
    where?: RequestMasterWhereInput
    /**
     * Limit how many RequestMasters to update.
     */
    limit?: number
  }

  /**
   * RequestMaster updateManyAndReturn
   */
  export type RequestMasterUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RequestMaster
     */
    select?: RequestMasterSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RequestMaster
     */
    omit?: RequestMasterOmit<ExtArgs> | null
    /**
     * The data used to update RequestMasters.
     */
    data: XOR<RequestMasterUpdateManyMutationInput, RequestMasterUncheckedUpdateManyInput>
    /**
     * Filter which RequestMasters to update
     */
    where?: RequestMasterWhereInput
    /**
     * Limit how many RequestMasters to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RequestMasterIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * RequestMaster upsert
   */
  export type RequestMasterUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RequestMaster
     */
    select?: RequestMasterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RequestMaster
     */
    omit?: RequestMasterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RequestMasterInclude<ExtArgs> | null
    /**
     * The filter to search for the RequestMaster to update in case it exists.
     */
    where: RequestMasterWhereUniqueInput
    /**
     * In case the RequestMaster found by the `where` argument doesn't exist, create a new RequestMaster with this data.
     */
    create: XOR<RequestMasterCreateInput, RequestMasterUncheckedCreateInput>
    /**
     * In case the RequestMaster was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RequestMasterUpdateInput, RequestMasterUncheckedUpdateInput>
  }

  /**
   * RequestMaster delete
   */
  export type RequestMasterDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RequestMaster
     */
    select?: RequestMasterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RequestMaster
     */
    omit?: RequestMasterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RequestMasterInclude<ExtArgs> | null
    /**
     * Filter which RequestMaster to delete.
     */
    where: RequestMasterWhereUniqueInput
  }

  /**
   * RequestMaster deleteMany
   */
  export type RequestMasterDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RequestMasters to delete
     */
    where?: RequestMasterWhereInput
    /**
     * Limit how many RequestMasters to delete.
     */
    limit?: number
  }

  /**
   * RequestMaster without action
   */
  export type RequestMasterDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RequestMaster
     */
    select?: RequestMasterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RequestMaster
     */
    omit?: RequestMasterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RequestMasterInclude<ExtArgs> | null
  }


  /**
   * Model EnseignantChercheur
   */

  export type AggregateEnseignantChercheur = {
    _count: EnseignantChercheurCountAggregateOutputType | null
    _min: EnseignantChercheurMinAggregateOutputType | null
    _max: EnseignantChercheurMaxAggregateOutputType | null
  }

  export type EnseignantChercheurMinAggregateOutputType = {
    id: string | null
    nom: string | null
    prenom: string | null
    fonction: string | null
    grade: $Enums.Grade | null
    etablissement: string | null
    photo: string | null
    userId: string | null
  }

  export type EnseignantChercheurMaxAggregateOutputType = {
    id: string | null
    nom: string | null
    prenom: string | null
    fonction: string | null
    grade: $Enums.Grade | null
    etablissement: string | null
    photo: string | null
    userId: string | null
  }

  export type EnseignantChercheurCountAggregateOutputType = {
    id: number
    nom: number
    prenom: number
    fonction: number
    grade: number
    etablissement: number
    photo: number
    userId: number
    _all: number
  }


  export type EnseignantChercheurMinAggregateInputType = {
    id?: true
    nom?: true
    prenom?: true
    fonction?: true
    grade?: true
    etablissement?: true
    photo?: true
    userId?: true
  }

  export type EnseignantChercheurMaxAggregateInputType = {
    id?: true
    nom?: true
    prenom?: true
    fonction?: true
    grade?: true
    etablissement?: true
    photo?: true
    userId?: true
  }

  export type EnseignantChercheurCountAggregateInputType = {
    id?: true
    nom?: true
    prenom?: true
    fonction?: true
    grade?: true
    etablissement?: true
    photo?: true
    userId?: true
    _all?: true
  }

  export type EnseignantChercheurAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EnseignantChercheur to aggregate.
     */
    where?: EnseignantChercheurWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EnseignantChercheurs to fetch.
     */
    orderBy?: EnseignantChercheurOrderByWithRelationInput | EnseignantChercheurOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EnseignantChercheurWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EnseignantChercheurs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EnseignantChercheurs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned EnseignantChercheurs
    **/
    _count?: true | EnseignantChercheurCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EnseignantChercheurMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EnseignantChercheurMaxAggregateInputType
  }

  export type GetEnseignantChercheurAggregateType<T extends EnseignantChercheurAggregateArgs> = {
        [P in keyof T & keyof AggregateEnseignantChercheur]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEnseignantChercheur[P]>
      : GetScalarType<T[P], AggregateEnseignantChercheur[P]>
  }




  export type EnseignantChercheurGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EnseignantChercheurWhereInput
    orderBy?: EnseignantChercheurOrderByWithAggregationInput | EnseignantChercheurOrderByWithAggregationInput[]
    by: EnseignantChercheurScalarFieldEnum[] | EnseignantChercheurScalarFieldEnum
    having?: EnseignantChercheurScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EnseignantChercheurCountAggregateInputType | true
    _min?: EnseignantChercheurMinAggregateInputType
    _max?: EnseignantChercheurMaxAggregateInputType
  }

  export type EnseignantChercheurGroupByOutputType = {
    id: string
    nom: string
    prenom: string
    fonction: string
    grade: $Enums.Grade
    etablissement: string
    photo: string | null
    userId: string
    _count: EnseignantChercheurCountAggregateOutputType | null
    _min: EnseignantChercheurMinAggregateOutputType | null
    _max: EnseignantChercheurMaxAggregateOutputType | null
  }

  type GetEnseignantChercheurGroupByPayload<T extends EnseignantChercheurGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EnseignantChercheurGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EnseignantChercheurGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EnseignantChercheurGroupByOutputType[P]>
            : GetScalarType<T[P], EnseignantChercheurGroupByOutputType[P]>
        }
      >
    >


  export type EnseignantChercheurSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nom?: boolean
    prenom?: boolean
    fonction?: boolean
    grade?: boolean
    etablissement?: boolean
    photo?: boolean
    userId?: boolean
    doctorants?: boolean | EnseignantChercheur$doctorantsArgs<ExtArgs>
    masters?: boolean | EnseignantChercheur$mastersArgs<ExtArgs>
    requestsMaster?: boolean | EnseignantChercheur$requestsMasterArgs<ExtArgs>
    requestsDoctorant?: boolean | EnseignantChercheur$requestsDoctorantArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    _count?: boolean | EnseignantChercheurCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["enseignantChercheur"]>

  export type EnseignantChercheurSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nom?: boolean
    prenom?: boolean
    fonction?: boolean
    grade?: boolean
    etablissement?: boolean
    photo?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["enseignantChercheur"]>

  export type EnseignantChercheurSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nom?: boolean
    prenom?: boolean
    fonction?: boolean
    grade?: boolean
    etablissement?: boolean
    photo?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["enseignantChercheur"]>

  export type EnseignantChercheurSelectScalar = {
    id?: boolean
    nom?: boolean
    prenom?: boolean
    fonction?: boolean
    grade?: boolean
    etablissement?: boolean
    photo?: boolean
    userId?: boolean
  }

  export type EnseignantChercheurOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nom" | "prenom" | "fonction" | "grade" | "etablissement" | "photo" | "userId", ExtArgs["result"]["enseignantChercheur"]>
  export type EnseignantChercheurInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    doctorants?: boolean | EnseignantChercheur$doctorantsArgs<ExtArgs>
    masters?: boolean | EnseignantChercheur$mastersArgs<ExtArgs>
    requestsMaster?: boolean | EnseignantChercheur$requestsMasterArgs<ExtArgs>
    requestsDoctorant?: boolean | EnseignantChercheur$requestsDoctorantArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    _count?: boolean | EnseignantChercheurCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type EnseignantChercheurIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type EnseignantChercheurIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $EnseignantChercheurPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "EnseignantChercheur"
    objects: {
      doctorants: Prisma.$DoctorantPayload<ExtArgs>[]
      masters: Prisma.$MasterPayload<ExtArgs>[]
      requestsMaster: Prisma.$RequestMasterPayload<ExtArgs>[]
      requestsDoctorant: Prisma.$RequestDoctorantPayload<ExtArgs>[]
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      nom: string
      prenom: string
      fonction: string
      grade: $Enums.Grade
      etablissement: string
      photo: string | null
      userId: string
    }, ExtArgs["result"]["enseignantChercheur"]>
    composites: {}
  }

  type EnseignantChercheurGetPayload<S extends boolean | null | undefined | EnseignantChercheurDefaultArgs> = $Result.GetResult<Prisma.$EnseignantChercheurPayload, S>

  type EnseignantChercheurCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EnseignantChercheurFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EnseignantChercheurCountAggregateInputType | true
    }

  export interface EnseignantChercheurDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['EnseignantChercheur'], meta: { name: 'EnseignantChercheur' } }
    /**
     * Find zero or one EnseignantChercheur that matches the filter.
     * @param {EnseignantChercheurFindUniqueArgs} args - Arguments to find a EnseignantChercheur
     * @example
     * // Get one EnseignantChercheur
     * const enseignantChercheur = await prisma.enseignantChercheur.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EnseignantChercheurFindUniqueArgs>(args: SelectSubset<T, EnseignantChercheurFindUniqueArgs<ExtArgs>>): Prisma__EnseignantChercheurClient<$Result.GetResult<Prisma.$EnseignantChercheurPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one EnseignantChercheur that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EnseignantChercheurFindUniqueOrThrowArgs} args - Arguments to find a EnseignantChercheur
     * @example
     * // Get one EnseignantChercheur
     * const enseignantChercheur = await prisma.enseignantChercheur.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EnseignantChercheurFindUniqueOrThrowArgs>(args: SelectSubset<T, EnseignantChercheurFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EnseignantChercheurClient<$Result.GetResult<Prisma.$EnseignantChercheurPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EnseignantChercheur that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EnseignantChercheurFindFirstArgs} args - Arguments to find a EnseignantChercheur
     * @example
     * // Get one EnseignantChercheur
     * const enseignantChercheur = await prisma.enseignantChercheur.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EnseignantChercheurFindFirstArgs>(args?: SelectSubset<T, EnseignantChercheurFindFirstArgs<ExtArgs>>): Prisma__EnseignantChercheurClient<$Result.GetResult<Prisma.$EnseignantChercheurPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EnseignantChercheur that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EnseignantChercheurFindFirstOrThrowArgs} args - Arguments to find a EnseignantChercheur
     * @example
     * // Get one EnseignantChercheur
     * const enseignantChercheur = await prisma.enseignantChercheur.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EnseignantChercheurFindFirstOrThrowArgs>(args?: SelectSubset<T, EnseignantChercheurFindFirstOrThrowArgs<ExtArgs>>): Prisma__EnseignantChercheurClient<$Result.GetResult<Prisma.$EnseignantChercheurPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more EnseignantChercheurs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EnseignantChercheurFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all EnseignantChercheurs
     * const enseignantChercheurs = await prisma.enseignantChercheur.findMany()
     * 
     * // Get first 10 EnseignantChercheurs
     * const enseignantChercheurs = await prisma.enseignantChercheur.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const enseignantChercheurWithIdOnly = await prisma.enseignantChercheur.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EnseignantChercheurFindManyArgs>(args?: SelectSubset<T, EnseignantChercheurFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EnseignantChercheurPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a EnseignantChercheur.
     * @param {EnseignantChercheurCreateArgs} args - Arguments to create a EnseignantChercheur.
     * @example
     * // Create one EnseignantChercheur
     * const EnseignantChercheur = await prisma.enseignantChercheur.create({
     *   data: {
     *     // ... data to create a EnseignantChercheur
     *   }
     * })
     * 
     */
    create<T extends EnseignantChercheurCreateArgs>(args: SelectSubset<T, EnseignantChercheurCreateArgs<ExtArgs>>): Prisma__EnseignantChercheurClient<$Result.GetResult<Prisma.$EnseignantChercheurPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many EnseignantChercheurs.
     * @param {EnseignantChercheurCreateManyArgs} args - Arguments to create many EnseignantChercheurs.
     * @example
     * // Create many EnseignantChercheurs
     * const enseignantChercheur = await prisma.enseignantChercheur.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EnseignantChercheurCreateManyArgs>(args?: SelectSubset<T, EnseignantChercheurCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many EnseignantChercheurs and returns the data saved in the database.
     * @param {EnseignantChercheurCreateManyAndReturnArgs} args - Arguments to create many EnseignantChercheurs.
     * @example
     * // Create many EnseignantChercheurs
     * const enseignantChercheur = await prisma.enseignantChercheur.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many EnseignantChercheurs and only return the `id`
     * const enseignantChercheurWithIdOnly = await prisma.enseignantChercheur.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EnseignantChercheurCreateManyAndReturnArgs>(args?: SelectSubset<T, EnseignantChercheurCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EnseignantChercheurPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a EnseignantChercheur.
     * @param {EnseignantChercheurDeleteArgs} args - Arguments to delete one EnseignantChercheur.
     * @example
     * // Delete one EnseignantChercheur
     * const EnseignantChercheur = await prisma.enseignantChercheur.delete({
     *   where: {
     *     // ... filter to delete one EnseignantChercheur
     *   }
     * })
     * 
     */
    delete<T extends EnseignantChercheurDeleteArgs>(args: SelectSubset<T, EnseignantChercheurDeleteArgs<ExtArgs>>): Prisma__EnseignantChercheurClient<$Result.GetResult<Prisma.$EnseignantChercheurPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one EnseignantChercheur.
     * @param {EnseignantChercheurUpdateArgs} args - Arguments to update one EnseignantChercheur.
     * @example
     * // Update one EnseignantChercheur
     * const enseignantChercheur = await prisma.enseignantChercheur.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EnseignantChercheurUpdateArgs>(args: SelectSubset<T, EnseignantChercheurUpdateArgs<ExtArgs>>): Prisma__EnseignantChercheurClient<$Result.GetResult<Prisma.$EnseignantChercheurPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more EnseignantChercheurs.
     * @param {EnseignantChercheurDeleteManyArgs} args - Arguments to filter EnseignantChercheurs to delete.
     * @example
     * // Delete a few EnseignantChercheurs
     * const { count } = await prisma.enseignantChercheur.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EnseignantChercheurDeleteManyArgs>(args?: SelectSubset<T, EnseignantChercheurDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EnseignantChercheurs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EnseignantChercheurUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many EnseignantChercheurs
     * const enseignantChercheur = await prisma.enseignantChercheur.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EnseignantChercheurUpdateManyArgs>(args: SelectSubset<T, EnseignantChercheurUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EnseignantChercheurs and returns the data updated in the database.
     * @param {EnseignantChercheurUpdateManyAndReturnArgs} args - Arguments to update many EnseignantChercheurs.
     * @example
     * // Update many EnseignantChercheurs
     * const enseignantChercheur = await prisma.enseignantChercheur.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more EnseignantChercheurs and only return the `id`
     * const enseignantChercheurWithIdOnly = await prisma.enseignantChercheur.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends EnseignantChercheurUpdateManyAndReturnArgs>(args: SelectSubset<T, EnseignantChercheurUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EnseignantChercheurPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one EnseignantChercheur.
     * @param {EnseignantChercheurUpsertArgs} args - Arguments to update or create a EnseignantChercheur.
     * @example
     * // Update or create a EnseignantChercheur
     * const enseignantChercheur = await prisma.enseignantChercheur.upsert({
     *   create: {
     *     // ... data to create a EnseignantChercheur
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the EnseignantChercheur we want to update
     *   }
     * })
     */
    upsert<T extends EnseignantChercheurUpsertArgs>(args: SelectSubset<T, EnseignantChercheurUpsertArgs<ExtArgs>>): Prisma__EnseignantChercheurClient<$Result.GetResult<Prisma.$EnseignantChercheurPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of EnseignantChercheurs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EnseignantChercheurCountArgs} args - Arguments to filter EnseignantChercheurs to count.
     * @example
     * // Count the number of EnseignantChercheurs
     * const count = await prisma.enseignantChercheur.count({
     *   where: {
     *     // ... the filter for the EnseignantChercheurs we want to count
     *   }
     * })
    **/
    count<T extends EnseignantChercheurCountArgs>(
      args?: Subset<T, EnseignantChercheurCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EnseignantChercheurCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a EnseignantChercheur.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EnseignantChercheurAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EnseignantChercheurAggregateArgs>(args: Subset<T, EnseignantChercheurAggregateArgs>): Prisma.PrismaPromise<GetEnseignantChercheurAggregateType<T>>

    /**
     * Group by EnseignantChercheur.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EnseignantChercheurGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EnseignantChercheurGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EnseignantChercheurGroupByArgs['orderBy'] }
        : { orderBy?: EnseignantChercheurGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EnseignantChercheurGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEnseignantChercheurGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the EnseignantChercheur model
   */
  readonly fields: EnseignantChercheurFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for EnseignantChercheur.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EnseignantChercheurClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    doctorants<T extends EnseignantChercheur$doctorantsArgs<ExtArgs> = {}>(args?: Subset<T, EnseignantChercheur$doctorantsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DoctorantPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    masters<T extends EnseignantChercheur$mastersArgs<ExtArgs> = {}>(args?: Subset<T, EnseignantChercheur$mastersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MasterPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    requestsMaster<T extends EnseignantChercheur$requestsMasterArgs<ExtArgs> = {}>(args?: Subset<T, EnseignantChercheur$requestsMasterArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RequestMasterPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    requestsDoctorant<T extends EnseignantChercheur$requestsDoctorantArgs<ExtArgs> = {}>(args?: Subset<T, EnseignantChercheur$requestsDoctorantArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RequestDoctorantPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the EnseignantChercheur model
   */
  interface EnseignantChercheurFieldRefs {
    readonly id: FieldRef<"EnseignantChercheur", 'String'>
    readonly nom: FieldRef<"EnseignantChercheur", 'String'>
    readonly prenom: FieldRef<"EnseignantChercheur", 'String'>
    readonly fonction: FieldRef<"EnseignantChercheur", 'String'>
    readonly grade: FieldRef<"EnseignantChercheur", 'Grade'>
    readonly etablissement: FieldRef<"EnseignantChercheur", 'String'>
    readonly photo: FieldRef<"EnseignantChercheur", 'String'>
    readonly userId: FieldRef<"EnseignantChercheur", 'String'>
  }
    

  // Custom InputTypes
  /**
   * EnseignantChercheur findUnique
   */
  export type EnseignantChercheurFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EnseignantChercheur
     */
    select?: EnseignantChercheurSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EnseignantChercheur
     */
    omit?: EnseignantChercheurOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnseignantChercheurInclude<ExtArgs> | null
    /**
     * Filter, which EnseignantChercheur to fetch.
     */
    where: EnseignantChercheurWhereUniqueInput
  }

  /**
   * EnseignantChercheur findUniqueOrThrow
   */
  export type EnseignantChercheurFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EnseignantChercheur
     */
    select?: EnseignantChercheurSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EnseignantChercheur
     */
    omit?: EnseignantChercheurOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnseignantChercheurInclude<ExtArgs> | null
    /**
     * Filter, which EnseignantChercheur to fetch.
     */
    where: EnseignantChercheurWhereUniqueInput
  }

  /**
   * EnseignantChercheur findFirst
   */
  export type EnseignantChercheurFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EnseignantChercheur
     */
    select?: EnseignantChercheurSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EnseignantChercheur
     */
    omit?: EnseignantChercheurOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnseignantChercheurInclude<ExtArgs> | null
    /**
     * Filter, which EnseignantChercheur to fetch.
     */
    where?: EnseignantChercheurWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EnseignantChercheurs to fetch.
     */
    orderBy?: EnseignantChercheurOrderByWithRelationInput | EnseignantChercheurOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EnseignantChercheurs.
     */
    cursor?: EnseignantChercheurWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EnseignantChercheurs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EnseignantChercheurs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EnseignantChercheurs.
     */
    distinct?: EnseignantChercheurScalarFieldEnum | EnseignantChercheurScalarFieldEnum[]
  }

  /**
   * EnseignantChercheur findFirstOrThrow
   */
  export type EnseignantChercheurFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EnseignantChercheur
     */
    select?: EnseignantChercheurSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EnseignantChercheur
     */
    omit?: EnseignantChercheurOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnseignantChercheurInclude<ExtArgs> | null
    /**
     * Filter, which EnseignantChercheur to fetch.
     */
    where?: EnseignantChercheurWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EnseignantChercheurs to fetch.
     */
    orderBy?: EnseignantChercheurOrderByWithRelationInput | EnseignantChercheurOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EnseignantChercheurs.
     */
    cursor?: EnseignantChercheurWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EnseignantChercheurs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EnseignantChercheurs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EnseignantChercheurs.
     */
    distinct?: EnseignantChercheurScalarFieldEnum | EnseignantChercheurScalarFieldEnum[]
  }

  /**
   * EnseignantChercheur findMany
   */
  export type EnseignantChercheurFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EnseignantChercheur
     */
    select?: EnseignantChercheurSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EnseignantChercheur
     */
    omit?: EnseignantChercheurOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnseignantChercheurInclude<ExtArgs> | null
    /**
     * Filter, which EnseignantChercheurs to fetch.
     */
    where?: EnseignantChercheurWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EnseignantChercheurs to fetch.
     */
    orderBy?: EnseignantChercheurOrderByWithRelationInput | EnseignantChercheurOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing EnseignantChercheurs.
     */
    cursor?: EnseignantChercheurWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EnseignantChercheurs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EnseignantChercheurs.
     */
    skip?: number
    distinct?: EnseignantChercheurScalarFieldEnum | EnseignantChercheurScalarFieldEnum[]
  }

  /**
   * EnseignantChercheur create
   */
  export type EnseignantChercheurCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EnseignantChercheur
     */
    select?: EnseignantChercheurSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EnseignantChercheur
     */
    omit?: EnseignantChercheurOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnseignantChercheurInclude<ExtArgs> | null
    /**
     * The data needed to create a EnseignantChercheur.
     */
    data: XOR<EnseignantChercheurCreateInput, EnseignantChercheurUncheckedCreateInput>
  }

  /**
   * EnseignantChercheur createMany
   */
  export type EnseignantChercheurCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many EnseignantChercheurs.
     */
    data: EnseignantChercheurCreateManyInput | EnseignantChercheurCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * EnseignantChercheur createManyAndReturn
   */
  export type EnseignantChercheurCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EnseignantChercheur
     */
    select?: EnseignantChercheurSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the EnseignantChercheur
     */
    omit?: EnseignantChercheurOmit<ExtArgs> | null
    /**
     * The data used to create many EnseignantChercheurs.
     */
    data: EnseignantChercheurCreateManyInput | EnseignantChercheurCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnseignantChercheurIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * EnseignantChercheur update
   */
  export type EnseignantChercheurUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EnseignantChercheur
     */
    select?: EnseignantChercheurSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EnseignantChercheur
     */
    omit?: EnseignantChercheurOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnseignantChercheurInclude<ExtArgs> | null
    /**
     * The data needed to update a EnseignantChercheur.
     */
    data: XOR<EnseignantChercheurUpdateInput, EnseignantChercheurUncheckedUpdateInput>
    /**
     * Choose, which EnseignantChercheur to update.
     */
    where: EnseignantChercheurWhereUniqueInput
  }

  /**
   * EnseignantChercheur updateMany
   */
  export type EnseignantChercheurUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update EnseignantChercheurs.
     */
    data: XOR<EnseignantChercheurUpdateManyMutationInput, EnseignantChercheurUncheckedUpdateManyInput>
    /**
     * Filter which EnseignantChercheurs to update
     */
    where?: EnseignantChercheurWhereInput
    /**
     * Limit how many EnseignantChercheurs to update.
     */
    limit?: number
  }

  /**
   * EnseignantChercheur updateManyAndReturn
   */
  export type EnseignantChercheurUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EnseignantChercheur
     */
    select?: EnseignantChercheurSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the EnseignantChercheur
     */
    omit?: EnseignantChercheurOmit<ExtArgs> | null
    /**
     * The data used to update EnseignantChercheurs.
     */
    data: XOR<EnseignantChercheurUpdateManyMutationInput, EnseignantChercheurUncheckedUpdateManyInput>
    /**
     * Filter which EnseignantChercheurs to update
     */
    where?: EnseignantChercheurWhereInput
    /**
     * Limit how many EnseignantChercheurs to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnseignantChercheurIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * EnseignantChercheur upsert
   */
  export type EnseignantChercheurUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EnseignantChercheur
     */
    select?: EnseignantChercheurSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EnseignantChercheur
     */
    omit?: EnseignantChercheurOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnseignantChercheurInclude<ExtArgs> | null
    /**
     * The filter to search for the EnseignantChercheur to update in case it exists.
     */
    where: EnseignantChercheurWhereUniqueInput
    /**
     * In case the EnseignantChercheur found by the `where` argument doesn't exist, create a new EnseignantChercheur with this data.
     */
    create: XOR<EnseignantChercheurCreateInput, EnseignantChercheurUncheckedCreateInput>
    /**
     * In case the EnseignantChercheur was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EnseignantChercheurUpdateInput, EnseignantChercheurUncheckedUpdateInput>
  }

  /**
   * EnseignantChercheur delete
   */
  export type EnseignantChercheurDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EnseignantChercheur
     */
    select?: EnseignantChercheurSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EnseignantChercheur
     */
    omit?: EnseignantChercheurOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnseignantChercheurInclude<ExtArgs> | null
    /**
     * Filter which EnseignantChercheur to delete.
     */
    where: EnseignantChercheurWhereUniqueInput
  }

  /**
   * EnseignantChercheur deleteMany
   */
  export type EnseignantChercheurDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EnseignantChercheurs to delete
     */
    where?: EnseignantChercheurWhereInput
    /**
     * Limit how many EnseignantChercheurs to delete.
     */
    limit?: number
  }

  /**
   * EnseignantChercheur.doctorants
   */
  export type EnseignantChercheur$doctorantsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Doctorant
     */
    select?: DoctorantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Doctorant
     */
    omit?: DoctorantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorantInclude<ExtArgs> | null
    where?: DoctorantWhereInput
    orderBy?: DoctorantOrderByWithRelationInput | DoctorantOrderByWithRelationInput[]
    cursor?: DoctorantWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DoctorantScalarFieldEnum | DoctorantScalarFieldEnum[]
  }

  /**
   * EnseignantChercheur.masters
   */
  export type EnseignantChercheur$mastersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Master
     */
    select?: MasterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Master
     */
    omit?: MasterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MasterInclude<ExtArgs> | null
    where?: MasterWhereInput
    orderBy?: MasterOrderByWithRelationInput | MasterOrderByWithRelationInput[]
    cursor?: MasterWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MasterScalarFieldEnum | MasterScalarFieldEnum[]
  }

  /**
   * EnseignantChercheur.requestsMaster
   */
  export type EnseignantChercheur$requestsMasterArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RequestMaster
     */
    select?: RequestMasterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RequestMaster
     */
    omit?: RequestMasterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RequestMasterInclude<ExtArgs> | null
    where?: RequestMasterWhereInput
    orderBy?: RequestMasterOrderByWithRelationInput | RequestMasterOrderByWithRelationInput[]
    cursor?: RequestMasterWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RequestMasterScalarFieldEnum | RequestMasterScalarFieldEnum[]
  }

  /**
   * EnseignantChercheur.requestsDoctorant
   */
  export type EnseignantChercheur$requestsDoctorantArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RequestDoctorant
     */
    select?: RequestDoctorantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RequestDoctorant
     */
    omit?: RequestDoctorantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RequestDoctorantInclude<ExtArgs> | null
    where?: RequestDoctorantWhereInput
    orderBy?: RequestDoctorantOrderByWithRelationInput | RequestDoctorantOrderByWithRelationInput[]
    cursor?: RequestDoctorantWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RequestDoctorantScalarFieldEnum | RequestDoctorantScalarFieldEnum[]
  }

  /**
   * EnseignantChercheur without action
   */
  export type EnseignantChercheurDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EnseignantChercheur
     */
    select?: EnseignantChercheurSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EnseignantChercheur
     */
    omit?: EnseignantChercheurOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnseignantChercheurInclude<ExtArgs> | null
  }


  /**
   * Model RequestEnseignantChercheur
   */

  export type AggregateRequestEnseignantChercheur = {
    _count: RequestEnseignantChercheurCountAggregateOutputType | null
    _min: RequestEnseignantChercheurMinAggregateOutputType | null
    _max: RequestEnseignantChercheurMaxAggregateOutputType | null
  }

  export type RequestEnseignantChercheurMinAggregateOutputType = {
    id: string | null
    nom: string | null
    prenom: string | null
    email: string | null
    fonction: string | null
    grade: $Enums.Grade | null
    etablissement: string | null
    status: $Enums.RequestStatus | null
    isConfirm: boolean | null
    rejectionReason: string | null
    photo: string | null
    createdAt: Date | null
  }

  export type RequestEnseignantChercheurMaxAggregateOutputType = {
    id: string | null
    nom: string | null
    prenom: string | null
    email: string | null
    fonction: string | null
    grade: $Enums.Grade | null
    etablissement: string | null
    status: $Enums.RequestStatus | null
    isConfirm: boolean | null
    rejectionReason: string | null
    photo: string | null
    createdAt: Date | null
  }

  export type RequestEnseignantChercheurCountAggregateOutputType = {
    id: number
    nom: number
    prenom: number
    email: number
    fonction: number
    grade: number
    etablissement: number
    status: number
    isConfirm: number
    rejectionReason: number
    photo: number
    createdAt: number
    _all: number
  }


  export type RequestEnseignantChercheurMinAggregateInputType = {
    id?: true
    nom?: true
    prenom?: true
    email?: true
    fonction?: true
    grade?: true
    etablissement?: true
    status?: true
    isConfirm?: true
    rejectionReason?: true
    photo?: true
    createdAt?: true
  }

  export type RequestEnseignantChercheurMaxAggregateInputType = {
    id?: true
    nom?: true
    prenom?: true
    email?: true
    fonction?: true
    grade?: true
    etablissement?: true
    status?: true
    isConfirm?: true
    rejectionReason?: true
    photo?: true
    createdAt?: true
  }

  export type RequestEnseignantChercheurCountAggregateInputType = {
    id?: true
    nom?: true
    prenom?: true
    email?: true
    fonction?: true
    grade?: true
    etablissement?: true
    status?: true
    isConfirm?: true
    rejectionReason?: true
    photo?: true
    createdAt?: true
    _all?: true
  }

  export type RequestEnseignantChercheurAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RequestEnseignantChercheur to aggregate.
     */
    where?: RequestEnseignantChercheurWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RequestEnseignantChercheurs to fetch.
     */
    orderBy?: RequestEnseignantChercheurOrderByWithRelationInput | RequestEnseignantChercheurOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RequestEnseignantChercheurWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RequestEnseignantChercheurs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RequestEnseignantChercheurs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RequestEnseignantChercheurs
    **/
    _count?: true | RequestEnseignantChercheurCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RequestEnseignantChercheurMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RequestEnseignantChercheurMaxAggregateInputType
  }

  export type GetRequestEnseignantChercheurAggregateType<T extends RequestEnseignantChercheurAggregateArgs> = {
        [P in keyof T & keyof AggregateRequestEnseignantChercheur]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRequestEnseignantChercheur[P]>
      : GetScalarType<T[P], AggregateRequestEnseignantChercheur[P]>
  }




  export type RequestEnseignantChercheurGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RequestEnseignantChercheurWhereInput
    orderBy?: RequestEnseignantChercheurOrderByWithAggregationInput | RequestEnseignantChercheurOrderByWithAggregationInput[]
    by: RequestEnseignantChercheurScalarFieldEnum[] | RequestEnseignantChercheurScalarFieldEnum
    having?: RequestEnseignantChercheurScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RequestEnseignantChercheurCountAggregateInputType | true
    _min?: RequestEnseignantChercheurMinAggregateInputType
    _max?: RequestEnseignantChercheurMaxAggregateInputType
  }

  export type RequestEnseignantChercheurGroupByOutputType = {
    id: string
    nom: string
    prenom: string
    email: string
    fonction: string
    grade: $Enums.Grade
    etablissement: string
    status: $Enums.RequestStatus
    isConfirm: boolean
    rejectionReason: string | null
    photo: string | null
    createdAt: Date
    _count: RequestEnseignantChercheurCountAggregateOutputType | null
    _min: RequestEnseignantChercheurMinAggregateOutputType | null
    _max: RequestEnseignantChercheurMaxAggregateOutputType | null
  }

  type GetRequestEnseignantChercheurGroupByPayload<T extends RequestEnseignantChercheurGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RequestEnseignantChercheurGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RequestEnseignantChercheurGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RequestEnseignantChercheurGroupByOutputType[P]>
            : GetScalarType<T[P], RequestEnseignantChercheurGroupByOutputType[P]>
        }
      >
    >


  export type RequestEnseignantChercheurSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nom?: boolean
    prenom?: boolean
    email?: boolean
    fonction?: boolean
    grade?: boolean
    etablissement?: boolean
    status?: boolean
    isConfirm?: boolean
    rejectionReason?: boolean
    photo?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["requestEnseignantChercheur"]>

  export type RequestEnseignantChercheurSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nom?: boolean
    prenom?: boolean
    email?: boolean
    fonction?: boolean
    grade?: boolean
    etablissement?: boolean
    status?: boolean
    isConfirm?: boolean
    rejectionReason?: boolean
    photo?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["requestEnseignantChercheur"]>

  export type RequestEnseignantChercheurSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nom?: boolean
    prenom?: boolean
    email?: boolean
    fonction?: boolean
    grade?: boolean
    etablissement?: boolean
    status?: boolean
    isConfirm?: boolean
    rejectionReason?: boolean
    photo?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["requestEnseignantChercheur"]>

  export type RequestEnseignantChercheurSelectScalar = {
    id?: boolean
    nom?: boolean
    prenom?: boolean
    email?: boolean
    fonction?: boolean
    grade?: boolean
    etablissement?: boolean
    status?: boolean
    isConfirm?: boolean
    rejectionReason?: boolean
    photo?: boolean
    createdAt?: boolean
  }

  export type RequestEnseignantChercheurOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nom" | "prenom" | "email" | "fonction" | "grade" | "etablissement" | "status" | "isConfirm" | "rejectionReason" | "photo" | "createdAt", ExtArgs["result"]["requestEnseignantChercheur"]>

  export type $RequestEnseignantChercheurPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RequestEnseignantChercheur"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      nom: string
      prenom: string
      email: string
      fonction: string
      grade: $Enums.Grade
      etablissement: string
      status: $Enums.RequestStatus
      isConfirm: boolean
      rejectionReason: string | null
      photo: string | null
      createdAt: Date
    }, ExtArgs["result"]["requestEnseignantChercheur"]>
    composites: {}
  }

  type RequestEnseignantChercheurGetPayload<S extends boolean | null | undefined | RequestEnseignantChercheurDefaultArgs> = $Result.GetResult<Prisma.$RequestEnseignantChercheurPayload, S>

  type RequestEnseignantChercheurCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RequestEnseignantChercheurFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RequestEnseignantChercheurCountAggregateInputType | true
    }

  export interface RequestEnseignantChercheurDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RequestEnseignantChercheur'], meta: { name: 'RequestEnseignantChercheur' } }
    /**
     * Find zero or one RequestEnseignantChercheur that matches the filter.
     * @param {RequestEnseignantChercheurFindUniqueArgs} args - Arguments to find a RequestEnseignantChercheur
     * @example
     * // Get one RequestEnseignantChercheur
     * const requestEnseignantChercheur = await prisma.requestEnseignantChercheur.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RequestEnseignantChercheurFindUniqueArgs>(args: SelectSubset<T, RequestEnseignantChercheurFindUniqueArgs<ExtArgs>>): Prisma__RequestEnseignantChercheurClient<$Result.GetResult<Prisma.$RequestEnseignantChercheurPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one RequestEnseignantChercheur that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RequestEnseignantChercheurFindUniqueOrThrowArgs} args - Arguments to find a RequestEnseignantChercheur
     * @example
     * // Get one RequestEnseignantChercheur
     * const requestEnseignantChercheur = await prisma.requestEnseignantChercheur.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RequestEnseignantChercheurFindUniqueOrThrowArgs>(args: SelectSubset<T, RequestEnseignantChercheurFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RequestEnseignantChercheurClient<$Result.GetResult<Prisma.$RequestEnseignantChercheurPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RequestEnseignantChercheur that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RequestEnseignantChercheurFindFirstArgs} args - Arguments to find a RequestEnseignantChercheur
     * @example
     * // Get one RequestEnseignantChercheur
     * const requestEnseignantChercheur = await prisma.requestEnseignantChercheur.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RequestEnseignantChercheurFindFirstArgs>(args?: SelectSubset<T, RequestEnseignantChercheurFindFirstArgs<ExtArgs>>): Prisma__RequestEnseignantChercheurClient<$Result.GetResult<Prisma.$RequestEnseignantChercheurPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RequestEnseignantChercheur that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RequestEnseignantChercheurFindFirstOrThrowArgs} args - Arguments to find a RequestEnseignantChercheur
     * @example
     * // Get one RequestEnseignantChercheur
     * const requestEnseignantChercheur = await prisma.requestEnseignantChercheur.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RequestEnseignantChercheurFindFirstOrThrowArgs>(args?: SelectSubset<T, RequestEnseignantChercheurFindFirstOrThrowArgs<ExtArgs>>): Prisma__RequestEnseignantChercheurClient<$Result.GetResult<Prisma.$RequestEnseignantChercheurPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more RequestEnseignantChercheurs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RequestEnseignantChercheurFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RequestEnseignantChercheurs
     * const requestEnseignantChercheurs = await prisma.requestEnseignantChercheur.findMany()
     * 
     * // Get first 10 RequestEnseignantChercheurs
     * const requestEnseignantChercheurs = await prisma.requestEnseignantChercheur.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const requestEnseignantChercheurWithIdOnly = await prisma.requestEnseignantChercheur.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RequestEnseignantChercheurFindManyArgs>(args?: SelectSubset<T, RequestEnseignantChercheurFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RequestEnseignantChercheurPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a RequestEnseignantChercheur.
     * @param {RequestEnseignantChercheurCreateArgs} args - Arguments to create a RequestEnseignantChercheur.
     * @example
     * // Create one RequestEnseignantChercheur
     * const RequestEnseignantChercheur = await prisma.requestEnseignantChercheur.create({
     *   data: {
     *     // ... data to create a RequestEnseignantChercheur
     *   }
     * })
     * 
     */
    create<T extends RequestEnseignantChercheurCreateArgs>(args: SelectSubset<T, RequestEnseignantChercheurCreateArgs<ExtArgs>>): Prisma__RequestEnseignantChercheurClient<$Result.GetResult<Prisma.$RequestEnseignantChercheurPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many RequestEnseignantChercheurs.
     * @param {RequestEnseignantChercheurCreateManyArgs} args - Arguments to create many RequestEnseignantChercheurs.
     * @example
     * // Create many RequestEnseignantChercheurs
     * const requestEnseignantChercheur = await prisma.requestEnseignantChercheur.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RequestEnseignantChercheurCreateManyArgs>(args?: SelectSubset<T, RequestEnseignantChercheurCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RequestEnseignantChercheurs and returns the data saved in the database.
     * @param {RequestEnseignantChercheurCreateManyAndReturnArgs} args - Arguments to create many RequestEnseignantChercheurs.
     * @example
     * // Create many RequestEnseignantChercheurs
     * const requestEnseignantChercheur = await prisma.requestEnseignantChercheur.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RequestEnseignantChercheurs and only return the `id`
     * const requestEnseignantChercheurWithIdOnly = await prisma.requestEnseignantChercheur.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RequestEnseignantChercheurCreateManyAndReturnArgs>(args?: SelectSubset<T, RequestEnseignantChercheurCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RequestEnseignantChercheurPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a RequestEnseignantChercheur.
     * @param {RequestEnseignantChercheurDeleteArgs} args - Arguments to delete one RequestEnseignantChercheur.
     * @example
     * // Delete one RequestEnseignantChercheur
     * const RequestEnseignantChercheur = await prisma.requestEnseignantChercheur.delete({
     *   where: {
     *     // ... filter to delete one RequestEnseignantChercheur
     *   }
     * })
     * 
     */
    delete<T extends RequestEnseignantChercheurDeleteArgs>(args: SelectSubset<T, RequestEnseignantChercheurDeleteArgs<ExtArgs>>): Prisma__RequestEnseignantChercheurClient<$Result.GetResult<Prisma.$RequestEnseignantChercheurPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one RequestEnseignantChercheur.
     * @param {RequestEnseignantChercheurUpdateArgs} args - Arguments to update one RequestEnseignantChercheur.
     * @example
     * // Update one RequestEnseignantChercheur
     * const requestEnseignantChercheur = await prisma.requestEnseignantChercheur.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RequestEnseignantChercheurUpdateArgs>(args: SelectSubset<T, RequestEnseignantChercheurUpdateArgs<ExtArgs>>): Prisma__RequestEnseignantChercheurClient<$Result.GetResult<Prisma.$RequestEnseignantChercheurPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more RequestEnseignantChercheurs.
     * @param {RequestEnseignantChercheurDeleteManyArgs} args - Arguments to filter RequestEnseignantChercheurs to delete.
     * @example
     * // Delete a few RequestEnseignantChercheurs
     * const { count } = await prisma.requestEnseignantChercheur.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RequestEnseignantChercheurDeleteManyArgs>(args?: SelectSubset<T, RequestEnseignantChercheurDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RequestEnseignantChercheurs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RequestEnseignantChercheurUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RequestEnseignantChercheurs
     * const requestEnseignantChercheur = await prisma.requestEnseignantChercheur.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RequestEnseignantChercheurUpdateManyArgs>(args: SelectSubset<T, RequestEnseignantChercheurUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RequestEnseignantChercheurs and returns the data updated in the database.
     * @param {RequestEnseignantChercheurUpdateManyAndReturnArgs} args - Arguments to update many RequestEnseignantChercheurs.
     * @example
     * // Update many RequestEnseignantChercheurs
     * const requestEnseignantChercheur = await prisma.requestEnseignantChercheur.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more RequestEnseignantChercheurs and only return the `id`
     * const requestEnseignantChercheurWithIdOnly = await prisma.requestEnseignantChercheur.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RequestEnseignantChercheurUpdateManyAndReturnArgs>(args: SelectSubset<T, RequestEnseignantChercheurUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RequestEnseignantChercheurPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one RequestEnseignantChercheur.
     * @param {RequestEnseignantChercheurUpsertArgs} args - Arguments to update or create a RequestEnseignantChercheur.
     * @example
     * // Update or create a RequestEnseignantChercheur
     * const requestEnseignantChercheur = await prisma.requestEnseignantChercheur.upsert({
     *   create: {
     *     // ... data to create a RequestEnseignantChercheur
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RequestEnseignantChercheur we want to update
     *   }
     * })
     */
    upsert<T extends RequestEnseignantChercheurUpsertArgs>(args: SelectSubset<T, RequestEnseignantChercheurUpsertArgs<ExtArgs>>): Prisma__RequestEnseignantChercheurClient<$Result.GetResult<Prisma.$RequestEnseignantChercheurPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of RequestEnseignantChercheurs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RequestEnseignantChercheurCountArgs} args - Arguments to filter RequestEnseignantChercheurs to count.
     * @example
     * // Count the number of RequestEnseignantChercheurs
     * const count = await prisma.requestEnseignantChercheur.count({
     *   where: {
     *     // ... the filter for the RequestEnseignantChercheurs we want to count
     *   }
     * })
    **/
    count<T extends RequestEnseignantChercheurCountArgs>(
      args?: Subset<T, RequestEnseignantChercheurCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RequestEnseignantChercheurCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RequestEnseignantChercheur.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RequestEnseignantChercheurAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RequestEnseignantChercheurAggregateArgs>(args: Subset<T, RequestEnseignantChercheurAggregateArgs>): Prisma.PrismaPromise<GetRequestEnseignantChercheurAggregateType<T>>

    /**
     * Group by RequestEnseignantChercheur.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RequestEnseignantChercheurGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RequestEnseignantChercheurGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RequestEnseignantChercheurGroupByArgs['orderBy'] }
        : { orderBy?: RequestEnseignantChercheurGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RequestEnseignantChercheurGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRequestEnseignantChercheurGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RequestEnseignantChercheur model
   */
  readonly fields: RequestEnseignantChercheurFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RequestEnseignantChercheur.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RequestEnseignantChercheurClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the RequestEnseignantChercheur model
   */
  interface RequestEnseignantChercheurFieldRefs {
    readonly id: FieldRef<"RequestEnseignantChercheur", 'String'>
    readonly nom: FieldRef<"RequestEnseignantChercheur", 'String'>
    readonly prenom: FieldRef<"RequestEnseignantChercheur", 'String'>
    readonly email: FieldRef<"RequestEnseignantChercheur", 'String'>
    readonly fonction: FieldRef<"RequestEnseignantChercheur", 'String'>
    readonly grade: FieldRef<"RequestEnseignantChercheur", 'Grade'>
    readonly etablissement: FieldRef<"RequestEnseignantChercheur", 'String'>
    readonly status: FieldRef<"RequestEnseignantChercheur", 'RequestStatus'>
    readonly isConfirm: FieldRef<"RequestEnseignantChercheur", 'Boolean'>
    readonly rejectionReason: FieldRef<"RequestEnseignantChercheur", 'String'>
    readonly photo: FieldRef<"RequestEnseignantChercheur", 'String'>
    readonly createdAt: FieldRef<"RequestEnseignantChercheur", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * RequestEnseignantChercheur findUnique
   */
  export type RequestEnseignantChercheurFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RequestEnseignantChercheur
     */
    select?: RequestEnseignantChercheurSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RequestEnseignantChercheur
     */
    omit?: RequestEnseignantChercheurOmit<ExtArgs> | null
    /**
     * Filter, which RequestEnseignantChercheur to fetch.
     */
    where: RequestEnseignantChercheurWhereUniqueInput
  }

  /**
   * RequestEnseignantChercheur findUniqueOrThrow
   */
  export type RequestEnseignantChercheurFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RequestEnseignantChercheur
     */
    select?: RequestEnseignantChercheurSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RequestEnseignantChercheur
     */
    omit?: RequestEnseignantChercheurOmit<ExtArgs> | null
    /**
     * Filter, which RequestEnseignantChercheur to fetch.
     */
    where: RequestEnseignantChercheurWhereUniqueInput
  }

  /**
   * RequestEnseignantChercheur findFirst
   */
  export type RequestEnseignantChercheurFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RequestEnseignantChercheur
     */
    select?: RequestEnseignantChercheurSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RequestEnseignantChercheur
     */
    omit?: RequestEnseignantChercheurOmit<ExtArgs> | null
    /**
     * Filter, which RequestEnseignantChercheur to fetch.
     */
    where?: RequestEnseignantChercheurWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RequestEnseignantChercheurs to fetch.
     */
    orderBy?: RequestEnseignantChercheurOrderByWithRelationInput | RequestEnseignantChercheurOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RequestEnseignantChercheurs.
     */
    cursor?: RequestEnseignantChercheurWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RequestEnseignantChercheurs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RequestEnseignantChercheurs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RequestEnseignantChercheurs.
     */
    distinct?: RequestEnseignantChercheurScalarFieldEnum | RequestEnseignantChercheurScalarFieldEnum[]
  }

  /**
   * RequestEnseignantChercheur findFirstOrThrow
   */
  export type RequestEnseignantChercheurFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RequestEnseignantChercheur
     */
    select?: RequestEnseignantChercheurSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RequestEnseignantChercheur
     */
    omit?: RequestEnseignantChercheurOmit<ExtArgs> | null
    /**
     * Filter, which RequestEnseignantChercheur to fetch.
     */
    where?: RequestEnseignantChercheurWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RequestEnseignantChercheurs to fetch.
     */
    orderBy?: RequestEnseignantChercheurOrderByWithRelationInput | RequestEnseignantChercheurOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RequestEnseignantChercheurs.
     */
    cursor?: RequestEnseignantChercheurWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RequestEnseignantChercheurs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RequestEnseignantChercheurs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RequestEnseignantChercheurs.
     */
    distinct?: RequestEnseignantChercheurScalarFieldEnum | RequestEnseignantChercheurScalarFieldEnum[]
  }

  /**
   * RequestEnseignantChercheur findMany
   */
  export type RequestEnseignantChercheurFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RequestEnseignantChercheur
     */
    select?: RequestEnseignantChercheurSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RequestEnseignantChercheur
     */
    omit?: RequestEnseignantChercheurOmit<ExtArgs> | null
    /**
     * Filter, which RequestEnseignantChercheurs to fetch.
     */
    where?: RequestEnseignantChercheurWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RequestEnseignantChercheurs to fetch.
     */
    orderBy?: RequestEnseignantChercheurOrderByWithRelationInput | RequestEnseignantChercheurOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RequestEnseignantChercheurs.
     */
    cursor?: RequestEnseignantChercheurWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RequestEnseignantChercheurs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RequestEnseignantChercheurs.
     */
    skip?: number
    distinct?: RequestEnseignantChercheurScalarFieldEnum | RequestEnseignantChercheurScalarFieldEnum[]
  }

  /**
   * RequestEnseignantChercheur create
   */
  export type RequestEnseignantChercheurCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RequestEnseignantChercheur
     */
    select?: RequestEnseignantChercheurSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RequestEnseignantChercheur
     */
    omit?: RequestEnseignantChercheurOmit<ExtArgs> | null
    /**
     * The data needed to create a RequestEnseignantChercheur.
     */
    data: XOR<RequestEnseignantChercheurCreateInput, RequestEnseignantChercheurUncheckedCreateInput>
  }

  /**
   * RequestEnseignantChercheur createMany
   */
  export type RequestEnseignantChercheurCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RequestEnseignantChercheurs.
     */
    data: RequestEnseignantChercheurCreateManyInput | RequestEnseignantChercheurCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RequestEnseignantChercheur createManyAndReturn
   */
  export type RequestEnseignantChercheurCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RequestEnseignantChercheur
     */
    select?: RequestEnseignantChercheurSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RequestEnseignantChercheur
     */
    omit?: RequestEnseignantChercheurOmit<ExtArgs> | null
    /**
     * The data used to create many RequestEnseignantChercheurs.
     */
    data: RequestEnseignantChercheurCreateManyInput | RequestEnseignantChercheurCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RequestEnseignantChercheur update
   */
  export type RequestEnseignantChercheurUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RequestEnseignantChercheur
     */
    select?: RequestEnseignantChercheurSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RequestEnseignantChercheur
     */
    omit?: RequestEnseignantChercheurOmit<ExtArgs> | null
    /**
     * The data needed to update a RequestEnseignantChercheur.
     */
    data: XOR<RequestEnseignantChercheurUpdateInput, RequestEnseignantChercheurUncheckedUpdateInput>
    /**
     * Choose, which RequestEnseignantChercheur to update.
     */
    where: RequestEnseignantChercheurWhereUniqueInput
  }

  /**
   * RequestEnseignantChercheur updateMany
   */
  export type RequestEnseignantChercheurUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RequestEnseignantChercheurs.
     */
    data: XOR<RequestEnseignantChercheurUpdateManyMutationInput, RequestEnseignantChercheurUncheckedUpdateManyInput>
    /**
     * Filter which RequestEnseignantChercheurs to update
     */
    where?: RequestEnseignantChercheurWhereInput
    /**
     * Limit how many RequestEnseignantChercheurs to update.
     */
    limit?: number
  }

  /**
   * RequestEnseignantChercheur updateManyAndReturn
   */
  export type RequestEnseignantChercheurUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RequestEnseignantChercheur
     */
    select?: RequestEnseignantChercheurSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RequestEnseignantChercheur
     */
    omit?: RequestEnseignantChercheurOmit<ExtArgs> | null
    /**
     * The data used to update RequestEnseignantChercheurs.
     */
    data: XOR<RequestEnseignantChercheurUpdateManyMutationInput, RequestEnseignantChercheurUncheckedUpdateManyInput>
    /**
     * Filter which RequestEnseignantChercheurs to update
     */
    where?: RequestEnseignantChercheurWhereInput
    /**
     * Limit how many RequestEnseignantChercheurs to update.
     */
    limit?: number
  }

  /**
   * RequestEnseignantChercheur upsert
   */
  export type RequestEnseignantChercheurUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RequestEnseignantChercheur
     */
    select?: RequestEnseignantChercheurSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RequestEnseignantChercheur
     */
    omit?: RequestEnseignantChercheurOmit<ExtArgs> | null
    /**
     * The filter to search for the RequestEnseignantChercheur to update in case it exists.
     */
    where: RequestEnseignantChercheurWhereUniqueInput
    /**
     * In case the RequestEnseignantChercheur found by the `where` argument doesn't exist, create a new RequestEnseignantChercheur with this data.
     */
    create: XOR<RequestEnseignantChercheurCreateInput, RequestEnseignantChercheurUncheckedCreateInput>
    /**
     * In case the RequestEnseignantChercheur was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RequestEnseignantChercheurUpdateInput, RequestEnseignantChercheurUncheckedUpdateInput>
  }

  /**
   * RequestEnseignantChercheur delete
   */
  export type RequestEnseignantChercheurDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RequestEnseignantChercheur
     */
    select?: RequestEnseignantChercheurSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RequestEnseignantChercheur
     */
    omit?: RequestEnseignantChercheurOmit<ExtArgs> | null
    /**
     * Filter which RequestEnseignantChercheur to delete.
     */
    where: RequestEnseignantChercheurWhereUniqueInput
  }

  /**
   * RequestEnseignantChercheur deleteMany
   */
  export type RequestEnseignantChercheurDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RequestEnseignantChercheurs to delete
     */
    where?: RequestEnseignantChercheurWhereInput
    /**
     * Limit how many RequestEnseignantChercheurs to delete.
     */
    limit?: number
  }

  /**
   * RequestEnseignantChercheur without action
   */
  export type RequestEnseignantChercheurDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RequestEnseignantChercheur
     */
    select?: RequestEnseignantChercheurSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RequestEnseignantChercheur
     */
    omit?: RequestEnseignantChercheurOmit<ExtArgs> | null
  }


  /**
   * Model Admin
   */

  export type AggregateAdmin = {
    _count: AdminCountAggregateOutputType | null
    _avg: AdminAvgAggregateOutputType | null
    _sum: AdminSumAggregateOutputType | null
    _min: AdminMinAggregateOutputType | null
    _max: AdminMaxAggregateOutputType | null
  }

  export type AdminAvgAggregateOutputType = {
    id: number | null
  }

  export type AdminSumAggregateOutputType = {
    id: number | null
  }

  export type AdminMinAggregateOutputType = {
    id: number | null
    nom: string | null
    prenom: string | null
    userId: string | null
  }

  export type AdminMaxAggregateOutputType = {
    id: number | null
    nom: string | null
    prenom: string | null
    userId: string | null
  }

  export type AdminCountAggregateOutputType = {
    id: number
    nom: number
    prenom: number
    userId: number
    _all: number
  }


  export type AdminAvgAggregateInputType = {
    id?: true
  }

  export type AdminSumAggregateInputType = {
    id?: true
  }

  export type AdminMinAggregateInputType = {
    id?: true
    nom?: true
    prenom?: true
    userId?: true
  }

  export type AdminMaxAggregateInputType = {
    id?: true
    nom?: true
    prenom?: true
    userId?: true
  }

  export type AdminCountAggregateInputType = {
    id?: true
    nom?: true
    prenom?: true
    userId?: true
    _all?: true
  }

  export type AdminAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Admin to aggregate.
     */
    where?: AdminWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Admins to fetch.
     */
    orderBy?: AdminOrderByWithRelationInput | AdminOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AdminWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Admins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Admins.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Admins
    **/
    _count?: true | AdminCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AdminAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AdminSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AdminMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AdminMaxAggregateInputType
  }

  export type GetAdminAggregateType<T extends AdminAggregateArgs> = {
        [P in keyof T & keyof AggregateAdmin]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAdmin[P]>
      : GetScalarType<T[P], AggregateAdmin[P]>
  }




  export type AdminGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AdminWhereInput
    orderBy?: AdminOrderByWithAggregationInput | AdminOrderByWithAggregationInput[]
    by: AdminScalarFieldEnum[] | AdminScalarFieldEnum
    having?: AdminScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AdminCountAggregateInputType | true
    _avg?: AdminAvgAggregateInputType
    _sum?: AdminSumAggregateInputType
    _min?: AdminMinAggregateInputType
    _max?: AdminMaxAggregateInputType
  }

  export type AdminGroupByOutputType = {
    id: number
    nom: string
    prenom: string
    userId: string
    _count: AdminCountAggregateOutputType | null
    _avg: AdminAvgAggregateOutputType | null
    _sum: AdminSumAggregateOutputType | null
    _min: AdminMinAggregateOutputType | null
    _max: AdminMaxAggregateOutputType | null
  }

  type GetAdminGroupByPayload<T extends AdminGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AdminGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AdminGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AdminGroupByOutputType[P]>
            : GetScalarType<T[P], AdminGroupByOutputType[P]>
        }
      >
    >


  export type AdminSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nom?: boolean
    prenom?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["admin"]>

  export type AdminSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nom?: boolean
    prenom?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["admin"]>

  export type AdminSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nom?: boolean
    prenom?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["admin"]>

  export type AdminSelectScalar = {
    id?: boolean
    nom?: boolean
    prenom?: boolean
    userId?: boolean
  }

  export type AdminOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nom" | "prenom" | "userId", ExtArgs["result"]["admin"]>
  export type AdminInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AdminIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AdminIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $AdminPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Admin"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      nom: string
      prenom: string
      userId: string
    }, ExtArgs["result"]["admin"]>
    composites: {}
  }

  type AdminGetPayload<S extends boolean | null | undefined | AdminDefaultArgs> = $Result.GetResult<Prisma.$AdminPayload, S>

  type AdminCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AdminFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AdminCountAggregateInputType | true
    }

  export interface AdminDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Admin'], meta: { name: 'Admin' } }
    /**
     * Find zero or one Admin that matches the filter.
     * @param {AdminFindUniqueArgs} args - Arguments to find a Admin
     * @example
     * // Get one Admin
     * const admin = await prisma.admin.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AdminFindUniqueArgs>(args: SelectSubset<T, AdminFindUniqueArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Admin that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AdminFindUniqueOrThrowArgs} args - Arguments to find a Admin
     * @example
     * // Get one Admin
     * const admin = await prisma.admin.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AdminFindUniqueOrThrowArgs>(args: SelectSubset<T, AdminFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Admin that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminFindFirstArgs} args - Arguments to find a Admin
     * @example
     * // Get one Admin
     * const admin = await prisma.admin.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AdminFindFirstArgs>(args?: SelectSubset<T, AdminFindFirstArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Admin that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminFindFirstOrThrowArgs} args - Arguments to find a Admin
     * @example
     * // Get one Admin
     * const admin = await prisma.admin.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AdminFindFirstOrThrowArgs>(args?: SelectSubset<T, AdminFindFirstOrThrowArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Admins that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Admins
     * const admins = await prisma.admin.findMany()
     * 
     * // Get first 10 Admins
     * const admins = await prisma.admin.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const adminWithIdOnly = await prisma.admin.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AdminFindManyArgs>(args?: SelectSubset<T, AdminFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Admin.
     * @param {AdminCreateArgs} args - Arguments to create a Admin.
     * @example
     * // Create one Admin
     * const Admin = await prisma.admin.create({
     *   data: {
     *     // ... data to create a Admin
     *   }
     * })
     * 
     */
    create<T extends AdminCreateArgs>(args: SelectSubset<T, AdminCreateArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Admins.
     * @param {AdminCreateManyArgs} args - Arguments to create many Admins.
     * @example
     * // Create many Admins
     * const admin = await prisma.admin.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AdminCreateManyArgs>(args?: SelectSubset<T, AdminCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Admins and returns the data saved in the database.
     * @param {AdminCreateManyAndReturnArgs} args - Arguments to create many Admins.
     * @example
     * // Create many Admins
     * const admin = await prisma.admin.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Admins and only return the `id`
     * const adminWithIdOnly = await prisma.admin.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AdminCreateManyAndReturnArgs>(args?: SelectSubset<T, AdminCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Admin.
     * @param {AdminDeleteArgs} args - Arguments to delete one Admin.
     * @example
     * // Delete one Admin
     * const Admin = await prisma.admin.delete({
     *   where: {
     *     // ... filter to delete one Admin
     *   }
     * })
     * 
     */
    delete<T extends AdminDeleteArgs>(args: SelectSubset<T, AdminDeleteArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Admin.
     * @param {AdminUpdateArgs} args - Arguments to update one Admin.
     * @example
     * // Update one Admin
     * const admin = await prisma.admin.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AdminUpdateArgs>(args: SelectSubset<T, AdminUpdateArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Admins.
     * @param {AdminDeleteManyArgs} args - Arguments to filter Admins to delete.
     * @example
     * // Delete a few Admins
     * const { count } = await prisma.admin.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AdminDeleteManyArgs>(args?: SelectSubset<T, AdminDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Admins.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Admins
     * const admin = await prisma.admin.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AdminUpdateManyArgs>(args: SelectSubset<T, AdminUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Admins and returns the data updated in the database.
     * @param {AdminUpdateManyAndReturnArgs} args - Arguments to update many Admins.
     * @example
     * // Update many Admins
     * const admin = await prisma.admin.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Admins and only return the `id`
     * const adminWithIdOnly = await prisma.admin.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AdminUpdateManyAndReturnArgs>(args: SelectSubset<T, AdminUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Admin.
     * @param {AdminUpsertArgs} args - Arguments to update or create a Admin.
     * @example
     * // Update or create a Admin
     * const admin = await prisma.admin.upsert({
     *   create: {
     *     // ... data to create a Admin
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Admin we want to update
     *   }
     * })
     */
    upsert<T extends AdminUpsertArgs>(args: SelectSubset<T, AdminUpsertArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Admins.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminCountArgs} args - Arguments to filter Admins to count.
     * @example
     * // Count the number of Admins
     * const count = await prisma.admin.count({
     *   where: {
     *     // ... the filter for the Admins we want to count
     *   }
     * })
    **/
    count<T extends AdminCountArgs>(
      args?: Subset<T, AdminCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AdminCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Admin.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AdminAggregateArgs>(args: Subset<T, AdminAggregateArgs>): Prisma.PrismaPromise<GetAdminAggregateType<T>>

    /**
     * Group by Admin.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AdminGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AdminGroupByArgs['orderBy'] }
        : { orderBy?: AdminGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AdminGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAdminGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Admin model
   */
  readonly fields: AdminFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Admin.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AdminClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Admin model
   */
  interface AdminFieldRefs {
    readonly id: FieldRef<"Admin", 'Int'>
    readonly nom: FieldRef<"Admin", 'String'>
    readonly prenom: FieldRef<"Admin", 'String'>
    readonly userId: FieldRef<"Admin", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Admin findUnique
   */
  export type AdminFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminInclude<ExtArgs> | null
    /**
     * Filter, which Admin to fetch.
     */
    where: AdminWhereUniqueInput
  }

  /**
   * Admin findUniqueOrThrow
   */
  export type AdminFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminInclude<ExtArgs> | null
    /**
     * Filter, which Admin to fetch.
     */
    where: AdminWhereUniqueInput
  }

  /**
   * Admin findFirst
   */
  export type AdminFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminInclude<ExtArgs> | null
    /**
     * Filter, which Admin to fetch.
     */
    where?: AdminWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Admins to fetch.
     */
    orderBy?: AdminOrderByWithRelationInput | AdminOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Admins.
     */
    cursor?: AdminWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Admins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Admins.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Admins.
     */
    distinct?: AdminScalarFieldEnum | AdminScalarFieldEnum[]
  }

  /**
   * Admin findFirstOrThrow
   */
  export type AdminFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminInclude<ExtArgs> | null
    /**
     * Filter, which Admin to fetch.
     */
    where?: AdminWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Admins to fetch.
     */
    orderBy?: AdminOrderByWithRelationInput | AdminOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Admins.
     */
    cursor?: AdminWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Admins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Admins.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Admins.
     */
    distinct?: AdminScalarFieldEnum | AdminScalarFieldEnum[]
  }

  /**
   * Admin findMany
   */
  export type AdminFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminInclude<ExtArgs> | null
    /**
     * Filter, which Admins to fetch.
     */
    where?: AdminWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Admins to fetch.
     */
    orderBy?: AdminOrderByWithRelationInput | AdminOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Admins.
     */
    cursor?: AdminWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Admins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Admins.
     */
    skip?: number
    distinct?: AdminScalarFieldEnum | AdminScalarFieldEnum[]
  }

  /**
   * Admin create
   */
  export type AdminCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminInclude<ExtArgs> | null
    /**
     * The data needed to create a Admin.
     */
    data: XOR<AdminCreateInput, AdminUncheckedCreateInput>
  }

  /**
   * Admin createMany
   */
  export type AdminCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Admins.
     */
    data: AdminCreateManyInput | AdminCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Admin createManyAndReturn
   */
  export type AdminCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * The data used to create many Admins.
     */
    data: AdminCreateManyInput | AdminCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Admin update
   */
  export type AdminUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminInclude<ExtArgs> | null
    /**
     * The data needed to update a Admin.
     */
    data: XOR<AdminUpdateInput, AdminUncheckedUpdateInput>
    /**
     * Choose, which Admin to update.
     */
    where: AdminWhereUniqueInput
  }

  /**
   * Admin updateMany
   */
  export type AdminUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Admins.
     */
    data: XOR<AdminUpdateManyMutationInput, AdminUncheckedUpdateManyInput>
    /**
     * Filter which Admins to update
     */
    where?: AdminWhereInput
    /**
     * Limit how many Admins to update.
     */
    limit?: number
  }

  /**
   * Admin updateManyAndReturn
   */
  export type AdminUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * The data used to update Admins.
     */
    data: XOR<AdminUpdateManyMutationInput, AdminUncheckedUpdateManyInput>
    /**
     * Filter which Admins to update
     */
    where?: AdminWhereInput
    /**
     * Limit how many Admins to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Admin upsert
   */
  export type AdminUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminInclude<ExtArgs> | null
    /**
     * The filter to search for the Admin to update in case it exists.
     */
    where: AdminWhereUniqueInput
    /**
     * In case the Admin found by the `where` argument doesn't exist, create a new Admin with this data.
     */
    create: XOR<AdminCreateInput, AdminUncheckedCreateInput>
    /**
     * In case the Admin was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AdminUpdateInput, AdminUncheckedUpdateInput>
  }

  /**
   * Admin delete
   */
  export type AdminDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminInclude<ExtArgs> | null
    /**
     * Filter which Admin to delete.
     */
    where: AdminWhereUniqueInput
  }

  /**
   * Admin deleteMany
   */
  export type AdminDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Admins to delete
     */
    where?: AdminWhereInput
    /**
     * Limit how many Admins to delete.
     */
    limit?: number
  }

  /**
   * Admin without action
   */
  export type AdminDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminInclude<ExtArgs> | null
  }


  /**
   * Model Session
   */

  export type AggregateSession = {
    _count: SessionCountAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  export type SessionMinAggregateOutputType = {
    id: string | null
    accessToken: string | null
    refreshToken: string | null
    machine: string | null
    createdAt: Date | null
    userId: string | null
  }

  export type SessionMaxAggregateOutputType = {
    id: string | null
    accessToken: string | null
    refreshToken: string | null
    machine: string | null
    createdAt: Date | null
    userId: string | null
  }

  export type SessionCountAggregateOutputType = {
    id: number
    accessToken: number
    refreshToken: number
    machine: number
    createdAt: number
    userId: number
    _all: number
  }


  export type SessionMinAggregateInputType = {
    id?: true
    accessToken?: true
    refreshToken?: true
    machine?: true
    createdAt?: true
    userId?: true
  }

  export type SessionMaxAggregateInputType = {
    id?: true
    accessToken?: true
    refreshToken?: true
    machine?: true
    createdAt?: true
    userId?: true
  }

  export type SessionCountAggregateInputType = {
    id?: true
    accessToken?: true
    refreshToken?: true
    machine?: true
    createdAt?: true
    userId?: true
    _all?: true
  }

  export type SessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Session to aggregate.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Sessions
    **/
    _count?: true | SessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SessionMaxAggregateInputType
  }

  export type GetSessionAggregateType<T extends SessionAggregateArgs> = {
        [P in keyof T & keyof AggregateSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSession[P]>
      : GetScalarType<T[P], AggregateSession[P]>
  }




  export type SessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithAggregationInput | SessionOrderByWithAggregationInput[]
    by: SessionScalarFieldEnum[] | SessionScalarFieldEnum
    having?: SessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SessionCountAggregateInputType | true
    _min?: SessionMinAggregateInputType
    _max?: SessionMaxAggregateInputType
  }

  export type SessionGroupByOutputType = {
    id: string
    accessToken: string
    refreshToken: string
    machine: string
    createdAt: Date
    userId: string
    _count: SessionCountAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  type GetSessionGroupByPayload<T extends SessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SessionGroupByOutputType[P]>
            : GetScalarType<T[P], SessionGroupByOutputType[P]>
        }
      >
    >


  export type SessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    accessToken?: boolean
    refreshToken?: boolean
    machine?: boolean
    createdAt?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    accessToken?: boolean
    refreshToken?: boolean
    machine?: boolean
    createdAt?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    accessToken?: boolean
    refreshToken?: boolean
    machine?: boolean
    createdAt?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectScalar = {
    id?: boolean
    accessToken?: boolean
    refreshToken?: boolean
    machine?: boolean
    createdAt?: boolean
    userId?: boolean
  }

  export type SessionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "accessToken" | "refreshToken" | "machine" | "createdAt" | "userId", ExtArgs["result"]["session"]>
  export type SessionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type SessionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type SessionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $SessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Session"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      accessToken: string
      refreshToken: string
      machine: string
      createdAt: Date
      userId: string
    }, ExtArgs["result"]["session"]>
    composites: {}
  }

  type SessionGetPayload<S extends boolean | null | undefined | SessionDefaultArgs> = $Result.GetResult<Prisma.$SessionPayload, S>

  type SessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SessionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SessionCountAggregateInputType | true
    }

  export interface SessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Session'], meta: { name: 'Session' } }
    /**
     * Find zero or one Session that matches the filter.
     * @param {SessionFindUniqueArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SessionFindUniqueArgs>(args: SelectSubset<T, SessionFindUniqueArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Session that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SessionFindUniqueOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SessionFindUniqueOrThrowArgs>(args: SelectSubset<T, SessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Session that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SessionFindFirstArgs>(args?: SelectSubset<T, SessionFindFirstArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Session that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SessionFindFirstOrThrowArgs>(args?: SelectSubset<T, SessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Sessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Sessions
     * const sessions = await prisma.session.findMany()
     * 
     * // Get first 10 Sessions
     * const sessions = await prisma.session.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sessionWithIdOnly = await prisma.session.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SessionFindManyArgs>(args?: SelectSubset<T, SessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Session.
     * @param {SessionCreateArgs} args - Arguments to create a Session.
     * @example
     * // Create one Session
     * const Session = await prisma.session.create({
     *   data: {
     *     // ... data to create a Session
     *   }
     * })
     * 
     */
    create<T extends SessionCreateArgs>(args: SelectSubset<T, SessionCreateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Sessions.
     * @param {SessionCreateManyArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SessionCreateManyArgs>(args?: SelectSubset<T, SessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Sessions and returns the data saved in the database.
     * @param {SessionCreateManyAndReturnArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Sessions and only return the `id`
     * const sessionWithIdOnly = await prisma.session.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SessionCreateManyAndReturnArgs>(args?: SelectSubset<T, SessionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Session.
     * @param {SessionDeleteArgs} args - Arguments to delete one Session.
     * @example
     * // Delete one Session
     * const Session = await prisma.session.delete({
     *   where: {
     *     // ... filter to delete one Session
     *   }
     * })
     * 
     */
    delete<T extends SessionDeleteArgs>(args: SelectSubset<T, SessionDeleteArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Session.
     * @param {SessionUpdateArgs} args - Arguments to update one Session.
     * @example
     * // Update one Session
     * const session = await prisma.session.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SessionUpdateArgs>(args: SelectSubset<T, SessionUpdateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Sessions.
     * @param {SessionDeleteManyArgs} args - Arguments to filter Sessions to delete.
     * @example
     * // Delete a few Sessions
     * const { count } = await prisma.session.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SessionDeleteManyArgs>(args?: SelectSubset<T, SessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SessionUpdateManyArgs>(args: SelectSubset<T, SessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions and returns the data updated in the database.
     * @param {SessionUpdateManyAndReturnArgs} args - Arguments to update many Sessions.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Sessions and only return the `id`
     * const sessionWithIdOnly = await prisma.session.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SessionUpdateManyAndReturnArgs>(args: SelectSubset<T, SessionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Session.
     * @param {SessionUpsertArgs} args - Arguments to update or create a Session.
     * @example
     * // Update or create a Session
     * const session = await prisma.session.upsert({
     *   create: {
     *     // ... data to create a Session
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Session we want to update
     *   }
     * })
     */
    upsert<T extends SessionUpsertArgs>(args: SelectSubset<T, SessionUpsertArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionCountArgs} args - Arguments to filter Sessions to count.
     * @example
     * // Count the number of Sessions
     * const count = await prisma.session.count({
     *   where: {
     *     // ... the filter for the Sessions we want to count
     *   }
     * })
    **/
    count<T extends SessionCountArgs>(
      args?: Subset<T, SessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SessionAggregateArgs>(args: Subset<T, SessionAggregateArgs>): Prisma.PrismaPromise<GetSessionAggregateType<T>>

    /**
     * Group by Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SessionGroupByArgs['orderBy'] }
        : { orderBy?: SessionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Session model
   */
  readonly fields: SessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Session.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Session model
   */
  interface SessionFieldRefs {
    readonly id: FieldRef<"Session", 'String'>
    readonly accessToken: FieldRef<"Session", 'String'>
    readonly refreshToken: FieldRef<"Session", 'String'>
    readonly machine: FieldRef<"Session", 'String'>
    readonly createdAt: FieldRef<"Session", 'DateTime'>
    readonly userId: FieldRef<"Session", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Session findUnique
   */
  export type SessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findUniqueOrThrow
   */
  export type SessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findFirst
   */
  export type SessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findFirstOrThrow
   */
  export type SessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findMany
   */
  export type SessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Sessions to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session create
   */
  export type SessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to create a Session.
     */
    data: XOR<SessionCreateInput, SessionUncheckedCreateInput>
  }

  /**
   * Session createMany
   */
  export type SessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Session createManyAndReturn
   */
  export type SessionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Session update
   */
  export type SessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to update a Session.
     */
    data: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
    /**
     * Choose, which Session to update.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session updateMany
   */
  export type SessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to update.
     */
    limit?: number
  }

  /**
   * Session updateManyAndReturn
   */
  export type SessionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Session upsert
   */
  export type SessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The filter to search for the Session to update in case it exists.
     */
    where: SessionWhereUniqueInput
    /**
     * In case the Session found by the `where` argument doesn't exist, create a new Session with this data.
     */
    create: XOR<SessionCreateInput, SessionUncheckedCreateInput>
    /**
     * In case the Session was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
  }

  /**
   * Session delete
   */
  export type SessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter which Session to delete.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session deleteMany
   */
  export type SessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Sessions to delete
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to delete.
     */
    limit?: number
  }

  /**
   * Session without action
   */
  export type SessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
  }


  /**
   * Model Notification
   */

  export type AggregateNotification = {
    _count: NotificationCountAggregateOutputType | null
    _avg: NotificationAvgAggregateOutputType | null
    _sum: NotificationSumAggregateOutputType | null
    _min: NotificationMinAggregateOutputType | null
    _max: NotificationMaxAggregateOutputType | null
  }

  export type NotificationAvgAggregateOutputType = {
    id: number | null
  }

  export type NotificationSumAggregateOutputType = {
    id: number | null
  }

  export type NotificationMinAggregateOutputType = {
    id: number | null
    message: string | null
    recipient: string | null
    status: $Enums.NotificationStatus | null
    createdAt: Date | null
    userId: string | null
  }

  export type NotificationMaxAggregateOutputType = {
    id: number | null
    message: string | null
    recipient: string | null
    status: $Enums.NotificationStatus | null
    createdAt: Date | null
    userId: string | null
  }

  export type NotificationCountAggregateOutputType = {
    id: number
    message: number
    recipient: number
    status: number
    createdAt: number
    userId: number
    _all: number
  }


  export type NotificationAvgAggregateInputType = {
    id?: true
  }

  export type NotificationSumAggregateInputType = {
    id?: true
  }

  export type NotificationMinAggregateInputType = {
    id?: true
    message?: true
    recipient?: true
    status?: true
    createdAt?: true
    userId?: true
  }

  export type NotificationMaxAggregateInputType = {
    id?: true
    message?: true
    recipient?: true
    status?: true
    createdAt?: true
    userId?: true
  }

  export type NotificationCountAggregateInputType = {
    id?: true
    message?: true
    recipient?: true
    status?: true
    createdAt?: true
    userId?: true
    _all?: true
  }

  export type NotificationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Notification to aggregate.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Notifications
    **/
    _count?: true | NotificationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: NotificationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: NotificationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: NotificationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: NotificationMaxAggregateInputType
  }

  export type GetNotificationAggregateType<T extends NotificationAggregateArgs> = {
        [P in keyof T & keyof AggregateNotification]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateNotification[P]>
      : GetScalarType<T[P], AggregateNotification[P]>
  }




  export type NotificationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NotificationWhereInput
    orderBy?: NotificationOrderByWithAggregationInput | NotificationOrderByWithAggregationInput[]
    by: NotificationScalarFieldEnum[] | NotificationScalarFieldEnum
    having?: NotificationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: NotificationCountAggregateInputType | true
    _avg?: NotificationAvgAggregateInputType
    _sum?: NotificationSumAggregateInputType
    _min?: NotificationMinAggregateInputType
    _max?: NotificationMaxAggregateInputType
  }

  export type NotificationGroupByOutputType = {
    id: number
    message: string
    recipient: string
    status: $Enums.NotificationStatus
    createdAt: Date
    userId: string
    _count: NotificationCountAggregateOutputType | null
    _avg: NotificationAvgAggregateOutputType | null
    _sum: NotificationSumAggregateOutputType | null
    _min: NotificationMinAggregateOutputType | null
    _max: NotificationMaxAggregateOutputType | null
  }

  type GetNotificationGroupByPayload<T extends NotificationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<NotificationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof NotificationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], NotificationGroupByOutputType[P]>
            : GetScalarType<T[P], NotificationGroupByOutputType[P]>
        }
      >
    >


  export type NotificationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    message?: boolean
    recipient?: boolean
    status?: boolean
    createdAt?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["notification"]>

  export type NotificationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    message?: boolean
    recipient?: boolean
    status?: boolean
    createdAt?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["notification"]>

  export type NotificationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    message?: boolean
    recipient?: boolean
    status?: boolean
    createdAt?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["notification"]>

  export type NotificationSelectScalar = {
    id?: boolean
    message?: boolean
    recipient?: boolean
    status?: boolean
    createdAt?: boolean
    userId?: boolean
  }

  export type NotificationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "message" | "recipient" | "status" | "createdAt" | "userId", ExtArgs["result"]["notification"]>
  export type NotificationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type NotificationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type NotificationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $NotificationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Notification"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      message: string
      recipient: string
      status: $Enums.NotificationStatus
      createdAt: Date
      userId: string
    }, ExtArgs["result"]["notification"]>
    composites: {}
  }

  type NotificationGetPayload<S extends boolean | null | undefined | NotificationDefaultArgs> = $Result.GetResult<Prisma.$NotificationPayload, S>

  type NotificationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<NotificationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: NotificationCountAggregateInputType | true
    }

  export interface NotificationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Notification'], meta: { name: 'Notification' } }
    /**
     * Find zero or one Notification that matches the filter.
     * @param {NotificationFindUniqueArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends NotificationFindUniqueArgs>(args: SelectSubset<T, NotificationFindUniqueArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Notification that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {NotificationFindUniqueOrThrowArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends NotificationFindUniqueOrThrowArgs>(args: SelectSubset<T, NotificationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Notification that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindFirstArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends NotificationFindFirstArgs>(args?: SelectSubset<T, NotificationFindFirstArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Notification that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindFirstOrThrowArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends NotificationFindFirstOrThrowArgs>(args?: SelectSubset<T, NotificationFindFirstOrThrowArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Notifications that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Notifications
     * const notifications = await prisma.notification.findMany()
     * 
     * // Get first 10 Notifications
     * const notifications = await prisma.notification.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const notificationWithIdOnly = await prisma.notification.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends NotificationFindManyArgs>(args?: SelectSubset<T, NotificationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Notification.
     * @param {NotificationCreateArgs} args - Arguments to create a Notification.
     * @example
     * // Create one Notification
     * const Notification = await prisma.notification.create({
     *   data: {
     *     // ... data to create a Notification
     *   }
     * })
     * 
     */
    create<T extends NotificationCreateArgs>(args: SelectSubset<T, NotificationCreateArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Notifications.
     * @param {NotificationCreateManyArgs} args - Arguments to create many Notifications.
     * @example
     * // Create many Notifications
     * const notification = await prisma.notification.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends NotificationCreateManyArgs>(args?: SelectSubset<T, NotificationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Notifications and returns the data saved in the database.
     * @param {NotificationCreateManyAndReturnArgs} args - Arguments to create many Notifications.
     * @example
     * // Create many Notifications
     * const notification = await prisma.notification.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Notifications and only return the `id`
     * const notificationWithIdOnly = await prisma.notification.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends NotificationCreateManyAndReturnArgs>(args?: SelectSubset<T, NotificationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Notification.
     * @param {NotificationDeleteArgs} args - Arguments to delete one Notification.
     * @example
     * // Delete one Notification
     * const Notification = await prisma.notification.delete({
     *   where: {
     *     // ... filter to delete one Notification
     *   }
     * })
     * 
     */
    delete<T extends NotificationDeleteArgs>(args: SelectSubset<T, NotificationDeleteArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Notification.
     * @param {NotificationUpdateArgs} args - Arguments to update one Notification.
     * @example
     * // Update one Notification
     * const notification = await prisma.notification.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends NotificationUpdateArgs>(args: SelectSubset<T, NotificationUpdateArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Notifications.
     * @param {NotificationDeleteManyArgs} args - Arguments to filter Notifications to delete.
     * @example
     * // Delete a few Notifications
     * const { count } = await prisma.notification.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends NotificationDeleteManyArgs>(args?: SelectSubset<T, NotificationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Notifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Notifications
     * const notification = await prisma.notification.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends NotificationUpdateManyArgs>(args: SelectSubset<T, NotificationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Notifications and returns the data updated in the database.
     * @param {NotificationUpdateManyAndReturnArgs} args - Arguments to update many Notifications.
     * @example
     * // Update many Notifications
     * const notification = await prisma.notification.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Notifications and only return the `id`
     * const notificationWithIdOnly = await prisma.notification.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends NotificationUpdateManyAndReturnArgs>(args: SelectSubset<T, NotificationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Notification.
     * @param {NotificationUpsertArgs} args - Arguments to update or create a Notification.
     * @example
     * // Update or create a Notification
     * const notification = await prisma.notification.upsert({
     *   create: {
     *     // ... data to create a Notification
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Notification we want to update
     *   }
     * })
     */
    upsert<T extends NotificationUpsertArgs>(args: SelectSubset<T, NotificationUpsertArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Notifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationCountArgs} args - Arguments to filter Notifications to count.
     * @example
     * // Count the number of Notifications
     * const count = await prisma.notification.count({
     *   where: {
     *     // ... the filter for the Notifications we want to count
     *   }
     * })
    **/
    count<T extends NotificationCountArgs>(
      args?: Subset<T, NotificationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], NotificationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Notification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends NotificationAggregateArgs>(args: Subset<T, NotificationAggregateArgs>): Prisma.PrismaPromise<GetNotificationAggregateType<T>>

    /**
     * Group by Notification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends NotificationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: NotificationGroupByArgs['orderBy'] }
        : { orderBy?: NotificationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, NotificationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNotificationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Notification model
   */
  readonly fields: NotificationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Notification.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__NotificationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Notification model
   */
  interface NotificationFieldRefs {
    readonly id: FieldRef<"Notification", 'Int'>
    readonly message: FieldRef<"Notification", 'String'>
    readonly recipient: FieldRef<"Notification", 'String'>
    readonly status: FieldRef<"Notification", 'NotificationStatus'>
    readonly createdAt: FieldRef<"Notification", 'DateTime'>
    readonly userId: FieldRef<"Notification", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Notification findUnique
   */
  export type NotificationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification findUniqueOrThrow
   */
  export type NotificationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification findFirst
   */
  export type NotificationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Notifications.
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Notifications.
     */
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Notification findFirstOrThrow
   */
  export type NotificationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Notifications.
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Notifications.
     */
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Notification findMany
   */
  export type NotificationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notifications to fetch.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Notifications.
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Notification create
   */
  export type NotificationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * The data needed to create a Notification.
     */
    data: XOR<NotificationCreateInput, NotificationUncheckedCreateInput>
  }

  /**
   * Notification createMany
   */
  export type NotificationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Notifications.
     */
    data: NotificationCreateManyInput | NotificationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Notification createManyAndReturn
   */
  export type NotificationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * The data used to create many Notifications.
     */
    data: NotificationCreateManyInput | NotificationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Notification update
   */
  export type NotificationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * The data needed to update a Notification.
     */
    data: XOR<NotificationUpdateInput, NotificationUncheckedUpdateInput>
    /**
     * Choose, which Notification to update.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification updateMany
   */
  export type NotificationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Notifications.
     */
    data: XOR<NotificationUpdateManyMutationInput, NotificationUncheckedUpdateManyInput>
    /**
     * Filter which Notifications to update
     */
    where?: NotificationWhereInput
    /**
     * Limit how many Notifications to update.
     */
    limit?: number
  }

  /**
   * Notification updateManyAndReturn
   */
  export type NotificationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * The data used to update Notifications.
     */
    data: XOR<NotificationUpdateManyMutationInput, NotificationUncheckedUpdateManyInput>
    /**
     * Filter which Notifications to update
     */
    where?: NotificationWhereInput
    /**
     * Limit how many Notifications to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Notification upsert
   */
  export type NotificationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * The filter to search for the Notification to update in case it exists.
     */
    where: NotificationWhereUniqueInput
    /**
     * In case the Notification found by the `where` argument doesn't exist, create a new Notification with this data.
     */
    create: XOR<NotificationCreateInput, NotificationUncheckedCreateInput>
    /**
     * In case the Notification was found with the provided `where` argument, update it with this data.
     */
    update: XOR<NotificationUpdateInput, NotificationUncheckedUpdateInput>
  }

  /**
   * Notification delete
   */
  export type NotificationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter which Notification to delete.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification deleteMany
   */
  export type NotificationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Notifications to delete
     */
    where?: NotificationWhereInput
    /**
     * Limit how many Notifications to delete.
     */
    limit?: number
  }

  /**
   * Notification without action
   */
  export type NotificationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    password: 'password',
    role: 'role',
    createdAt: 'createdAt',
    bankData: 'bankData',
    signature: 'signature'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const DoctorantScalarFieldEnum: {
    id: 'id',
    nom: 'nom',
    prenom: 'prenom',
    annee_these: 'annee_these',
    directeur_these_id: 'directeur_these_id',
    photo: 'photo',
    userId: 'userId'
  };

  export type DoctorantScalarFieldEnum = (typeof DoctorantScalarFieldEnum)[keyof typeof DoctorantScalarFieldEnum]


  export const RequestDoctorantScalarFieldEnum: {
    id: 'id',
    nom: 'nom',
    prenom: 'prenom',
    email: 'email',
    annee_these: 'annee_these',
    createdAt: 'createdAt',
    directeur_these_id: 'directeur_these_id',
    status: 'status',
    rejectionReason: 'rejectionReason',
    photo: 'photo',
    isConfirm: 'isConfirm'
  };

  export type RequestDoctorantScalarFieldEnum = (typeof RequestDoctorantScalarFieldEnum)[keyof typeof RequestDoctorantScalarFieldEnum]


  export const MasterScalarFieldEnum: {
    id: 'id',
    nom: 'nom',
    prenom: 'prenom',
    encadrant_id: 'encadrant_id',
    annee_master: 'annee_master',
    photo: 'photo',
    userId: 'userId'
  };

  export type MasterScalarFieldEnum = (typeof MasterScalarFieldEnum)[keyof typeof MasterScalarFieldEnum]


  export const RequestMasterScalarFieldEnum: {
    id: 'id',
    nom: 'nom',
    prenom: 'prenom',
    email: 'email',
    annee_master: 'annee_master',
    createdAt: 'createdAt',
    encadrant_id: 'encadrant_id',
    status: 'status',
    rejectionReason: 'rejectionReason',
    photo: 'photo',
    isConfirm: 'isConfirm'
  };

  export type RequestMasterScalarFieldEnum = (typeof RequestMasterScalarFieldEnum)[keyof typeof RequestMasterScalarFieldEnum]


  export const EnseignantChercheurScalarFieldEnum: {
    id: 'id',
    nom: 'nom',
    prenom: 'prenom',
    fonction: 'fonction',
    grade: 'grade',
    etablissement: 'etablissement',
    photo: 'photo',
    userId: 'userId'
  };

  export type EnseignantChercheurScalarFieldEnum = (typeof EnseignantChercheurScalarFieldEnum)[keyof typeof EnseignantChercheurScalarFieldEnum]


  export const RequestEnseignantChercheurScalarFieldEnum: {
    id: 'id',
    nom: 'nom',
    prenom: 'prenom',
    email: 'email',
    fonction: 'fonction',
    grade: 'grade',
    etablissement: 'etablissement',
    status: 'status',
    isConfirm: 'isConfirm',
    rejectionReason: 'rejectionReason',
    photo: 'photo',
    createdAt: 'createdAt'
  };

  export type RequestEnseignantChercheurScalarFieldEnum = (typeof RequestEnseignantChercheurScalarFieldEnum)[keyof typeof RequestEnseignantChercheurScalarFieldEnum]


  export const AdminScalarFieldEnum: {
    id: 'id',
    nom: 'nom',
    prenom: 'prenom',
    userId: 'userId'
  };

  export type AdminScalarFieldEnum = (typeof AdminScalarFieldEnum)[keyof typeof AdminScalarFieldEnum]


  export const SessionScalarFieldEnum: {
    id: 'id',
    accessToken: 'accessToken',
    refreshToken: 'refreshToken',
    machine: 'machine',
    createdAt: 'createdAt',
    userId: 'userId'
  };

  export type SessionScalarFieldEnum = (typeof SessionScalarFieldEnum)[keyof typeof SessionScalarFieldEnum]


  export const NotificationScalarFieldEnum: {
    id: 'id',
    message: 'message',
    recipient: 'recipient',
    status: 'status',
    createdAt: 'createdAt',
    userId: 'userId'
  };

  export type NotificationScalarFieldEnum = (typeof NotificationScalarFieldEnum)[keyof typeof NotificationScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Role'
   */
  export type EnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role'>
    


  /**
   * Reference to a field of type 'Role[]'
   */
  export type ListEnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'RequestStatus'
   */
  export type EnumRequestStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RequestStatus'>
    


  /**
   * Reference to a field of type 'RequestStatus[]'
   */
  export type ListEnumRequestStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RequestStatus[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Grade'
   */
  export type EnumGradeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Grade'>
    


  /**
   * Reference to a field of type 'Grade[]'
   */
  export type ListEnumGradeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Grade[]'>
    


  /**
   * Reference to a field of type 'NotificationStatus'
   */
  export type EnumNotificationStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'NotificationStatus'>
    


  /**
   * Reference to a field of type 'NotificationStatus[]'
   */
  export type ListEnumNotificationStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'NotificationStatus[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    role?: EnumRoleFilter<"User"> | $Enums.Role
    createdAt?: DateTimeFilter<"User"> | Date | string
    bankData?: StringNullableFilter<"User"> | string | null
    signature?: StringNullableFilter<"User"> | string | null
    sessions?: SessionListRelationFilter
    notifications?: NotificationListRelationFilter
    doctorant?: XOR<DoctorantNullableScalarRelationFilter, DoctorantWhereInput> | null
    master?: XOR<MasterNullableScalarRelationFilter, MasterWhereInput> | null
    enseignant?: XOR<EnseignantChercheurNullableScalarRelationFilter, EnseignantChercheurWhereInput> | null
    admin?: XOR<AdminNullableScalarRelationFilter, AdminWhereInput> | null
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    bankData?: SortOrderInput | SortOrder
    signature?: SortOrderInput | SortOrder
    sessions?: SessionOrderByRelationAggregateInput
    notifications?: NotificationOrderByRelationAggregateInput
    doctorant?: DoctorantOrderByWithRelationInput
    master?: MasterOrderByWithRelationInput
    enseignant?: EnseignantChercheurOrderByWithRelationInput
    admin?: AdminOrderByWithRelationInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    bankData?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    password?: StringFilter<"User"> | string
    role?: EnumRoleFilter<"User"> | $Enums.Role
    createdAt?: DateTimeFilter<"User"> | Date | string
    signature?: StringNullableFilter<"User"> | string | null
    sessions?: SessionListRelationFilter
    notifications?: NotificationListRelationFilter
    doctorant?: XOR<DoctorantNullableScalarRelationFilter, DoctorantWhereInput> | null
    master?: XOR<MasterNullableScalarRelationFilter, MasterWhereInput> | null
    enseignant?: XOR<EnseignantChercheurNullableScalarRelationFilter, EnseignantChercheurWhereInput> | null
    admin?: XOR<AdminNullableScalarRelationFilter, AdminWhereInput> | null
  }, "id" | "id" | "email" | "bankData">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    bankData?: SortOrderInput | SortOrder
    signature?: SortOrderInput | SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    role?: EnumRoleWithAggregatesFilter<"User"> | $Enums.Role
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    bankData?: StringNullableWithAggregatesFilter<"User"> | string | null
    signature?: StringNullableWithAggregatesFilter<"User"> | string | null
  }

  export type DoctorantWhereInput = {
    AND?: DoctorantWhereInput | DoctorantWhereInput[]
    OR?: DoctorantWhereInput[]
    NOT?: DoctorantWhereInput | DoctorantWhereInput[]
    id?: StringFilter<"Doctorant"> | string
    nom?: StringFilter<"Doctorant"> | string
    prenom?: StringFilter<"Doctorant"> | string
    annee_these?: IntFilter<"Doctorant"> | number
    directeur_these_id?: StringFilter<"Doctorant"> | string
    photo?: StringNullableFilter<"Doctorant"> | string | null
    userId?: StringFilter<"Doctorant"> | string
    directeur_these?: XOR<EnseignantChercheurScalarRelationFilter, EnseignantChercheurWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type DoctorantOrderByWithRelationInput = {
    id?: SortOrder
    nom?: SortOrder
    prenom?: SortOrder
    annee_these?: SortOrder
    directeur_these_id?: SortOrder
    photo?: SortOrderInput | SortOrder
    userId?: SortOrder
    directeur_these?: EnseignantChercheurOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
  }

  export type DoctorantWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId?: string
    AND?: DoctorantWhereInput | DoctorantWhereInput[]
    OR?: DoctorantWhereInput[]
    NOT?: DoctorantWhereInput | DoctorantWhereInput[]
    nom?: StringFilter<"Doctorant"> | string
    prenom?: StringFilter<"Doctorant"> | string
    annee_these?: IntFilter<"Doctorant"> | number
    directeur_these_id?: StringFilter<"Doctorant"> | string
    photo?: StringNullableFilter<"Doctorant"> | string | null
    directeur_these?: XOR<EnseignantChercheurScalarRelationFilter, EnseignantChercheurWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "id" | "userId">

  export type DoctorantOrderByWithAggregationInput = {
    id?: SortOrder
    nom?: SortOrder
    prenom?: SortOrder
    annee_these?: SortOrder
    directeur_these_id?: SortOrder
    photo?: SortOrderInput | SortOrder
    userId?: SortOrder
    _count?: DoctorantCountOrderByAggregateInput
    _avg?: DoctorantAvgOrderByAggregateInput
    _max?: DoctorantMaxOrderByAggregateInput
    _min?: DoctorantMinOrderByAggregateInput
    _sum?: DoctorantSumOrderByAggregateInput
  }

  export type DoctorantScalarWhereWithAggregatesInput = {
    AND?: DoctorantScalarWhereWithAggregatesInput | DoctorantScalarWhereWithAggregatesInput[]
    OR?: DoctorantScalarWhereWithAggregatesInput[]
    NOT?: DoctorantScalarWhereWithAggregatesInput | DoctorantScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Doctorant"> | string
    nom?: StringWithAggregatesFilter<"Doctorant"> | string
    prenom?: StringWithAggregatesFilter<"Doctorant"> | string
    annee_these?: IntWithAggregatesFilter<"Doctorant"> | number
    directeur_these_id?: StringWithAggregatesFilter<"Doctorant"> | string
    photo?: StringNullableWithAggregatesFilter<"Doctorant"> | string | null
    userId?: StringWithAggregatesFilter<"Doctorant"> | string
  }

  export type RequestDoctorantWhereInput = {
    AND?: RequestDoctorantWhereInput | RequestDoctorantWhereInput[]
    OR?: RequestDoctorantWhereInput[]
    NOT?: RequestDoctorantWhereInput | RequestDoctorantWhereInput[]
    id?: StringFilter<"RequestDoctorant"> | string
    nom?: StringFilter<"RequestDoctorant"> | string
    prenom?: StringFilter<"RequestDoctorant"> | string
    email?: StringFilter<"RequestDoctorant"> | string
    annee_these?: IntFilter<"RequestDoctorant"> | number
    createdAt?: DateTimeFilter<"RequestDoctorant"> | Date | string
    directeur_these_id?: StringFilter<"RequestDoctorant"> | string
    status?: EnumRequestStatusFilter<"RequestDoctorant"> | $Enums.RequestStatus
    rejectionReason?: StringNullableFilter<"RequestDoctorant"> | string | null
    photo?: StringNullableFilter<"RequestDoctorant"> | string | null
    isConfirm?: BoolFilter<"RequestDoctorant"> | boolean
    directeur_these?: XOR<EnseignantChercheurScalarRelationFilter, EnseignantChercheurWhereInput>
  }

  export type RequestDoctorantOrderByWithRelationInput = {
    id?: SortOrder
    nom?: SortOrder
    prenom?: SortOrder
    email?: SortOrder
    annee_these?: SortOrder
    createdAt?: SortOrder
    directeur_these_id?: SortOrder
    status?: SortOrder
    rejectionReason?: SortOrderInput | SortOrder
    photo?: SortOrderInput | SortOrder
    isConfirm?: SortOrder
    directeur_these?: EnseignantChercheurOrderByWithRelationInput
  }

  export type RequestDoctorantWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: RequestDoctorantWhereInput | RequestDoctorantWhereInput[]
    OR?: RequestDoctorantWhereInput[]
    NOT?: RequestDoctorantWhereInput | RequestDoctorantWhereInput[]
    nom?: StringFilter<"RequestDoctorant"> | string
    prenom?: StringFilter<"RequestDoctorant"> | string
    annee_these?: IntFilter<"RequestDoctorant"> | number
    createdAt?: DateTimeFilter<"RequestDoctorant"> | Date | string
    directeur_these_id?: StringFilter<"RequestDoctorant"> | string
    status?: EnumRequestStatusFilter<"RequestDoctorant"> | $Enums.RequestStatus
    rejectionReason?: StringNullableFilter<"RequestDoctorant"> | string | null
    photo?: StringNullableFilter<"RequestDoctorant"> | string | null
    isConfirm?: BoolFilter<"RequestDoctorant"> | boolean
    directeur_these?: XOR<EnseignantChercheurScalarRelationFilter, EnseignantChercheurWhereInput>
  }, "id" | "id" | "email">

  export type RequestDoctorantOrderByWithAggregationInput = {
    id?: SortOrder
    nom?: SortOrder
    prenom?: SortOrder
    email?: SortOrder
    annee_these?: SortOrder
    createdAt?: SortOrder
    directeur_these_id?: SortOrder
    status?: SortOrder
    rejectionReason?: SortOrderInput | SortOrder
    photo?: SortOrderInput | SortOrder
    isConfirm?: SortOrder
    _count?: RequestDoctorantCountOrderByAggregateInput
    _avg?: RequestDoctorantAvgOrderByAggregateInput
    _max?: RequestDoctorantMaxOrderByAggregateInput
    _min?: RequestDoctorantMinOrderByAggregateInput
    _sum?: RequestDoctorantSumOrderByAggregateInput
  }

  export type RequestDoctorantScalarWhereWithAggregatesInput = {
    AND?: RequestDoctorantScalarWhereWithAggregatesInput | RequestDoctorantScalarWhereWithAggregatesInput[]
    OR?: RequestDoctorantScalarWhereWithAggregatesInput[]
    NOT?: RequestDoctorantScalarWhereWithAggregatesInput | RequestDoctorantScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"RequestDoctorant"> | string
    nom?: StringWithAggregatesFilter<"RequestDoctorant"> | string
    prenom?: StringWithAggregatesFilter<"RequestDoctorant"> | string
    email?: StringWithAggregatesFilter<"RequestDoctorant"> | string
    annee_these?: IntWithAggregatesFilter<"RequestDoctorant"> | number
    createdAt?: DateTimeWithAggregatesFilter<"RequestDoctorant"> | Date | string
    directeur_these_id?: StringWithAggregatesFilter<"RequestDoctorant"> | string
    status?: EnumRequestStatusWithAggregatesFilter<"RequestDoctorant"> | $Enums.RequestStatus
    rejectionReason?: StringNullableWithAggregatesFilter<"RequestDoctorant"> | string | null
    photo?: StringNullableWithAggregatesFilter<"RequestDoctorant"> | string | null
    isConfirm?: BoolWithAggregatesFilter<"RequestDoctorant"> | boolean
  }

  export type MasterWhereInput = {
    AND?: MasterWhereInput | MasterWhereInput[]
    OR?: MasterWhereInput[]
    NOT?: MasterWhereInput | MasterWhereInput[]
    id?: StringFilter<"Master"> | string
    nom?: StringFilter<"Master"> | string
    prenom?: StringFilter<"Master"> | string
    encadrant_id?: StringFilter<"Master"> | string
    annee_master?: IntFilter<"Master"> | number
    photo?: StringNullableFilter<"Master"> | string | null
    userId?: StringFilter<"Master"> | string
    encadrant?: XOR<EnseignantChercheurScalarRelationFilter, EnseignantChercheurWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type MasterOrderByWithRelationInput = {
    id?: SortOrder
    nom?: SortOrder
    prenom?: SortOrder
    encadrant_id?: SortOrder
    annee_master?: SortOrder
    photo?: SortOrderInput | SortOrder
    userId?: SortOrder
    encadrant?: EnseignantChercheurOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
  }

  export type MasterWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId?: string
    AND?: MasterWhereInput | MasterWhereInput[]
    OR?: MasterWhereInput[]
    NOT?: MasterWhereInput | MasterWhereInput[]
    nom?: StringFilter<"Master"> | string
    prenom?: StringFilter<"Master"> | string
    encadrant_id?: StringFilter<"Master"> | string
    annee_master?: IntFilter<"Master"> | number
    photo?: StringNullableFilter<"Master"> | string | null
    encadrant?: XOR<EnseignantChercheurScalarRelationFilter, EnseignantChercheurWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "id" | "userId">

  export type MasterOrderByWithAggregationInput = {
    id?: SortOrder
    nom?: SortOrder
    prenom?: SortOrder
    encadrant_id?: SortOrder
    annee_master?: SortOrder
    photo?: SortOrderInput | SortOrder
    userId?: SortOrder
    _count?: MasterCountOrderByAggregateInput
    _avg?: MasterAvgOrderByAggregateInput
    _max?: MasterMaxOrderByAggregateInput
    _min?: MasterMinOrderByAggregateInput
    _sum?: MasterSumOrderByAggregateInput
  }

  export type MasterScalarWhereWithAggregatesInput = {
    AND?: MasterScalarWhereWithAggregatesInput | MasterScalarWhereWithAggregatesInput[]
    OR?: MasterScalarWhereWithAggregatesInput[]
    NOT?: MasterScalarWhereWithAggregatesInput | MasterScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Master"> | string
    nom?: StringWithAggregatesFilter<"Master"> | string
    prenom?: StringWithAggregatesFilter<"Master"> | string
    encadrant_id?: StringWithAggregatesFilter<"Master"> | string
    annee_master?: IntWithAggregatesFilter<"Master"> | number
    photo?: StringNullableWithAggregatesFilter<"Master"> | string | null
    userId?: StringWithAggregatesFilter<"Master"> | string
  }

  export type RequestMasterWhereInput = {
    AND?: RequestMasterWhereInput | RequestMasterWhereInput[]
    OR?: RequestMasterWhereInput[]
    NOT?: RequestMasterWhereInput | RequestMasterWhereInput[]
    id?: StringFilter<"RequestMaster"> | string
    nom?: StringFilter<"RequestMaster"> | string
    prenom?: StringFilter<"RequestMaster"> | string
    email?: StringFilter<"RequestMaster"> | string
    annee_master?: IntFilter<"RequestMaster"> | number
    createdAt?: DateTimeFilter<"RequestMaster"> | Date | string
    encadrant_id?: StringFilter<"RequestMaster"> | string
    status?: EnumRequestStatusFilter<"RequestMaster"> | $Enums.RequestStatus
    rejectionReason?: StringNullableFilter<"RequestMaster"> | string | null
    photo?: StringNullableFilter<"RequestMaster"> | string | null
    isConfirm?: BoolFilter<"RequestMaster"> | boolean
    encadrant?: XOR<EnseignantChercheurScalarRelationFilter, EnseignantChercheurWhereInput>
  }

  export type RequestMasterOrderByWithRelationInput = {
    id?: SortOrder
    nom?: SortOrder
    prenom?: SortOrder
    email?: SortOrder
    annee_master?: SortOrder
    createdAt?: SortOrder
    encadrant_id?: SortOrder
    status?: SortOrder
    rejectionReason?: SortOrderInput | SortOrder
    photo?: SortOrderInput | SortOrder
    isConfirm?: SortOrder
    encadrant?: EnseignantChercheurOrderByWithRelationInput
  }

  export type RequestMasterWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: RequestMasterWhereInput | RequestMasterWhereInput[]
    OR?: RequestMasterWhereInput[]
    NOT?: RequestMasterWhereInput | RequestMasterWhereInput[]
    nom?: StringFilter<"RequestMaster"> | string
    prenom?: StringFilter<"RequestMaster"> | string
    annee_master?: IntFilter<"RequestMaster"> | number
    createdAt?: DateTimeFilter<"RequestMaster"> | Date | string
    encadrant_id?: StringFilter<"RequestMaster"> | string
    status?: EnumRequestStatusFilter<"RequestMaster"> | $Enums.RequestStatus
    rejectionReason?: StringNullableFilter<"RequestMaster"> | string | null
    photo?: StringNullableFilter<"RequestMaster"> | string | null
    isConfirm?: BoolFilter<"RequestMaster"> | boolean
    encadrant?: XOR<EnseignantChercheurScalarRelationFilter, EnseignantChercheurWhereInput>
  }, "id" | "id" | "email">

  export type RequestMasterOrderByWithAggregationInput = {
    id?: SortOrder
    nom?: SortOrder
    prenom?: SortOrder
    email?: SortOrder
    annee_master?: SortOrder
    createdAt?: SortOrder
    encadrant_id?: SortOrder
    status?: SortOrder
    rejectionReason?: SortOrderInput | SortOrder
    photo?: SortOrderInput | SortOrder
    isConfirm?: SortOrder
    _count?: RequestMasterCountOrderByAggregateInput
    _avg?: RequestMasterAvgOrderByAggregateInput
    _max?: RequestMasterMaxOrderByAggregateInput
    _min?: RequestMasterMinOrderByAggregateInput
    _sum?: RequestMasterSumOrderByAggregateInput
  }

  export type RequestMasterScalarWhereWithAggregatesInput = {
    AND?: RequestMasterScalarWhereWithAggregatesInput | RequestMasterScalarWhereWithAggregatesInput[]
    OR?: RequestMasterScalarWhereWithAggregatesInput[]
    NOT?: RequestMasterScalarWhereWithAggregatesInput | RequestMasterScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"RequestMaster"> | string
    nom?: StringWithAggregatesFilter<"RequestMaster"> | string
    prenom?: StringWithAggregatesFilter<"RequestMaster"> | string
    email?: StringWithAggregatesFilter<"RequestMaster"> | string
    annee_master?: IntWithAggregatesFilter<"RequestMaster"> | number
    createdAt?: DateTimeWithAggregatesFilter<"RequestMaster"> | Date | string
    encadrant_id?: StringWithAggregatesFilter<"RequestMaster"> | string
    status?: EnumRequestStatusWithAggregatesFilter<"RequestMaster"> | $Enums.RequestStatus
    rejectionReason?: StringNullableWithAggregatesFilter<"RequestMaster"> | string | null
    photo?: StringNullableWithAggregatesFilter<"RequestMaster"> | string | null
    isConfirm?: BoolWithAggregatesFilter<"RequestMaster"> | boolean
  }

  export type EnseignantChercheurWhereInput = {
    AND?: EnseignantChercheurWhereInput | EnseignantChercheurWhereInput[]
    OR?: EnseignantChercheurWhereInput[]
    NOT?: EnseignantChercheurWhereInput | EnseignantChercheurWhereInput[]
    id?: StringFilter<"EnseignantChercheur"> | string
    nom?: StringFilter<"EnseignantChercheur"> | string
    prenom?: StringFilter<"EnseignantChercheur"> | string
    fonction?: StringFilter<"EnseignantChercheur"> | string
    grade?: EnumGradeFilter<"EnseignantChercheur"> | $Enums.Grade
    etablissement?: StringFilter<"EnseignantChercheur"> | string
    photo?: StringNullableFilter<"EnseignantChercheur"> | string | null
    userId?: StringFilter<"EnseignantChercheur"> | string
    doctorants?: DoctorantListRelationFilter
    masters?: MasterListRelationFilter
    requestsMaster?: RequestMasterListRelationFilter
    requestsDoctorant?: RequestDoctorantListRelationFilter
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type EnseignantChercheurOrderByWithRelationInput = {
    id?: SortOrder
    nom?: SortOrder
    prenom?: SortOrder
    fonction?: SortOrder
    grade?: SortOrder
    etablissement?: SortOrder
    photo?: SortOrderInput | SortOrder
    userId?: SortOrder
    doctorants?: DoctorantOrderByRelationAggregateInput
    masters?: MasterOrderByRelationAggregateInput
    requestsMaster?: RequestMasterOrderByRelationAggregateInput
    requestsDoctorant?: RequestDoctorantOrderByRelationAggregateInput
    user?: UserOrderByWithRelationInput
  }

  export type EnseignantChercheurWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId?: string
    AND?: EnseignantChercheurWhereInput | EnseignantChercheurWhereInput[]
    OR?: EnseignantChercheurWhereInput[]
    NOT?: EnseignantChercheurWhereInput | EnseignantChercheurWhereInput[]
    nom?: StringFilter<"EnseignantChercheur"> | string
    prenom?: StringFilter<"EnseignantChercheur"> | string
    fonction?: StringFilter<"EnseignantChercheur"> | string
    grade?: EnumGradeFilter<"EnseignantChercheur"> | $Enums.Grade
    etablissement?: StringFilter<"EnseignantChercheur"> | string
    photo?: StringNullableFilter<"EnseignantChercheur"> | string | null
    doctorants?: DoctorantListRelationFilter
    masters?: MasterListRelationFilter
    requestsMaster?: RequestMasterListRelationFilter
    requestsDoctorant?: RequestDoctorantListRelationFilter
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "id" | "userId">

  export type EnseignantChercheurOrderByWithAggregationInput = {
    id?: SortOrder
    nom?: SortOrder
    prenom?: SortOrder
    fonction?: SortOrder
    grade?: SortOrder
    etablissement?: SortOrder
    photo?: SortOrderInput | SortOrder
    userId?: SortOrder
    _count?: EnseignantChercheurCountOrderByAggregateInput
    _max?: EnseignantChercheurMaxOrderByAggregateInput
    _min?: EnseignantChercheurMinOrderByAggregateInput
  }

  export type EnseignantChercheurScalarWhereWithAggregatesInput = {
    AND?: EnseignantChercheurScalarWhereWithAggregatesInput | EnseignantChercheurScalarWhereWithAggregatesInput[]
    OR?: EnseignantChercheurScalarWhereWithAggregatesInput[]
    NOT?: EnseignantChercheurScalarWhereWithAggregatesInput | EnseignantChercheurScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"EnseignantChercheur"> | string
    nom?: StringWithAggregatesFilter<"EnseignantChercheur"> | string
    prenom?: StringWithAggregatesFilter<"EnseignantChercheur"> | string
    fonction?: StringWithAggregatesFilter<"EnseignantChercheur"> | string
    grade?: EnumGradeWithAggregatesFilter<"EnseignantChercheur"> | $Enums.Grade
    etablissement?: StringWithAggregatesFilter<"EnseignantChercheur"> | string
    photo?: StringNullableWithAggregatesFilter<"EnseignantChercheur"> | string | null
    userId?: StringWithAggregatesFilter<"EnseignantChercheur"> | string
  }

  export type RequestEnseignantChercheurWhereInput = {
    AND?: RequestEnseignantChercheurWhereInput | RequestEnseignantChercheurWhereInput[]
    OR?: RequestEnseignantChercheurWhereInput[]
    NOT?: RequestEnseignantChercheurWhereInput | RequestEnseignantChercheurWhereInput[]
    id?: StringFilter<"RequestEnseignantChercheur"> | string
    nom?: StringFilter<"RequestEnseignantChercheur"> | string
    prenom?: StringFilter<"RequestEnseignantChercheur"> | string
    email?: StringFilter<"RequestEnseignantChercheur"> | string
    fonction?: StringFilter<"RequestEnseignantChercheur"> | string
    grade?: EnumGradeFilter<"RequestEnseignantChercheur"> | $Enums.Grade
    etablissement?: StringFilter<"RequestEnseignantChercheur"> | string
    status?: EnumRequestStatusFilter<"RequestEnseignantChercheur"> | $Enums.RequestStatus
    isConfirm?: BoolFilter<"RequestEnseignantChercheur"> | boolean
    rejectionReason?: StringNullableFilter<"RequestEnseignantChercheur"> | string | null
    photo?: StringNullableFilter<"RequestEnseignantChercheur"> | string | null
    createdAt?: DateTimeFilter<"RequestEnseignantChercheur"> | Date | string
  }

  export type RequestEnseignantChercheurOrderByWithRelationInput = {
    id?: SortOrder
    nom?: SortOrder
    prenom?: SortOrder
    email?: SortOrder
    fonction?: SortOrder
    grade?: SortOrder
    etablissement?: SortOrder
    status?: SortOrder
    isConfirm?: SortOrder
    rejectionReason?: SortOrderInput | SortOrder
    photo?: SortOrderInput | SortOrder
    createdAt?: SortOrder
  }

  export type RequestEnseignantChercheurWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: RequestEnseignantChercheurWhereInput | RequestEnseignantChercheurWhereInput[]
    OR?: RequestEnseignantChercheurWhereInput[]
    NOT?: RequestEnseignantChercheurWhereInput | RequestEnseignantChercheurWhereInput[]
    nom?: StringFilter<"RequestEnseignantChercheur"> | string
    prenom?: StringFilter<"RequestEnseignantChercheur"> | string
    fonction?: StringFilter<"RequestEnseignantChercheur"> | string
    grade?: EnumGradeFilter<"RequestEnseignantChercheur"> | $Enums.Grade
    etablissement?: StringFilter<"RequestEnseignantChercheur"> | string
    status?: EnumRequestStatusFilter<"RequestEnseignantChercheur"> | $Enums.RequestStatus
    isConfirm?: BoolFilter<"RequestEnseignantChercheur"> | boolean
    rejectionReason?: StringNullableFilter<"RequestEnseignantChercheur"> | string | null
    photo?: StringNullableFilter<"RequestEnseignantChercheur"> | string | null
    createdAt?: DateTimeFilter<"RequestEnseignantChercheur"> | Date | string
  }, "id" | "id" | "email">

  export type RequestEnseignantChercheurOrderByWithAggregationInput = {
    id?: SortOrder
    nom?: SortOrder
    prenom?: SortOrder
    email?: SortOrder
    fonction?: SortOrder
    grade?: SortOrder
    etablissement?: SortOrder
    status?: SortOrder
    isConfirm?: SortOrder
    rejectionReason?: SortOrderInput | SortOrder
    photo?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: RequestEnseignantChercheurCountOrderByAggregateInput
    _max?: RequestEnseignantChercheurMaxOrderByAggregateInput
    _min?: RequestEnseignantChercheurMinOrderByAggregateInput
  }

  export type RequestEnseignantChercheurScalarWhereWithAggregatesInput = {
    AND?: RequestEnseignantChercheurScalarWhereWithAggregatesInput | RequestEnseignantChercheurScalarWhereWithAggregatesInput[]
    OR?: RequestEnseignantChercheurScalarWhereWithAggregatesInput[]
    NOT?: RequestEnseignantChercheurScalarWhereWithAggregatesInput | RequestEnseignantChercheurScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"RequestEnseignantChercheur"> | string
    nom?: StringWithAggregatesFilter<"RequestEnseignantChercheur"> | string
    prenom?: StringWithAggregatesFilter<"RequestEnseignantChercheur"> | string
    email?: StringWithAggregatesFilter<"RequestEnseignantChercheur"> | string
    fonction?: StringWithAggregatesFilter<"RequestEnseignantChercheur"> | string
    grade?: EnumGradeWithAggregatesFilter<"RequestEnseignantChercheur"> | $Enums.Grade
    etablissement?: StringWithAggregatesFilter<"RequestEnseignantChercheur"> | string
    status?: EnumRequestStatusWithAggregatesFilter<"RequestEnseignantChercheur"> | $Enums.RequestStatus
    isConfirm?: BoolWithAggregatesFilter<"RequestEnseignantChercheur"> | boolean
    rejectionReason?: StringNullableWithAggregatesFilter<"RequestEnseignantChercheur"> | string | null
    photo?: StringNullableWithAggregatesFilter<"RequestEnseignantChercheur"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"RequestEnseignantChercheur"> | Date | string
  }

  export type AdminWhereInput = {
    AND?: AdminWhereInput | AdminWhereInput[]
    OR?: AdminWhereInput[]
    NOT?: AdminWhereInput | AdminWhereInput[]
    id?: IntFilter<"Admin"> | number
    nom?: StringFilter<"Admin"> | string
    prenom?: StringFilter<"Admin"> | string
    userId?: StringFilter<"Admin"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type AdminOrderByWithRelationInput = {
    id?: SortOrder
    nom?: SortOrder
    prenom?: SortOrder
    userId?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type AdminWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    userId?: string
    AND?: AdminWhereInput | AdminWhereInput[]
    OR?: AdminWhereInput[]
    NOT?: AdminWhereInput | AdminWhereInput[]
    nom?: StringFilter<"Admin"> | string
    prenom?: StringFilter<"Admin"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "userId">

  export type AdminOrderByWithAggregationInput = {
    id?: SortOrder
    nom?: SortOrder
    prenom?: SortOrder
    userId?: SortOrder
    _count?: AdminCountOrderByAggregateInput
    _avg?: AdminAvgOrderByAggregateInput
    _max?: AdminMaxOrderByAggregateInput
    _min?: AdminMinOrderByAggregateInput
    _sum?: AdminSumOrderByAggregateInput
  }

  export type AdminScalarWhereWithAggregatesInput = {
    AND?: AdminScalarWhereWithAggregatesInput | AdminScalarWhereWithAggregatesInput[]
    OR?: AdminScalarWhereWithAggregatesInput[]
    NOT?: AdminScalarWhereWithAggregatesInput | AdminScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Admin"> | number
    nom?: StringWithAggregatesFilter<"Admin"> | string
    prenom?: StringWithAggregatesFilter<"Admin"> | string
    userId?: StringWithAggregatesFilter<"Admin"> | string
  }

  export type SessionWhereInput = {
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    id?: StringFilter<"Session"> | string
    accessToken?: StringFilter<"Session"> | string
    refreshToken?: StringFilter<"Session"> | string
    machine?: StringFilter<"Session"> | string
    createdAt?: DateTimeFilter<"Session"> | Date | string
    userId?: StringFilter<"Session"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type SessionOrderByWithRelationInput = {
    id?: SortOrder
    accessToken?: SortOrder
    refreshToken?: SortOrder
    machine?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type SessionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    accessToken?: string
    refreshToken?: string
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    machine?: StringFilter<"Session"> | string
    createdAt?: DateTimeFilter<"Session"> | Date | string
    userId?: StringFilter<"Session"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "id" | "accessToken" | "refreshToken">

  export type SessionOrderByWithAggregationInput = {
    id?: SortOrder
    accessToken?: SortOrder
    refreshToken?: SortOrder
    machine?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
    _count?: SessionCountOrderByAggregateInput
    _max?: SessionMaxOrderByAggregateInput
    _min?: SessionMinOrderByAggregateInput
  }

  export type SessionScalarWhereWithAggregatesInput = {
    AND?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    OR?: SessionScalarWhereWithAggregatesInput[]
    NOT?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Session"> | string
    accessToken?: StringWithAggregatesFilter<"Session"> | string
    refreshToken?: StringWithAggregatesFilter<"Session"> | string
    machine?: StringWithAggregatesFilter<"Session"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Session"> | Date | string
    userId?: StringWithAggregatesFilter<"Session"> | string
  }

  export type NotificationWhereInput = {
    AND?: NotificationWhereInput | NotificationWhereInput[]
    OR?: NotificationWhereInput[]
    NOT?: NotificationWhereInput | NotificationWhereInput[]
    id?: IntFilter<"Notification"> | number
    message?: StringFilter<"Notification"> | string
    recipient?: StringFilter<"Notification"> | string
    status?: EnumNotificationStatusFilter<"Notification"> | $Enums.NotificationStatus
    createdAt?: DateTimeFilter<"Notification"> | Date | string
    userId?: StringFilter<"Notification"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type NotificationOrderByWithRelationInput = {
    id?: SortOrder
    message?: SortOrder
    recipient?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type NotificationWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: NotificationWhereInput | NotificationWhereInput[]
    OR?: NotificationWhereInput[]
    NOT?: NotificationWhereInput | NotificationWhereInput[]
    message?: StringFilter<"Notification"> | string
    recipient?: StringFilter<"Notification"> | string
    status?: EnumNotificationStatusFilter<"Notification"> | $Enums.NotificationStatus
    createdAt?: DateTimeFilter<"Notification"> | Date | string
    userId?: StringFilter<"Notification"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type NotificationOrderByWithAggregationInput = {
    id?: SortOrder
    message?: SortOrder
    recipient?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
    _count?: NotificationCountOrderByAggregateInput
    _avg?: NotificationAvgOrderByAggregateInput
    _max?: NotificationMaxOrderByAggregateInput
    _min?: NotificationMinOrderByAggregateInput
    _sum?: NotificationSumOrderByAggregateInput
  }

  export type NotificationScalarWhereWithAggregatesInput = {
    AND?: NotificationScalarWhereWithAggregatesInput | NotificationScalarWhereWithAggregatesInput[]
    OR?: NotificationScalarWhereWithAggregatesInput[]
    NOT?: NotificationScalarWhereWithAggregatesInput | NotificationScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Notification"> | number
    message?: StringWithAggregatesFilter<"Notification"> | string
    recipient?: StringWithAggregatesFilter<"Notification"> | string
    status?: EnumNotificationStatusWithAggregatesFilter<"Notification"> | $Enums.NotificationStatus
    createdAt?: DateTimeWithAggregatesFilter<"Notification"> | Date | string
    userId?: StringWithAggregatesFilter<"Notification"> | string
  }

  export type UserCreateInput = {
    id?: string
    email: string
    password: string
    role: $Enums.Role
    createdAt?: Date | string
    bankData?: string | null
    signature?: string | null
    sessions?: SessionCreateNestedManyWithoutUserInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
    doctorant?: DoctorantCreateNestedOneWithoutUserInput
    master?: MasterCreateNestedOneWithoutUserInput
    enseignant?: EnseignantChercheurCreateNestedOneWithoutUserInput
    admin?: AdminCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    password: string
    role: $Enums.Role
    createdAt?: Date | string
    bankData?: string | null
    signature?: string | null
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
    doctorant?: DoctorantUncheckedCreateNestedOneWithoutUserInput
    master?: MasterUncheckedCreateNestedOneWithoutUserInput
    enseignant?: EnseignantChercheurUncheckedCreateNestedOneWithoutUserInput
    admin?: AdminUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bankData?: NullableStringFieldUpdateOperationsInput | string | null
    signature?: NullableStringFieldUpdateOperationsInput | string | null
    sessions?: SessionUpdateManyWithoutUserNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
    doctorant?: DoctorantUpdateOneWithoutUserNestedInput
    master?: MasterUpdateOneWithoutUserNestedInput
    enseignant?: EnseignantChercheurUpdateOneWithoutUserNestedInput
    admin?: AdminUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bankData?: NullableStringFieldUpdateOperationsInput | string | null
    signature?: NullableStringFieldUpdateOperationsInput | string | null
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    doctorant?: DoctorantUncheckedUpdateOneWithoutUserNestedInput
    master?: MasterUncheckedUpdateOneWithoutUserNestedInput
    enseignant?: EnseignantChercheurUncheckedUpdateOneWithoutUserNestedInput
    admin?: AdminUncheckedUpdateOneWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    password: string
    role: $Enums.Role
    createdAt?: Date | string
    bankData?: string | null
    signature?: string | null
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bankData?: NullableStringFieldUpdateOperationsInput | string | null
    signature?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bankData?: NullableStringFieldUpdateOperationsInput | string | null
    signature?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type DoctorantCreateInput = {
    id?: string
    nom: string
    prenom: string
    annee_these: number
    photo?: string | null
    directeur_these: EnseignantChercheurCreateNestedOneWithoutDoctorantsInput
    user: UserCreateNestedOneWithoutDoctorantInput
  }

  export type DoctorantUncheckedCreateInput = {
    id?: string
    nom: string
    prenom: string
    annee_these: number
    directeur_these_id: string
    photo?: string | null
    userId: string
  }

  export type DoctorantUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    annee_these?: IntFieldUpdateOperationsInput | number
    photo?: NullableStringFieldUpdateOperationsInput | string | null
    directeur_these?: EnseignantChercheurUpdateOneRequiredWithoutDoctorantsNestedInput
    user?: UserUpdateOneRequiredWithoutDoctorantNestedInput
  }

  export type DoctorantUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    annee_these?: IntFieldUpdateOperationsInput | number
    directeur_these_id?: StringFieldUpdateOperationsInput | string
    photo?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type DoctorantCreateManyInput = {
    id?: string
    nom: string
    prenom: string
    annee_these: number
    directeur_these_id: string
    photo?: string | null
    userId: string
  }

  export type DoctorantUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    annee_these?: IntFieldUpdateOperationsInput | number
    photo?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type DoctorantUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    annee_these?: IntFieldUpdateOperationsInput | number
    directeur_these_id?: StringFieldUpdateOperationsInput | string
    photo?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type RequestDoctorantCreateInput = {
    id?: string
    nom: string
    prenom: string
    email: string
    annee_these: number
    createdAt?: Date | string
    status?: $Enums.RequestStatus
    rejectionReason?: string | null
    photo?: string | null
    isConfirm?: boolean
    directeur_these: EnseignantChercheurCreateNestedOneWithoutRequestsDoctorantInput
  }

  export type RequestDoctorantUncheckedCreateInput = {
    id?: string
    nom: string
    prenom: string
    email: string
    annee_these: number
    createdAt?: Date | string
    directeur_these_id: string
    status?: $Enums.RequestStatus
    rejectionReason?: string | null
    photo?: string | null
    isConfirm?: boolean
  }

  export type RequestDoctorantUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    annee_these?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumRequestStatusFieldUpdateOperationsInput | $Enums.RequestStatus
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    photo?: NullableStringFieldUpdateOperationsInput | string | null
    isConfirm?: BoolFieldUpdateOperationsInput | boolean
    directeur_these?: EnseignantChercheurUpdateOneRequiredWithoutRequestsDoctorantNestedInput
  }

  export type RequestDoctorantUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    annee_these?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    directeur_these_id?: StringFieldUpdateOperationsInput | string
    status?: EnumRequestStatusFieldUpdateOperationsInput | $Enums.RequestStatus
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    photo?: NullableStringFieldUpdateOperationsInput | string | null
    isConfirm?: BoolFieldUpdateOperationsInput | boolean
  }

  export type RequestDoctorantCreateManyInput = {
    id?: string
    nom: string
    prenom: string
    email: string
    annee_these: number
    createdAt?: Date | string
    directeur_these_id: string
    status?: $Enums.RequestStatus
    rejectionReason?: string | null
    photo?: string | null
    isConfirm?: boolean
  }

  export type RequestDoctorantUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    annee_these?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumRequestStatusFieldUpdateOperationsInput | $Enums.RequestStatus
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    photo?: NullableStringFieldUpdateOperationsInput | string | null
    isConfirm?: BoolFieldUpdateOperationsInput | boolean
  }

  export type RequestDoctorantUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    annee_these?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    directeur_these_id?: StringFieldUpdateOperationsInput | string
    status?: EnumRequestStatusFieldUpdateOperationsInput | $Enums.RequestStatus
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    photo?: NullableStringFieldUpdateOperationsInput | string | null
    isConfirm?: BoolFieldUpdateOperationsInput | boolean
  }

  export type MasterCreateInput = {
    id?: string
    nom: string
    prenom: string
    annee_master: number
    photo?: string | null
    encadrant: EnseignantChercheurCreateNestedOneWithoutMastersInput
    user: UserCreateNestedOneWithoutMasterInput
  }

  export type MasterUncheckedCreateInput = {
    id?: string
    nom: string
    prenom: string
    encadrant_id: string
    annee_master: number
    photo?: string | null
    userId: string
  }

  export type MasterUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    annee_master?: IntFieldUpdateOperationsInput | number
    photo?: NullableStringFieldUpdateOperationsInput | string | null
    encadrant?: EnseignantChercheurUpdateOneRequiredWithoutMastersNestedInput
    user?: UserUpdateOneRequiredWithoutMasterNestedInput
  }

  export type MasterUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    encadrant_id?: StringFieldUpdateOperationsInput | string
    annee_master?: IntFieldUpdateOperationsInput | number
    photo?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type MasterCreateManyInput = {
    id?: string
    nom: string
    prenom: string
    encadrant_id: string
    annee_master: number
    photo?: string | null
    userId: string
  }

  export type MasterUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    annee_master?: IntFieldUpdateOperationsInput | number
    photo?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type MasterUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    encadrant_id?: StringFieldUpdateOperationsInput | string
    annee_master?: IntFieldUpdateOperationsInput | number
    photo?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type RequestMasterCreateInput = {
    id?: string
    nom: string
    prenom: string
    email: string
    annee_master: number
    createdAt?: Date | string
    status?: $Enums.RequestStatus
    rejectionReason?: string | null
    photo?: string | null
    isConfirm?: boolean
    encadrant: EnseignantChercheurCreateNestedOneWithoutRequestsMasterInput
  }

  export type RequestMasterUncheckedCreateInput = {
    id?: string
    nom: string
    prenom: string
    email: string
    annee_master: number
    createdAt?: Date | string
    encadrant_id: string
    status?: $Enums.RequestStatus
    rejectionReason?: string | null
    photo?: string | null
    isConfirm?: boolean
  }

  export type RequestMasterUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    annee_master?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumRequestStatusFieldUpdateOperationsInput | $Enums.RequestStatus
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    photo?: NullableStringFieldUpdateOperationsInput | string | null
    isConfirm?: BoolFieldUpdateOperationsInput | boolean
    encadrant?: EnseignantChercheurUpdateOneRequiredWithoutRequestsMasterNestedInput
  }

  export type RequestMasterUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    annee_master?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    encadrant_id?: StringFieldUpdateOperationsInput | string
    status?: EnumRequestStatusFieldUpdateOperationsInput | $Enums.RequestStatus
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    photo?: NullableStringFieldUpdateOperationsInput | string | null
    isConfirm?: BoolFieldUpdateOperationsInput | boolean
  }

  export type RequestMasterCreateManyInput = {
    id?: string
    nom: string
    prenom: string
    email: string
    annee_master: number
    createdAt?: Date | string
    encadrant_id: string
    status?: $Enums.RequestStatus
    rejectionReason?: string | null
    photo?: string | null
    isConfirm?: boolean
  }

  export type RequestMasterUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    annee_master?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumRequestStatusFieldUpdateOperationsInput | $Enums.RequestStatus
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    photo?: NullableStringFieldUpdateOperationsInput | string | null
    isConfirm?: BoolFieldUpdateOperationsInput | boolean
  }

  export type RequestMasterUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    annee_master?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    encadrant_id?: StringFieldUpdateOperationsInput | string
    status?: EnumRequestStatusFieldUpdateOperationsInput | $Enums.RequestStatus
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    photo?: NullableStringFieldUpdateOperationsInput | string | null
    isConfirm?: BoolFieldUpdateOperationsInput | boolean
  }

  export type EnseignantChercheurCreateInput = {
    id?: string
    nom: string
    prenom: string
    fonction: string
    grade: $Enums.Grade
    etablissement: string
    photo?: string | null
    doctorants?: DoctorantCreateNestedManyWithoutDirecteur_theseInput
    masters?: MasterCreateNestedManyWithoutEncadrantInput
    requestsMaster?: RequestMasterCreateNestedManyWithoutEncadrantInput
    requestsDoctorant?: RequestDoctorantCreateNestedManyWithoutDirecteur_theseInput
    user: UserCreateNestedOneWithoutEnseignantInput
  }

  export type EnseignantChercheurUncheckedCreateInput = {
    id?: string
    nom: string
    prenom: string
    fonction: string
    grade: $Enums.Grade
    etablissement: string
    photo?: string | null
    userId: string
    doctorants?: DoctorantUncheckedCreateNestedManyWithoutDirecteur_theseInput
    masters?: MasterUncheckedCreateNestedManyWithoutEncadrantInput
    requestsMaster?: RequestMasterUncheckedCreateNestedManyWithoutEncadrantInput
    requestsDoctorant?: RequestDoctorantUncheckedCreateNestedManyWithoutDirecteur_theseInput
  }

  export type EnseignantChercheurUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    fonction?: StringFieldUpdateOperationsInput | string
    grade?: EnumGradeFieldUpdateOperationsInput | $Enums.Grade
    etablissement?: StringFieldUpdateOperationsInput | string
    photo?: NullableStringFieldUpdateOperationsInput | string | null
    doctorants?: DoctorantUpdateManyWithoutDirecteur_theseNestedInput
    masters?: MasterUpdateManyWithoutEncadrantNestedInput
    requestsMaster?: RequestMasterUpdateManyWithoutEncadrantNestedInput
    requestsDoctorant?: RequestDoctorantUpdateManyWithoutDirecteur_theseNestedInput
    user?: UserUpdateOneRequiredWithoutEnseignantNestedInput
  }

  export type EnseignantChercheurUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    fonction?: StringFieldUpdateOperationsInput | string
    grade?: EnumGradeFieldUpdateOperationsInput | $Enums.Grade
    etablissement?: StringFieldUpdateOperationsInput | string
    photo?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
    doctorants?: DoctorantUncheckedUpdateManyWithoutDirecteur_theseNestedInput
    masters?: MasterUncheckedUpdateManyWithoutEncadrantNestedInput
    requestsMaster?: RequestMasterUncheckedUpdateManyWithoutEncadrantNestedInput
    requestsDoctorant?: RequestDoctorantUncheckedUpdateManyWithoutDirecteur_theseNestedInput
  }

  export type EnseignantChercheurCreateManyInput = {
    id?: string
    nom: string
    prenom: string
    fonction: string
    grade: $Enums.Grade
    etablissement: string
    photo?: string | null
    userId: string
  }

  export type EnseignantChercheurUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    fonction?: StringFieldUpdateOperationsInput | string
    grade?: EnumGradeFieldUpdateOperationsInput | $Enums.Grade
    etablissement?: StringFieldUpdateOperationsInput | string
    photo?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type EnseignantChercheurUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    fonction?: StringFieldUpdateOperationsInput | string
    grade?: EnumGradeFieldUpdateOperationsInput | $Enums.Grade
    etablissement?: StringFieldUpdateOperationsInput | string
    photo?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type RequestEnseignantChercheurCreateInput = {
    id?: string
    nom: string
    prenom: string
    email: string
    fonction: string
    grade: $Enums.Grade
    etablissement: string
    status?: $Enums.RequestStatus
    isConfirm?: boolean
    rejectionReason?: string | null
    photo?: string | null
    createdAt?: Date | string
  }

  export type RequestEnseignantChercheurUncheckedCreateInput = {
    id?: string
    nom: string
    prenom: string
    email: string
    fonction: string
    grade: $Enums.Grade
    etablissement: string
    status?: $Enums.RequestStatus
    isConfirm?: boolean
    rejectionReason?: string | null
    photo?: string | null
    createdAt?: Date | string
  }

  export type RequestEnseignantChercheurUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    fonction?: StringFieldUpdateOperationsInput | string
    grade?: EnumGradeFieldUpdateOperationsInput | $Enums.Grade
    etablissement?: StringFieldUpdateOperationsInput | string
    status?: EnumRequestStatusFieldUpdateOperationsInput | $Enums.RequestStatus
    isConfirm?: BoolFieldUpdateOperationsInput | boolean
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    photo?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RequestEnseignantChercheurUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    fonction?: StringFieldUpdateOperationsInput | string
    grade?: EnumGradeFieldUpdateOperationsInput | $Enums.Grade
    etablissement?: StringFieldUpdateOperationsInput | string
    status?: EnumRequestStatusFieldUpdateOperationsInput | $Enums.RequestStatus
    isConfirm?: BoolFieldUpdateOperationsInput | boolean
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    photo?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RequestEnseignantChercheurCreateManyInput = {
    id?: string
    nom: string
    prenom: string
    email: string
    fonction: string
    grade: $Enums.Grade
    etablissement: string
    status?: $Enums.RequestStatus
    isConfirm?: boolean
    rejectionReason?: string | null
    photo?: string | null
    createdAt?: Date | string
  }

  export type RequestEnseignantChercheurUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    fonction?: StringFieldUpdateOperationsInput | string
    grade?: EnumGradeFieldUpdateOperationsInput | $Enums.Grade
    etablissement?: StringFieldUpdateOperationsInput | string
    status?: EnumRequestStatusFieldUpdateOperationsInput | $Enums.RequestStatus
    isConfirm?: BoolFieldUpdateOperationsInput | boolean
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    photo?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RequestEnseignantChercheurUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    fonction?: StringFieldUpdateOperationsInput | string
    grade?: EnumGradeFieldUpdateOperationsInput | $Enums.Grade
    etablissement?: StringFieldUpdateOperationsInput | string
    status?: EnumRequestStatusFieldUpdateOperationsInput | $Enums.RequestStatus
    isConfirm?: BoolFieldUpdateOperationsInput | boolean
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    photo?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AdminCreateInput = {
    nom: string
    prenom: string
    user: UserCreateNestedOneWithoutAdminInput
  }

  export type AdminUncheckedCreateInput = {
    id?: number
    nom: string
    prenom: string
    userId: string
  }

  export type AdminUpdateInput = {
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    user?: UserUpdateOneRequiredWithoutAdminNestedInput
  }

  export type AdminUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type AdminCreateManyInput = {
    id?: number
    nom: string
    prenom: string
    userId: string
  }

  export type AdminUpdateManyMutationInput = {
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
  }

  export type AdminUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type SessionCreateInput = {
    id?: string
    accessToken: string
    refreshToken: string
    machine: string
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutSessionsInput
  }

  export type SessionUncheckedCreateInput = {
    id?: string
    accessToken: string
    refreshToken: string
    machine: string
    createdAt?: Date | string
    userId: string
  }

  export type SessionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    accessToken?: StringFieldUpdateOperationsInput | string
    refreshToken?: StringFieldUpdateOperationsInput | string
    machine?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutSessionsNestedInput
  }

  export type SessionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    accessToken?: StringFieldUpdateOperationsInput | string
    refreshToken?: StringFieldUpdateOperationsInput | string
    machine?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type SessionCreateManyInput = {
    id?: string
    accessToken: string
    refreshToken: string
    machine: string
    createdAt?: Date | string
    userId: string
  }

  export type SessionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    accessToken?: StringFieldUpdateOperationsInput | string
    refreshToken?: StringFieldUpdateOperationsInput | string
    machine?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    accessToken?: StringFieldUpdateOperationsInput | string
    refreshToken?: StringFieldUpdateOperationsInput | string
    machine?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type NotificationCreateInput = {
    message: string
    recipient: string
    status?: $Enums.NotificationStatus
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutNotificationsInput
  }

  export type NotificationUncheckedCreateInput = {
    id?: number
    message: string
    recipient: string
    status?: $Enums.NotificationStatus
    createdAt?: Date | string
    userId: string
  }

  export type NotificationUpdateInput = {
    message?: StringFieldUpdateOperationsInput | string
    recipient?: StringFieldUpdateOperationsInput | string
    status?: EnumNotificationStatusFieldUpdateOperationsInput | $Enums.NotificationStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutNotificationsNestedInput
  }

  export type NotificationUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    message?: StringFieldUpdateOperationsInput | string
    recipient?: StringFieldUpdateOperationsInput | string
    status?: EnumNotificationStatusFieldUpdateOperationsInput | $Enums.NotificationStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type NotificationCreateManyInput = {
    id?: number
    message: string
    recipient: string
    status?: $Enums.NotificationStatus
    createdAt?: Date | string
    userId: string
  }

  export type NotificationUpdateManyMutationInput = {
    message?: StringFieldUpdateOperationsInput | string
    recipient?: StringFieldUpdateOperationsInput | string
    status?: EnumNotificationStatusFieldUpdateOperationsInput | $Enums.NotificationStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    message?: StringFieldUpdateOperationsInput | string
    recipient?: StringFieldUpdateOperationsInput | string
    status?: EnumNotificationStatusFieldUpdateOperationsInput | $Enums.NotificationStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type EnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type SessionListRelationFilter = {
    every?: SessionWhereInput
    some?: SessionWhereInput
    none?: SessionWhereInput
  }

  export type NotificationListRelationFilter = {
    every?: NotificationWhereInput
    some?: NotificationWhereInput
    none?: NotificationWhereInput
  }

  export type DoctorantNullableScalarRelationFilter = {
    is?: DoctorantWhereInput | null
    isNot?: DoctorantWhereInput | null
  }

  export type MasterNullableScalarRelationFilter = {
    is?: MasterWhereInput | null
    isNot?: MasterWhereInput | null
  }

  export type EnseignantChercheurNullableScalarRelationFilter = {
    is?: EnseignantChercheurWhereInput | null
    isNot?: EnseignantChercheurWhereInput | null
  }

  export type AdminNullableScalarRelationFilter = {
    is?: AdminWhereInput | null
    isNot?: AdminWhereInput | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type SessionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type NotificationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    bankData?: SortOrder
    signature?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    bankData?: SortOrder
    signature?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    bankData?: SortOrder
    signature?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type EnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type EnseignantChercheurScalarRelationFilter = {
    is?: EnseignantChercheurWhereInput
    isNot?: EnseignantChercheurWhereInput
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type DoctorantCountOrderByAggregateInput = {
    id?: SortOrder
    nom?: SortOrder
    prenom?: SortOrder
    annee_these?: SortOrder
    directeur_these_id?: SortOrder
    photo?: SortOrder
    userId?: SortOrder
  }

  export type DoctorantAvgOrderByAggregateInput = {
    annee_these?: SortOrder
  }

  export type DoctorantMaxOrderByAggregateInput = {
    id?: SortOrder
    nom?: SortOrder
    prenom?: SortOrder
    annee_these?: SortOrder
    directeur_these_id?: SortOrder
    photo?: SortOrder
    userId?: SortOrder
  }

  export type DoctorantMinOrderByAggregateInput = {
    id?: SortOrder
    nom?: SortOrder
    prenom?: SortOrder
    annee_these?: SortOrder
    directeur_these_id?: SortOrder
    photo?: SortOrder
    userId?: SortOrder
  }

  export type DoctorantSumOrderByAggregateInput = {
    annee_these?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type EnumRequestStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.RequestStatus | EnumRequestStatusFieldRefInput<$PrismaModel>
    in?: $Enums.RequestStatus[] | ListEnumRequestStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.RequestStatus[] | ListEnumRequestStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumRequestStatusFilter<$PrismaModel> | $Enums.RequestStatus
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type RequestDoctorantCountOrderByAggregateInput = {
    id?: SortOrder
    nom?: SortOrder
    prenom?: SortOrder
    email?: SortOrder
    annee_these?: SortOrder
    createdAt?: SortOrder
    directeur_these_id?: SortOrder
    status?: SortOrder
    rejectionReason?: SortOrder
    photo?: SortOrder
    isConfirm?: SortOrder
  }

  export type RequestDoctorantAvgOrderByAggregateInput = {
    annee_these?: SortOrder
  }

  export type RequestDoctorantMaxOrderByAggregateInput = {
    id?: SortOrder
    nom?: SortOrder
    prenom?: SortOrder
    email?: SortOrder
    annee_these?: SortOrder
    createdAt?: SortOrder
    directeur_these_id?: SortOrder
    status?: SortOrder
    rejectionReason?: SortOrder
    photo?: SortOrder
    isConfirm?: SortOrder
  }

  export type RequestDoctorantMinOrderByAggregateInput = {
    id?: SortOrder
    nom?: SortOrder
    prenom?: SortOrder
    email?: SortOrder
    annee_these?: SortOrder
    createdAt?: SortOrder
    directeur_these_id?: SortOrder
    status?: SortOrder
    rejectionReason?: SortOrder
    photo?: SortOrder
    isConfirm?: SortOrder
  }

  export type RequestDoctorantSumOrderByAggregateInput = {
    annee_these?: SortOrder
  }

  export type EnumRequestStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RequestStatus | EnumRequestStatusFieldRefInput<$PrismaModel>
    in?: $Enums.RequestStatus[] | ListEnumRequestStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.RequestStatus[] | ListEnumRequestStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumRequestStatusWithAggregatesFilter<$PrismaModel> | $Enums.RequestStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRequestStatusFilter<$PrismaModel>
    _max?: NestedEnumRequestStatusFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type MasterCountOrderByAggregateInput = {
    id?: SortOrder
    nom?: SortOrder
    prenom?: SortOrder
    encadrant_id?: SortOrder
    annee_master?: SortOrder
    photo?: SortOrder
    userId?: SortOrder
  }

  export type MasterAvgOrderByAggregateInput = {
    annee_master?: SortOrder
  }

  export type MasterMaxOrderByAggregateInput = {
    id?: SortOrder
    nom?: SortOrder
    prenom?: SortOrder
    encadrant_id?: SortOrder
    annee_master?: SortOrder
    photo?: SortOrder
    userId?: SortOrder
  }

  export type MasterMinOrderByAggregateInput = {
    id?: SortOrder
    nom?: SortOrder
    prenom?: SortOrder
    encadrant_id?: SortOrder
    annee_master?: SortOrder
    photo?: SortOrder
    userId?: SortOrder
  }

  export type MasterSumOrderByAggregateInput = {
    annee_master?: SortOrder
  }

  export type RequestMasterCountOrderByAggregateInput = {
    id?: SortOrder
    nom?: SortOrder
    prenom?: SortOrder
    email?: SortOrder
    annee_master?: SortOrder
    createdAt?: SortOrder
    encadrant_id?: SortOrder
    status?: SortOrder
    rejectionReason?: SortOrder
    photo?: SortOrder
    isConfirm?: SortOrder
  }

  export type RequestMasterAvgOrderByAggregateInput = {
    annee_master?: SortOrder
  }

  export type RequestMasterMaxOrderByAggregateInput = {
    id?: SortOrder
    nom?: SortOrder
    prenom?: SortOrder
    email?: SortOrder
    annee_master?: SortOrder
    createdAt?: SortOrder
    encadrant_id?: SortOrder
    status?: SortOrder
    rejectionReason?: SortOrder
    photo?: SortOrder
    isConfirm?: SortOrder
  }

  export type RequestMasterMinOrderByAggregateInput = {
    id?: SortOrder
    nom?: SortOrder
    prenom?: SortOrder
    email?: SortOrder
    annee_master?: SortOrder
    createdAt?: SortOrder
    encadrant_id?: SortOrder
    status?: SortOrder
    rejectionReason?: SortOrder
    photo?: SortOrder
    isConfirm?: SortOrder
  }

  export type RequestMasterSumOrderByAggregateInput = {
    annee_master?: SortOrder
  }

  export type EnumGradeFilter<$PrismaModel = never> = {
    equals?: $Enums.Grade | EnumGradeFieldRefInput<$PrismaModel>
    in?: $Enums.Grade[] | ListEnumGradeFieldRefInput<$PrismaModel>
    notIn?: $Enums.Grade[] | ListEnumGradeFieldRefInput<$PrismaModel>
    not?: NestedEnumGradeFilter<$PrismaModel> | $Enums.Grade
  }

  export type DoctorantListRelationFilter = {
    every?: DoctorantWhereInput
    some?: DoctorantWhereInput
    none?: DoctorantWhereInput
  }

  export type MasterListRelationFilter = {
    every?: MasterWhereInput
    some?: MasterWhereInput
    none?: MasterWhereInput
  }

  export type RequestMasterListRelationFilter = {
    every?: RequestMasterWhereInput
    some?: RequestMasterWhereInput
    none?: RequestMasterWhereInput
  }

  export type RequestDoctorantListRelationFilter = {
    every?: RequestDoctorantWhereInput
    some?: RequestDoctorantWhereInput
    none?: RequestDoctorantWhereInput
  }

  export type DoctorantOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MasterOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RequestMasterOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RequestDoctorantOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type EnseignantChercheurCountOrderByAggregateInput = {
    id?: SortOrder
    nom?: SortOrder
    prenom?: SortOrder
    fonction?: SortOrder
    grade?: SortOrder
    etablissement?: SortOrder
    photo?: SortOrder
    userId?: SortOrder
  }

  export type EnseignantChercheurMaxOrderByAggregateInput = {
    id?: SortOrder
    nom?: SortOrder
    prenom?: SortOrder
    fonction?: SortOrder
    grade?: SortOrder
    etablissement?: SortOrder
    photo?: SortOrder
    userId?: SortOrder
  }

  export type EnseignantChercheurMinOrderByAggregateInput = {
    id?: SortOrder
    nom?: SortOrder
    prenom?: SortOrder
    fonction?: SortOrder
    grade?: SortOrder
    etablissement?: SortOrder
    photo?: SortOrder
    userId?: SortOrder
  }

  export type EnumGradeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Grade | EnumGradeFieldRefInput<$PrismaModel>
    in?: $Enums.Grade[] | ListEnumGradeFieldRefInput<$PrismaModel>
    notIn?: $Enums.Grade[] | ListEnumGradeFieldRefInput<$PrismaModel>
    not?: NestedEnumGradeWithAggregatesFilter<$PrismaModel> | $Enums.Grade
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumGradeFilter<$PrismaModel>
    _max?: NestedEnumGradeFilter<$PrismaModel>
  }

  export type RequestEnseignantChercheurCountOrderByAggregateInput = {
    id?: SortOrder
    nom?: SortOrder
    prenom?: SortOrder
    email?: SortOrder
    fonction?: SortOrder
    grade?: SortOrder
    etablissement?: SortOrder
    status?: SortOrder
    isConfirm?: SortOrder
    rejectionReason?: SortOrder
    photo?: SortOrder
    createdAt?: SortOrder
  }

  export type RequestEnseignantChercheurMaxOrderByAggregateInput = {
    id?: SortOrder
    nom?: SortOrder
    prenom?: SortOrder
    email?: SortOrder
    fonction?: SortOrder
    grade?: SortOrder
    etablissement?: SortOrder
    status?: SortOrder
    isConfirm?: SortOrder
    rejectionReason?: SortOrder
    photo?: SortOrder
    createdAt?: SortOrder
  }

  export type RequestEnseignantChercheurMinOrderByAggregateInput = {
    id?: SortOrder
    nom?: SortOrder
    prenom?: SortOrder
    email?: SortOrder
    fonction?: SortOrder
    grade?: SortOrder
    etablissement?: SortOrder
    status?: SortOrder
    isConfirm?: SortOrder
    rejectionReason?: SortOrder
    photo?: SortOrder
    createdAt?: SortOrder
  }

  export type AdminCountOrderByAggregateInput = {
    id?: SortOrder
    nom?: SortOrder
    prenom?: SortOrder
    userId?: SortOrder
  }

  export type AdminAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type AdminMaxOrderByAggregateInput = {
    id?: SortOrder
    nom?: SortOrder
    prenom?: SortOrder
    userId?: SortOrder
  }

  export type AdminMinOrderByAggregateInput = {
    id?: SortOrder
    nom?: SortOrder
    prenom?: SortOrder
    userId?: SortOrder
  }

  export type AdminSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type SessionCountOrderByAggregateInput = {
    id?: SortOrder
    accessToken?: SortOrder
    refreshToken?: SortOrder
    machine?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
  }

  export type SessionMaxOrderByAggregateInput = {
    id?: SortOrder
    accessToken?: SortOrder
    refreshToken?: SortOrder
    machine?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
  }

  export type SessionMinOrderByAggregateInput = {
    id?: SortOrder
    accessToken?: SortOrder
    refreshToken?: SortOrder
    machine?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
  }

  export type EnumNotificationStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationStatus | EnumNotificationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.NotificationStatus[] | ListEnumNotificationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.NotificationStatus[] | ListEnumNotificationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumNotificationStatusFilter<$PrismaModel> | $Enums.NotificationStatus
  }

  export type NotificationCountOrderByAggregateInput = {
    id?: SortOrder
    message?: SortOrder
    recipient?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
  }

  export type NotificationAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type NotificationMaxOrderByAggregateInput = {
    id?: SortOrder
    message?: SortOrder
    recipient?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
  }

  export type NotificationMinOrderByAggregateInput = {
    id?: SortOrder
    message?: SortOrder
    recipient?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
  }

  export type NotificationSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type EnumNotificationStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationStatus | EnumNotificationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.NotificationStatus[] | ListEnumNotificationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.NotificationStatus[] | ListEnumNotificationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumNotificationStatusWithAggregatesFilter<$PrismaModel> | $Enums.NotificationStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumNotificationStatusFilter<$PrismaModel>
    _max?: NestedEnumNotificationStatusFilter<$PrismaModel>
  }

  export type SessionCreateNestedManyWithoutUserInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type NotificationCreateNestedManyWithoutUserInput = {
    create?: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput> | NotificationCreateWithoutUserInput[] | NotificationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutUserInput | NotificationCreateOrConnectWithoutUserInput[]
    createMany?: NotificationCreateManyUserInputEnvelope
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
  }

  export type DoctorantCreateNestedOneWithoutUserInput = {
    create?: XOR<DoctorantCreateWithoutUserInput, DoctorantUncheckedCreateWithoutUserInput>
    connectOrCreate?: DoctorantCreateOrConnectWithoutUserInput
    connect?: DoctorantWhereUniqueInput
  }

  export type MasterCreateNestedOneWithoutUserInput = {
    create?: XOR<MasterCreateWithoutUserInput, MasterUncheckedCreateWithoutUserInput>
    connectOrCreate?: MasterCreateOrConnectWithoutUserInput
    connect?: MasterWhereUniqueInput
  }

  export type EnseignantChercheurCreateNestedOneWithoutUserInput = {
    create?: XOR<EnseignantChercheurCreateWithoutUserInput, EnseignantChercheurUncheckedCreateWithoutUserInput>
    connectOrCreate?: EnseignantChercheurCreateOrConnectWithoutUserInput
    connect?: EnseignantChercheurWhereUniqueInput
  }

  export type AdminCreateNestedOneWithoutUserInput = {
    create?: XOR<AdminCreateWithoutUserInput, AdminUncheckedCreateWithoutUserInput>
    connectOrCreate?: AdminCreateOrConnectWithoutUserInput
    connect?: AdminWhereUniqueInput
  }

  export type SessionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type NotificationUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput> | NotificationCreateWithoutUserInput[] | NotificationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutUserInput | NotificationCreateOrConnectWithoutUserInput[]
    createMany?: NotificationCreateManyUserInputEnvelope
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
  }

  export type DoctorantUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<DoctorantCreateWithoutUserInput, DoctorantUncheckedCreateWithoutUserInput>
    connectOrCreate?: DoctorantCreateOrConnectWithoutUserInput
    connect?: DoctorantWhereUniqueInput
  }

  export type MasterUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<MasterCreateWithoutUserInput, MasterUncheckedCreateWithoutUserInput>
    connectOrCreate?: MasterCreateOrConnectWithoutUserInput
    connect?: MasterWhereUniqueInput
  }

  export type EnseignantChercheurUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<EnseignantChercheurCreateWithoutUserInput, EnseignantChercheurUncheckedCreateWithoutUserInput>
    connectOrCreate?: EnseignantChercheurCreateOrConnectWithoutUserInput
    connect?: EnseignantChercheurWhereUniqueInput
  }

  export type AdminUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<AdminCreateWithoutUserInput, AdminUncheckedCreateWithoutUserInput>
    connectOrCreate?: AdminCreateOrConnectWithoutUserInput
    connect?: AdminWhereUniqueInput
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumRoleFieldUpdateOperationsInput = {
    set?: $Enums.Role
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type SessionUpdateManyWithoutUserNestedInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutUserInput | SessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutUserInput | SessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutUserInput | SessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type NotificationUpdateManyWithoutUserNestedInput = {
    create?: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput> | NotificationCreateWithoutUserInput[] | NotificationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutUserInput | NotificationCreateOrConnectWithoutUserInput[]
    upsert?: NotificationUpsertWithWhereUniqueWithoutUserInput | NotificationUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: NotificationCreateManyUserInputEnvelope
    set?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    disconnect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    delete?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    update?: NotificationUpdateWithWhereUniqueWithoutUserInput | NotificationUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: NotificationUpdateManyWithWhereWithoutUserInput | NotificationUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
  }

  export type DoctorantUpdateOneWithoutUserNestedInput = {
    create?: XOR<DoctorantCreateWithoutUserInput, DoctorantUncheckedCreateWithoutUserInput>
    connectOrCreate?: DoctorantCreateOrConnectWithoutUserInput
    upsert?: DoctorantUpsertWithoutUserInput
    disconnect?: DoctorantWhereInput | boolean
    delete?: DoctorantWhereInput | boolean
    connect?: DoctorantWhereUniqueInput
    update?: XOR<XOR<DoctorantUpdateToOneWithWhereWithoutUserInput, DoctorantUpdateWithoutUserInput>, DoctorantUncheckedUpdateWithoutUserInput>
  }

  export type MasterUpdateOneWithoutUserNestedInput = {
    create?: XOR<MasterCreateWithoutUserInput, MasterUncheckedCreateWithoutUserInput>
    connectOrCreate?: MasterCreateOrConnectWithoutUserInput
    upsert?: MasterUpsertWithoutUserInput
    disconnect?: MasterWhereInput | boolean
    delete?: MasterWhereInput | boolean
    connect?: MasterWhereUniqueInput
    update?: XOR<XOR<MasterUpdateToOneWithWhereWithoutUserInput, MasterUpdateWithoutUserInput>, MasterUncheckedUpdateWithoutUserInput>
  }

  export type EnseignantChercheurUpdateOneWithoutUserNestedInput = {
    create?: XOR<EnseignantChercheurCreateWithoutUserInput, EnseignantChercheurUncheckedCreateWithoutUserInput>
    connectOrCreate?: EnseignantChercheurCreateOrConnectWithoutUserInput
    upsert?: EnseignantChercheurUpsertWithoutUserInput
    disconnect?: EnseignantChercheurWhereInput | boolean
    delete?: EnseignantChercheurWhereInput | boolean
    connect?: EnseignantChercheurWhereUniqueInput
    update?: XOR<XOR<EnseignantChercheurUpdateToOneWithWhereWithoutUserInput, EnseignantChercheurUpdateWithoutUserInput>, EnseignantChercheurUncheckedUpdateWithoutUserInput>
  }

  export type AdminUpdateOneWithoutUserNestedInput = {
    create?: XOR<AdminCreateWithoutUserInput, AdminUncheckedCreateWithoutUserInput>
    connectOrCreate?: AdminCreateOrConnectWithoutUserInput
    upsert?: AdminUpsertWithoutUserInput
    disconnect?: AdminWhereInput | boolean
    delete?: AdminWhereInput | boolean
    connect?: AdminWhereUniqueInput
    update?: XOR<XOR<AdminUpdateToOneWithWhereWithoutUserInput, AdminUpdateWithoutUserInput>, AdminUncheckedUpdateWithoutUserInput>
  }

  export type SessionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutUserInput | SessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutUserInput | SessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutUserInput | SessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type NotificationUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput> | NotificationCreateWithoutUserInput[] | NotificationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutUserInput | NotificationCreateOrConnectWithoutUserInput[]
    upsert?: NotificationUpsertWithWhereUniqueWithoutUserInput | NotificationUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: NotificationCreateManyUserInputEnvelope
    set?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    disconnect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    delete?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    update?: NotificationUpdateWithWhereUniqueWithoutUserInput | NotificationUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: NotificationUpdateManyWithWhereWithoutUserInput | NotificationUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
  }

  export type DoctorantUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<DoctorantCreateWithoutUserInput, DoctorantUncheckedCreateWithoutUserInput>
    connectOrCreate?: DoctorantCreateOrConnectWithoutUserInput
    upsert?: DoctorantUpsertWithoutUserInput
    disconnect?: DoctorantWhereInput | boolean
    delete?: DoctorantWhereInput | boolean
    connect?: DoctorantWhereUniqueInput
    update?: XOR<XOR<DoctorantUpdateToOneWithWhereWithoutUserInput, DoctorantUpdateWithoutUserInput>, DoctorantUncheckedUpdateWithoutUserInput>
  }

  export type MasterUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<MasterCreateWithoutUserInput, MasterUncheckedCreateWithoutUserInput>
    connectOrCreate?: MasterCreateOrConnectWithoutUserInput
    upsert?: MasterUpsertWithoutUserInput
    disconnect?: MasterWhereInput | boolean
    delete?: MasterWhereInput | boolean
    connect?: MasterWhereUniqueInput
    update?: XOR<XOR<MasterUpdateToOneWithWhereWithoutUserInput, MasterUpdateWithoutUserInput>, MasterUncheckedUpdateWithoutUserInput>
  }

  export type EnseignantChercheurUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<EnseignantChercheurCreateWithoutUserInput, EnseignantChercheurUncheckedCreateWithoutUserInput>
    connectOrCreate?: EnseignantChercheurCreateOrConnectWithoutUserInput
    upsert?: EnseignantChercheurUpsertWithoutUserInput
    disconnect?: EnseignantChercheurWhereInput | boolean
    delete?: EnseignantChercheurWhereInput | boolean
    connect?: EnseignantChercheurWhereUniqueInput
    update?: XOR<XOR<EnseignantChercheurUpdateToOneWithWhereWithoutUserInput, EnseignantChercheurUpdateWithoutUserInput>, EnseignantChercheurUncheckedUpdateWithoutUserInput>
  }

  export type AdminUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<AdminCreateWithoutUserInput, AdminUncheckedCreateWithoutUserInput>
    connectOrCreate?: AdminCreateOrConnectWithoutUserInput
    upsert?: AdminUpsertWithoutUserInput
    disconnect?: AdminWhereInput | boolean
    delete?: AdminWhereInput | boolean
    connect?: AdminWhereUniqueInput
    update?: XOR<XOR<AdminUpdateToOneWithWhereWithoutUserInput, AdminUpdateWithoutUserInput>, AdminUncheckedUpdateWithoutUserInput>
  }

  export type EnseignantChercheurCreateNestedOneWithoutDoctorantsInput = {
    create?: XOR<EnseignantChercheurCreateWithoutDoctorantsInput, EnseignantChercheurUncheckedCreateWithoutDoctorantsInput>
    connectOrCreate?: EnseignantChercheurCreateOrConnectWithoutDoctorantsInput
    connect?: EnseignantChercheurWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutDoctorantInput = {
    create?: XOR<UserCreateWithoutDoctorantInput, UserUncheckedCreateWithoutDoctorantInput>
    connectOrCreate?: UserCreateOrConnectWithoutDoctorantInput
    connect?: UserWhereUniqueInput
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EnseignantChercheurUpdateOneRequiredWithoutDoctorantsNestedInput = {
    create?: XOR<EnseignantChercheurCreateWithoutDoctorantsInput, EnseignantChercheurUncheckedCreateWithoutDoctorantsInput>
    connectOrCreate?: EnseignantChercheurCreateOrConnectWithoutDoctorantsInput
    upsert?: EnseignantChercheurUpsertWithoutDoctorantsInput
    connect?: EnseignantChercheurWhereUniqueInput
    update?: XOR<XOR<EnseignantChercheurUpdateToOneWithWhereWithoutDoctorantsInput, EnseignantChercheurUpdateWithoutDoctorantsInput>, EnseignantChercheurUncheckedUpdateWithoutDoctorantsInput>
  }

  export type UserUpdateOneRequiredWithoutDoctorantNestedInput = {
    create?: XOR<UserCreateWithoutDoctorantInput, UserUncheckedCreateWithoutDoctorantInput>
    connectOrCreate?: UserCreateOrConnectWithoutDoctorantInput
    upsert?: UserUpsertWithoutDoctorantInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutDoctorantInput, UserUpdateWithoutDoctorantInput>, UserUncheckedUpdateWithoutDoctorantInput>
  }

  export type EnseignantChercheurCreateNestedOneWithoutRequestsDoctorantInput = {
    create?: XOR<EnseignantChercheurCreateWithoutRequestsDoctorantInput, EnseignantChercheurUncheckedCreateWithoutRequestsDoctorantInput>
    connectOrCreate?: EnseignantChercheurCreateOrConnectWithoutRequestsDoctorantInput
    connect?: EnseignantChercheurWhereUniqueInput
  }

  export type EnumRequestStatusFieldUpdateOperationsInput = {
    set?: $Enums.RequestStatus
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type EnseignantChercheurUpdateOneRequiredWithoutRequestsDoctorantNestedInput = {
    create?: XOR<EnseignantChercheurCreateWithoutRequestsDoctorantInput, EnseignantChercheurUncheckedCreateWithoutRequestsDoctorantInput>
    connectOrCreate?: EnseignantChercheurCreateOrConnectWithoutRequestsDoctorantInput
    upsert?: EnseignantChercheurUpsertWithoutRequestsDoctorantInput
    connect?: EnseignantChercheurWhereUniqueInput
    update?: XOR<XOR<EnseignantChercheurUpdateToOneWithWhereWithoutRequestsDoctorantInput, EnseignantChercheurUpdateWithoutRequestsDoctorantInput>, EnseignantChercheurUncheckedUpdateWithoutRequestsDoctorantInput>
  }

  export type EnseignantChercheurCreateNestedOneWithoutMastersInput = {
    create?: XOR<EnseignantChercheurCreateWithoutMastersInput, EnseignantChercheurUncheckedCreateWithoutMastersInput>
    connectOrCreate?: EnseignantChercheurCreateOrConnectWithoutMastersInput
    connect?: EnseignantChercheurWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutMasterInput = {
    create?: XOR<UserCreateWithoutMasterInput, UserUncheckedCreateWithoutMasterInput>
    connectOrCreate?: UserCreateOrConnectWithoutMasterInput
    connect?: UserWhereUniqueInput
  }

  export type EnseignantChercheurUpdateOneRequiredWithoutMastersNestedInput = {
    create?: XOR<EnseignantChercheurCreateWithoutMastersInput, EnseignantChercheurUncheckedCreateWithoutMastersInput>
    connectOrCreate?: EnseignantChercheurCreateOrConnectWithoutMastersInput
    upsert?: EnseignantChercheurUpsertWithoutMastersInput
    connect?: EnseignantChercheurWhereUniqueInput
    update?: XOR<XOR<EnseignantChercheurUpdateToOneWithWhereWithoutMastersInput, EnseignantChercheurUpdateWithoutMastersInput>, EnseignantChercheurUncheckedUpdateWithoutMastersInput>
  }

  export type UserUpdateOneRequiredWithoutMasterNestedInput = {
    create?: XOR<UserCreateWithoutMasterInput, UserUncheckedCreateWithoutMasterInput>
    connectOrCreate?: UserCreateOrConnectWithoutMasterInput
    upsert?: UserUpsertWithoutMasterInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutMasterInput, UserUpdateWithoutMasterInput>, UserUncheckedUpdateWithoutMasterInput>
  }

  export type EnseignantChercheurCreateNestedOneWithoutRequestsMasterInput = {
    create?: XOR<EnseignantChercheurCreateWithoutRequestsMasterInput, EnseignantChercheurUncheckedCreateWithoutRequestsMasterInput>
    connectOrCreate?: EnseignantChercheurCreateOrConnectWithoutRequestsMasterInput
    connect?: EnseignantChercheurWhereUniqueInput
  }

  export type EnseignantChercheurUpdateOneRequiredWithoutRequestsMasterNestedInput = {
    create?: XOR<EnseignantChercheurCreateWithoutRequestsMasterInput, EnseignantChercheurUncheckedCreateWithoutRequestsMasterInput>
    connectOrCreate?: EnseignantChercheurCreateOrConnectWithoutRequestsMasterInput
    upsert?: EnseignantChercheurUpsertWithoutRequestsMasterInput
    connect?: EnseignantChercheurWhereUniqueInput
    update?: XOR<XOR<EnseignantChercheurUpdateToOneWithWhereWithoutRequestsMasterInput, EnseignantChercheurUpdateWithoutRequestsMasterInput>, EnseignantChercheurUncheckedUpdateWithoutRequestsMasterInput>
  }

  export type DoctorantCreateNestedManyWithoutDirecteur_theseInput = {
    create?: XOR<DoctorantCreateWithoutDirecteur_theseInput, DoctorantUncheckedCreateWithoutDirecteur_theseInput> | DoctorantCreateWithoutDirecteur_theseInput[] | DoctorantUncheckedCreateWithoutDirecteur_theseInput[]
    connectOrCreate?: DoctorantCreateOrConnectWithoutDirecteur_theseInput | DoctorantCreateOrConnectWithoutDirecteur_theseInput[]
    createMany?: DoctorantCreateManyDirecteur_theseInputEnvelope
    connect?: DoctorantWhereUniqueInput | DoctorantWhereUniqueInput[]
  }

  export type MasterCreateNestedManyWithoutEncadrantInput = {
    create?: XOR<MasterCreateWithoutEncadrantInput, MasterUncheckedCreateWithoutEncadrantInput> | MasterCreateWithoutEncadrantInput[] | MasterUncheckedCreateWithoutEncadrantInput[]
    connectOrCreate?: MasterCreateOrConnectWithoutEncadrantInput | MasterCreateOrConnectWithoutEncadrantInput[]
    createMany?: MasterCreateManyEncadrantInputEnvelope
    connect?: MasterWhereUniqueInput | MasterWhereUniqueInput[]
  }

  export type RequestMasterCreateNestedManyWithoutEncadrantInput = {
    create?: XOR<RequestMasterCreateWithoutEncadrantInput, RequestMasterUncheckedCreateWithoutEncadrantInput> | RequestMasterCreateWithoutEncadrantInput[] | RequestMasterUncheckedCreateWithoutEncadrantInput[]
    connectOrCreate?: RequestMasterCreateOrConnectWithoutEncadrantInput | RequestMasterCreateOrConnectWithoutEncadrantInput[]
    createMany?: RequestMasterCreateManyEncadrantInputEnvelope
    connect?: RequestMasterWhereUniqueInput | RequestMasterWhereUniqueInput[]
  }

  export type RequestDoctorantCreateNestedManyWithoutDirecteur_theseInput = {
    create?: XOR<RequestDoctorantCreateWithoutDirecteur_theseInput, RequestDoctorantUncheckedCreateWithoutDirecteur_theseInput> | RequestDoctorantCreateWithoutDirecteur_theseInput[] | RequestDoctorantUncheckedCreateWithoutDirecteur_theseInput[]
    connectOrCreate?: RequestDoctorantCreateOrConnectWithoutDirecteur_theseInput | RequestDoctorantCreateOrConnectWithoutDirecteur_theseInput[]
    createMany?: RequestDoctorantCreateManyDirecteur_theseInputEnvelope
    connect?: RequestDoctorantWhereUniqueInput | RequestDoctorantWhereUniqueInput[]
  }

  export type UserCreateNestedOneWithoutEnseignantInput = {
    create?: XOR<UserCreateWithoutEnseignantInput, UserUncheckedCreateWithoutEnseignantInput>
    connectOrCreate?: UserCreateOrConnectWithoutEnseignantInput
    connect?: UserWhereUniqueInput
  }

  export type DoctorantUncheckedCreateNestedManyWithoutDirecteur_theseInput = {
    create?: XOR<DoctorantCreateWithoutDirecteur_theseInput, DoctorantUncheckedCreateWithoutDirecteur_theseInput> | DoctorantCreateWithoutDirecteur_theseInput[] | DoctorantUncheckedCreateWithoutDirecteur_theseInput[]
    connectOrCreate?: DoctorantCreateOrConnectWithoutDirecteur_theseInput | DoctorantCreateOrConnectWithoutDirecteur_theseInput[]
    createMany?: DoctorantCreateManyDirecteur_theseInputEnvelope
    connect?: DoctorantWhereUniqueInput | DoctorantWhereUniqueInput[]
  }

  export type MasterUncheckedCreateNestedManyWithoutEncadrantInput = {
    create?: XOR<MasterCreateWithoutEncadrantInput, MasterUncheckedCreateWithoutEncadrantInput> | MasterCreateWithoutEncadrantInput[] | MasterUncheckedCreateWithoutEncadrantInput[]
    connectOrCreate?: MasterCreateOrConnectWithoutEncadrantInput | MasterCreateOrConnectWithoutEncadrantInput[]
    createMany?: MasterCreateManyEncadrantInputEnvelope
    connect?: MasterWhereUniqueInput | MasterWhereUniqueInput[]
  }

  export type RequestMasterUncheckedCreateNestedManyWithoutEncadrantInput = {
    create?: XOR<RequestMasterCreateWithoutEncadrantInput, RequestMasterUncheckedCreateWithoutEncadrantInput> | RequestMasterCreateWithoutEncadrantInput[] | RequestMasterUncheckedCreateWithoutEncadrantInput[]
    connectOrCreate?: RequestMasterCreateOrConnectWithoutEncadrantInput | RequestMasterCreateOrConnectWithoutEncadrantInput[]
    createMany?: RequestMasterCreateManyEncadrantInputEnvelope
    connect?: RequestMasterWhereUniqueInput | RequestMasterWhereUniqueInput[]
  }

  export type RequestDoctorantUncheckedCreateNestedManyWithoutDirecteur_theseInput = {
    create?: XOR<RequestDoctorantCreateWithoutDirecteur_theseInput, RequestDoctorantUncheckedCreateWithoutDirecteur_theseInput> | RequestDoctorantCreateWithoutDirecteur_theseInput[] | RequestDoctorantUncheckedCreateWithoutDirecteur_theseInput[]
    connectOrCreate?: RequestDoctorantCreateOrConnectWithoutDirecteur_theseInput | RequestDoctorantCreateOrConnectWithoutDirecteur_theseInput[]
    createMany?: RequestDoctorantCreateManyDirecteur_theseInputEnvelope
    connect?: RequestDoctorantWhereUniqueInput | RequestDoctorantWhereUniqueInput[]
  }

  export type EnumGradeFieldUpdateOperationsInput = {
    set?: $Enums.Grade
  }

  export type DoctorantUpdateManyWithoutDirecteur_theseNestedInput = {
    create?: XOR<DoctorantCreateWithoutDirecteur_theseInput, DoctorantUncheckedCreateWithoutDirecteur_theseInput> | DoctorantCreateWithoutDirecteur_theseInput[] | DoctorantUncheckedCreateWithoutDirecteur_theseInput[]
    connectOrCreate?: DoctorantCreateOrConnectWithoutDirecteur_theseInput | DoctorantCreateOrConnectWithoutDirecteur_theseInput[]
    upsert?: DoctorantUpsertWithWhereUniqueWithoutDirecteur_theseInput | DoctorantUpsertWithWhereUniqueWithoutDirecteur_theseInput[]
    createMany?: DoctorantCreateManyDirecteur_theseInputEnvelope
    set?: DoctorantWhereUniqueInput | DoctorantWhereUniqueInput[]
    disconnect?: DoctorantWhereUniqueInput | DoctorantWhereUniqueInput[]
    delete?: DoctorantWhereUniqueInput | DoctorantWhereUniqueInput[]
    connect?: DoctorantWhereUniqueInput | DoctorantWhereUniqueInput[]
    update?: DoctorantUpdateWithWhereUniqueWithoutDirecteur_theseInput | DoctorantUpdateWithWhereUniqueWithoutDirecteur_theseInput[]
    updateMany?: DoctorantUpdateManyWithWhereWithoutDirecteur_theseInput | DoctorantUpdateManyWithWhereWithoutDirecteur_theseInput[]
    deleteMany?: DoctorantScalarWhereInput | DoctorantScalarWhereInput[]
  }

  export type MasterUpdateManyWithoutEncadrantNestedInput = {
    create?: XOR<MasterCreateWithoutEncadrantInput, MasterUncheckedCreateWithoutEncadrantInput> | MasterCreateWithoutEncadrantInput[] | MasterUncheckedCreateWithoutEncadrantInput[]
    connectOrCreate?: MasterCreateOrConnectWithoutEncadrantInput | MasterCreateOrConnectWithoutEncadrantInput[]
    upsert?: MasterUpsertWithWhereUniqueWithoutEncadrantInput | MasterUpsertWithWhereUniqueWithoutEncadrantInput[]
    createMany?: MasterCreateManyEncadrantInputEnvelope
    set?: MasterWhereUniqueInput | MasterWhereUniqueInput[]
    disconnect?: MasterWhereUniqueInput | MasterWhereUniqueInput[]
    delete?: MasterWhereUniqueInput | MasterWhereUniqueInput[]
    connect?: MasterWhereUniqueInput | MasterWhereUniqueInput[]
    update?: MasterUpdateWithWhereUniqueWithoutEncadrantInput | MasterUpdateWithWhereUniqueWithoutEncadrantInput[]
    updateMany?: MasterUpdateManyWithWhereWithoutEncadrantInput | MasterUpdateManyWithWhereWithoutEncadrantInput[]
    deleteMany?: MasterScalarWhereInput | MasterScalarWhereInput[]
  }

  export type RequestMasterUpdateManyWithoutEncadrantNestedInput = {
    create?: XOR<RequestMasterCreateWithoutEncadrantInput, RequestMasterUncheckedCreateWithoutEncadrantInput> | RequestMasterCreateWithoutEncadrantInput[] | RequestMasterUncheckedCreateWithoutEncadrantInput[]
    connectOrCreate?: RequestMasterCreateOrConnectWithoutEncadrantInput | RequestMasterCreateOrConnectWithoutEncadrantInput[]
    upsert?: RequestMasterUpsertWithWhereUniqueWithoutEncadrantInput | RequestMasterUpsertWithWhereUniqueWithoutEncadrantInput[]
    createMany?: RequestMasterCreateManyEncadrantInputEnvelope
    set?: RequestMasterWhereUniqueInput | RequestMasterWhereUniqueInput[]
    disconnect?: RequestMasterWhereUniqueInput | RequestMasterWhereUniqueInput[]
    delete?: RequestMasterWhereUniqueInput | RequestMasterWhereUniqueInput[]
    connect?: RequestMasterWhereUniqueInput | RequestMasterWhereUniqueInput[]
    update?: RequestMasterUpdateWithWhereUniqueWithoutEncadrantInput | RequestMasterUpdateWithWhereUniqueWithoutEncadrantInput[]
    updateMany?: RequestMasterUpdateManyWithWhereWithoutEncadrantInput | RequestMasterUpdateManyWithWhereWithoutEncadrantInput[]
    deleteMany?: RequestMasterScalarWhereInput | RequestMasterScalarWhereInput[]
  }

  export type RequestDoctorantUpdateManyWithoutDirecteur_theseNestedInput = {
    create?: XOR<RequestDoctorantCreateWithoutDirecteur_theseInput, RequestDoctorantUncheckedCreateWithoutDirecteur_theseInput> | RequestDoctorantCreateWithoutDirecteur_theseInput[] | RequestDoctorantUncheckedCreateWithoutDirecteur_theseInput[]
    connectOrCreate?: RequestDoctorantCreateOrConnectWithoutDirecteur_theseInput | RequestDoctorantCreateOrConnectWithoutDirecteur_theseInput[]
    upsert?: RequestDoctorantUpsertWithWhereUniqueWithoutDirecteur_theseInput | RequestDoctorantUpsertWithWhereUniqueWithoutDirecteur_theseInput[]
    createMany?: RequestDoctorantCreateManyDirecteur_theseInputEnvelope
    set?: RequestDoctorantWhereUniqueInput | RequestDoctorantWhereUniqueInput[]
    disconnect?: RequestDoctorantWhereUniqueInput | RequestDoctorantWhereUniqueInput[]
    delete?: RequestDoctorantWhereUniqueInput | RequestDoctorantWhereUniqueInput[]
    connect?: RequestDoctorantWhereUniqueInput | RequestDoctorantWhereUniqueInput[]
    update?: RequestDoctorantUpdateWithWhereUniqueWithoutDirecteur_theseInput | RequestDoctorantUpdateWithWhereUniqueWithoutDirecteur_theseInput[]
    updateMany?: RequestDoctorantUpdateManyWithWhereWithoutDirecteur_theseInput | RequestDoctorantUpdateManyWithWhereWithoutDirecteur_theseInput[]
    deleteMany?: RequestDoctorantScalarWhereInput | RequestDoctorantScalarWhereInput[]
  }

  export type UserUpdateOneRequiredWithoutEnseignantNestedInput = {
    create?: XOR<UserCreateWithoutEnseignantInput, UserUncheckedCreateWithoutEnseignantInput>
    connectOrCreate?: UserCreateOrConnectWithoutEnseignantInput
    upsert?: UserUpsertWithoutEnseignantInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutEnseignantInput, UserUpdateWithoutEnseignantInput>, UserUncheckedUpdateWithoutEnseignantInput>
  }

  export type DoctorantUncheckedUpdateManyWithoutDirecteur_theseNestedInput = {
    create?: XOR<DoctorantCreateWithoutDirecteur_theseInput, DoctorantUncheckedCreateWithoutDirecteur_theseInput> | DoctorantCreateWithoutDirecteur_theseInput[] | DoctorantUncheckedCreateWithoutDirecteur_theseInput[]
    connectOrCreate?: DoctorantCreateOrConnectWithoutDirecteur_theseInput | DoctorantCreateOrConnectWithoutDirecteur_theseInput[]
    upsert?: DoctorantUpsertWithWhereUniqueWithoutDirecteur_theseInput | DoctorantUpsertWithWhereUniqueWithoutDirecteur_theseInput[]
    createMany?: DoctorantCreateManyDirecteur_theseInputEnvelope
    set?: DoctorantWhereUniqueInput | DoctorantWhereUniqueInput[]
    disconnect?: DoctorantWhereUniqueInput | DoctorantWhereUniqueInput[]
    delete?: DoctorantWhereUniqueInput | DoctorantWhereUniqueInput[]
    connect?: DoctorantWhereUniqueInput | DoctorantWhereUniqueInput[]
    update?: DoctorantUpdateWithWhereUniqueWithoutDirecteur_theseInput | DoctorantUpdateWithWhereUniqueWithoutDirecteur_theseInput[]
    updateMany?: DoctorantUpdateManyWithWhereWithoutDirecteur_theseInput | DoctorantUpdateManyWithWhereWithoutDirecteur_theseInput[]
    deleteMany?: DoctorantScalarWhereInput | DoctorantScalarWhereInput[]
  }

  export type MasterUncheckedUpdateManyWithoutEncadrantNestedInput = {
    create?: XOR<MasterCreateWithoutEncadrantInput, MasterUncheckedCreateWithoutEncadrantInput> | MasterCreateWithoutEncadrantInput[] | MasterUncheckedCreateWithoutEncadrantInput[]
    connectOrCreate?: MasterCreateOrConnectWithoutEncadrantInput | MasterCreateOrConnectWithoutEncadrantInput[]
    upsert?: MasterUpsertWithWhereUniqueWithoutEncadrantInput | MasterUpsertWithWhereUniqueWithoutEncadrantInput[]
    createMany?: MasterCreateManyEncadrantInputEnvelope
    set?: MasterWhereUniqueInput | MasterWhereUniqueInput[]
    disconnect?: MasterWhereUniqueInput | MasterWhereUniqueInput[]
    delete?: MasterWhereUniqueInput | MasterWhereUniqueInput[]
    connect?: MasterWhereUniqueInput | MasterWhereUniqueInput[]
    update?: MasterUpdateWithWhereUniqueWithoutEncadrantInput | MasterUpdateWithWhereUniqueWithoutEncadrantInput[]
    updateMany?: MasterUpdateManyWithWhereWithoutEncadrantInput | MasterUpdateManyWithWhereWithoutEncadrantInput[]
    deleteMany?: MasterScalarWhereInput | MasterScalarWhereInput[]
  }

  export type RequestMasterUncheckedUpdateManyWithoutEncadrantNestedInput = {
    create?: XOR<RequestMasterCreateWithoutEncadrantInput, RequestMasterUncheckedCreateWithoutEncadrantInput> | RequestMasterCreateWithoutEncadrantInput[] | RequestMasterUncheckedCreateWithoutEncadrantInput[]
    connectOrCreate?: RequestMasterCreateOrConnectWithoutEncadrantInput | RequestMasterCreateOrConnectWithoutEncadrantInput[]
    upsert?: RequestMasterUpsertWithWhereUniqueWithoutEncadrantInput | RequestMasterUpsertWithWhereUniqueWithoutEncadrantInput[]
    createMany?: RequestMasterCreateManyEncadrantInputEnvelope
    set?: RequestMasterWhereUniqueInput | RequestMasterWhereUniqueInput[]
    disconnect?: RequestMasterWhereUniqueInput | RequestMasterWhereUniqueInput[]
    delete?: RequestMasterWhereUniqueInput | RequestMasterWhereUniqueInput[]
    connect?: RequestMasterWhereUniqueInput | RequestMasterWhereUniqueInput[]
    update?: RequestMasterUpdateWithWhereUniqueWithoutEncadrantInput | RequestMasterUpdateWithWhereUniqueWithoutEncadrantInput[]
    updateMany?: RequestMasterUpdateManyWithWhereWithoutEncadrantInput | RequestMasterUpdateManyWithWhereWithoutEncadrantInput[]
    deleteMany?: RequestMasterScalarWhereInput | RequestMasterScalarWhereInput[]
  }

  export type RequestDoctorantUncheckedUpdateManyWithoutDirecteur_theseNestedInput = {
    create?: XOR<RequestDoctorantCreateWithoutDirecteur_theseInput, RequestDoctorantUncheckedCreateWithoutDirecteur_theseInput> | RequestDoctorantCreateWithoutDirecteur_theseInput[] | RequestDoctorantUncheckedCreateWithoutDirecteur_theseInput[]
    connectOrCreate?: RequestDoctorantCreateOrConnectWithoutDirecteur_theseInput | RequestDoctorantCreateOrConnectWithoutDirecteur_theseInput[]
    upsert?: RequestDoctorantUpsertWithWhereUniqueWithoutDirecteur_theseInput | RequestDoctorantUpsertWithWhereUniqueWithoutDirecteur_theseInput[]
    createMany?: RequestDoctorantCreateManyDirecteur_theseInputEnvelope
    set?: RequestDoctorantWhereUniqueInput | RequestDoctorantWhereUniqueInput[]
    disconnect?: RequestDoctorantWhereUniqueInput | RequestDoctorantWhereUniqueInput[]
    delete?: RequestDoctorantWhereUniqueInput | RequestDoctorantWhereUniqueInput[]
    connect?: RequestDoctorantWhereUniqueInput | RequestDoctorantWhereUniqueInput[]
    update?: RequestDoctorantUpdateWithWhereUniqueWithoutDirecteur_theseInput | RequestDoctorantUpdateWithWhereUniqueWithoutDirecteur_theseInput[]
    updateMany?: RequestDoctorantUpdateManyWithWhereWithoutDirecteur_theseInput | RequestDoctorantUpdateManyWithWhereWithoutDirecteur_theseInput[]
    deleteMany?: RequestDoctorantScalarWhereInput | RequestDoctorantScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutAdminInput = {
    create?: XOR<UserCreateWithoutAdminInput, UserUncheckedCreateWithoutAdminInput>
    connectOrCreate?: UserCreateOrConnectWithoutAdminInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutAdminNestedInput = {
    create?: XOR<UserCreateWithoutAdminInput, UserUncheckedCreateWithoutAdminInput>
    connectOrCreate?: UserCreateOrConnectWithoutAdminInput
    upsert?: UserUpsertWithoutAdminInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAdminInput, UserUpdateWithoutAdminInput>, UserUncheckedUpdateWithoutAdminInput>
  }

  export type UserCreateNestedOneWithoutSessionsInput = {
    create?: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutSessionsNestedInput = {
    create?: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput
    upsert?: UserUpsertWithoutSessionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSessionsInput, UserUpdateWithoutSessionsInput>, UserUncheckedUpdateWithoutSessionsInput>
  }

  export type UserCreateNestedOneWithoutNotificationsInput = {
    create?: XOR<UserCreateWithoutNotificationsInput, UserUncheckedCreateWithoutNotificationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutNotificationsInput
    connect?: UserWhereUniqueInput
  }

  export type EnumNotificationStatusFieldUpdateOperationsInput = {
    set?: $Enums.NotificationStatus
  }

  export type UserUpdateOneRequiredWithoutNotificationsNestedInput = {
    create?: XOR<UserCreateWithoutNotificationsInput, UserUncheckedCreateWithoutNotificationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutNotificationsInput
    upsert?: UserUpsertWithoutNotificationsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutNotificationsInput, UserUpdateWithoutNotificationsInput>, UserUncheckedUpdateWithoutNotificationsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedEnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedEnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedEnumRequestStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.RequestStatus | EnumRequestStatusFieldRefInput<$PrismaModel>
    in?: $Enums.RequestStatus[] | ListEnumRequestStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.RequestStatus[] | ListEnumRequestStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumRequestStatusFilter<$PrismaModel> | $Enums.RequestStatus
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedEnumRequestStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RequestStatus | EnumRequestStatusFieldRefInput<$PrismaModel>
    in?: $Enums.RequestStatus[] | ListEnumRequestStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.RequestStatus[] | ListEnumRequestStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumRequestStatusWithAggregatesFilter<$PrismaModel> | $Enums.RequestStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRequestStatusFilter<$PrismaModel>
    _max?: NestedEnumRequestStatusFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedEnumGradeFilter<$PrismaModel = never> = {
    equals?: $Enums.Grade | EnumGradeFieldRefInput<$PrismaModel>
    in?: $Enums.Grade[] | ListEnumGradeFieldRefInput<$PrismaModel>
    notIn?: $Enums.Grade[] | ListEnumGradeFieldRefInput<$PrismaModel>
    not?: NestedEnumGradeFilter<$PrismaModel> | $Enums.Grade
  }

  export type NestedEnumGradeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Grade | EnumGradeFieldRefInput<$PrismaModel>
    in?: $Enums.Grade[] | ListEnumGradeFieldRefInput<$PrismaModel>
    notIn?: $Enums.Grade[] | ListEnumGradeFieldRefInput<$PrismaModel>
    not?: NestedEnumGradeWithAggregatesFilter<$PrismaModel> | $Enums.Grade
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumGradeFilter<$PrismaModel>
    _max?: NestedEnumGradeFilter<$PrismaModel>
  }

  export type NestedEnumNotificationStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationStatus | EnumNotificationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.NotificationStatus[] | ListEnumNotificationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.NotificationStatus[] | ListEnumNotificationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumNotificationStatusFilter<$PrismaModel> | $Enums.NotificationStatus
  }

  export type NestedEnumNotificationStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationStatus | EnumNotificationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.NotificationStatus[] | ListEnumNotificationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.NotificationStatus[] | ListEnumNotificationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumNotificationStatusWithAggregatesFilter<$PrismaModel> | $Enums.NotificationStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumNotificationStatusFilter<$PrismaModel>
    _max?: NestedEnumNotificationStatusFilter<$PrismaModel>
  }

  export type SessionCreateWithoutUserInput = {
    id?: string
    accessToken: string
    refreshToken: string
    machine: string
    createdAt?: Date | string
  }

  export type SessionUncheckedCreateWithoutUserInput = {
    id?: string
    accessToken: string
    refreshToken: string
    machine: string
    createdAt?: Date | string
  }

  export type SessionCreateOrConnectWithoutUserInput = {
    where: SessionWhereUniqueInput
    create: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput>
  }

  export type SessionCreateManyUserInputEnvelope = {
    data: SessionCreateManyUserInput | SessionCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type NotificationCreateWithoutUserInput = {
    message: string
    recipient: string
    status?: $Enums.NotificationStatus
    createdAt?: Date | string
  }

  export type NotificationUncheckedCreateWithoutUserInput = {
    id?: number
    message: string
    recipient: string
    status?: $Enums.NotificationStatus
    createdAt?: Date | string
  }

  export type NotificationCreateOrConnectWithoutUserInput = {
    where: NotificationWhereUniqueInput
    create: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput>
  }

  export type NotificationCreateManyUserInputEnvelope = {
    data: NotificationCreateManyUserInput | NotificationCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type DoctorantCreateWithoutUserInput = {
    id?: string
    nom: string
    prenom: string
    annee_these: number
    photo?: string | null
    directeur_these: EnseignantChercheurCreateNestedOneWithoutDoctorantsInput
  }

  export type DoctorantUncheckedCreateWithoutUserInput = {
    id?: string
    nom: string
    prenom: string
    annee_these: number
    directeur_these_id: string
    photo?: string | null
  }

  export type DoctorantCreateOrConnectWithoutUserInput = {
    where: DoctorantWhereUniqueInput
    create: XOR<DoctorantCreateWithoutUserInput, DoctorantUncheckedCreateWithoutUserInput>
  }

  export type MasterCreateWithoutUserInput = {
    id?: string
    nom: string
    prenom: string
    annee_master: number
    photo?: string | null
    encadrant: EnseignantChercheurCreateNestedOneWithoutMastersInput
  }

  export type MasterUncheckedCreateWithoutUserInput = {
    id?: string
    nom: string
    prenom: string
    encadrant_id: string
    annee_master: number
    photo?: string | null
  }

  export type MasterCreateOrConnectWithoutUserInput = {
    where: MasterWhereUniqueInput
    create: XOR<MasterCreateWithoutUserInput, MasterUncheckedCreateWithoutUserInput>
  }

  export type EnseignantChercheurCreateWithoutUserInput = {
    id?: string
    nom: string
    prenom: string
    fonction: string
    grade: $Enums.Grade
    etablissement: string
    photo?: string | null
    doctorants?: DoctorantCreateNestedManyWithoutDirecteur_theseInput
    masters?: MasterCreateNestedManyWithoutEncadrantInput
    requestsMaster?: RequestMasterCreateNestedManyWithoutEncadrantInput
    requestsDoctorant?: RequestDoctorantCreateNestedManyWithoutDirecteur_theseInput
  }

  export type EnseignantChercheurUncheckedCreateWithoutUserInput = {
    id?: string
    nom: string
    prenom: string
    fonction: string
    grade: $Enums.Grade
    etablissement: string
    photo?: string | null
    doctorants?: DoctorantUncheckedCreateNestedManyWithoutDirecteur_theseInput
    masters?: MasterUncheckedCreateNestedManyWithoutEncadrantInput
    requestsMaster?: RequestMasterUncheckedCreateNestedManyWithoutEncadrantInput
    requestsDoctorant?: RequestDoctorantUncheckedCreateNestedManyWithoutDirecteur_theseInput
  }

  export type EnseignantChercheurCreateOrConnectWithoutUserInput = {
    where: EnseignantChercheurWhereUniqueInput
    create: XOR<EnseignantChercheurCreateWithoutUserInput, EnseignantChercheurUncheckedCreateWithoutUserInput>
  }

  export type AdminCreateWithoutUserInput = {
    nom: string
    prenom: string
  }

  export type AdminUncheckedCreateWithoutUserInput = {
    id?: number
    nom: string
    prenom: string
  }

  export type AdminCreateOrConnectWithoutUserInput = {
    where: AdminWhereUniqueInput
    create: XOR<AdminCreateWithoutUserInput, AdminUncheckedCreateWithoutUserInput>
  }

  export type SessionUpsertWithWhereUniqueWithoutUserInput = {
    where: SessionWhereUniqueInput
    update: XOR<SessionUpdateWithoutUserInput, SessionUncheckedUpdateWithoutUserInput>
    create: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput>
  }

  export type SessionUpdateWithWhereUniqueWithoutUserInput = {
    where: SessionWhereUniqueInput
    data: XOR<SessionUpdateWithoutUserInput, SessionUncheckedUpdateWithoutUserInput>
  }

  export type SessionUpdateManyWithWhereWithoutUserInput = {
    where: SessionScalarWhereInput
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyWithoutUserInput>
  }

  export type SessionScalarWhereInput = {
    AND?: SessionScalarWhereInput | SessionScalarWhereInput[]
    OR?: SessionScalarWhereInput[]
    NOT?: SessionScalarWhereInput | SessionScalarWhereInput[]
    id?: StringFilter<"Session"> | string
    accessToken?: StringFilter<"Session"> | string
    refreshToken?: StringFilter<"Session"> | string
    machine?: StringFilter<"Session"> | string
    createdAt?: DateTimeFilter<"Session"> | Date | string
    userId?: StringFilter<"Session"> | string
  }

  export type NotificationUpsertWithWhereUniqueWithoutUserInput = {
    where: NotificationWhereUniqueInput
    update: XOR<NotificationUpdateWithoutUserInput, NotificationUncheckedUpdateWithoutUserInput>
    create: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput>
  }

  export type NotificationUpdateWithWhereUniqueWithoutUserInput = {
    where: NotificationWhereUniqueInput
    data: XOR<NotificationUpdateWithoutUserInput, NotificationUncheckedUpdateWithoutUserInput>
  }

  export type NotificationUpdateManyWithWhereWithoutUserInput = {
    where: NotificationScalarWhereInput
    data: XOR<NotificationUpdateManyMutationInput, NotificationUncheckedUpdateManyWithoutUserInput>
  }

  export type NotificationScalarWhereInput = {
    AND?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
    OR?: NotificationScalarWhereInput[]
    NOT?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
    id?: IntFilter<"Notification"> | number
    message?: StringFilter<"Notification"> | string
    recipient?: StringFilter<"Notification"> | string
    status?: EnumNotificationStatusFilter<"Notification"> | $Enums.NotificationStatus
    createdAt?: DateTimeFilter<"Notification"> | Date | string
    userId?: StringFilter<"Notification"> | string
  }

  export type DoctorantUpsertWithoutUserInput = {
    update: XOR<DoctorantUpdateWithoutUserInput, DoctorantUncheckedUpdateWithoutUserInput>
    create: XOR<DoctorantCreateWithoutUserInput, DoctorantUncheckedCreateWithoutUserInput>
    where?: DoctorantWhereInput
  }

  export type DoctorantUpdateToOneWithWhereWithoutUserInput = {
    where?: DoctorantWhereInput
    data: XOR<DoctorantUpdateWithoutUserInput, DoctorantUncheckedUpdateWithoutUserInput>
  }

  export type DoctorantUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    annee_these?: IntFieldUpdateOperationsInput | number
    photo?: NullableStringFieldUpdateOperationsInput | string | null
    directeur_these?: EnseignantChercheurUpdateOneRequiredWithoutDoctorantsNestedInput
  }

  export type DoctorantUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    annee_these?: IntFieldUpdateOperationsInput | number
    directeur_these_id?: StringFieldUpdateOperationsInput | string
    photo?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type MasterUpsertWithoutUserInput = {
    update: XOR<MasterUpdateWithoutUserInput, MasterUncheckedUpdateWithoutUserInput>
    create: XOR<MasterCreateWithoutUserInput, MasterUncheckedCreateWithoutUserInput>
    where?: MasterWhereInput
  }

  export type MasterUpdateToOneWithWhereWithoutUserInput = {
    where?: MasterWhereInput
    data: XOR<MasterUpdateWithoutUserInput, MasterUncheckedUpdateWithoutUserInput>
  }

  export type MasterUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    annee_master?: IntFieldUpdateOperationsInput | number
    photo?: NullableStringFieldUpdateOperationsInput | string | null
    encadrant?: EnseignantChercheurUpdateOneRequiredWithoutMastersNestedInput
  }

  export type MasterUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    encadrant_id?: StringFieldUpdateOperationsInput | string
    annee_master?: IntFieldUpdateOperationsInput | number
    photo?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type EnseignantChercheurUpsertWithoutUserInput = {
    update: XOR<EnseignantChercheurUpdateWithoutUserInput, EnseignantChercheurUncheckedUpdateWithoutUserInput>
    create: XOR<EnseignantChercheurCreateWithoutUserInput, EnseignantChercheurUncheckedCreateWithoutUserInput>
    where?: EnseignantChercheurWhereInput
  }

  export type EnseignantChercheurUpdateToOneWithWhereWithoutUserInput = {
    where?: EnseignantChercheurWhereInput
    data: XOR<EnseignantChercheurUpdateWithoutUserInput, EnseignantChercheurUncheckedUpdateWithoutUserInput>
  }

  export type EnseignantChercheurUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    fonction?: StringFieldUpdateOperationsInput | string
    grade?: EnumGradeFieldUpdateOperationsInput | $Enums.Grade
    etablissement?: StringFieldUpdateOperationsInput | string
    photo?: NullableStringFieldUpdateOperationsInput | string | null
    doctorants?: DoctorantUpdateManyWithoutDirecteur_theseNestedInput
    masters?: MasterUpdateManyWithoutEncadrantNestedInput
    requestsMaster?: RequestMasterUpdateManyWithoutEncadrantNestedInput
    requestsDoctorant?: RequestDoctorantUpdateManyWithoutDirecteur_theseNestedInput
  }

  export type EnseignantChercheurUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    fonction?: StringFieldUpdateOperationsInput | string
    grade?: EnumGradeFieldUpdateOperationsInput | $Enums.Grade
    etablissement?: StringFieldUpdateOperationsInput | string
    photo?: NullableStringFieldUpdateOperationsInput | string | null
    doctorants?: DoctorantUncheckedUpdateManyWithoutDirecteur_theseNestedInput
    masters?: MasterUncheckedUpdateManyWithoutEncadrantNestedInput
    requestsMaster?: RequestMasterUncheckedUpdateManyWithoutEncadrantNestedInput
    requestsDoctorant?: RequestDoctorantUncheckedUpdateManyWithoutDirecteur_theseNestedInput
  }

  export type AdminUpsertWithoutUserInput = {
    update: XOR<AdminUpdateWithoutUserInput, AdminUncheckedUpdateWithoutUserInput>
    create: XOR<AdminCreateWithoutUserInput, AdminUncheckedCreateWithoutUserInput>
    where?: AdminWhereInput
  }

  export type AdminUpdateToOneWithWhereWithoutUserInput = {
    where?: AdminWhereInput
    data: XOR<AdminUpdateWithoutUserInput, AdminUncheckedUpdateWithoutUserInput>
  }

  export type AdminUpdateWithoutUserInput = {
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
  }

  export type AdminUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
  }

  export type EnseignantChercheurCreateWithoutDoctorantsInput = {
    id?: string
    nom: string
    prenom: string
    fonction: string
    grade: $Enums.Grade
    etablissement: string
    photo?: string | null
    masters?: MasterCreateNestedManyWithoutEncadrantInput
    requestsMaster?: RequestMasterCreateNestedManyWithoutEncadrantInput
    requestsDoctorant?: RequestDoctorantCreateNestedManyWithoutDirecteur_theseInput
    user: UserCreateNestedOneWithoutEnseignantInput
  }

  export type EnseignantChercheurUncheckedCreateWithoutDoctorantsInput = {
    id?: string
    nom: string
    prenom: string
    fonction: string
    grade: $Enums.Grade
    etablissement: string
    photo?: string | null
    userId: string
    masters?: MasterUncheckedCreateNestedManyWithoutEncadrantInput
    requestsMaster?: RequestMasterUncheckedCreateNestedManyWithoutEncadrantInput
    requestsDoctorant?: RequestDoctorantUncheckedCreateNestedManyWithoutDirecteur_theseInput
  }

  export type EnseignantChercheurCreateOrConnectWithoutDoctorantsInput = {
    where: EnseignantChercheurWhereUniqueInput
    create: XOR<EnseignantChercheurCreateWithoutDoctorantsInput, EnseignantChercheurUncheckedCreateWithoutDoctorantsInput>
  }

  export type UserCreateWithoutDoctorantInput = {
    id?: string
    email: string
    password: string
    role: $Enums.Role
    createdAt?: Date | string
    bankData?: string | null
    signature?: string | null
    sessions?: SessionCreateNestedManyWithoutUserInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
    master?: MasterCreateNestedOneWithoutUserInput
    enseignant?: EnseignantChercheurCreateNestedOneWithoutUserInput
    admin?: AdminCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateWithoutDoctorantInput = {
    id?: string
    email: string
    password: string
    role: $Enums.Role
    createdAt?: Date | string
    bankData?: string | null
    signature?: string | null
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
    master?: MasterUncheckedCreateNestedOneWithoutUserInput
    enseignant?: EnseignantChercheurUncheckedCreateNestedOneWithoutUserInput
    admin?: AdminUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserCreateOrConnectWithoutDoctorantInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutDoctorantInput, UserUncheckedCreateWithoutDoctorantInput>
  }

  export type EnseignantChercheurUpsertWithoutDoctorantsInput = {
    update: XOR<EnseignantChercheurUpdateWithoutDoctorantsInput, EnseignantChercheurUncheckedUpdateWithoutDoctorantsInput>
    create: XOR<EnseignantChercheurCreateWithoutDoctorantsInput, EnseignantChercheurUncheckedCreateWithoutDoctorantsInput>
    where?: EnseignantChercheurWhereInput
  }

  export type EnseignantChercheurUpdateToOneWithWhereWithoutDoctorantsInput = {
    where?: EnseignantChercheurWhereInput
    data: XOR<EnseignantChercheurUpdateWithoutDoctorantsInput, EnseignantChercheurUncheckedUpdateWithoutDoctorantsInput>
  }

  export type EnseignantChercheurUpdateWithoutDoctorantsInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    fonction?: StringFieldUpdateOperationsInput | string
    grade?: EnumGradeFieldUpdateOperationsInput | $Enums.Grade
    etablissement?: StringFieldUpdateOperationsInput | string
    photo?: NullableStringFieldUpdateOperationsInput | string | null
    masters?: MasterUpdateManyWithoutEncadrantNestedInput
    requestsMaster?: RequestMasterUpdateManyWithoutEncadrantNestedInput
    requestsDoctorant?: RequestDoctorantUpdateManyWithoutDirecteur_theseNestedInput
    user?: UserUpdateOneRequiredWithoutEnseignantNestedInput
  }

  export type EnseignantChercheurUncheckedUpdateWithoutDoctorantsInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    fonction?: StringFieldUpdateOperationsInput | string
    grade?: EnumGradeFieldUpdateOperationsInput | $Enums.Grade
    etablissement?: StringFieldUpdateOperationsInput | string
    photo?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
    masters?: MasterUncheckedUpdateManyWithoutEncadrantNestedInput
    requestsMaster?: RequestMasterUncheckedUpdateManyWithoutEncadrantNestedInput
    requestsDoctorant?: RequestDoctorantUncheckedUpdateManyWithoutDirecteur_theseNestedInput
  }

  export type UserUpsertWithoutDoctorantInput = {
    update: XOR<UserUpdateWithoutDoctorantInput, UserUncheckedUpdateWithoutDoctorantInput>
    create: XOR<UserCreateWithoutDoctorantInput, UserUncheckedCreateWithoutDoctorantInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutDoctorantInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutDoctorantInput, UserUncheckedUpdateWithoutDoctorantInput>
  }

  export type UserUpdateWithoutDoctorantInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bankData?: NullableStringFieldUpdateOperationsInput | string | null
    signature?: NullableStringFieldUpdateOperationsInput | string | null
    sessions?: SessionUpdateManyWithoutUserNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
    master?: MasterUpdateOneWithoutUserNestedInput
    enseignant?: EnseignantChercheurUpdateOneWithoutUserNestedInput
    admin?: AdminUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutDoctorantInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bankData?: NullableStringFieldUpdateOperationsInput | string | null
    signature?: NullableStringFieldUpdateOperationsInput | string | null
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    master?: MasterUncheckedUpdateOneWithoutUserNestedInput
    enseignant?: EnseignantChercheurUncheckedUpdateOneWithoutUserNestedInput
    admin?: AdminUncheckedUpdateOneWithoutUserNestedInput
  }

  export type EnseignantChercheurCreateWithoutRequestsDoctorantInput = {
    id?: string
    nom: string
    prenom: string
    fonction: string
    grade: $Enums.Grade
    etablissement: string
    photo?: string | null
    doctorants?: DoctorantCreateNestedManyWithoutDirecteur_theseInput
    masters?: MasterCreateNestedManyWithoutEncadrantInput
    requestsMaster?: RequestMasterCreateNestedManyWithoutEncadrantInput
    user: UserCreateNestedOneWithoutEnseignantInput
  }

  export type EnseignantChercheurUncheckedCreateWithoutRequestsDoctorantInput = {
    id?: string
    nom: string
    prenom: string
    fonction: string
    grade: $Enums.Grade
    etablissement: string
    photo?: string | null
    userId: string
    doctorants?: DoctorantUncheckedCreateNestedManyWithoutDirecteur_theseInput
    masters?: MasterUncheckedCreateNestedManyWithoutEncadrantInput
    requestsMaster?: RequestMasterUncheckedCreateNestedManyWithoutEncadrantInput
  }

  export type EnseignantChercheurCreateOrConnectWithoutRequestsDoctorantInput = {
    where: EnseignantChercheurWhereUniqueInput
    create: XOR<EnseignantChercheurCreateWithoutRequestsDoctorantInput, EnseignantChercheurUncheckedCreateWithoutRequestsDoctorantInput>
  }

  export type EnseignantChercheurUpsertWithoutRequestsDoctorantInput = {
    update: XOR<EnseignantChercheurUpdateWithoutRequestsDoctorantInput, EnseignantChercheurUncheckedUpdateWithoutRequestsDoctorantInput>
    create: XOR<EnseignantChercheurCreateWithoutRequestsDoctorantInput, EnseignantChercheurUncheckedCreateWithoutRequestsDoctorantInput>
    where?: EnseignantChercheurWhereInput
  }

  export type EnseignantChercheurUpdateToOneWithWhereWithoutRequestsDoctorantInput = {
    where?: EnseignantChercheurWhereInput
    data: XOR<EnseignantChercheurUpdateWithoutRequestsDoctorantInput, EnseignantChercheurUncheckedUpdateWithoutRequestsDoctorantInput>
  }

  export type EnseignantChercheurUpdateWithoutRequestsDoctorantInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    fonction?: StringFieldUpdateOperationsInput | string
    grade?: EnumGradeFieldUpdateOperationsInput | $Enums.Grade
    etablissement?: StringFieldUpdateOperationsInput | string
    photo?: NullableStringFieldUpdateOperationsInput | string | null
    doctorants?: DoctorantUpdateManyWithoutDirecteur_theseNestedInput
    masters?: MasterUpdateManyWithoutEncadrantNestedInput
    requestsMaster?: RequestMasterUpdateManyWithoutEncadrantNestedInput
    user?: UserUpdateOneRequiredWithoutEnseignantNestedInput
  }

  export type EnseignantChercheurUncheckedUpdateWithoutRequestsDoctorantInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    fonction?: StringFieldUpdateOperationsInput | string
    grade?: EnumGradeFieldUpdateOperationsInput | $Enums.Grade
    etablissement?: StringFieldUpdateOperationsInput | string
    photo?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
    doctorants?: DoctorantUncheckedUpdateManyWithoutDirecteur_theseNestedInput
    masters?: MasterUncheckedUpdateManyWithoutEncadrantNestedInput
    requestsMaster?: RequestMasterUncheckedUpdateManyWithoutEncadrantNestedInput
  }

  export type EnseignantChercheurCreateWithoutMastersInput = {
    id?: string
    nom: string
    prenom: string
    fonction: string
    grade: $Enums.Grade
    etablissement: string
    photo?: string | null
    doctorants?: DoctorantCreateNestedManyWithoutDirecteur_theseInput
    requestsMaster?: RequestMasterCreateNestedManyWithoutEncadrantInput
    requestsDoctorant?: RequestDoctorantCreateNestedManyWithoutDirecteur_theseInput
    user: UserCreateNestedOneWithoutEnseignantInput
  }

  export type EnseignantChercheurUncheckedCreateWithoutMastersInput = {
    id?: string
    nom: string
    prenom: string
    fonction: string
    grade: $Enums.Grade
    etablissement: string
    photo?: string | null
    userId: string
    doctorants?: DoctorantUncheckedCreateNestedManyWithoutDirecteur_theseInput
    requestsMaster?: RequestMasterUncheckedCreateNestedManyWithoutEncadrantInput
    requestsDoctorant?: RequestDoctorantUncheckedCreateNestedManyWithoutDirecteur_theseInput
  }

  export type EnseignantChercheurCreateOrConnectWithoutMastersInput = {
    where: EnseignantChercheurWhereUniqueInput
    create: XOR<EnseignantChercheurCreateWithoutMastersInput, EnseignantChercheurUncheckedCreateWithoutMastersInput>
  }

  export type UserCreateWithoutMasterInput = {
    id?: string
    email: string
    password: string
    role: $Enums.Role
    createdAt?: Date | string
    bankData?: string | null
    signature?: string | null
    sessions?: SessionCreateNestedManyWithoutUserInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
    doctorant?: DoctorantCreateNestedOneWithoutUserInput
    enseignant?: EnseignantChercheurCreateNestedOneWithoutUserInput
    admin?: AdminCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateWithoutMasterInput = {
    id?: string
    email: string
    password: string
    role: $Enums.Role
    createdAt?: Date | string
    bankData?: string | null
    signature?: string | null
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
    doctorant?: DoctorantUncheckedCreateNestedOneWithoutUserInput
    enseignant?: EnseignantChercheurUncheckedCreateNestedOneWithoutUserInput
    admin?: AdminUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserCreateOrConnectWithoutMasterInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutMasterInput, UserUncheckedCreateWithoutMasterInput>
  }

  export type EnseignantChercheurUpsertWithoutMastersInput = {
    update: XOR<EnseignantChercheurUpdateWithoutMastersInput, EnseignantChercheurUncheckedUpdateWithoutMastersInput>
    create: XOR<EnseignantChercheurCreateWithoutMastersInput, EnseignantChercheurUncheckedCreateWithoutMastersInput>
    where?: EnseignantChercheurWhereInput
  }

  export type EnseignantChercheurUpdateToOneWithWhereWithoutMastersInput = {
    where?: EnseignantChercheurWhereInput
    data: XOR<EnseignantChercheurUpdateWithoutMastersInput, EnseignantChercheurUncheckedUpdateWithoutMastersInput>
  }

  export type EnseignantChercheurUpdateWithoutMastersInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    fonction?: StringFieldUpdateOperationsInput | string
    grade?: EnumGradeFieldUpdateOperationsInput | $Enums.Grade
    etablissement?: StringFieldUpdateOperationsInput | string
    photo?: NullableStringFieldUpdateOperationsInput | string | null
    doctorants?: DoctorantUpdateManyWithoutDirecteur_theseNestedInput
    requestsMaster?: RequestMasterUpdateManyWithoutEncadrantNestedInput
    requestsDoctorant?: RequestDoctorantUpdateManyWithoutDirecteur_theseNestedInput
    user?: UserUpdateOneRequiredWithoutEnseignantNestedInput
  }

  export type EnseignantChercheurUncheckedUpdateWithoutMastersInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    fonction?: StringFieldUpdateOperationsInput | string
    grade?: EnumGradeFieldUpdateOperationsInput | $Enums.Grade
    etablissement?: StringFieldUpdateOperationsInput | string
    photo?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
    doctorants?: DoctorantUncheckedUpdateManyWithoutDirecteur_theseNestedInput
    requestsMaster?: RequestMasterUncheckedUpdateManyWithoutEncadrantNestedInput
    requestsDoctorant?: RequestDoctorantUncheckedUpdateManyWithoutDirecteur_theseNestedInput
  }

  export type UserUpsertWithoutMasterInput = {
    update: XOR<UserUpdateWithoutMasterInput, UserUncheckedUpdateWithoutMasterInput>
    create: XOR<UserCreateWithoutMasterInput, UserUncheckedCreateWithoutMasterInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutMasterInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutMasterInput, UserUncheckedUpdateWithoutMasterInput>
  }

  export type UserUpdateWithoutMasterInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bankData?: NullableStringFieldUpdateOperationsInput | string | null
    signature?: NullableStringFieldUpdateOperationsInput | string | null
    sessions?: SessionUpdateManyWithoutUserNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
    doctorant?: DoctorantUpdateOneWithoutUserNestedInput
    enseignant?: EnseignantChercheurUpdateOneWithoutUserNestedInput
    admin?: AdminUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutMasterInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bankData?: NullableStringFieldUpdateOperationsInput | string | null
    signature?: NullableStringFieldUpdateOperationsInput | string | null
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    doctorant?: DoctorantUncheckedUpdateOneWithoutUserNestedInput
    enseignant?: EnseignantChercheurUncheckedUpdateOneWithoutUserNestedInput
    admin?: AdminUncheckedUpdateOneWithoutUserNestedInput
  }

  export type EnseignantChercheurCreateWithoutRequestsMasterInput = {
    id?: string
    nom: string
    prenom: string
    fonction: string
    grade: $Enums.Grade
    etablissement: string
    photo?: string | null
    doctorants?: DoctorantCreateNestedManyWithoutDirecteur_theseInput
    masters?: MasterCreateNestedManyWithoutEncadrantInput
    requestsDoctorant?: RequestDoctorantCreateNestedManyWithoutDirecteur_theseInput
    user: UserCreateNestedOneWithoutEnseignantInput
  }

  export type EnseignantChercheurUncheckedCreateWithoutRequestsMasterInput = {
    id?: string
    nom: string
    prenom: string
    fonction: string
    grade: $Enums.Grade
    etablissement: string
    photo?: string | null
    userId: string
    doctorants?: DoctorantUncheckedCreateNestedManyWithoutDirecteur_theseInput
    masters?: MasterUncheckedCreateNestedManyWithoutEncadrantInput
    requestsDoctorant?: RequestDoctorantUncheckedCreateNestedManyWithoutDirecteur_theseInput
  }

  export type EnseignantChercheurCreateOrConnectWithoutRequestsMasterInput = {
    where: EnseignantChercheurWhereUniqueInput
    create: XOR<EnseignantChercheurCreateWithoutRequestsMasterInput, EnseignantChercheurUncheckedCreateWithoutRequestsMasterInput>
  }

  export type EnseignantChercheurUpsertWithoutRequestsMasterInput = {
    update: XOR<EnseignantChercheurUpdateWithoutRequestsMasterInput, EnseignantChercheurUncheckedUpdateWithoutRequestsMasterInput>
    create: XOR<EnseignantChercheurCreateWithoutRequestsMasterInput, EnseignantChercheurUncheckedCreateWithoutRequestsMasterInput>
    where?: EnseignantChercheurWhereInput
  }

  export type EnseignantChercheurUpdateToOneWithWhereWithoutRequestsMasterInput = {
    where?: EnseignantChercheurWhereInput
    data: XOR<EnseignantChercheurUpdateWithoutRequestsMasterInput, EnseignantChercheurUncheckedUpdateWithoutRequestsMasterInput>
  }

  export type EnseignantChercheurUpdateWithoutRequestsMasterInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    fonction?: StringFieldUpdateOperationsInput | string
    grade?: EnumGradeFieldUpdateOperationsInput | $Enums.Grade
    etablissement?: StringFieldUpdateOperationsInput | string
    photo?: NullableStringFieldUpdateOperationsInput | string | null
    doctorants?: DoctorantUpdateManyWithoutDirecteur_theseNestedInput
    masters?: MasterUpdateManyWithoutEncadrantNestedInput
    requestsDoctorant?: RequestDoctorantUpdateManyWithoutDirecteur_theseNestedInput
    user?: UserUpdateOneRequiredWithoutEnseignantNestedInput
  }

  export type EnseignantChercheurUncheckedUpdateWithoutRequestsMasterInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    fonction?: StringFieldUpdateOperationsInput | string
    grade?: EnumGradeFieldUpdateOperationsInput | $Enums.Grade
    etablissement?: StringFieldUpdateOperationsInput | string
    photo?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
    doctorants?: DoctorantUncheckedUpdateManyWithoutDirecteur_theseNestedInput
    masters?: MasterUncheckedUpdateManyWithoutEncadrantNestedInput
    requestsDoctorant?: RequestDoctorantUncheckedUpdateManyWithoutDirecteur_theseNestedInput
  }

  export type DoctorantCreateWithoutDirecteur_theseInput = {
    id?: string
    nom: string
    prenom: string
    annee_these: number
    photo?: string | null
    user: UserCreateNestedOneWithoutDoctorantInput
  }

  export type DoctorantUncheckedCreateWithoutDirecteur_theseInput = {
    id?: string
    nom: string
    prenom: string
    annee_these: number
    photo?: string | null
    userId: string
  }

  export type DoctorantCreateOrConnectWithoutDirecteur_theseInput = {
    where: DoctorantWhereUniqueInput
    create: XOR<DoctorantCreateWithoutDirecteur_theseInput, DoctorantUncheckedCreateWithoutDirecteur_theseInput>
  }

  export type DoctorantCreateManyDirecteur_theseInputEnvelope = {
    data: DoctorantCreateManyDirecteur_theseInput | DoctorantCreateManyDirecteur_theseInput[]
    skipDuplicates?: boolean
  }

  export type MasterCreateWithoutEncadrantInput = {
    id?: string
    nom: string
    prenom: string
    annee_master: number
    photo?: string | null
    user: UserCreateNestedOneWithoutMasterInput
  }

  export type MasterUncheckedCreateWithoutEncadrantInput = {
    id?: string
    nom: string
    prenom: string
    annee_master: number
    photo?: string | null
    userId: string
  }

  export type MasterCreateOrConnectWithoutEncadrantInput = {
    where: MasterWhereUniqueInput
    create: XOR<MasterCreateWithoutEncadrantInput, MasterUncheckedCreateWithoutEncadrantInput>
  }

  export type MasterCreateManyEncadrantInputEnvelope = {
    data: MasterCreateManyEncadrantInput | MasterCreateManyEncadrantInput[]
    skipDuplicates?: boolean
  }

  export type RequestMasterCreateWithoutEncadrantInput = {
    id?: string
    nom: string
    prenom: string
    email: string
    annee_master: number
    createdAt?: Date | string
    status?: $Enums.RequestStatus
    rejectionReason?: string | null
    photo?: string | null
    isConfirm?: boolean
  }

  export type RequestMasterUncheckedCreateWithoutEncadrantInput = {
    id?: string
    nom: string
    prenom: string
    email: string
    annee_master: number
    createdAt?: Date | string
    status?: $Enums.RequestStatus
    rejectionReason?: string | null
    photo?: string | null
    isConfirm?: boolean
  }

  export type RequestMasterCreateOrConnectWithoutEncadrantInput = {
    where: RequestMasterWhereUniqueInput
    create: XOR<RequestMasterCreateWithoutEncadrantInput, RequestMasterUncheckedCreateWithoutEncadrantInput>
  }

  export type RequestMasterCreateManyEncadrantInputEnvelope = {
    data: RequestMasterCreateManyEncadrantInput | RequestMasterCreateManyEncadrantInput[]
    skipDuplicates?: boolean
  }

  export type RequestDoctorantCreateWithoutDirecteur_theseInput = {
    id?: string
    nom: string
    prenom: string
    email: string
    annee_these: number
    createdAt?: Date | string
    status?: $Enums.RequestStatus
    rejectionReason?: string | null
    photo?: string | null
    isConfirm?: boolean
  }

  export type RequestDoctorantUncheckedCreateWithoutDirecteur_theseInput = {
    id?: string
    nom: string
    prenom: string
    email: string
    annee_these: number
    createdAt?: Date | string
    status?: $Enums.RequestStatus
    rejectionReason?: string | null
    photo?: string | null
    isConfirm?: boolean
  }

  export type RequestDoctorantCreateOrConnectWithoutDirecteur_theseInput = {
    where: RequestDoctorantWhereUniqueInput
    create: XOR<RequestDoctorantCreateWithoutDirecteur_theseInput, RequestDoctorantUncheckedCreateWithoutDirecteur_theseInput>
  }

  export type RequestDoctorantCreateManyDirecteur_theseInputEnvelope = {
    data: RequestDoctorantCreateManyDirecteur_theseInput | RequestDoctorantCreateManyDirecteur_theseInput[]
    skipDuplicates?: boolean
  }

  export type UserCreateWithoutEnseignantInput = {
    id?: string
    email: string
    password: string
    role: $Enums.Role
    createdAt?: Date | string
    bankData?: string | null
    signature?: string | null
    sessions?: SessionCreateNestedManyWithoutUserInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
    doctorant?: DoctorantCreateNestedOneWithoutUserInput
    master?: MasterCreateNestedOneWithoutUserInput
    admin?: AdminCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateWithoutEnseignantInput = {
    id?: string
    email: string
    password: string
    role: $Enums.Role
    createdAt?: Date | string
    bankData?: string | null
    signature?: string | null
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
    doctorant?: DoctorantUncheckedCreateNestedOneWithoutUserInput
    master?: MasterUncheckedCreateNestedOneWithoutUserInput
    admin?: AdminUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserCreateOrConnectWithoutEnseignantInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutEnseignantInput, UserUncheckedCreateWithoutEnseignantInput>
  }

  export type DoctorantUpsertWithWhereUniqueWithoutDirecteur_theseInput = {
    where: DoctorantWhereUniqueInput
    update: XOR<DoctorantUpdateWithoutDirecteur_theseInput, DoctorantUncheckedUpdateWithoutDirecteur_theseInput>
    create: XOR<DoctorantCreateWithoutDirecteur_theseInput, DoctorantUncheckedCreateWithoutDirecteur_theseInput>
  }

  export type DoctorantUpdateWithWhereUniqueWithoutDirecteur_theseInput = {
    where: DoctorantWhereUniqueInput
    data: XOR<DoctorantUpdateWithoutDirecteur_theseInput, DoctorantUncheckedUpdateWithoutDirecteur_theseInput>
  }

  export type DoctorantUpdateManyWithWhereWithoutDirecteur_theseInput = {
    where: DoctorantScalarWhereInput
    data: XOR<DoctorantUpdateManyMutationInput, DoctorantUncheckedUpdateManyWithoutDirecteur_theseInput>
  }

  export type DoctorantScalarWhereInput = {
    AND?: DoctorantScalarWhereInput | DoctorantScalarWhereInput[]
    OR?: DoctorantScalarWhereInput[]
    NOT?: DoctorantScalarWhereInput | DoctorantScalarWhereInput[]
    id?: StringFilter<"Doctorant"> | string
    nom?: StringFilter<"Doctorant"> | string
    prenom?: StringFilter<"Doctorant"> | string
    annee_these?: IntFilter<"Doctorant"> | number
    directeur_these_id?: StringFilter<"Doctorant"> | string
    photo?: StringNullableFilter<"Doctorant"> | string | null
    userId?: StringFilter<"Doctorant"> | string
  }

  export type MasterUpsertWithWhereUniqueWithoutEncadrantInput = {
    where: MasterWhereUniqueInput
    update: XOR<MasterUpdateWithoutEncadrantInput, MasterUncheckedUpdateWithoutEncadrantInput>
    create: XOR<MasterCreateWithoutEncadrantInput, MasterUncheckedCreateWithoutEncadrantInput>
  }

  export type MasterUpdateWithWhereUniqueWithoutEncadrantInput = {
    where: MasterWhereUniqueInput
    data: XOR<MasterUpdateWithoutEncadrantInput, MasterUncheckedUpdateWithoutEncadrantInput>
  }

  export type MasterUpdateManyWithWhereWithoutEncadrantInput = {
    where: MasterScalarWhereInput
    data: XOR<MasterUpdateManyMutationInput, MasterUncheckedUpdateManyWithoutEncadrantInput>
  }

  export type MasterScalarWhereInput = {
    AND?: MasterScalarWhereInput | MasterScalarWhereInput[]
    OR?: MasterScalarWhereInput[]
    NOT?: MasterScalarWhereInput | MasterScalarWhereInput[]
    id?: StringFilter<"Master"> | string
    nom?: StringFilter<"Master"> | string
    prenom?: StringFilter<"Master"> | string
    encadrant_id?: StringFilter<"Master"> | string
    annee_master?: IntFilter<"Master"> | number
    photo?: StringNullableFilter<"Master"> | string | null
    userId?: StringFilter<"Master"> | string
  }

  export type RequestMasterUpsertWithWhereUniqueWithoutEncadrantInput = {
    where: RequestMasterWhereUniqueInput
    update: XOR<RequestMasterUpdateWithoutEncadrantInput, RequestMasterUncheckedUpdateWithoutEncadrantInput>
    create: XOR<RequestMasterCreateWithoutEncadrantInput, RequestMasterUncheckedCreateWithoutEncadrantInput>
  }

  export type RequestMasterUpdateWithWhereUniqueWithoutEncadrantInput = {
    where: RequestMasterWhereUniqueInput
    data: XOR<RequestMasterUpdateWithoutEncadrantInput, RequestMasterUncheckedUpdateWithoutEncadrantInput>
  }

  export type RequestMasterUpdateManyWithWhereWithoutEncadrantInput = {
    where: RequestMasterScalarWhereInput
    data: XOR<RequestMasterUpdateManyMutationInput, RequestMasterUncheckedUpdateManyWithoutEncadrantInput>
  }

  export type RequestMasterScalarWhereInput = {
    AND?: RequestMasterScalarWhereInput | RequestMasterScalarWhereInput[]
    OR?: RequestMasterScalarWhereInput[]
    NOT?: RequestMasterScalarWhereInput | RequestMasterScalarWhereInput[]
    id?: StringFilter<"RequestMaster"> | string
    nom?: StringFilter<"RequestMaster"> | string
    prenom?: StringFilter<"RequestMaster"> | string
    email?: StringFilter<"RequestMaster"> | string
    annee_master?: IntFilter<"RequestMaster"> | number
    createdAt?: DateTimeFilter<"RequestMaster"> | Date | string
    encadrant_id?: StringFilter<"RequestMaster"> | string
    status?: EnumRequestStatusFilter<"RequestMaster"> | $Enums.RequestStatus
    rejectionReason?: StringNullableFilter<"RequestMaster"> | string | null
    photo?: StringNullableFilter<"RequestMaster"> | string | null
    isConfirm?: BoolFilter<"RequestMaster"> | boolean
  }

  export type RequestDoctorantUpsertWithWhereUniqueWithoutDirecteur_theseInput = {
    where: RequestDoctorantWhereUniqueInput
    update: XOR<RequestDoctorantUpdateWithoutDirecteur_theseInput, RequestDoctorantUncheckedUpdateWithoutDirecteur_theseInput>
    create: XOR<RequestDoctorantCreateWithoutDirecteur_theseInput, RequestDoctorantUncheckedCreateWithoutDirecteur_theseInput>
  }

  export type RequestDoctorantUpdateWithWhereUniqueWithoutDirecteur_theseInput = {
    where: RequestDoctorantWhereUniqueInput
    data: XOR<RequestDoctorantUpdateWithoutDirecteur_theseInput, RequestDoctorantUncheckedUpdateWithoutDirecteur_theseInput>
  }

  export type RequestDoctorantUpdateManyWithWhereWithoutDirecteur_theseInput = {
    where: RequestDoctorantScalarWhereInput
    data: XOR<RequestDoctorantUpdateManyMutationInput, RequestDoctorantUncheckedUpdateManyWithoutDirecteur_theseInput>
  }

  export type RequestDoctorantScalarWhereInput = {
    AND?: RequestDoctorantScalarWhereInput | RequestDoctorantScalarWhereInput[]
    OR?: RequestDoctorantScalarWhereInput[]
    NOT?: RequestDoctorantScalarWhereInput | RequestDoctorantScalarWhereInput[]
    id?: StringFilter<"RequestDoctorant"> | string
    nom?: StringFilter<"RequestDoctorant"> | string
    prenom?: StringFilter<"RequestDoctorant"> | string
    email?: StringFilter<"RequestDoctorant"> | string
    annee_these?: IntFilter<"RequestDoctorant"> | number
    createdAt?: DateTimeFilter<"RequestDoctorant"> | Date | string
    directeur_these_id?: StringFilter<"RequestDoctorant"> | string
    status?: EnumRequestStatusFilter<"RequestDoctorant"> | $Enums.RequestStatus
    rejectionReason?: StringNullableFilter<"RequestDoctorant"> | string | null
    photo?: StringNullableFilter<"RequestDoctorant"> | string | null
    isConfirm?: BoolFilter<"RequestDoctorant"> | boolean
  }

  export type UserUpsertWithoutEnseignantInput = {
    update: XOR<UserUpdateWithoutEnseignantInput, UserUncheckedUpdateWithoutEnseignantInput>
    create: XOR<UserCreateWithoutEnseignantInput, UserUncheckedCreateWithoutEnseignantInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutEnseignantInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutEnseignantInput, UserUncheckedUpdateWithoutEnseignantInput>
  }

  export type UserUpdateWithoutEnseignantInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bankData?: NullableStringFieldUpdateOperationsInput | string | null
    signature?: NullableStringFieldUpdateOperationsInput | string | null
    sessions?: SessionUpdateManyWithoutUserNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
    doctorant?: DoctorantUpdateOneWithoutUserNestedInput
    master?: MasterUpdateOneWithoutUserNestedInput
    admin?: AdminUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutEnseignantInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bankData?: NullableStringFieldUpdateOperationsInput | string | null
    signature?: NullableStringFieldUpdateOperationsInput | string | null
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    doctorant?: DoctorantUncheckedUpdateOneWithoutUserNestedInput
    master?: MasterUncheckedUpdateOneWithoutUserNestedInput
    admin?: AdminUncheckedUpdateOneWithoutUserNestedInput
  }

  export type UserCreateWithoutAdminInput = {
    id?: string
    email: string
    password: string
    role: $Enums.Role
    createdAt?: Date | string
    bankData?: string | null
    signature?: string | null
    sessions?: SessionCreateNestedManyWithoutUserInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
    doctorant?: DoctorantCreateNestedOneWithoutUserInput
    master?: MasterCreateNestedOneWithoutUserInput
    enseignant?: EnseignantChercheurCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateWithoutAdminInput = {
    id?: string
    email: string
    password: string
    role: $Enums.Role
    createdAt?: Date | string
    bankData?: string | null
    signature?: string | null
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
    doctorant?: DoctorantUncheckedCreateNestedOneWithoutUserInput
    master?: MasterUncheckedCreateNestedOneWithoutUserInput
    enseignant?: EnseignantChercheurUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserCreateOrConnectWithoutAdminInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAdminInput, UserUncheckedCreateWithoutAdminInput>
  }

  export type UserUpsertWithoutAdminInput = {
    update: XOR<UserUpdateWithoutAdminInput, UserUncheckedUpdateWithoutAdminInput>
    create: XOR<UserCreateWithoutAdminInput, UserUncheckedCreateWithoutAdminInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAdminInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAdminInput, UserUncheckedUpdateWithoutAdminInput>
  }

  export type UserUpdateWithoutAdminInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bankData?: NullableStringFieldUpdateOperationsInput | string | null
    signature?: NullableStringFieldUpdateOperationsInput | string | null
    sessions?: SessionUpdateManyWithoutUserNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
    doctorant?: DoctorantUpdateOneWithoutUserNestedInput
    master?: MasterUpdateOneWithoutUserNestedInput
    enseignant?: EnseignantChercheurUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutAdminInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bankData?: NullableStringFieldUpdateOperationsInput | string | null
    signature?: NullableStringFieldUpdateOperationsInput | string | null
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    doctorant?: DoctorantUncheckedUpdateOneWithoutUserNestedInput
    master?: MasterUncheckedUpdateOneWithoutUserNestedInput
    enseignant?: EnseignantChercheurUncheckedUpdateOneWithoutUserNestedInput
  }

  export type UserCreateWithoutSessionsInput = {
    id?: string
    email: string
    password: string
    role: $Enums.Role
    createdAt?: Date | string
    bankData?: string | null
    signature?: string | null
    notifications?: NotificationCreateNestedManyWithoutUserInput
    doctorant?: DoctorantCreateNestedOneWithoutUserInput
    master?: MasterCreateNestedOneWithoutUserInput
    enseignant?: EnseignantChercheurCreateNestedOneWithoutUserInput
    admin?: AdminCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateWithoutSessionsInput = {
    id?: string
    email: string
    password: string
    role: $Enums.Role
    createdAt?: Date | string
    bankData?: string | null
    signature?: string | null
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
    doctorant?: DoctorantUncheckedCreateNestedOneWithoutUserInput
    master?: MasterUncheckedCreateNestedOneWithoutUserInput
    enseignant?: EnseignantChercheurUncheckedCreateNestedOneWithoutUserInput
    admin?: AdminUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserCreateOrConnectWithoutSessionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
  }

  export type UserUpsertWithoutSessionsInput = {
    update: XOR<UserUpdateWithoutSessionsInput, UserUncheckedUpdateWithoutSessionsInput>
    create: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSessionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSessionsInput, UserUncheckedUpdateWithoutSessionsInput>
  }

  export type UserUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bankData?: NullableStringFieldUpdateOperationsInput | string | null
    signature?: NullableStringFieldUpdateOperationsInput | string | null
    notifications?: NotificationUpdateManyWithoutUserNestedInput
    doctorant?: DoctorantUpdateOneWithoutUserNestedInput
    master?: MasterUpdateOneWithoutUserNestedInput
    enseignant?: EnseignantChercheurUpdateOneWithoutUserNestedInput
    admin?: AdminUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bankData?: NullableStringFieldUpdateOperationsInput | string | null
    signature?: NullableStringFieldUpdateOperationsInput | string | null
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    doctorant?: DoctorantUncheckedUpdateOneWithoutUserNestedInput
    master?: MasterUncheckedUpdateOneWithoutUserNestedInput
    enseignant?: EnseignantChercheurUncheckedUpdateOneWithoutUserNestedInput
    admin?: AdminUncheckedUpdateOneWithoutUserNestedInput
  }

  export type UserCreateWithoutNotificationsInput = {
    id?: string
    email: string
    password: string
    role: $Enums.Role
    createdAt?: Date | string
    bankData?: string | null
    signature?: string | null
    sessions?: SessionCreateNestedManyWithoutUserInput
    doctorant?: DoctorantCreateNestedOneWithoutUserInput
    master?: MasterCreateNestedOneWithoutUserInput
    enseignant?: EnseignantChercheurCreateNestedOneWithoutUserInput
    admin?: AdminCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateWithoutNotificationsInput = {
    id?: string
    email: string
    password: string
    role: $Enums.Role
    createdAt?: Date | string
    bankData?: string | null
    signature?: string | null
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    doctorant?: DoctorantUncheckedCreateNestedOneWithoutUserInput
    master?: MasterUncheckedCreateNestedOneWithoutUserInput
    enseignant?: EnseignantChercheurUncheckedCreateNestedOneWithoutUserInput
    admin?: AdminUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserCreateOrConnectWithoutNotificationsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutNotificationsInput, UserUncheckedCreateWithoutNotificationsInput>
  }

  export type UserUpsertWithoutNotificationsInput = {
    update: XOR<UserUpdateWithoutNotificationsInput, UserUncheckedUpdateWithoutNotificationsInput>
    create: XOR<UserCreateWithoutNotificationsInput, UserUncheckedCreateWithoutNotificationsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutNotificationsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutNotificationsInput, UserUncheckedUpdateWithoutNotificationsInput>
  }

  export type UserUpdateWithoutNotificationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bankData?: NullableStringFieldUpdateOperationsInput | string | null
    signature?: NullableStringFieldUpdateOperationsInput | string | null
    sessions?: SessionUpdateManyWithoutUserNestedInput
    doctorant?: DoctorantUpdateOneWithoutUserNestedInput
    master?: MasterUpdateOneWithoutUserNestedInput
    enseignant?: EnseignantChercheurUpdateOneWithoutUserNestedInput
    admin?: AdminUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutNotificationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bankData?: NullableStringFieldUpdateOperationsInput | string | null
    signature?: NullableStringFieldUpdateOperationsInput | string | null
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    doctorant?: DoctorantUncheckedUpdateOneWithoutUserNestedInput
    master?: MasterUncheckedUpdateOneWithoutUserNestedInput
    enseignant?: EnseignantChercheurUncheckedUpdateOneWithoutUserNestedInput
    admin?: AdminUncheckedUpdateOneWithoutUserNestedInput
  }

  export type SessionCreateManyUserInput = {
    id?: string
    accessToken: string
    refreshToken: string
    machine: string
    createdAt?: Date | string
  }

  export type NotificationCreateManyUserInput = {
    id?: number
    message: string
    recipient: string
    status?: $Enums.NotificationStatus
    createdAt?: Date | string
  }

  export type SessionUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    accessToken?: StringFieldUpdateOperationsInput | string
    refreshToken?: StringFieldUpdateOperationsInput | string
    machine?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    accessToken?: StringFieldUpdateOperationsInput | string
    refreshToken?: StringFieldUpdateOperationsInput | string
    machine?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    accessToken?: StringFieldUpdateOperationsInput | string
    refreshToken?: StringFieldUpdateOperationsInput | string
    machine?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationUpdateWithoutUserInput = {
    message?: StringFieldUpdateOperationsInput | string
    recipient?: StringFieldUpdateOperationsInput | string
    status?: EnumNotificationStatusFieldUpdateOperationsInput | $Enums.NotificationStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    message?: StringFieldUpdateOperationsInput | string
    recipient?: StringFieldUpdateOperationsInput | string
    status?: EnumNotificationStatusFieldUpdateOperationsInput | $Enums.NotificationStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    message?: StringFieldUpdateOperationsInput | string
    recipient?: StringFieldUpdateOperationsInput | string
    status?: EnumNotificationStatusFieldUpdateOperationsInput | $Enums.NotificationStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DoctorantCreateManyDirecteur_theseInput = {
    id?: string
    nom: string
    prenom: string
    annee_these: number
    photo?: string | null
    userId: string
  }

  export type MasterCreateManyEncadrantInput = {
    id?: string
    nom: string
    prenom: string
    annee_master: number
    photo?: string | null
    userId: string
  }

  export type RequestMasterCreateManyEncadrantInput = {
    id?: string
    nom: string
    prenom: string
    email: string
    annee_master: number
    createdAt?: Date | string
    status?: $Enums.RequestStatus
    rejectionReason?: string | null
    photo?: string | null
    isConfirm?: boolean
  }

  export type RequestDoctorantCreateManyDirecteur_theseInput = {
    id?: string
    nom: string
    prenom: string
    email: string
    annee_these: number
    createdAt?: Date | string
    status?: $Enums.RequestStatus
    rejectionReason?: string | null
    photo?: string | null
    isConfirm?: boolean
  }

  export type DoctorantUpdateWithoutDirecteur_theseInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    annee_these?: IntFieldUpdateOperationsInput | number
    photo?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneRequiredWithoutDoctorantNestedInput
  }

  export type DoctorantUncheckedUpdateWithoutDirecteur_theseInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    annee_these?: IntFieldUpdateOperationsInput | number
    photo?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type DoctorantUncheckedUpdateManyWithoutDirecteur_theseInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    annee_these?: IntFieldUpdateOperationsInput | number
    photo?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type MasterUpdateWithoutEncadrantInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    annee_master?: IntFieldUpdateOperationsInput | number
    photo?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneRequiredWithoutMasterNestedInput
  }

  export type MasterUncheckedUpdateWithoutEncadrantInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    annee_master?: IntFieldUpdateOperationsInput | number
    photo?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type MasterUncheckedUpdateManyWithoutEncadrantInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    annee_master?: IntFieldUpdateOperationsInput | number
    photo?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type RequestMasterUpdateWithoutEncadrantInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    annee_master?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumRequestStatusFieldUpdateOperationsInput | $Enums.RequestStatus
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    photo?: NullableStringFieldUpdateOperationsInput | string | null
    isConfirm?: BoolFieldUpdateOperationsInput | boolean
  }

  export type RequestMasterUncheckedUpdateWithoutEncadrantInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    annee_master?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumRequestStatusFieldUpdateOperationsInput | $Enums.RequestStatus
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    photo?: NullableStringFieldUpdateOperationsInput | string | null
    isConfirm?: BoolFieldUpdateOperationsInput | boolean
  }

  export type RequestMasterUncheckedUpdateManyWithoutEncadrantInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    annee_master?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumRequestStatusFieldUpdateOperationsInput | $Enums.RequestStatus
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    photo?: NullableStringFieldUpdateOperationsInput | string | null
    isConfirm?: BoolFieldUpdateOperationsInput | boolean
  }

  export type RequestDoctorantUpdateWithoutDirecteur_theseInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    annee_these?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumRequestStatusFieldUpdateOperationsInput | $Enums.RequestStatus
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    photo?: NullableStringFieldUpdateOperationsInput | string | null
    isConfirm?: BoolFieldUpdateOperationsInput | boolean
  }

  export type RequestDoctorantUncheckedUpdateWithoutDirecteur_theseInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    annee_these?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumRequestStatusFieldUpdateOperationsInput | $Enums.RequestStatus
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    photo?: NullableStringFieldUpdateOperationsInput | string | null
    isConfirm?: BoolFieldUpdateOperationsInput | boolean
  }

  export type RequestDoctorantUncheckedUpdateManyWithoutDirecteur_theseInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    annee_these?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumRequestStatusFieldUpdateOperationsInput | $Enums.RequestStatus
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    photo?: NullableStringFieldUpdateOperationsInput | string | null
    isConfirm?: BoolFieldUpdateOperationsInput | boolean
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}