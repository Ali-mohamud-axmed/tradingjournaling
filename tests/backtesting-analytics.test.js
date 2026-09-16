import { describe, expect, it } from 'vitest';
import {
  buildBacktestAnalytics,
  filterBacktestTrades,
  getClosedBacktestTrades
} from '../src/js/backtesting/analytics.js';

describe('backtesting analytics', () => {
  const records = [
    { id: 1, date: '2026-01-02', result: 'Win', target_rr: 2, actual_rr: 2, session: 'London', pair: 'EURUSD', strategy: 'Breakout', accountType: 'Funded' },
    { id: 2, date: '2026-01-03', result: 'Loss', actual_rr: -1, session: 'Asia', pair: 'EURUSD', strategy: 'Breakout', accountType: 'Funded' },
    { id: 3, date: '2026-01-04', result: 'Break Even', actual_rr: 0, session: 'London', pair: 'GBPUSD', strategy: 'Reversal', accountType: 'Challenge' },
    { id: 4, date: '2026-01-05', result: 'Win', target_rr: 3, actual_rr: 3, session: 'New York', pair: 'USDJPY', strategy: 'Reversal', accountType: 'Challenge' },
    { id: 5, date: '2026-01-06', result: 'Win', target_rr: 5, status: 'pending', session: 'London', pair: 'EURUSD' },
    { id: 6, date: '2026-01-07', result: 'Win', actual_rr: 'invalid', session: 'London', pair: 'EURUSD' }
  ];

  it('keeps only closed records with usable realized R', () => {
    const trades = getClosedBacktestTrades(records);
    expect(trades).toHaveLength(4);
    expect(trades.map(trade => trade.id)).toEqual([1, 2, 3, 4]);
  });

  it('calculates rates, expectancy, profit factor and cumulative R separately for BE', () => {
    const model = buildBacktestAnalytics(getClosedBacktestTrades(records));
    expect(model.totalTrades).toBe(4);
    expect(model.wins).toBe(2);
    expect(model.losses).toBe(1);
    expect(model.breakEven).toBe(1);
    expect(model.winRate).toBe(66.66666666666666);
    expect(model.lossRate).toBeCloseTo(33.3333333333);
    expect(model.breakEvenRate).toBe(25);
    expect(model.realizedR).toBe(4);
    expect(model.profitFactor).toBe(5);
    expect(model.expectancy).toBeCloseTo(1.3333333333);
  });

  it('calculates chronological drawdown, streaks, and best session by total R', () => {
    const model = buildBacktestAnalytics(getClosedBacktestTrades(records));
    expect(model.maxDrawdown).toBe(1);
    expect(model.winStreak).toBe(1);
    expect(model.lossStreak).toBe(1);
    expect(model.currentWinStreak).toBe(1);
    expect(model.currentLossStreak).toBe(0);
    expect(model.bestSession).toBe('New York');
  });

  it('applies account, session, and date filters without touching live records', () => {
    const filtered = filterBacktestTrades(records, { account: 'Funded', session: 'London', dateFrom: '2026-01-01', dateTo: '2026-01-04' });
    expect(filtered.map(trade => trade.id)).toEqual([1]);
  });
});
