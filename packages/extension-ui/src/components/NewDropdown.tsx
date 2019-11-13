
import React, {useState, ReactNode} from 'react'
import styled from 'styled-components';

interface NewDropdownProps {
  dropdown: ReactNode;
  buttons: ReactNode;
}

export const NewDropdown = ({dropdown, buttons}: NewDropdownProps) => {
  const [visible, setVisible] = useState(false);
  return (
    <Dropdown>
      <Button onClick={(): void => setVisible(!visible)}>
        {dropdown}
      </Button>
      <DropdownContent isVisible={visible}>
        {buttons}
      </DropdownContent>
    </Dropdown>
  )
}

const Dropdown = styled.div`
  display: block;
  align-self: center;
  width: 100%;
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
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
  padding: 0;
`;
