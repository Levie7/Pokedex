import * as React from 'react';

import { CustomStyle } from 'src/core/interfaces/Styles';
import { LocationPath } from 'src/core/route';
import { css } from 'src/core/style';

import { PageFooter } from './PageFooter';
import { PageHeader } from './PageHeader';

const PAGE = css`
    @media only screen and (min-width: 600px) {
        width: 720px;
        margin: auto;
    }
`;

interface PageProps extends React.HTMLProps<any>, LocationPath {
    customBackgroundStyle?: CustomStyle;
    customHeader?: React.ReactNode;
    dataTestId?: string;
    header?: string;
    hideFooter?: boolean;
    withGoBack?: boolean;
}
export const Page = React.memo<PageProps>(
    ({
        children,
        customBackgroundStyle,
        customHeader,
        dataTestId = 'PageComponent',
        header,
        hideFooter,
        path,
        withGoBack,
    }) => (
        <div css={PAGE} data-testid={dataTestId}>
            <PageHeader
                customHeader={customHeader}
                header={header}
                path={path}
                withGoBack={withGoBack}
            />
            <div
                css={css`
                    &:before {
                        content: '';
                        background: linear-gradient(
                            0,
                            rgba(254, 225, 133, 1) 0%,
                            rgba(226, 171, 78, 1) 100%
                        );
                        width: 100%;
                        height: 180px;
                        border-bottom-left-radius: 25%;
                        border-bottom-right-radius: 25%;
                        box-shadow: rgb(108 114 124 / 35%) 0px 4px 4px 0px;
                        position: fixed;
                        top: 0;
                        ${customBackgroundStyle}
                        @media only screen and (min-width: 600px) {
                            width: 720px;
                        }
                    }
                `}
            ></div>
            <div
                className='m-3'
                css={css`
                    position: relative;
                `}
            >
                {children}
            </div>
            {!hideFooter && <PageFooter />}
        </div>
    )
);
