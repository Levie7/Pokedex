import * as React from 'react';

import { CustomStyle } from 'src/core/interfaces/Styles';
import { css } from 'src/core/style';

interface InputProps extends React.HTMLProps<any> {
    customStyle?: CustomStyle;
    dataTestId?: string;
}

export const Input = React.memo<InputProps>(
    ({ className, customStyle, dataTestId = 'InputComponent', ...props }) => (
        <input
            className={`py-2 px-3 ${className}`}
            css={css`
                border: 0;
                border-radius: 20px;
                :focus {
                    outline: none;
                    border: 1px solid #2d9fd9;
                }
                ${customStyle}
            `}
            data-testid={dataTestId}
            {...props}
        />
    )
);
