import { Router } from 'express'
import { login, logout, refresh } from './auth.controller'
import { validate } from '../../middlewares/validate.middleware'
import { LoginSchema } from './auth.validator'

export const authRoutes = Router()

authRoutes.post('/login', validate(LoginSchema), login)
authRoutes.post('/logout', logout)
authRoutes.post('/refresh', refresh)
