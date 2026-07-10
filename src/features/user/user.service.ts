import { ConfigService } from '@src/config';
import { Logger } from '@src/utils';
import { Service } from 'typedi';

@Service()
export class UserService {
  constructor(private readonly configService: ConfigService, private readonly logger: Logger) {}

  public getUsers() {
    this.logger.info('Listing users.');

    return {
      message: 'List users endpoint is ready.',
      meta: {
        environment: this.configService.NODE_ENV,
      },
    };
  }

  public getUserById(id: string) {
    this.logger.info({ userId: id }, 'Fetching user by id.');

    return {
      message: 'Get user by id endpoint is ready.',
      data: {
        id,
      },
    };
  }

  public createUser(payload: unknown) {
    this.logger.info({ payload }, 'Creating user.');

    return {
      message: 'Create user endpoint is ready.',
      data: payload,
    };
  }

  public updateUserById(id: string, updates: unknown) {
    this.logger.info({ updates, userId: id }, 'Updating user by id.');

    return {
      message: 'Update user by id endpoint is ready.',
      data: {
        id,
        updates,
      },
    };
  }

  public getUserProfile(id: string) {
    this.logger.info({ userId: id }, 'Fetching user profile.');

    return {
      message: 'Get user profile endpoint is ready.',
      data: {
        id,
        profileComplete: false,
      },
    };
  }
}
