import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getDocs, collection, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { Trophy, Users, Flame, Coins, UserCircle, LayoutDashboard, LogOut } from "lucide-react";
import "./Dashboard.css";
import LineChart from "../Components/LineChart";
import ProgressBar from "../Components/ProgressBar";

function Dashboard() {
  const navigate = useNavigate(); // useNavigate hook for navigation

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("userToken"); // Remove the user token
    navigate("/login"); // Navigate to the login page
  };

  // Other states and functions...
  const [transactions, setTransactions] = useState([]);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Money Spent Over Time",
        data: [],
        fill: false,
        borderColor: "rgba(75,192,192,1)",
        tension: 0.1,
      },
    ],
  });

  // Add states for savings and goal amounts
  const [savingsAmount, setSavingsAmount] = useState(1500); // Example savings amount
  const [goalAmount, setGoalAmount] = useState(5000); // Example goal amount

  // Calculate the dates for the past 7 days (including today)
  const getPast7Days = () => {
    const today = new Date();
    const past7Days = [];

    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      past7Days.push(date.toLocaleDateString("en-US"));
    }

    return past7Days;
  };

  const past7Days = getPast7Days();

  // Function to fetch transactions from Firestore
  useEffect(() => {
    const fetchTransactions = async () => {
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - 6); // 7 days ago (including today)
      const q = query(collection(db, "transactions"), where("date", ">=", startDate));
      const querySnapshot = await getDocs(q);
      const transactionsData = querySnapshot.docs.map((doc) => doc.data());
      setTransactions(transactionsData);
    };
    fetchTransactions();
  }, []);

  // Process the fetched transactions data into chart data
  useEffect(() => {
    const processedChartData = {
      labels: past7Days,
      datasets: [
        {
          label: "Money Spent Over Time",
          data: new Array(7).fill(0),
          fill: false,
          borderColor: "rgba(75,192,192,1)",
          tension: 0.1,
        },
      ],
    };

    transactions.forEach((transaction) => {
      const timestamp = transaction.date;
      const amount = parseFloat(transaction.amount);
      const date = timestamp ? new Date(timestamp.seconds * 1000) : new Date();
      const formattedDate = date.toLocaleDateString("en-US");

      if (past7Days.includes(formattedDate)) {
        const index = past7Days.indexOf(formattedDate);
        processedChartData.datasets[0].data[index] += amount;
      }
    });

    setChartData(processedChartData);
  }, [transactions, past7Days]);

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="nav flex-column">
          <button className="sidebar-link" onClick={() => navigate("/future-you")}>
            <LayoutDashboard size={20} />
            Future You
          </button>
          <button className="sidebar-link" onClick={() => navigate("/wallet")}>
            <Coins size={20} />
            Wallet
          </button>
          <button className="sidebar-link" onClick={() => navigate("/rewards")}>
            <Trophy size={20} />
            Rewards
          </button>
          <button className="sidebar-link" onClick={() => navigate("/women-for-women")}>
            <Users size={20} />
            Women for Women
          </button>
          <button className="sidebar-link mt-auto" onClick={handleLogout}>
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </div>

      {/* Top Navbar */}
      <nav className="top-navbar">
        <div className="navbar-brand">
          <img
            src="https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=50&h=50&fit=crop"
            alt="Logo"
            className="me-2"
            style={{ width: "40px", height: "40px", borderRadius: "8px" }}
          />
          <span>Dashboard</span>
        </div>
        <div className="user-stats">
          <div className="stat-item">
            <Flame size={20} color="#e74c3c" />
            <span>15 Days</span>
          </div>
          <div className="stat-item">
            <Coins size={20} color="#f1c40f" />
            <span>2,500</span>
          </div>
          <div className="profile-icon" onClick={() => navigate("/pages/profile")}>
            <UserCircle size={24} />
          </div>
        </div>
      </nav>

      {/* Main Content */} 
      <main className="main-content">
        <div className="container-fluid">
          <h2 className="mb-4">Hey Budget Queen, Welcome back !!</h2>

          {/* Progress Bar */}
          <div className="mb-4">
            <ProgressBar savingsAmount={savingsAmount} goalAmount={goalAmount} />
          </div>

          {/* Line Chart */}
          <div className="chart-container">
            <LineChart chartData={chartData} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;