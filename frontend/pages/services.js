import React from "react";

export default function Services() {
  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1>Our Services</h1>
      <p>
        Mittal Industry में हम अपने ग्राहकों को उच्च गुणवत्ता वाले प्रोडक्ट्स और 
        बेहतरीन सेवाएँ प्रदान करते हैं।
      </p>

      <h2>हमारी Services:</h2>
      <ul style={{ listStyle: "disc", textAlign: "left", maxWidth: "600px", margin: "20px auto" }}>
        <li>Product Manufacturing</li>
        <li>Custom Orders</li>
        <li>Bulk Supply Solutions</li>
        <li>After-Sales Support</li>
      </ul>

      <p>
        अधिक जानकारी के लिए <a href="/contact">Contact Us</a> पेज पर जाएँ।
      </p>
    </div>
  );
}
