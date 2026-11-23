import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { itineraryApi } from '../api/endpoints';

const STEPS = ['Your Details', 'Group', 'License', 'Locations', 'Travel', 'Budget'];

const LOCATION_OPTIONS = [
  { value: 'coastal', label: 'Coastal Area', icon: '🏖️' },
  { value: 'hill_country', label: 'Hill Country', icon: '⛰️' },
  { value: 'traditional', label: 'Traditional Places', icon: '🛕' },
];

const TRAVEL_MODE_OPTIONS = [
  { value: 'public_transport', label: 'Public Transport', icon: '🚆' },
  { value: 'tuk_tuk', label: 'Tuk Tuk', icon: '🛺' },
  { value: 'car', label: 'Car', icon: '🚗' },
  { value: 'van', label: 'Van', icon: '🚐' },
];

const initialForm = {
  name: '',
  contactNumber: '',
  passportNo: '',
  adults: 2,
  children: 0,
  hasDrivingLicense: false,
  locationPreferences: [],
  travelMode: '',
  budget: '',
};

export default function CreateItinerary() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const totalHeadcount = Number(form.adults) + Number(form.children);

  const updateField = (key, value) => setForm((f) => ({ ...f, [key]: value }));

  const toggleLocation = (value) => {
    setForm((f) => {
      const has = f.locationPreferences.includes(value);
      return {
        ...f,
        locationPreferences: has
          ? f.locationPreferences.filter((v) => v !== value)
          : [...f.locationPreferences, value],
      };
    });
  };

  const validateStep = () => {
    switch (step) {
      case 0:
        if (!form.name.trim()) return 'Please enter your name.';
        if (!form.contactNumber.trim()) return 'Please enter your WhatsApp contact number.';
        if (!form.passportNo.trim()) return 'Please enter your passport number.';
        return '';
      case 1:
        if (Number(form.adults) < 1) return 'At least 1 adult is required.';
        return '';
      case 3:
        if (form.locationPreferences.length === 0) return 'Select at least one location type.';
        return '';
      case 4:
        if (!form.travelMode) return 'Please choose a travel mode.';
        return '';
      case 5:
        if (!form.budget || Number(form.budget) <= 0) return 'Please enter a budget greater than 0.';
        return '';
      default:
        return '';
    }
  };

  const goNext = () => {
    const err = validateStep();
    if (err) {
      setError(err);
      return;
    }
    setError('');
    if (step < STEPS.length - 1) setStep((s) => s + 1);
  };

  const goBack = () => {
    setError('');
    if (step > 0) setStep((s) => s - 1);
  };

  const handleSubmit = async () => {
    const err = validateStep();
    if (err) {
      setError(err);
      return;
    }
    setError('');
    setLoading(true);
    try {
      const payload = {
        name: form.name.trim(),
        contactNumber: form.contactNumber.trim(),
        passportNo: form.passportNo.trim(),
        adults: Number(form.adults),
        children: Number(form.children),
        hasDrivingLicense: Boolean(form.hasDrivingLicense),
        locationPreferences: form.locationPreferences,
        travelMode: form.travelMode,
        budget: Number(form.budget),
      };
      const result = await itineraryApi.build(payload);
      navigate('/itinerary/results', { state: { result, submittedForm: payload } });
    } catch (err2) {
      setError(err2.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="page-header">
        <span className="eyebrow">Create Your Own Itinerary</span>
        <h1>Tell us how you like to travel</h1>
        <p className="text-muted">Six quick questions, five matched sample itineraries.</p>
      </div>

      <div className="section container">
        <div className="wizard">
          <div className="wizard-steps">
            {STEPS.map((label, i) => (
              <div
                key={label}
                data-step={i + 1}
                className={`wizard-step ${i === step ? 'active' : ''} ${i < step ? 'done' : ''}`}
              >
                {label}
              </div>
            ))}
          </div>

          <div className="card wizard-card">
            {error && <div className="alert alert-error">{error}</div>}

            {step === 0 && (
              <div>
                <div className="form-field">
                  <label htmlFor="name">What's your name?</label>
                  <input
                    id="name"
                    type="text"
                    placeholder="e.g. Jane Doe"
                    value={form.name}
                    onChange={(e) => updateField('name', e.target.value)}
                    autoFocus
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="contactNumber">WhatsApp contact number</label>
                  <input
                    id="contactNumber"
                    type="tel"
                    placeholder="e.g. +94 77 123 4567"
                    value={form.contactNumber}
                    onChange={(e) => updateField('contactNumber', e.target.value)}
                  />
                  <span className="form-hint">We'll use this to reach you on WhatsApp about your trip.</span>
                </div>
                <div className="form-field">
                  <label htmlFor="passportNo">Passport number</label>
                  <input
                    id="passportNo"
                    type="text"
                    placeholder="e.g. N1234567"
                    value={form.passportNo}
                    onChange={(e) => updateField('passportNo', e.target.value)}
                  />
                  <span className="form-hint">Needed to get started on visa and permit arrangements.</span>
                </div>
              </div>
            )}

            {step === 1 && (
              <div>
                <label style={{ fontWeight: 600, display: 'block', marginBottom: 14 }}>How many people are travelling?</label>
                <div className="counter-field" style={{ marginBottom: 14 }}>
                  <div>
                    <strong>Adults</strong>
                    <div className="form-hint">Aged 12 and above</div>
                  </div>
                  <div className="counter-buttons">
                    <button type="button" className="counter-btn" onClick={() => updateField('adults', Math.max(1, Number(form.adults) - 1))}>−</button>
                    <span style={{ minWidth: 20, textAlign: 'center' }}>{form.adults}</span>
                    <button type="button" className="counter-btn" onClick={() => updateField('adults', Number(form.adults) + 1)}>+</button>
                  </div>
                </div>
                <div className="counter-field">
                  <div>
                    <strong>Children</strong>
                    <div className="form-hint">Under 12 years</div>
                  </div>
                  <div className="counter-buttons">
                    <button type="button" className="counter-btn" onClick={() => updateField('children', Math.max(0, Number(form.children) - 1))}>−</button>
                    <span style={{ minWidth: 20, textAlign: 'center' }}>{form.children}</span>
                    <button type="button" className="counter-btn" onClick={() => updateField('children', Number(form.children) + 1)}>+</button>
                  </div>
                </div>
                <p className="form-hint" style={{ marginTop: 14 }}>Total headcount: {totalHeadcount}</p>
              </div>
            )}

            {step === 2 && (
              <div>
                <label style={{ fontWeight: 600, display: 'block', marginBottom: 14 }}>Does anyone in your group hold a valid driving license?</label>
                <p className="form-hint" style={{ marginBottom: 16 }}>This determines whether self-drive car itineraries can be included in your matches.</p>
                <div className="chip-group">
                  <button
                    type="button"
                    className={`chip ${form.hasDrivingLicense ? 'selected' : ''}`}
                    onClick={() => updateField('hasDrivingLicense', true)}
                  >
                    Yes, I have a valid license
                  </button>
                  <button
                    type="button"
                    className={`chip ${!form.hasDrivingLicense ? 'selected' : ''}`}
                    onClick={() => updateField('hasDrivingLicense', false)}
                  >
                    No
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <label style={{ fontWeight: 600, display: 'block', marginBottom: 14 }}>Which kind of locations do you prefer?</label>
                <p className="form-hint" style={{ marginBottom: 16 }}>Select as many as you like.</p>
                <div className="chip-group">
                  {LOCATION_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      className={`chip ${form.locationPreferences.includes(opt.value) ? 'selected' : ''}`}
                      onClick={() => toggleLocation(opt.value)}
                    >
                      <span>{opt.icon}</span> {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 4 && (
              <div>
                <label style={{ fontWeight: 600, display: 'block', marginBottom: 14 }}>What's your preferred travel mode?</label>
                <div className="chip-group">
                  {TRAVEL_MODE_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      className={`chip ${form.travelMode === opt.value ? 'selected' : ''}`}
                      onClick={() => updateField('travelMode', opt.value)}
                    >
                      <span>{opt.icon}</span> {opt.label}
                    </button>
                  ))}
                </div>
                {form.travelMode === 'car' && !form.hasDrivingLicense && (
                  <p className="form-hint" style={{ marginTop: 14, color: 'var(--color-danger)' }}>
                    Note: self-drive car itineraries require a valid driving license. We'll match you with chauffeur-driven options instead.
                  </p>
                )}
              </div>
            )}

            {step === 5 && (
              <div className="form-field">
                <label htmlFor="budget">What's your budget per person (USD)?</label>
                <input
                  id="budget"
                  type="number"
                  min={1}
                  placeholder="e.g. 600"
                  value={form.budget}
                  onChange={(e) => updateField('budget', e.target.value)}
                  autoFocus
                />
                <span className="form-hint">This covers the full trip — accommodation, transport and activities.</span>
              </div>
            )}

            <div className="wizard-actions">
              <button type="button" className="btn btn-secondary" onClick={goBack} disabled={step === 0}>
                Back
              </button>
              {step < STEPS.length - 1 ? (
                <button type="button" className="btn btn-primary" onClick={goNext}>
                  Next
                </button>
              ) : (
                <button type="button" className="btn btn-primary" onClick={handleSubmit} disabled={loading}>
                  {loading ? 'Matching itineraries…' : 'Show My 5 Matches'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
