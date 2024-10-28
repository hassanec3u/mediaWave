import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserDao } from '../user/dao/UserDao';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../user/schema/userSchema';

@Module({
  imports: [
    JwtModule.register({
      secret: 'secretKey',
      signOptions: { expiresIn: '1h' },
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [AuthService, UserDao],
  controllers: [AuthController],
})
export class AuthModule {}