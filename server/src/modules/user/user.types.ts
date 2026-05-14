import type { Role } from "../../../generated/prisma/enums";

export type CreateUserDTO = {
    name: string;
    email: string;
    password: string;
    role: Role;
};

export type UpdateUserDTO = {
    name?: string;
    email?: string;
    password?: string;
    role: Role;
};
