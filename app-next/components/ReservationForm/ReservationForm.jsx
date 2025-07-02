"use client";
import { useState } from "react";
import styles from "./ReservationForm.module.css";
import api from "@/utils/api";
import Modal from "../Modal/Modal";

export default function ReservationForm({ mealId }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phonenumber: "",
  });
  const [modalMessage, setModalMessage] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await fetch(api("/reservations"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          meal_id: mealId,
        }),
      });

      if (!res.ok) throw new Error("Failed to reserve");
      setModalMessage("Reservation successful!");
    } catch (err) {
      setModalMessage("Reservation failed. Please try again.");
    }
  }

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h4>Reserve a seat</h4>
        <input
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <input
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
        <input
          placeholder="Phone Number"
          value={formData.phonenumber}
          onChange={(e) =>
            setFormData({ ...formData, phonenumber: e.target.value })
          }
          required
        />
        <button type="submit">Book Seat</button>
      </form>
      {modalMessage && (
        <Modal message={modalMessage} onClose={() => setModalMessage(null)} />
      )}
    </>
  );
}
