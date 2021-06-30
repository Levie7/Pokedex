import { css } from 'src/core/style';

export const FLEX = {
    align: {
        baseline: css`
            align-items: baseline;
        `,
        center: css`
            align-items: center;
        `,
    },
    direction: {
        column: css`
            flex-direction: column;
        `,
        row: css`
            flex-direction: row;
        `,
    },
    display: css`
        display: flex;
    `,
    justify: {
        around: css`
            justify-content: space-around;
        `,
        between: css`
            justify-content: space-between;
        `,
        center: css`
            justify-content: center;
        `,
    },
    wrap: css`
        flex-wrap: wrap;
    `,
};
