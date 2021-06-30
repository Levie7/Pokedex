import * as React from 'react';

import { CustomStyle } from 'src/core/interfaces/Styles';
import { css } from 'src/core/style';

import { BACKGROUND, COLOR } from 'src/shared/styles';

const BUTTON = css`
    border: 0;
    border-radius: 20px;
    box-shadow: rgb(108 114 124 / 16%) 0px 4px 4px 0px;
    font-weight: bold;
    ${BACKGROUND.black};
    ${COLOR.white};
`;

const BUTTON_TEXT = css`
    background: none;
    box-shadow: none;
    ${COLOR.black};
`;

interface ButtonProps extends React.HTMLProps<any> {
    customStyle?: CustomStyle;
    dataTestId?: string;
    textOnly?: boolean;
}

export const Button = React.memo<ButtonProps>(
    ({ className, children, customStyle, dataTestId = 'ButtonComponent', onClick, textOnly }) => (
        <button
            className={`py-2 ${className}`}
            css={[BUTTON, textOnly && BUTTON_TEXT, customStyle]}
            data-testid={dataTestId}
            onClick={onClick}
        >
            {children}
        </button>
    )
);
