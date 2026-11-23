import { useEffect, useMemo, useState } from 'react';
import { itineraryApi, contactApi } from '../api/endpoints';
import LoadingSpinner from '../components/LoadingSpinner';

const TRAVEL_MODE_LABELS = {
  public_transport: 'Public Transport',
  tuk_tuk: 'Tuk Tuk',
  car: 'Car',
  van: 'Van',
};

const LOCATION_LABELS = {
  coastal: 'Coastal Area',
  hill_country: 'Hill Country',
  traditional: 'Traditional Places',
};

const STATUS_LABELS = {
  new: 'New',
  contacted: 'Contacted',
  closed: 'Closed',
};

const TABS = [
  { key: 'itineraries', label: 'Create Itinerary Requests' },
  { key: 'contacts', label: 'Contact Us Requests' },
];

export default function AdminItineraries() {
  const [tab, setTab] = useState('itineraries');

  return (
    <div>
      <div className="page-header">
        <span className="eyebrow">Admin</span>
        <h1>Submissions</h1>
        <p className="text-muted">Everything visitors have sent in through the site, in one place.</p>
      </div>

      <div className="section container">
        <div className="admin-tabs">
          {TABS.map((t) => (
            <button
              key={t.key}
              type="button"
              className={`admin-tab ${tab === t.key ? 'active' : ''}`}
              onClick={() => setTab(t.key)}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'itineraries' ? <ItineraryRequestsPanel /> : <ContactRequestsPanel />}
      </div>
    </div>
  );
}

const ITINERARY_EMPTY_FILTERS = {
  name: '',
  contactNumber: '',
  passportNo: '',
  travelMode: '',
  hasDrivingLicense: '',
  locationPreference: '',
  adults: '',
  children: '',
  minBudget: '',
  maxBudget: '',
  dateFrom: '',
  dateTo: '',
  submittedBy: '',
};

function ItineraryRequestsPanel() {
  const [filters, setFilters] = useState(ITINERARY_EMPTY_FILTERS);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [result, setResult] = useState({ data: [], total: 0, totalPages: 1 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const updateFilter = (key, value) => {
    setPage(1);
    setFilters((f) => ({ ...f, [key]: value }));
  };

  const clearFilters = () => {
    setPage(1);
    setFilters(ITINERARY_EMPTY_FILTERS);
  };

  // Debounce so free-text filters don't fire a request on every keystroke.
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(true);
      setError('');
      itineraryApi
        .adminList({ ...filters, page, limit })
        .then(setResult)
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false));
    }, 350);
    return () => clearTimeout(timer);
  }, [filters, page, limit]);

  const activeFilterCount = useMemo(
    () => Object.values(filters).filter((v) => v !== '').length,
    [filters]
  );

  const { data, total, totalPages } = result;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10, marginBottom: 16 }}>
        <p className="text-muted" style={{ margin: 0 }}>
          {loading ? 'Loading…' : `${total} submission${total === 1 ? '' : 's'} found`}
          {activeFilterCount > 0 ? ` · ${activeFilterCount} filter${activeFilterCount === 1 ? '' : 's'} active` : ''}
        </p>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          {activeFilterCount > 0 && (
            <button type="button" className="btn btn-secondary" onClick={clearFilters}>
              Clear filters
            </button>
          )}
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14 }}>
            Rows per page
            <select
              className="admin-filter-input"
              value={limit}
              onChange={(e) => { setPage(1); setLimit(Number(e.target.value)); }}
            >
              {[10, 20, 50, 100].map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </label>
        </div>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Contact No (WhatsApp)</th>
              <th>Passport No</th>
              <th>Adults</th>
              <th>Children</th>
              <th>Driving License</th>
              <th>Location Preferences</th>
              <th>Travel Mode</th>
              <th>Budget (USD/person)</th>
              <th>Matched Itineraries</th>
              <th>Submitted By</th>
              <th>Submitted On</th>
            </tr>
            <tr className="admin-table-filters">
              <th></th>
              <th>
                <input
                  className="admin-filter-input"
                  type="text"
                  placeholder="Filter name"
                  value={filters.name}
                  onChange={(e) => updateFilter('name', e.target.value)}
                />
              </th>
              <th>
                <input
                  className="admin-filter-input"
                  type="text"
                  placeholder="Filter contact no"
                  value={filters.contactNumber}
                  onChange={(e) => updateFilter('contactNumber', e.target.value)}
                />
              </th>
              <th>
                <input
                  className="admin-filter-input"
                  type="text"
                  placeholder="Filter passport no"
                  value={filters.passportNo}
                  onChange={(e) => updateFilter('passportNo', e.target.value)}
                />
              </th>
              <th>
                <input
                  className="admin-filter-input admin-filter-input-narrow"
                  type="number"
                  min={0}
                  placeholder="Any"
                  value={filters.adults}
                  onChange={(e) => updateFilter('adults', e.target.value)}
                />
              </th>
              <th>
                <input
                  className="admin-filter-input admin-filter-input-narrow"
                  type="number"
                  min={0}
                  placeholder="Any"
                  value={filters.children}
                  onChange={(e) => updateFilter('children', e.target.value)}
                />
              </th>
              <th>
                <select
                  className="admin-filter-input"
                  value={filters.hasDrivingLicense}
                  onChange={(e) => updateFilter('hasDrivingLicense', e.target.value)}
                >
                  <option value="">Any</option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </th>
              <th>
                <select
                  className="admin-filter-input"
                  value={filters.locationPreference}
                  onChange={(e) => updateFilter('locationPreference', e.target.value)}
                >
                  <option value="">Any</option>
                  {Object.entries(LOCATION_LABELS).map(([value, label]) => (
                    <option key={value} value={value}>{label}</option>
                  ))}
                </select>
              </th>
              <th>
                <select
                  className="admin-filter-input"
                  value={filters.travelMode}
                  onChange={(e) => updateFilter('travelMode', e.target.value)}
                >
                  <option value="">Any</option>
                  {Object.entries(TRAVEL_MODE_LABELS).map(([value, label]) => (
                    <option key={value} value={value}>{label}</option>
                  ))}
                </select>
              </th>
              <th>
                <div style={{ display: 'flex', gap: 4 }}>
                  <input
                    className="admin-filter-input admin-filter-input-narrow"
                    type="number"
                    min={0}
                    placeholder="Min"
                    value={filters.minBudget}
                    onChange={(e) => updateFilter('minBudget', e.target.value)}
                  />
                  <input
                    className="admin-filter-input admin-filter-input-narrow"
                    type="number"
                    min={0}
                    placeholder="Max"
                    value={filters.maxBudget}
                    onChange={(e) => updateFilter('maxBudget', e.target.value)}
                  />
                </div>
              </th>
              <th></th>
              <th>
                <input
                  className="admin-filter-input"
                  type="text"
                  placeholder="Filter submitter"
                  value={filters.submittedBy}
                  onChange={(e) => updateFilter('submittedBy', e.target.value)}
                />
              </th>
              <th>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <input
                    className="admin-filter-input"
                    type="date"
                    value={filters.dateFrom}
                    onChange={(e) => updateFilter('dateFrom', e.target.value)}
                  />
                  <input
                    className="admin-filter-input"
                    type="date"
                    value={filters.dateTo}
                    onChange={(e) => updateFilter('dateTo', e.target.value)}
                  />
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={13} style={{ textAlign: 'center', padding: 30 }}>
                  <LoadingSpinner />
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={13} style={{ textAlign: 'center', padding: 30 }}>
                  No submissions match these filters.
                </td>
              </tr>
            ) : (
              data.map((row) => (
                <tr key={row.id}>
                  <td>{row.id}</td>
                  <td>{row.name}</td>
                  <td>{row.contactNumber}</td>
                  <td>{row.passportNo}</td>
                  <td>{row.adults}</td>
                  <td>{row.children}</td>
                  <td>{row.hasDrivingLicense ? 'Yes' : 'No'}</td>
                  <td>
                    {(row.locationPreferences || []).map((loc) => LOCATION_LABELS[loc] || loc).join(', ') || '—'}
                  </td>
                  <td>{TRAVEL_MODE_LABELS[row.travelMode] || row.travelMode}</td>
                  <td>${Number(row.budget).toFixed(0)}</td>
                  <td>{(row.matchedTitles || []).join(', ') || '—'}</td>
                  <td>{row.submittedBy}</td>
                  <td>{new Date(row.createdAt).toLocaleString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="admin-pagination">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page <= 1}
          >
            ← Prev
          </button>
          <span className="text-muted" style={{ fontSize: 14 }}>
            Page {page} of {totalPages}
          </span>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page >= totalPages}
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
}

const CONTACT_EMPTY_FILTERS = {
  name: '',
  email: '',
  phone: '',
  subject: '',
  status: '',
  q: '',
  dateFrom: '',
  dateTo: '',
};

function ContactRequestsPanel() {
  const [filters, setFilters] = useState(CONTACT_EMPTY_FILTERS);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [result, setResult] = useState({ data: [], total: 0, totalPages: 1 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [statusSaving, setStatusSaving] = useState(null);

  const updateFilter = (key, value) => {
    setPage(1);
    setFilters((f) => ({ ...f, [key]: value }));
  };

  const clearFilters = () => {
    setPage(1);
    setFilters(CONTACT_EMPTY_FILTERS);
  };

  const [refreshTick, setRefreshTick] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(true);
      setError('');
      contactApi
        .adminList({ ...filters, page, limit })
        .then(setResult)
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false));
    }, 350);
    return () => clearTimeout(timer);
  }, [filters, page, limit, refreshTick]);

  const activeFilterCount = useMemo(
    () => Object.values(filters).filter((v) => v !== '').length,
    [filters]
  );

  const handleStatusChange = async (id, status) => {
    setStatusSaving(id);
    try {
      await contactApi.updateStatus(id, status);
      setRefreshTick((t) => t + 1);
    } catch (err) {
      setError(err.message);
    } finally {
      setStatusSaving(null);
    }
  };

  const { data, total, totalPages } = result;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10, marginBottom: 16 }}>
        <p className="text-muted" style={{ margin: 0 }}>
          {loading ? 'Loading…' : `${total} message${total === 1 ? '' : 's'} found`}
          {activeFilterCount > 0 ? ` · ${activeFilterCount} filter${activeFilterCount === 1 ? '' : 's'} active` : ''}
        </p>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          {activeFilterCount > 0 && (
            <button type="button" className="btn btn-secondary" onClick={clearFilters}>
              Clear filters
            </button>
          )}
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14 }}>
            Rows per page
            <select
              className="admin-filter-input"
              value={limit}
              onChange={(e) => { setPage(1); setLimit(Number(e.target.value)); }}
            >
              {[10, 20, 50, 100].map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </label>
        </div>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Subject</th>
              <th>Message</th>
              <th>Status</th>
              <th>Submitted On</th>
            </tr>
            <tr className="admin-table-filters">
              <th></th>
              <th>
                <input
                  className="admin-filter-input"
                  type="text"
                  placeholder="Filter name"
                  value={filters.name}
                  onChange={(e) => updateFilter('name', e.target.value)}
                />
              </th>
              <th>
                <input
                  className="admin-filter-input"
                  type="text"
                  placeholder="Filter email"
                  value={filters.email}
                  onChange={(e) => updateFilter('email', e.target.value)}
                />
              </th>
              <th>
                <input
                  className="admin-filter-input"
                  type="text"
                  placeholder="Filter phone"
                  value={filters.phone}
                  onChange={(e) => updateFilter('phone', e.target.value)}
                />
              </th>
              <th>
                <input
                  className="admin-filter-input"
                  type="text"
                  placeholder="Filter subject"
                  value={filters.subject}
                  onChange={(e) => updateFilter('subject', e.target.value)}
                />
              </th>
              <th>
                <input
                  className="admin-filter-input"
                  type="text"
                  placeholder="Search message"
                  value={filters.q}
                  onChange={(e) => updateFilter('q', e.target.value)}
                />
              </th>
              <th>
                <select
                  className="admin-filter-input"
                  value={filters.status}
                  onChange={(e) => updateFilter('status', e.target.value)}
                >
                  <option value="">Any</option>
                  {Object.entries(STATUS_LABELS).map(([value, label]) => (
                    <option key={value} value={value}>{label}</option>
                  ))}
                </select>
              </th>
              <th>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <input
                    className="admin-filter-input"
                    type="date"
                    value={filters.dateFrom}
                    onChange={(e) => updateFilter('dateFrom', e.target.value)}
                  />
                  <input
                    className="admin-filter-input"
                    type="date"
                    value={filters.dateTo}
                    onChange={(e) => updateFilter('dateTo', e.target.value)}
                  />
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={8} style={{ textAlign: 'center', padding: 30 }}>
                  <LoadingSpinner />
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={8} style={{ textAlign: 'center', padding: 30 }}>
                  No messages match these filters.
                </td>
              </tr>
            ) : (
              data.map((row) => (
                <tr key={row.id}>
                  <td>{row.id}</td>
                  <td>{row.name}</td>
                  <td>{row.email}</td>
                  <td>{row.phone || '—'}</td>
                  <td>{row.subject || '—'}</td>
                  <td style={{ whiteSpace: 'normal', minWidth: 220, maxWidth: 340 }}>{row.message}</td>
                  <td>
                    <select
                      className="admin-filter-input"
                      value={row.status}
                      disabled={statusSaving === row.id}
                      onChange={(e) => handleStatusChange(row.id, e.target.value)}
                    >
                      {Object.entries(STATUS_LABELS).map(([value, label]) => (
                        <option key={value} value={value}>{label}</option>
                      ))}
                    </select>
                  </td>
                  <td>{new Date(row.createdAt).toLocaleString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="admin-pagination">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page <= 1}
          >
            ← Prev
          </button>
          <span className="text-muted" style={{ fontSize: 14 }}>
            Page {page} of {totalPages}
          </span>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page >= totalPages}
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
}
