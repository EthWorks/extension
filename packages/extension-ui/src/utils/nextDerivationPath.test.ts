// Copyright 2019-2020 @polkadot/extension-ui authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { AccountJson } from '@polkadot/extension-base/background/types';
import { nextDerivationPath } from './nextDerivationPath';

const testHierarchy = (accounts: AccountJson[], parentAddress: string, expected: string): void => {
  expect(nextDerivationPath(accounts, parentAddress)).toEqual(expected);
};

describe('Generate Derivation Path', () => {
  const acc = (address: string, parentAddress?: string): {
    address: string;
    parentAddress?: string;
  } => ({
    address,
    parentAddress
  });

  test('generates path for first masters child', () => {
    testHierarchy([acc('a')], 'a', '//0');
  });

  test('generates path for third masters child', () => {
    testHierarchy([acc('a'), acc('b', 'a'), acc('c', 'a')], 'a', '//2');
  });

  test('generates path for masters child when exist one more root', () => {
    testHierarchy([acc('a'), acc('b', 'a'), acc('c', 'a'), acc('d')], 'a', '//2');
  });

  test('generates path for masters grandchild', () => {
    testHierarchy([acc('a'), acc('b', 'a'), acc('c', 'b'), acc('d', 'b')], 'b', '//2');
  });
});
