// Copyright 2019 @polkadot/extension-ui authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import React, {useState} from 'react';
import styled from 'styled-components';
import eyeButton from '../assets/eyeButton.png';
import options from '../assets/options.png';

import Box from './Box';

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

function IconBox({banner, children, className, icon, intro, buttons}: Props): React.ReactElement<Props> {
const [visible, setVisible] = useState(false);

  return (
    <>
      <Box
        banner={banner}
        className='details'
      >
        <EyeButton src={eyeButton} alt='eyeButton' />
        <div className='outer-icon'>{icon}</div>
        <Intro>{intro}</Intro>
        <Dropdown>
          <Button onClick={() => setVisible(!visible)}>
          <OptionsButton src={options} alt='options'/>
          </Button>
          <DropdownContent isVisible={visible}>
            {buttons}
          </DropdownContent>
        </Dropdown>
      </Box>
      <div className='children'>{children}</div>
    </>
  );
}

const EyeButton = styled.img`
  width: 18px;
  height: 12px;
`;

const OptionsButton = styled.img`
  width: 6px;
  height: 25px;
  margin-left: 10px;
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
  display: ${({ isVisible}) => isVisible? 'block' : 'none'};
  position: absolute;
  border-radius: 8px;
  background: ${({ theme }): string => theme.background};
  min-width: 180px;
  right: 0;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  margin-right: 25px;
  z-index: 1;
`;

export default styled(IconBox)`
  position: relative;
`;
