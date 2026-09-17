import { describe, it, expect, vi } from 'vitest';

vi.mock('../src/js/state.js', () => ({
  AppState: {
    tradingTrades: [],
    backtestTrades: [],
    user: null
  }
}));

import { buildAccountPerformanceModel, getBestPurgeTime } from '../src/js/components/reports.js';

describe('buildAccountPerformanceModel', () => {
  it('aggregates trades by year and month for a selected account', () => {
    const trades = [
      { date: '2025-01-05', pair: 'EURUSD', result: 'Win', rr: 2, riskPercent: 1, accountType: 'Funded', userEmail: 'alex@example.com' },
      { date: '2025-02-10', pair: 'GBPUSD', result: 'Loss', rr: 1, riskPercent: 1, accountType: 'Funded', userEmail: 'alex@example.com' },
      { date: '2024-12-20', pair: 'XAUUSD', result: 'Win', rr: 3, riskPercent: 1, accountType: 'Challenge', userEmail: 'alex@example.com' },
      { date: '2025-01-12', pair: 'USDJPY', result: 'Break Even', rr: 0, riskPercent: 1, accountType: 'Your Broker', userEmail: 'alex@example.com' }
    ];

    const model = buildAccountPerformanceModel(trades, 'Funded');

    expect(model.years).toHaveLength(1);
    expect(model.years[0].year).toBe(2025);
    expect(model.years[0].months[0].monthLabel).toBe('Jan');
    expect(model.years[0].months[0].tradeCount).toBe(1);
    expect(model.years[0].months[0].netR).toBe(2);
    expect(model.years[0].totalTrades).toBe(2);
    expect(model.years[0].netR).toBe(1);
  });

  it('selects the purge time with the strongest aggregate performance', () => {
    const trades = [
      { date: '2025-01-05', pair: 'EURUSD', result: 'Win', rr: 2, session: 'London', purgeTime: '8:00 AM' },
      { date: '2025-01-06', pair: 'EURUSD', result: 'Loss', rr: 1, session: 'London', purgeTime: '8:00 AM' },
      { date: '2025-01-07', pair: 'GBPUSD', result: 'Win', rr: 3, session: 'London', purgeTime: '8:00 PM' },
      { date: '2025-01-08', pair: 'GBPUSD', result: 'Win', rr: 2, session: 'London', purgeTime: '8:00 PM' },
      { date: '2025-01-09', pair: 'USDJPY', result: 'Loss', rr: 1, session: 'London', purgeTime: '9:00 PM' }
    ];

    expect(getBestPurgeTime(trades)).toBe('8:00 PM');
  });
});
