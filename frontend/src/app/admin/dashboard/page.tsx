'use client';

import { useCallback, useEffect, useState } from 'react';
import { ProtectedRoute } from '@/components/admin/ProtectedRoute';
import { DashboardHeader } from '@/components/admin/DashboardHeader';
import { EnquiryTable } from '@/components/admin/EnquiryTable';
import {
  EnquiryFilters,
  FilterValues,
} from '@/components/admin/EnquiryFilters';
import { Pagination } from '@/components/admin/Pagination';
import { Container } from '@/components/ui/Container';
import { Spinner } from '@/components/ui/Spinner';
import { Alert } from '@/components/ui/Alert';
import { api, ApiRequestError } from '@/lib/api';
import { Enquiry, PaginatedResult } from '@/lib/types';

function DashboardContent() {
  const [result, setResult] = useState<PaginatedResult<Enquiry> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState<FilterValues>({
    search: '',
    service: '',
    status: '',
  });
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const fetchEnquiries = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await api.get<PaginatedResult<Enquiry>>('/enquiries', {
        auth: true,
        query: {
          page,
          limit: 10,
          search: filters.search,
          service: filters.service,
          status: filters.status,
        },
      });
      setResult(data);
    } catch (err) {
      setError(
        err instanceof ApiRequestError
          ? err.message
          : 'Failed to load enquiries',
      );
    } finally {
      setLoading(false);
    }
  }, [page, filters]);

  useEffect(() => {
    fetchEnquiries();
  }, [fetchEnquiries]);

  // Reset to page 1 whenever filters change
  function handleFilterChange(next: FilterValues) {
    setFilters(next);
    setPage(1);
  }

  async function handleDelete(id: number) {
    if (!confirm('Delete this enquiry? This cannot be undone.')) return;
    setDeletingId(id);
    try {
      await api.delete(`/enquiries/${id}`, { auth: true });
      fetchEnquiries();
    } catch (err) {
      alert(
        err instanceof ApiRequestError
          ? err.message
          : 'Failed to delete enquiry',
      );
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <>
      <DashboardHeader />
      <Container className="space-y-6 py-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Enquiries</h1>
          <p className="text-sm text-slate-500">
            {result
              ? `${result.total} total enquiries`
              : 'Loading enquiries...'}
          </p>
        </div>

        <EnquiryFilters values={filters} onChange={handleFilterChange} />

        {error && <Alert variant="error">{error}</Alert>}

        {loading ? (
          <div className="flex justify-center py-16 text-primary-600">
            <Spinner className="h-8 w-8" />
          </div>
        ) : (
          <>
            <EnquiryTable
              enquiries={result?.items ?? []}
              onDelete={handleDelete}
              deletingId={deletingId}
            />
            <Pagination
              page={result?.page ?? 1}
              totalPages={result?.totalPages ?? 1}
              onPageChange={setPage}
            />
          </>
        )}
      </Container>
    </>
  );
}

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}
