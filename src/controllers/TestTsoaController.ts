import { Body, Controller, Get, Post, Route } from "tsoa";
import User, { IUser } from "../models/User";
import { hashPassword } from "../utils/pwdUtils";
import { CreateUserDtoIn, CreateUserDtoOut } from "../dto/CreateUserDto";

@Route('testTsoa')
export class TestTsoaController extends Controller {
    /**
     * Crée un nouvel utilisateur.
     * @param userDto Les détails de l'utilisateur à créer
     * @returns Les détails de l'utilisateur créé
     */
    @Get('')
    public async testTsoa(): Promise<string> {

        return "coucou";
    }
}
