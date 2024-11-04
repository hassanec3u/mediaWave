import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/createUserDto.';
import { LoginUserDto } from '../user/dto/LoginUserDto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {
    }

    @Post('register')
    @ApiOperation({summary: 'Enregistrer un nouvel utilisateur'})
    @ApiResponse({status: 201, description: 'Utilisateur enregistré avec succès.'})
    @ApiResponse({status: 400, description: 'Requête invalide.'})
    register(@Body() createUserDto: CreateUserDto) {
        return this.authService.register(createUserDto);
    }

    @Post('login')
    @ApiOperation({summary: 'Connecter un utilisateur'})
    @ApiResponse({status: 200, description: 'Utilisateur connecté avec succès.'})
    @ApiResponse({status: 401, description: 'Identifiants invalides.'})
    login(@Body() loginDto: LoginUserDto) {
        return this.authService.login(loginDto);
    }
}