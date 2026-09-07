import { Request, Response } from 'express';
import { EnquiryModel } from './Enquiry.model';
import { asyncHandler } from '../../common/utils/asyncHandler';
import { AppError } from '../../common/utils/AppError';
import { sendSuccess } from '../../common/utils/apiResponse';
import {
  CreateEnquiryInput,
  ListQueryInput,
  UpdateEnquiryInput,
} from './enquiry.validator';

function parseId(raw: string): number {
  const id = parseInt(raw, 10);
  if (Number.isNaN(id)) throw new AppError('Invalid enquiry id', 400);
  return id;
}

export const createEnquiry = asyncHandler(
  async (req: Request, res: Response) => {
    const input = req.body as CreateEnquiryInput;
    const enquiry = await EnquiryModel.create(input);
    return sendSuccess(
      res,
      201,
      'Enquiry submitted successfully. We will get back to you soon!',
      enquiry,
    );
  },
);

export const getAllEnquiries = asyncHandler(
  async (req: Request, res: Response) => {
    const query = req.query as unknown as ListQueryInput;
    const result = await EnquiryModel.findAll(query);
    return sendSuccess(res, 200, 'Enquiries fetched', result);
  },
);

export const getEnquiryById = asyncHandler(
  async (req: Request, res: Response) => {
    const enquiry = await EnquiryModel.findById(parseId(req.params.id));
    if (!enquiry) throw new AppError('Enquiry not found', 404);
    return sendSuccess(res, 200, 'Enquiry fetched', enquiry);
  },
);

export const updateEnquiry = asyncHandler(
  async (req: Request, res: Response) => {
    const id = parseId(req.params.id);
    const existing = await EnquiryModel.findById(id);
    if (!existing) throw new AppError('Enquiry not found', 404);
    const updated = await EnquiryModel.update(
      id,
      req.body as UpdateEnquiryInput,
    );
    return sendSuccess(res, 200, 'Enquiry updated successfully', updated);
  },
);

export const deleteEnquiry = asyncHandler(
  async (req: Request, res: Response) => {
    const deleted = await EnquiryModel.delete(parseId(req.params.id));
    if (!deleted) throw new AppError('Enquiry not found', 404);
    return sendSuccess(res, 200, 'Enquiry deleted successfully');
  },
);
