import { describe, expect, it, vi } from 'vitest';

vi.mock('../src/js/db.js', () => ({
  getStoreData: vi.fn(async () => []),
  populateMockDataIfEmpty: vi.fn(async () => undefined),
  updateUser: vi.fn(async user => user)
}));

import { AppState, applyAccountTradeChange } from '../src/js/state.js';

describe('automatic account balance updates', () => {
  it('reverses the old P/L before applying the new P/L on edit', async () => {
    const originalUser = AppState.user;
    const originalUpdateProfile = AppState.updateProfile;
    AppState.user = { email: 'trader@example.com', challengeSize: 10200, fundedSize: 50000, brokerSize: 10000 };
    AppState.updateProfile = vi.fn(async changes => {
      AppState.user = { ...AppState.user, ...changes };
    });

    await applyAccountTradeChange(
      { accountType: 'Challenge', result: 'Win', plMoney: 200 },
      { accountType: 'Challenge', result: 'Win', plMoney: 300 }
    );

    expect(AppState.user.challengeSize).toBe(10300);
    expect(AppState.updateProfile).toHaveBeenCalledWith({ challengeSize: 10300 });
    AppState.user = originalUser;
    AppState.updateProfile = originalUpdateProfile;
  });

  it('moves the old P/L out of the old account and into the new account', async () => {
    const originalUser = AppState.user;
    const originalUpdateProfile = AppState.updateProfile;
    AppState.user = { email: 'trader@example.com', challengeSize: 10000, fundedSize: 50000, brokerSize: 10000 };
    AppState.updateProfile = vi.fn(async changes => {
      AppState.user = { ...AppState.user, ...changes };
    });

    await applyAccountTradeChange(
      { accountType: 'Challenge', result: 'Win', plMoney: 200 },
      { accountType: 'Funded', result: 'Loss', plMoney: 75 }
    );

    expect(AppState.user.challengeSize).toBe(9800);
    expect(AppState.user.fundedSize).toBe(49925);
    AppState.user = originalUser;
    AppState.updateProfile = originalUpdateProfile;
  });
});
