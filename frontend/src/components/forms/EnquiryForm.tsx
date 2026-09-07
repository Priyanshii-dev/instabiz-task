'use client';

import { FormEvent, useState } from 'react';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import { Toast } from '../ui/Toast';
import { ENQUIRY_SERVICE_OPTIONS } from '@/lib/constants';
import { enquirySchema, getFieldErrors } from '@/lib/validation';
import { EnquiryFormValues } from '@/lib/types';
import { api, ApiRequestError } from '@/lib/api';

const initialValues: EnquiryFormValues = {
  full_name: '',
  email: '',
  phone: '',
  company_name: '',
  service: '',
  message: '',
};

/**
 * Public enquiry form (Website -> Backend API -> Database).
 * Validates on the client for instant feedback; the backend re-validates
 * everything again before writing to the database.
 */
export function EnquiryForm() {
  const [values, setValues] = useState<EnquiryFormValues>(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [serverMessage, setServerMessage] = useState<string>('');

  function handleChange(field: keyof EnquiryFormValues, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus('idle');

    const fieldErrors = getFieldErrors(enquirySchema, values);
    setErrors(fieldErrors);
    if (Object.keys(fieldErrors).length > 0) return;

    setSubmitting(true);
    try {
      const response = await api.postWithResponse('/enquiries', values);
      setStatus('success');
      setServerMessage(response.message);
      setValues(initialValues);
    } catch (err) {
      setStatus('error');
      setServerMessage(
        err instanceof ApiRequestError
          ? err.message
          : 'Something went wrong. Please try again.',
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {status === 'success' && <Toast variant="success">{serverMessage}</Toast>}
      {status === 'error' && <Toast variant="error">{serverMessage}</Toast>}

      <div className="grid gap-5 sm:grid-cols-2">
        <Input
          label="Full Name"
          name="full_name"
          placeholder="Jane Doe"
          value={values.full_name}
          onChange={(e) => handleChange('full_name', e.target.value)}
          error={errors.full_name}
        />
        <Input
          label="Email Address"
          type="email"
          name="email"
          placeholder="jane@company.com"
          value={values.email}
          onChange={(e) => handleChange('email', e.target.value)}
          error={errors.email}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Input
          label="Phone Number"
          name="phone"
          placeholder="+91 98765 43210"
          value={values.phone}
          onChange={(e) => handleChange('phone', e.target.value)}
          error={errors.phone}
        />
        <Input
          label="Company Name"
          name="company_name"
          placeholder="Acme Inc."
          value={values.company_name}
          onChange={(e) => handleChange('company_name', e.target.value)}
          error={errors.company_name}
        />
      </div>

      <Select
        label="Service Interested In"
        name="service"
        placeholder="Select a service"
        options={ENQUIRY_SERVICE_OPTIONS as unknown as string[]}
        value={values.service}
        onChange={(e) => handleChange('service', e.target.value)}
        error={errors.service}
      />

      <Textarea
        label="Message"
        name="message"
        placeholder="Tell us a bit about what you need..."
        value={values.message}
        onChange={(e) => handleChange('message', e.target.value)}
        error={errors.message}
      />

      <Button type="submit" size="lg" fullWidth disabled={submitting}>
        {submitting ? 'Submitting...' : 'Submit Enquiry'}
      </Button>
    </form>
  );
}
