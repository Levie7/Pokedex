import * as React from 'react';

import { css } from 'src/core/style';

import POKEBALL_ICON from 'src/shared/assets/pokeball-1.png';
import LIST_ICON from 'src/shared/assets/list.png';
import { BACKGROUND, COLOR } from 'src/shared/styles/Color';
import { FLEX } from 'src/shared/styles/Flex';

import { Link } from '../Link';
import { Picture } from '../Picture';

const FOOTER = css`
    ${BACKGROUND.black};
    ${FLEX.display};
    ${FLEX.justify.around};
    position: fixed;
    width: 100%;
    bottom: -1px;
    text-align: center;
    border-top-left-radius: 30px;
    border-top-right-radius: 30px;
    box-shadow: rgb(108 114 124 / 16%) 0px -2px 4px 0px;
    z-index: 1000;
    @media only screen and (min-width: 600px) {
        width: 720px;
    }
`;

const MENUS = [
    {
        alt: 'List Pokemon',
        src: LIST_ICON,
        name: 'List',
        path: '/',
    },
    {
        alt: 'My Pokémon',
        src: POKEBALL_ICON,
        name: 'My Pokémon',
        path: '/my-pokemon',
    },
];

export const PageFooter = React.memo(() => (
    <footer className='p-1' css={FOOTER}>
        {MENUS.map((menu) => (
            <Link
                className='col-6'
                css={css`
                    ${FLEX.display}
                    ${FLEX.direction.column}
                `}
                to={menu.path}
                key={menu.name}
            >
                <Picture
                    alt={menu.alt}
                    imgCustomStyle={css`
                        height: 24px;
                    `}
                    src={menu.src}
                    stretch='container'
                    objectFit='scale-down'
                />
                <span
                    css={css`
                        font-size: 10px;
                        ${COLOR.white};
                    `}
                >
                    {menu.name}
                </span>
            </Link>
        ))}
    </footer>
));
