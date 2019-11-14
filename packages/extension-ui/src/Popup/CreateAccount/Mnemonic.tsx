// Copyright 2019 @polkadot/extension-ui authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import React, { useState } from 'react';
import { Button, ButtonArea, Checkbox, MnemonicSeed, VerticalSpace, Warning } from '../../components';

interface Props {
  seed: string;
  onNextStep: () => void;
}

const onCopy = (): void => {
  const mnemonicSeedTextElement = document.querySelector('textarea');
  if (!mnemonicSeedTextElement) {
    return;
  }
  mnemonicSeedTextElement.select();
  document.execCommand('copy');
};

const onPrint = (seed: string) => (): void => {
  const tab = window.open('about:blank', 'blank', 'width=800,height=600');
  if (!tab) {
    return;
  }
  tab.document.write(seed);
  tab.print();
  tab.close();
};

function Mnemonic ({ seed, onNextStep }: Props): React.ReactElement<Props> {
  const [isMnemonicSaved, setIsMnemonicSaved] = useState(false);
  return <>
    <Warning>
      <div>Please write down your wallet’s mnemonic seed and keep it in a safe place.</div>
      <div>Mnemonic seed is used to restore your wallet. Keep it carefully in case you lose your assets.</div>
    </Warning>
    <MnemonicSeed seed={seed} onCopy={onCopy} onPrint={onPrint(seed)}/>
    <VerticalSpace/>
    <Checkbox checked={isMnemonicSaved} onChange={setIsMnemonicSaved} label='I have saved my mnemonic seed safely.'/>
    <ButtonArea>
      <Button isDisabled={!isMnemonicSaved} onClick={onNextStep}>Next step</Button>
    </ButtonArea>
  </>;
}

export default Mnemonic;