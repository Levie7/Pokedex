import * as React from 'react';

import { css } from 'src/core/style';

import PIKACHU_EMPTY_IMAGE from 'src/shared/assets/pikachu-1.png';
import { COLOR } from 'src/shared/styles';

import { Picture } from '../Picture';

interface EmptyMessageProps {
    message: string;
}

export const EmptyMessage = React.memo<EmptyMessageProps>(({ message }) => (
    <div
        css={css`
            text-align: center;
            position: relative;
            top: 40vw;
            @media only screen and (min-width: 1000px) {
                top: 20vw;
            }
        `}
        data-testid='EmptyMessageComponent'
    >
        <Picture
            alt='Pikachu'
            src={PIKACHU_EMPTY_IMAGE}
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
                ${COLOR.gray_light};
                font-weight: bold;
                font-size: 12px;
            `}
        >
            {message}
        </span>
    </div>
));
