// Copyright 2019 @polkadot/extension-ui authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import options from '../assets/options.png';

import Box from './Box';
import { useOutsideClick } from '../hooks/useOutsideClick';

interface Props {
  banner?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  icon: React.ReactNode;
  intro: React.ReactNode;
  name?: React.ReactNode | null;
  theme?: 'polkadot' | 'substrate';
  buttons?: React.ReactNode;
}

function IconBox ({ banner, children, className, icon, intro, buttons }: Props): React.ReactElement<Props> {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);
  useOutsideClick(ref, () => (visible && setVisible(!visible)));

  return (
    <div className={className}>
      <Box
        banner={banner}
        className='details'
      >
        <div className='outer-icon'>{icon}</div>
        <Intro>{intro}</Intro>
        {buttons &&
          <Dropdown ref={ref}>
            <Button onClick={(): void => setVisible(!visible)}>
              <OptionsButton src={options} alt='options' />
            </Button>
            <DropdownContent isVisible={visible} onClick={(): void => setVisible(!visible)}>
              {buttons}
            </DropdownContent>
          </Dropdown>}
      </Box>
      <div className='children'>{children}</div>
    </div>
  );
}

const OptionsButton = styled.img`
  width: 6px;
  height: 25px;
  margin-left: 10px;
  opacity: 0.5;
  &:hover {
    opacity: 1;
  }
`;

const Intro = styled.div`
  align-self: center;
`;

const Dropdown = styled.div`
  display: block;
  align-self: center;
`;

const Button = styled.button`
  background: none;
  border: none;
  outline: none;
`;

const DropdownContent = styled.ul<{isVisible: boolean}>`
  display: ${({ isVisible }): string => isVisible ? 'block' : 'none'};
  position: absolute;
  border-radius: 8px;
  background: ${({ theme }): string => theme.background};
  min-width: 180px;
  right: 0;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  margin-right: 25px;
  z-index: 1;
  padding: 0;
`;

export default styled(IconBox)`
  position: relative;
`;
