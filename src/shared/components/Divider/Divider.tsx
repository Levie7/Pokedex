import * as React from 'react';

import { css } from 'src/core/style';

interface DividerProps {
    color: string;
}

export const Divider = React.memo<DividerProps>(({ color }) => (
    <div
        css={css`
            border-left: 2px solid ${color};
            height: 50px;
        `}
        data-testid='DividerComponent'
    />
));
