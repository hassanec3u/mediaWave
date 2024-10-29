import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/createUserDto.';
import { LoginUserDto } from '../user/dto/LoginUserDto';

/**
 * AuthController handles the authentication-related HTTP requests.
 */
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    /**
     * Registers a new user.
     *
     * @param {CreateUserDto} createUserDto - Data Transfer Object containing user registration details.
     * @returns {Promise<void>} A promise that resolves when the user is registered.
     */
    @Post('register')
    register(@Body() createUserDto: CreateUserDto) {
        return this.authService.register(createUserDto);
    }

    /**
     * Logs in a user.
     *
     * @param {LoginUserDto} loginDto - Data Transfer Object containing user login details.
     * @returns {Promise<{ access_token: string }>} A promise that resolves to an object containing the JWT access token.
     */
    @Post('login')
    login(@Body() loginDto: LoginUserDto) {
        return this.authService.login(loginDto);
    }
}
