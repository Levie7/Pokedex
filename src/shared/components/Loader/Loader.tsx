import * as React from 'react';

import { css } from 'src/core/style';

import PIKACHU_LOADER_IMAGE from 'src/shared/assets/pikachu-2.png';
import { COLOR } from 'src/shared/styles';

import { Page } from '../Page';
import { Picture } from '../Picture';

const LOADER = css`
    position: fixed;
    z-index: 10000;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    text-align: center;
`;

const LOADER_CONTENT = css`
    margin-top: 60vw;
    @media only screen and (min-width: 1000px) {
        margin-top: 20vw;
    }
`;

export const Loader = React.memo(() => (
    <Page hideFooter>
        <div css={LOADER} data-testid='LoaderComponent'>
            <div css={LOADER_CONTENT}>
                <Picture
                    alt='Pikachu'
                    src={PIKACHU_LOADER_IMAGE}
                    imgCustomStyle={css`
                        width: 50%;
                        @media only screen and (min-width: 600px) {
                            width: 25%;
                        }
                    `}
                    stretch='container'
                />
                <span
                    css={css`
                        ${COLOR.white}
                        font-weight:bold;
                    `}
                >
                    Loading . . .
                </span>
            </div>
        </div>
    </Page>
));
