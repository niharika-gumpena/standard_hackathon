import React, { useState, useEffect } from "react";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";  // Import Firestore functions
import "./profile.css";

function Profile() {
  const [section, setSection] = useState("main");
  const navigate = useNavigate();
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    occupation: "",
    bank: "",
    accountNumber: "",
    creditCardNumber: "",
    monthlyIncome: "",
    additionalIncome: "",
    expenses: { food: "", housing: "", transportation: "", additional: "", entertainment: "" },
    savings: "",
    goal: "",
    expectedDate: "",
    goalAmount: ""
  });

  useEffect(() => {
    const fetchData = async () => {
      const user = auth.currentUser;
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setData(userSnap.data());
        }
      }
    };
    fetchData();
  }, []);

  const updateData = async () => {
    const user = auth.currentUser;
    console.log("Current User:", user);  // Ensure the user is logged in
    
    if (!user) {
      alert("User not authenticated. Please log in.");
      return;
    }

    console.log("Data being saved:", data);  // Log data to check what is being saved

    try {
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        // Create the document if it doesn't exist
        await setDoc(userRef, { firstName: '', lastName: '', email: '' });
      }

      // Update the document with the data
      await updateDoc(userRef, data);
      alert("Updated successfully!");

      // Re-fetch the data after update
      const fetchData = async () => {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setData(userSnap.data());
        }
      };
      fetchData();

    } catch (error) {
      console.error("Error updating:", error);
      alert("Error updating profile, please try again.");
    }
  };

  return (
    <div className="container">
      <h2 className="headline">Manage Your Profile</h2>

      {section === "main" && (
        <div className="options">
          <button onClick={() => setSection("profile")} className="option-btn">Profile Information</button>
          <button onClick={() => setSection("financial")} className="option-btn">Financial Information</button>
          <button onClick={() => setSection("banking")} className="option-btn">Banking Information</button>
          <button onClick={() => setSection("goals")} className="option-btn">Goals Information</button>
        </div>
      )}

      {section !== "main" && (
        <div className="section">
          <button onClick={() => setSection("main")} className="back-btn">← Back</button>

          {section === "profile" && (
            <>
              <h3>Profile Information</h3>
              <input type="text" placeholder="First Name" value={data.firstName} onChange={(e) => setData({ ...data, firstName: e.target.value })} />
              <input type="text" placeholder="Last Name" value={data.lastName} onChange={(e) => setData({ ...data, lastName: e.target.value })} />
              <input type="email" placeholder="Email" value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} />
              <input type="text" placeholder="Phone" value={data.phone} onChange={(e) => setData({ ...data, phone: e.target.value })} />
              <input type="text" placeholder="Occupation" value={data.occupation} onChange={(e) => setData({ ...data, occupation: e.target.value })} />
            </>
          )}

          {section === "financial" && (
            <>
              <h3>Financial Information</h3>
              <div className="financial-input">
                <span className="rs-symbol">₹</span>
                <input type="text" placeholder="Monthly Income" value={data.monthlyIncome} onChange={(e) => setData({ ...data, monthlyIncome: e.target.value })} />
              </div>
              <div className="financial-input">
                <span className="rs-symbol">₹</span>
                <input type="text" placeholder="Additional Monthly Income" value={data.additionalIncome} onChange={(e) => setData({ ...data, additionalIncome: e.target.value })} />
              </div>
              <h4>Monthly Expenses</h4>
              <div className="financial-input">
                <span className="rs-symbol">₹</span>
                <input type="text" placeholder="Food" value={data.expenses.food} onChange={(e) => setData({ ...data, expenses: { ...data.expenses, food: e.target.value } })} />
              </div>
              <div className="financial-input">
                <span className="rs-symbol">₹</span>
                <input type="text" placeholder="Housing" value={data.expenses.housing} onChange={(e) => setData({ ...data, expenses: { ...data.expenses, housing: e.target.value } })} />
              </div>
              <div className="financial-input">
                <span className="rs-symbol">₹</span>
                <input type="text" placeholder="Transportation" value={data.expenses.transportation} onChange={(e) => setData({ ...data, expenses: { ...data.expenses, transportation: e.target.value } })} />
              </div>
              <div className="financial-input">
                <span className="rs-symbol">₹</span>
                <input type="text" placeholder="Entertainment" value={data.expenses.entertainment} onChange={(e) => setData({ ...data, expenses: { ...data.expenses, entertainment: e.target.value } })} />
              </div>
              <div className="financial-input">
                <span className="rs-symbol">₹</span>
                <input type="text" placeholder="Current Savings" value={data.savings} onChange={(e) => setData({ ...data, savings: e.target.value })} />
              </div>
            </>
          )}

          {section === "banking" && (
            <>
              <h3>Banking Information</h3>
              <input type="text" placeholder="Bank Name" value={data.bank} onChange={(e) => setData({ ...data, bank: e.target.value })} />
              <input type="text" placeholder="Account Number" value={data.accountNumber} onChange={(e) => setData({ ...data, accountNumber: e.target.value })} />
              <input type="text" placeholder="Credit Card Number" value={data.creditCardNumber} onChange={(e) => setData({ ...data, creditCardNumber: e.target.value })} />
            </>
          )}

          {section === "goals" && (
            <>
              <h3>Goals Information</h3>
              <input type="text" placeholder="Goal Description" value={data.goal} onChange={(e) => setData({ ...data, goal: e.target.value })} />
              <input type="date" placeholder="Expected Date" value={data.expectedDate} onChange={(e) => setData({ ...data, expectedDate: e.target.value })} />
              <div className="financial-input">
                <span className="rs-symbol">₹</span>
                <input type="text" placeholder="Goal Amount" value={data.goalAmount} onChange={(e) => setData({ ...data, goalAmount: e.target.value })} />
              </div>
            </>
          )}

          <button onClick={updateData} className="update-btn">Save Changes</button>
        </div>
      )}

      {/* Back to Dashboard button placed OUTSIDE the main box */}
      <div className="dashboard-btn-container">
        <button onClick={() => navigate("/dashboard")} className="dashboard-btn">← Back to Dashboard</button>
      </div>
    </div>
  );
}

export default Profile;