'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ProtectedRoute } from '@/components/admin/ProtectedRoute';
import { DashboardHeader } from '@/components/admin/DashboardHeader';
import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { Alert } from '@/components/ui/Alert';
import { Spinner } from '@/components/ui/Spinner';
import { api, ApiRequestError } from '@/lib/api';
import { Enquiry, EnquiryFormValues } from '@/lib/types';
import { ENQUIRY_SERVICE_OPTIONS } from '@/lib/constants';
import { enquirySchema, getFieldErrors } from '@/lib/validation';

function EnquiryDetailContent() {
  const params = useParams<{ id: string }>();
  const router = useRouter();

  const [enquiry, setEnquiry] = useState<Enquiry | null>(null);
  const [form, setForm] = useState<EnquiryFormValues & { status: string }>({
    full_name: '',
    email: '',
    phone: '',
    company_name: '',
    service: '',
    message: '',
    status: 'new',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [loadError, setLoadError] = useState('');
  const [saveMessage, setSaveMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const data = await api.get<Enquiry>(`/enquiries/${params.id}`, {
          auth: true,
        });
        setEnquiry(data);
        setForm({
          full_name: data.full_name,
          email: data.email,
          phone: data.phone,
          company_name: data.company_name,
          service: data.service,
          message: data.message,
          status: data.status,
        });
      } catch (err) {
        setLoadError(
          err instanceof ApiRequestError
            ? err.message
            : 'Failed to load enquiry',
        );
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [params.id]);

  function handleChange(field: keyof typeof form, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSave() {
    setSaveMessage(null);
    const { status, ...rest } = form;
    const fieldErrors = getFieldErrors(enquirySchema, rest);
    setErrors(fieldErrors);
    if (Object.keys(fieldErrors).length > 0) return;

    setSaving(true);
    try {
      const updated = await api.put<Enquiry>(`/enquiries/${params.id}`, form, {
        auth: true,
      });
      setEnquiry(updated);
      setSaveMessage({
        type: 'success',
        text: 'Enquiry updated successfully.',
      });
    } catch (err) {
      setSaveMessage({
        type: 'error',
        text:
          err instanceof ApiRequestError
            ? err.message
            : 'Failed to update enquiry',
      });
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!confirm('Delete this enquiry? This cannot be undone.')) return;
    setDeleting(true);
    try {
      await api.delete(`/enquiries/${params.id}`, { auth: true });
      router.push('/admin/dashboard');
    } catch (err) {
      setSaveMessage({
        type: 'error',
        text:
          err instanceof ApiRequestError
            ? err.message
            : 'Failed to delete enquiry',
      });
      setDeleting(false);
    }
  }

  return (
    <>
      <DashboardHeader />
      <Container className="max-w-3xl space-y-6 py-8">
        <div className="flex items-center justify-between">
          <div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push('/admin/dashboard')}
            >
              ← Back to list
            </Button>
            <h1 className="mt-2 text-2xl font-bold text-slate-900">
              Enquiry #{params.id}
            </h1>
          </div>
          {enquiry && (
            <p className="text-xs text-slate-500">
              Submitted {new Date(enquiry.created_at).toLocaleString()}
            </p>
          )}
        </div>

        {loading ? (
          <div className="flex justify-center py-16 text-primary-600">
            <Spinner className="h-8 w-8" />
          </div>
        ) : loadError ? (
          <Alert variant="error">{loadError}</Alert>
        ) : (
          <Card className="space-y-5">
            {saveMessage && (
              <Alert variant={saveMessage.type}>{saveMessage.text}</Alert>
            )}

            <div className="grid gap-5 sm:grid-cols-2">
              <Input
                label="Full Name"
                value={form.full_name}
                onChange={(e) => handleChange('full_name', e.target.value)}
                error={errors.full_name}
              />
              <Input
                label="Email Address"
                type="email"
                value={form.email}
                onChange={(e) => handleChange('email', e.target.value)}
                error={errors.email}
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <Input
                label="Phone Number"
                value={form.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                error={errors.phone}
              />
              <Input
                label="Company Name"
                value={form.company_name}
                onChange={(e) => handleChange('company_name', e.target.value)}
                error={errors.company_name}
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <Select
                label="Service Interested In"
                options={ENQUIRY_SERVICE_OPTIONS as unknown as string[]}
                value={form.service}
                onChange={(e) => handleChange('service', e.target.value)}
                error={errors.service}
              />
              <Select
                label="Status"
                options={[
                  { value: 'new', label: 'New' },
                  { value: 'in_progress', label: 'In Progress' },
                  { value: 'resolved', label: 'Resolved' },
                ]}
                value={form.status}
                onChange={(e) => handleChange('status', e.target.value)}
              />
            </div>

            <Textarea
              label="Message"
              value={form.message}
              onChange={(e) => handleChange('message', e.target.value)}
              error={errors.message}
            />

            <div className="flex flex-wrap justify-between gap-3 pt-2">
              <Button
                variant="danger"
                onClick={handleDelete}
                disabled={deleting}
              >
                {deleting ? 'Deleting...' : 'Delete Enquiry'}
              </Button>
              <Button onClick={handleSave} disabled={saving}>
                {saving ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </Card>
        )}
      </Container>
    </>
  );
}

export default function EnquiryDetailPage() {
  return (
    <ProtectedRoute>
      <EnquiryDetailContent />
    </ProtectedRoute>
  );
}
