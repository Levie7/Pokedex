import * as React from 'react';

import { Link as LinkRouter, LinkProps as LinkRouterProps } from 'src/core/route';
import { css } from 'src/core/style';

interface LinkProps extends LinkRouterProps {
    dataTestId?: string;

    onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}

export const Link = React.memo<LinkProps>(({ dataTestId = 'LinkComponent', onClick, ...props }) => (
    <LinkRouter
        css={css`
            text-decoration: none;
        `}
        {...props}
        onClick={onClick}
        data-testid={dataTestId}
    />
));
