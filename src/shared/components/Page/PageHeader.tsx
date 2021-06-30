import * as React from 'react';

import { LocationPath } from 'src/core/route';
import { css } from 'src/core/style';

import BACK_ICON from 'src/shared/assets/back.png';
import { COLOR, FLEX } from 'src/shared/styles';

import { Link } from '../Link';
import { Picture } from '../Picture';

const HEADER = css`
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background: #ebbd60;
    z-index: 1000;
`;

const HEADER_CONTENT = css`
    ${FLEX.display};
    ${FLEX.justify.between};
    ${FLEX.align.center};
    margin-bottom: 0.5rem;
    margin-top: 0.5rem;
    margin-left: 1rem;
    margin-right: 1rem;
    @media only screen and (min-width: 600px) {
        width: 720px;
        margin: auto;
    }
`;

const HEADER_TITLE = css`
    ${COLOR.white}
    z-index: 1;
`;

interface PageHeaderProps extends LocationPath {
    customHeader?: React.ReactNode;
    header?: string;
    withGoBack?: boolean;
}

export const PageHeader = React.memo<PageHeaderProps>(
    ({ customHeader, header = 'Pokédex', path = '/', withGoBack }) => (
        <header css={HEADER}>
            <div css={HEADER_CONTENT}>
                <div
                    css={css`
                        ${FLEX.display};
                    `}
                >
                    {withGoBack && (
                        <Link
                            className='mt-1'
                            css={css`
                                margin-right: 1rem;
                            `}
                            to={path}
                            dataTestId='BackLinkHeader'
                        >
                            <Picture width={12} alt='Back' src={BACK_ICON} />
                        </Link>
                    )}
                    <h1 css={HEADER_TITLE}>{header}</h1>
                </div>
                <div
                    css={css`
                        ${FLEX.display};
                    `}
                >
                    {customHeader}
                </div>
            </div>
        </header>
    )
);
