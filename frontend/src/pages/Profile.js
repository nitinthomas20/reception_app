// Profile.js
import React, { useState } from "react"

const Profile = () => {
  // Simulated user membership status (in real app, fetch from API or context)
  const [isMember, setIsMember] = useState(false)

  const handleBuyMembership = () => {
    // Logic to upgrade membership (e.g., call backend API, payment, etc.)
    alert("Membership purchased!")
    setIsMember(true)
  }

  const memberFeatures = [
    "Unlimited Access to Premium Content",
    "Priority Customer Support",
    "Exclusive Discounts and Offers",
    "Early Access to New Features",
  ]

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Welcome to Your Profile</h2>

      {!isMember && (
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Become a Member</h3>
          <p style={styles.cardText}>Unlock premium features and benefits.</p>
          <button style={styles.button} onClick={handleBuyMembership}>
            Buy Membership
          </button>
        </div>
      )}

      <div style={styles.featuresSection}>
        <h3 style={styles.sectionTitle}>Membership Benefits</h3>
        <ul style={styles.featureList}>
          {memberFeatures.map((feature, index) => (
            <li key={index} style={{ opacity: isMember ? 1 : 0.4 }}>
              ✅ {feature}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

const styles = {
  container: {
    padding: "20px",
    maxWidth: "600px",
    margin: "0 auto",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    fontSize: "24px",
    marginBottom: "20px",
  },
  card: {
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    marginBottom: "20px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
  },
  cardTitle: {
    fontSize: "20px",
    marginBottom: "10px",
  },
  cardText: {
    marginBottom: "15px",
  },
  button: {
    padding: "10px 16px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  featuresSection: {
    marginTop: "30px",
  },
  sectionTitle: {
    fontSize: "18px",
    marginBottom: "10px",
  },
  featureList: {
    listStyleType: "none",
    paddingLeft: "0",
  },
}

export default Profile
