import React, { useState } from "react";

function BookAppointment() {
  const [formData, setFormData] = useState({
    service: "",
    date: "",
    time: "",
    notes: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Booking Submitted:", formData);

    // TODO: Send data to backend API
  };

  return (
    <div className="form-container">
      <h2>📅 Book New Appointment</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Service:
          <select name="service" onChange={handleChange} required>
            <option value="">Select</option>
            <option value="Haircut">Haircut</option>
            <option value="Massage">Massage</option>
            <option value="Facial">Facial</option>
          </select>
        </label>

        <label>
          Date:
          <input type="date" name="date" onChange={handleChange} required />
        </label>

        <label>
          Time:
          <input type="time" name="time" onChange={handleChange} required />
        </label>

        <label>
          Notes (optional):
          <textarea name="notes" onChange={handleChange} />
        </label>

        <button type="submit">Confirm Booking</button>
      </form>
    </div>
  );
}

export default BookAppointment;
