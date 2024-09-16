import { randomUUID } from 'crypto';

export const random = {
  /**
   * @returns UUID v4 without dashes -, useful for using in emails
   */
  clearedUUID() {
    return randomUUID().replace(/-/gu, '');
  },

  email(prefix = 'autotesT', domain = 'oleksii.com') {
    return `${prefix}+${this.clearedUUID()}@${domain}`;
  },

  getStringGivenLength(len: number) {
    return Array.from({ length: len })
      .fill(1)
      .map(() => Math.round(Math.random() * 0xf).toString(16))
      .join('');
  },
};
