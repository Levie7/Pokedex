import * as React from 'react';

import { CustomStyle } from 'src/core/interfaces/Styles';
import { css } from 'src/core/style';

import { BACKGROUND, COLOR } from 'src/shared/styles';

const CHIP = css`
    width: 100%;
    text-align: center;
    border-radius: 20px;
    font-weight: bold;
    padding-bottom: 0.2rem;
    box-shadow: rgb(108 114 124 / 16%) 0px 4px 4px 0px;
    ${BACKGROUND.black}
    ${COLOR.white}
`;

interface ChipProps extends React.HTMLProps<any> {
    dataTestId?: string;
    customStyle?: CustomStyle;
}

export const Chip = React.memo<ChipProps>(
    ({ children, className, customStyle, dataTestId = 'ChipComponent', onClick }) => (
        <div
            className={className}
            css={[CHIP, customStyle]}
            data-testid={dataTestId}
            onClick={onClick}
        >
            {children}
        </div>
    )
);
