import { User } from '../../models/user.model';

export interface IUserRepository {
  create(user: Partial<User>): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
}
