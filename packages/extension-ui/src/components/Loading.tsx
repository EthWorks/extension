// Copyright 2019 @polkadot/extension-ui authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import React from 'react';
import styled from 'styled-components';
import { Header } from '.';


interface Props {
  children?: React.ReactNode;
}

export default function Loading ({ children }: Props): React.ReactElement<Props> {
  if (!children) {
    return (
      <>
      <Header />
      <LoadingText>... loading ...</LoadingText>
      </>
    );
  }

  return (
    <>{children}</>
  );
}

const LoadingText = styled.div`
  text-align: center;
  vertical-align: middle;
  line-height: 550px;
  color: ${({ theme }): string => theme.textColor};
  font-family: ${({ theme }): string => theme.fontFamily};
  font-size: 20px;
`;
