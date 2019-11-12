import { lighten } from '@polkadot/extension-ui/components/Identicon/icons/PolkadotDark';

describe('Identicon', () => {
  describe('lighten', () => {
    [
      { value: 'hsl(123, 65%, 65%)', result: 'hsl(123, 65%, 65%)' },
      { value: 'hsl(234, 65%, 15%)', result: 'hsl(234, 65%, 65%)' },
      { value: 'hsl(345, 65%, 25%)', result: 'hsl(345, 65%, 75%)' },
      { value: 'hsl(321, 65%, 35%)', result: 'hsl(321, 65%, 85%)' },
      { value: 'hsl(111, 65%, 45%)', result: 'hsl(111, 65%, 45%)' },
      { value: 'hsl(348, 65%, 0%)', result: 'hsl(348, 65%, 50%)' },
      { value: 'hsl(348, 65%, 40%)', result: 'hsl(348, 65%, 40%)' },
      { value: 'hsl(348, 65%, 50%)', result: 'hsl(348, 65%, 50%)' },
      { value: 'hsl(348, 65%, 60%)', result: 'hsl(348, 65%, 60%)' },
      { value: 'hsl(348, 65%, 70%)', result: 'hsl(348, 65%, 70%)' }
    ].map(({ value, result }) => {
      it('returns birther dots if \'hsl\' value \'l\' is smaller than 40%, add 40%', () => {
        expect(lighten(value)).toEqual(result);
      });
    });
  });
});
