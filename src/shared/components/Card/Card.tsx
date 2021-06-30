import * as React from 'react';

import { CustomStyle } from 'src/core/interfaces/Styles';
import { css } from 'src/core/style';

const CARD = css`
    background: #f8f8f8;
    border-radius: 10px;
    box-shadow: rgb(108 114 124 / 35%) 0px 4px 4px 0px;
    position: relative;
    z-index: 3;
`;

interface CardProps extends React.HTMLProps<any> {
    dataTestId?: string;
    customStyle?: CustomStyle;
}

export const Card = React.memo<CardProps>(
    ({ children, className, customStyle, dataTestId = 'CardComponent' }) => (
        <div className={className} css={[CARD, customStyle]} data-testid={dataTestId}>
            {children}
        </div>
    )
);
