// Copyright 2019 @polkadot/extension-ui authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { AccountJson } from '@polkadot/extension/background/types';
import { Chain } from '@polkadot/extension-chains/types';

import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import findChain from '@polkadot/extension-chains';
import settings from '@polkadot/ui-settings';
import Identicon from '@polkadot/react-identicon';
import { decodeAddress, encodeAddress } from '@polkadot/util-crypto';

import IconBox from './IconBox';
import { AccountContext } from './contexts';
import CopyToClipboard from 'react-copy-to-clipboard';

import copyButton from '../assets/copyButton.png';

interface Props {
  address?: string | null;
  children?: React.ReactNode;
  className?: string;
  name?: React.ReactNode | null;
  genesisHash?: string | null;
  buttons?: React.ReactNode | null;
}

// find an account in our list
function findAccount (accounts: AccountJson[], publicKey: Uint8Array): AccountJson | null {
  const pkStr = publicKey.toString();

  return accounts.find(({ address }): boolean =>
    decodeAddress(address).toString() === pkStr
  ) || null;
}

// recodes an supplied address using the prefix/genesisHash, include the actual saved account & chain
function recodeAddress (address: string, accounts: AccountJson[], genesisHash?: string | null): [string, AccountJson | null, Chain] {
  // decode and create a shortcut for the encoded address
  const publicKey = decodeAddress(address);

  // find our account using the actual publicKey, and then find the associated chain
  const account = findAccount(accounts, publicKey);
  const chain = findChain((account && account.genesisHash) || genesisHash);

  return [
    // always allow the actual settings to override the display
    encodeAddress(publicKey, settings.prefix === -1 ? chain.ss58Format : settings.prefix),
    account,
    chain
  ];
}

function Address ({ address, children, className, genesisHash, name, buttons }: Props): React.ReactElement<Props> {
  const accounts = useContext(AccountContext);
  const [account, setAccount] = useState<AccountJson | null>(null);
  const [chain, setChain] = useState<Chain | null>(null);
  const [formatted, setFormatted] = useState<string | null>(null);

  useEffect((): void => {
    if (!address) {
      return;
    }

    const [formatted, account, chain] = recodeAddress(address, accounts, genesisHash);

    setFormatted(formatted);
    setChain(chain);
    setAccount(account);
  }, [address]);

  const theme = ((chain && chain.icon) || 'polkadot') as 'polkadot';
  return (
    <IconBox
      banner={chain && chain.genesisHash && chain.name}
      className={className}
      icon={
        <Identicon
          className='icon'
          size={64}
          theme={theme}
          value={address}
        />
      }
      buttons={buttons}
      intro={
        <Content>
          <div className='name'>{name || (account && account.name) || '<unknown>'}</div>
          <AddressInfo>
            <PublicKey>{formatted || '<unknown>'}</PublicKey>
            {buttons && address && <CopyToClipboard text={address}>
              <CopyButton src={copyButton} alt='copy-button'/>
            </CopyToClipboard>}
          </AddressInfo>
        </Content>
      }
    >
      {children}
    </IconBox>
  );
}

const PublicKey = styled.div`
  opacity: 0.5;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-right: 8px;
`;

const CopyButton = styled.img`
  width: 12px;
  height: 14px;
  align-self: center;
  opacity: 0.5;
  &:hover {
    opacity: 1;
  }
`;

const Content = styled.div`
  width: 300px;
`;

const AddressInfo = styled.div`
  font-size: 12px;
  opacity: 0.5;
  overflow: hidden;
  text-overflow: ellipsis;
  display: flex;
  justify-content: space-between;
`;

export default styled(Address)`


  .name {
    padding-bottom: 0.5rem;
  }
`;
