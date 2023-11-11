import { Body, Controller, Delete, Patch, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from '../../guards/jwt-guard';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { use } from 'passport';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiTags('API')
  @ApiResponse({status: 200, type: UpdateUserDto})
  @UseGuards(JwtAuthGuard)
  @Patch()
  updateUser(@Body() updateDto: UpdateUserDto, @Req() request): Promise<UpdateUserDto> {
    const user = request.user
    return this.usersService.updateUser(user.email, updateDto)
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  deleteUser (@Req() request) {
    const user = request.user
    return this.usersService.deleteUser(user.email)
  }
}
