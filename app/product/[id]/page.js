"use client";
import React from 'react';

export default function ProductPage() {
  return (
    <div style={{ padding: '50px', fontFamily: 'sans-serif' }}>
      <h1>Produkt Tee Jays</h1>
      <p>Status: Działa poprawnie.</p>
      <button onClick={() => alert('Działa!')} style={{ padding: '10px 20px', background: 'blue', color: 'white', border: 'none', borderRadius: '5px' }}>
        Kliknij mnie
      </button>
    </div>
  );
}
