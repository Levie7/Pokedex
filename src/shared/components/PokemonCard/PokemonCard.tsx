import * as React from 'react';

import { css } from 'src/core/style';

import POKEBALL_IMAGE from 'src/shared/assets/pokeball-1.png';
import { FLEX } from 'src/shared/styles';

import { Card } from '../Card';
import { Picture } from '../Picture';

interface PokemonCardProps {
    image: {
        alt: string;
        src: string;
    };
    name: string;
}

export const PokemonCard = React.memo<PokemonCardProps>(({ image, name }) => (
    <Card
        className='p-2'
        customStyle={css`
            ${FLEX.display};
            ${FLEX.direction.column};
            ${FLEX.align.center};
            background: gray;
        `}
        dataTestId='PokemonCardComponent'
    >
        <span
            className='pb-3'
            css={css`
                color: #f5f6fb;
                text-transform: capitalize;
                font-weight: bold;
            `}
        >
            {name}
        </span>
        <Picture
            alt='Pokeball'
            customStyle={css`
                position: absolute;
                opacity: 0.3;
                bottom: 5%;
                right: 5%;
                text-align: right;
            `}
            imgCustomStyle={css`
                width: 50%;
            `}
            src={POKEBALL_IMAGE}
        />
        <Picture alt={image.alt} src={image.src} objectFit='cover' stretch='container' />
    </Card>
));
