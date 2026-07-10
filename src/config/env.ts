import dotenv from 'dotenv';
import { Service } from 'typedi';
import {
  InferOutput,
  check,
  object,
  optional,
  parse,
  picklist,
  pipe,
  string,
  transform,
} from 'valibot';

dotenv.config();

@Service()
export class ConfigService {
  public static readonly envSchema = object({
    NODE_ENV: optional(picklist(['development', 'test', 'production']), 'development'),
    PORT: pipe(
      optional(string(), '3000'),
      check((value) => /^\d+$/.test(value), 'PORT must be a positive integer.'),
      transform((value) => Number(value)),
      check((value) => Number.isInteger(value) && value > 0, 'PORT must be a positive integer.'),
    ),
    CLIENT_ORIGIN: pipe(
      optional(string()),
      transform((value) => {
        if (value === undefined || value === 'true') {
          return true;
        }

        if (value === 'false') {
          return false;
        }

        return value;
      }),
      check(
        (value) => typeof value === 'boolean' || (typeof value === 'string' && value.length > 0),
        'CLIENT_ORIGIN must be true, false, or a non-empty origin string.',
      ),
    ),
  });

  private readonly values = parse(ConfigService.envSchema, {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
    CLIENT_ORIGIN: process.env.CLIENT_ORIGIN,
  });

  public get NODE_ENV() {
    return this.values.NODE_ENV;
  }

  public get PORT() {
    return this.values.PORT;
  }

  public get CLIENT_ORIGIN() {
    return this.values.CLIENT_ORIGIN;
  }

  public get<Key extends keyof EnvValues>(key: Key): EnvValues[Key] | undefined {
    return this.values[key];
  }

  public getOrThrow<Key extends keyof EnvValues>(key: Key): EnvValues[Key] {
    const value = this.get(key);

    if (value === undefined) {
      throw new Error(`Missing required config value: ${String(key)}`);
    }

    return value;
  }
}

type EnvValues = InferOutput<typeof ConfigService.envSchema>;
