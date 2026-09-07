import { Request, Response } from 'express';
import { AdminModel } from './Admin.model';
import { asyncHandler } from '../../common/utils/asyncHandler';
import { AppError } from '../../common/utils/AppError';
import { comparePassword } from '../../common/utils/password';
import { signToken } from '../../common/utils/jwt';
import { sendSuccess } from '../../common/utils/apiResponse';
import { LoginInput } from './auth.validator';

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body as LoginInput;
  const admin = await AdminModel.findByEmail(email);
  if (!admin) throw new AppError('Invalid email or password', 401);
  const isMatch = await comparePassword(password, admin.password);
  if (!isMatch) throw new AppError('Invalid email or password', 401);
  const token = signToken({ adminId: admin.id, email: admin.email });
  return sendSuccess(res, 200, 'Login successful', {
    token,
    admin: { id: admin.id, name: admin.name, email: admin.email },
  });
});

export const getProfile = asyncHandler(async (req: Request, res: Response) => {
  const admin = await AdminModel.findById(req.admin!.adminId);
  if (!admin) throw new AppError('Admin not found', 404);
  return sendSuccess(res, 200, 'Profile fetched', {
    id: admin.id,
    name: admin.name,
    email: admin.email,
  });
});
