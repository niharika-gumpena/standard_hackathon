import React, { useState, useEffect } from 'react';
import { db } from './firebase'; // Importing firestore
import { collection, getDocs } from 'firebase/firestore';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function DailyExpenseChart() {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        // Get all transactions from Firestore
        const querySnapshot = await getDocs(collection(db, 'transactions'));
        
        const transactionData = querySnapshot.docs.map(doc => doc.data());
        
        // Process the transaction data
        processData(transactionData);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };
    
    fetchTransactions();
  }, []);

  const processData = (transactionData) => {
    // Object to store daily expenses
    const dailyExpenses = {};

    // Get today's date and calculate the date 10 days ago
    const today = new Date();
    const tenDaysAgo = new Date(today);
    tenDaysAgo.setDate(today.getDate() - 10); // 10 days ago

    // Iterate over each transaction and group by day
    transactionData.forEach(transaction => {
      const transactionDate = new Date(transaction.date); // Assuming date is in the transaction
      if (transactionDate >= tenDaysAgo && transactionDate <= today) {
        const amount = parseFloat(transaction.amount);
        const date = transactionDate.toLocaleDateString(); // Get the date in string format

        // Add amount to the daily expenses object
        if (dailyExpenses[date]) {
          dailyExpenses[date] += amount;
        } else {
          dailyExpenses[date] = amount;
        }
      }
    });

    // Prepare data for the chart
    const sortedDates = Object.keys(dailyExpenses).sort((a, b) => new Date(a) - new Date(b));
    const sortedAmounts = sortedDates.map(date => dailyExpenses[date]);

    // Set the chart data
    setChartData({
      labels: sortedDates,
      datasets: [
        {
          label: 'Daily Expenses',
          data: sortedAmounts,
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1,
        },
      ],
    });
  };

  return (
    <div>
      <h3>Daily Expenses Over the Last 10 Days</h3>
      <Line data={chartData} />
    </div>
  );
}

export default DailyExpenseChart;
