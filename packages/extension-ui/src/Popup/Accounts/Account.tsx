// Copyright 2019 @polkadot/extension-ui authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { AccountJson } from '@polkadot/extension/background/types';

import React, { useContext, useState } from 'react';
import styled from 'styled-components';

import { ActionContext, Address, Link } from '../../components';
import { editAccount } from '../../messaging';
import { Name } from '../../partials';

interface Props extends AccountJson {
  address: string;
  className?: string;
}

function Account ({ address, className, isExternal }: Props): React.ReactElement<Props> {
  const onAction = useContext(ActionContext);
  const [isEditing, setEditing] = useState(false);
  const [editedName, setName] = useState<string | null>(null);

  const _toggleEdit = (): void => setEditing(!isEditing);
  const _saveChanges = (): void => {
    if (editedName && editedName !== name) {
      editAccount(address, editedName)
        .then((): void => onAction())
        .catch((error: Error) => console.error(error));
    }

    _toggleEdit();
  };

  return (
    <Address
      address={address}
      className={className}
      name={editedName}
      buttons={
        <>
          <MenuItem onClick={_toggleEdit}>Rename</MenuItem>
          <Break/>
          {!isExternal && <MenuItem isDanger to={`/account/export/${address}`}>Export Account</MenuItem>}
          <MenuItem isDanger to={`/account/forget/${address}`}>Forget Account</MenuItem>
        </>
      }
    >
      {isEditing && (
        <Name
          address={address}
          className='edit-name'
          isFocussed
          label={' '}
          onBlur={_saveChanges}
          onChange={setName}
        />
      )}
    </Address>
  );
}

const MenuItem = styled(Link)`
  padding: 4px 16px;
  display: block;
  border-radius: 8px;
`;

const Break = styled.div`
  height: 25px;
`;

export default styled(Account)`
  .edit-name {
    left: 4.25rem;
    position: absolute;
    right: 1.25rem;
    top: -0.25rem;
  }
`;
