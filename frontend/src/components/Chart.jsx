import React from 'react';

function Chart({ transactions }) {
  // Calculate totals for income and expenses
  const totalIncome = transactions
    .filter(t => t.type === 'Income')
    .reduce((acc, t) => acc + t.amount, 0);

  const expenses = transactions.filter(t => t.type === 'Expense');
  const totalExpense = expenses.reduce((acc, t) => acc + t.amount, 0);

  // Calculate expense by category
  const categories = ['Food', 'Transport', 'Invest', 'Shopping', 'Bills', 'Entertainment', 'Health', 'Other'];
  const categoryTotals = {};
  
  categories.forEach(cat => {
    categoryTotals[cat] = expenses
      .filter(t => t.category === cat)
      .reduce((acc, t) => acc + t.amount, 0);
  });

  // Filter out categories with zero amounts
  const activeCategories = categories.filter(cat => categoryTotals[cat] > 0);

  const total = totalIncome + totalExpense;
  
  // Calculate percentages and dash arrays for pie chart
  const circumference = 2 * Math.PI * 90;
  const segments = [];
  let currentOffset = 0;

  // Income segment
  const incomePercentage = total > 0 ? (totalIncome / total) * 100 : 0;
  const incomeDasharray = (incomePercentage / 100) * circumference;
  if (totalIncome > 0) {
    segments.push({
      type: 'income',
      dasharray: incomeDasharray,
      offset: currentOffset,
      percentage: incomePercentage,
      amount: totalIncome,
      color: 'url(#incomeGradient)'
    });
    currentOffset += incomeDasharray;
  }

  // Expense category segments
  const categoryColors = {
    'Food': 'url(#foodGradient)',
    'Transport': 'url(#transportGradient)',
    'Invest': 'url(#investGradient)',
    'Shopping': 'url(#shoppingGradient)',
    'Bills': 'url(#billsGradient)',
    'Entertainment': 'url(#entertainmentGradient)',
    'Health': 'url(#healthGradient)',
    'Other': 'url(#otherGradient)'
  };

  activeCategories.forEach(cat => {
    const catPercentage = (categoryTotals[cat] / total) * 100;
    const catDasharray = (catPercentage / 100) * circumference;
    segments.push({
      type: 'expense',
      category: cat,
      dasharray: catDasharray,
      offset: currentOffset,
      percentage: catPercentage,
      amount: categoryTotals[cat],
      color: categoryColors[cat]
    });
    currentOffset += catDasharray;
  });

  return (
    <div className="chart-container">
      <h3 className="chart-title">Financial Overview</h3>
      <div className="chart-content">
        <div className="pie-chart-wrapper">
          <div className="pie-chart-container">
            <svg className="pie-chart" viewBox="0 0 200 200">
              {/* Segments */}
              {segments.map((segment, index) => (
                <circle
                  key={index}
                  className="pie-segment"
                  cx="100"
                  cy="100"
                  r="90"
                  fill="none"
                  stroke={segment.color}
                  strokeWidth="20"
                  strokeDasharray={`${segment.dasharray} ${circumference}`}
                  strokeDashoffset={`-${segment.offset}`}
                  transform="rotate(-90 100 100)"
                />
              ))}
              
              {/* Gradients */}
              <defs>
                <linearGradient id="incomeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#11998e" />
                  <stop offset="100%" stopColor="#38ef7d" />
                </linearGradient>
                <linearGradient id="foodGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#eb3349" />
                  <stop offset="100%" stopColor="#f45c43" />
                </linearGradient>
                <linearGradient id="transportGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f093fb" />
                  <stop offset="100%" stopColor="#f5576c" />
                </linearGradient>
                <linearGradient id="investGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#4facfe" />
                  <stop offset="100%" stopColor="#00f2fe" />
                </linearGradient>
                <linearGradient id="shoppingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#fa709a" />
                  <stop offset="100%" stopColor="#fee140" />
                </linearGradient>
                <linearGradient id="billsGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#667eea" />
                  <stop offset="100%" stopColor="#764ba2" />
                </linearGradient>
                <linearGradient id="entertainmentGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f09819" />
                  <stop offset="100%" stopColor="#edde5d" />
                </linearGradient>
                <linearGradient id="healthGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#a8edea" />
                  <stop offset="100%" stopColor="#fed6e3" />
                </linearGradient>
                <linearGradient id="otherGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#d299c2" />
                  <stop offset="100%" stopColor="#fef9d7" />
                </linearGradient>
              </defs>
            </svg>
            <div className="pie-chart-center">
              <div className="pie-center-label">Total</div>
              <div className="pie-center-value">{total.toLocaleString()} THB</div>
            </div>
          </div>
          <div className="pie-legend">
            {segments.map((segment, index) => {
              const legendColorClass = segment.type === 'income' 
                ? 'income-color' 
                : segment.category?.toLowerCase().replace(/\s+/g, '-') + '-color';
              
              return (
                <div key={index} className="legend-item">
                  <div className="legend-item-header">
                    <div className={`legend-color ${legendColorClass}`}></div>
                    <div className="legend-label">{segment.category || 'Income'}</div>
                  </div>
                  <div className="legend-info">
                    <div className="legend-value">
                      {segment.type === 'income' ? '+' : '-'}{segment.amount.toLocaleString()} THB
                    </div>
                    <div className="legend-percentage">{segment.percentage.toFixed(1)}%</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chart;
