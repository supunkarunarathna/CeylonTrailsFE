import { useState } from 'react';
import { contactApi } from '../api/endpoints';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [status, setStatus] = useState({ loading: false, error: '', success: '' });

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, error: '', success: '' });
    try {
      const res = await contactApi.submit(form);
      setStatus({ loading: false, error: '', success: res.message || 'Thank you! We will be in touch shortly.' });
      setForm({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (err) {
      setStatus({ loading: false, error: err.message, success: '' });
    }
  };

  return (
    <div>
      <div className="page-header">
        <span className="eyebrow">Get In Touch</span>
        <h1>Contact Ceylon Trails</h1>
        <p className="text-muted">Have a question, or ready to turn a matched itinerary into a booking? Send us a message.</p>
      </div>

      <div className="section container">
        <div className="grid grid-2" style={{ gap: 48 }}>
          <div className="card" style={{ padding: 34 }}>
            {status.error && <div className="alert alert-error">{status.error}</div>}
            {status.success && <div className="alert alert-success">{status.success}</div>}
            <form onSubmit={handleSubmit}>
              <div className="form-field">
                <label htmlFor="name">Full name</label>
                <input id="name" name="name" type="text" required value={form.name} onChange={handleChange} />
              </div>
              <div className="form-field">
                <label htmlFor="email">Email</label>
                <input id="email" name="email" type="email" required value={form.email} onChange={handleChange} />
              </div>
              <div className="form-field">
                <label htmlFor="phone">Phone (optional)</label>
                <input id="phone" name="phone" type="tel" value={form.phone} onChange={handleChange} />
              </div>
              <div className="form-field">
                <label htmlFor="subject">Subject</label>
                <input id="subject" name="subject" type="text" value={form.subject} onChange={handleChange} />
              </div>
              <div className="form-field">
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" rows={5} required value={form.message} onChange={handleChange} />
              </div>
              <button type="submit" className="btn btn-primary" disabled={status.loading} style={{ width: '100%' }}>
                {status.loading ? 'Sending…' : 'Send Message'}
              </button>
            </form>
          </div>

          <div>
            <h3>Our office</h3>
            <p className="text-muted">No. 24, Galle Road, Colombo 03, Sri Lanka</p>
            <h3>Email</h3>
            <p className="text-muted">hello@ceylontrails.com</p>
            <h3>Phone</h3>
            <p className="text-muted">+94 77 123 4567</p>
            <h3>Office hours</h3>
            <p className="text-muted">Monday – Saturday, 9:00 AM – 6:00 PM (GMT+5:30)</p>
          </div>
        </div>
      </div>
    </div>
  );
}
