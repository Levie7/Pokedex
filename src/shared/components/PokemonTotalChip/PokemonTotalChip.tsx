import * as React from 'react';

import { css } from 'src/core/style';

import { COLOR } from 'src/shared/styles';

import { Chip } from '../Chip';

interface PokemonTotalChipProps {
    value: string;
}

export const PokemonTotalChip = React.memo<PokemonTotalChipProps>(({ value }) => (
    <Chip
        className='px-2 py-1'
        css={css`
            font-size: 12px;
            ${COLOR.white};
        `}
        dataTestId='PokemonTotalChipComponent'
    >
        {value}
    </Chip>
));
