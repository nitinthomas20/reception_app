// Navbar.js
import React from "react"

const Navbar = () => {
  const handleLogout = () => {
    // Clear stored auth tokens (example for JWT)
    localStorage.removeItem("token")
    
    window.location.href = "/login" // Redirect to login page
  }

  const handleProfile = () => {
    // Navigate to profile page
    window.location.href = "/profile"
  }

  return (
    <nav style={styles.navbar}>
      <div style={styles.logo}>MediBook</div>
      <div style={styles.menu}>
        <div style={styles.avatarContainer}>
          <img
            src="https://github.com/shadcn.png"
            alt="User Avatar"
            style={styles.avatar}
            onClick={() => {
              const menu = document.getElementById("dropdown-menu")
              menu.style.display = menu.style.display === "block" ? "none" : "block"
            }}
          />
          <div id="dropdown-menu" style={styles.dropdown}>
            <div style={styles.dropdownItem} onClick={handleProfile}>Profile</div>
            <div style={styles.dropdownItem} onClick={handleLogout}>Logout</div>
          </div>
        </div>
      </div>
    </nav>
  )
}

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: "10px 20px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    position: "relative",
    zIndex: 10,
  },
  logo: {
    fontSize: "20px",
    fontWeight: "bold",
  },
  menu: {
    display: "flex",
    alignItems: "center",
  },
  avatarContainer: {
    position: "relative",
    cursor: "pointer",
  },
  avatar: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
  },
  dropdown: {
    display: "none",
    position: "absolute",
    top: "50px",
    right: "0",
    backgroundColor: "#fff",
    border: "1px solid #ddd",
    borderRadius: "6px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    width: "120px",
  },
  dropdownItem: {
    padding: "10px",
    cursor: "pointer",
    borderBottom: "1px solid #eee",
  },
}

export default Navbar
