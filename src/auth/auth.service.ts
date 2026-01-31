import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    pass: string,
  ): Promise<Partial<User> | null> {
    const user = (await this.usersService.find({ email }))[0];
    if (user && this.dehash(pass, user.password)) {
      const { password: _pass, ...result } = user;
      return result;
    }
    return null;
  }

  signToken(user: { email: string; userId: number }) {
    const payload = { email: user.email, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  hash(password: string) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  }

  dehash(password: string, hashedPassword: string) {
    return bcrypt.compareSync(password, hashedPassword);
  }
}
