'use client';

import { QRCodeCanvas } from 'qrcode.react';
import { FC } from 'react';

interface QRCodeProps {
  url: string;
}

export const QRCode: FC<QRCodeProps> = (props) => {
  return (
    <QRCodeCanvas
      value={props.url}
      size={128}
      bgColor={'#FFFFFF00'}
      fgColor={'#000000'}
      level={'L'}
      includeMargin={true}
    />
  );
};

export default QRCode;
