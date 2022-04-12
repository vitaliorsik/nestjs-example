import {Body, Controller, Get, Post, UseGuards, UsePipes} from '@nestjs/common';
import {CreateUserDto} from "./dto/create-user.dto";
import {UsersService} from "./users.service";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {User} from "./users.model";
import {Roles} from "../auth/role-auth.decorator";
import {RolesGuard} from "../auth/roles.guard";
import {AddRoleDto} from "./dto/add-role.dto";
import {BanUserDto} from "./dto/ban-user.dto";
import {ValidationPipe} from "../pipes/validation.pipe";

@ApiTags('Users')
@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) {
    }

    @ApiOperation({summary: 'Create user'})
    @ApiResponse({status: 200, type: User})
    @UsePipes(ValidationPipe)
    @Post()
    create(@Body() userDto: CreateUserDto) {
        return this.usersService.createUser(userDto);
    }


    @ApiOperation({summary: 'Get All Users'})
    @ApiResponse({status: 200, type: [User]})
    @Get()
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    getAll() {
        return this.usersService.getAllUsers();
    }


    @ApiOperation({summary: 'Add Role to user'})
    @ApiResponse({status: 200})
    @Post('/role')
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    addRole(@Body() dto: AddRoleDto) {
        return this.usersService.addRole(dto);
    }


    @ApiOperation({summary: 'ban user'})
    @ApiResponse({status: 200})
    @Post('/ban')
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    ban(@Body() dto: BanUserDto) {
        return this.usersService.ban(dto);
    }
}
