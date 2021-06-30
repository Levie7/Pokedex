import * as React from 'react';

import { css } from 'src/core/style';

import { Button } from '../Button';

interface TextExpandProps extends React.HTMLProps<any> {
    lines: number;
}

interface TextExpandState {
    height: number;
    truncate: boolean;
}

export const TextExpand = React.memo<TextExpandProps>(({ children, lines }) => {
    let [textConfiguration, setTextConfiguration] = React.useState<TextExpandState>({
        height: 0,
        truncate: false,
    });

    let { height, truncate } = textConfiguration;

    let textDiv: HTMLDivElement | any;

    React.useEffect(
        () => {
            calculateLines();
        },
        // eslint-disable-next-line
        [children]
    );

    function calculateLines() {
        let computedStyle = window.getComputedStyle(textDiv);
        let paddingTop = +computedStyle.paddingTop!.split('px')[0];
        let paddingBottom = +computedStyle.paddingBottom!.split('px')[0];
        let currentHeight = textDiv.clientHeight - paddingTop - paddingBottom || 10;
        let lineHeight = +computedStyle.lineHeight!.split('px')[0] || 5;
        let linesDefault = Math.round(currentHeight / lineHeight);

        if (linesDefault > lines) {
            setTextConfiguration({ truncate: true, height: lines * lineHeight });
        }
    }

    function handleOnClick() {
        setTextConfiguration({ ...textConfiguration, truncate: !truncate });
    }

    function setRef(ref: HTMLDivElement) {
        textDiv = ref;
    }

    function renderLabel(label: string) {
        return (
            <div
                css={css`
                    text-align: center;
                `}
            >
                <Button
                    className='mt-2'
                    customStyle={css`
                        background: linear-gradient(
                            180deg,
                            rgba(254, 225, 133, 1) 0%,
                            rgba(226, 171, 78, 1) 100%
                        );
                        width: 40%;
                        margin: 0 auto;
                    `}
                    onClick={handleOnClick}
                >
                    {label}
                </Button>
            </div>
        );
    }

    let style;
    let labelExpand = !!height && renderLabel('Hide');
    if (truncate) {
        style = { height: height + 'px' };
        labelExpand = (
            <>
                <div
                    css={css`
                        background: linear-gradient(
                            to bottom,
                            rgba(255, 255, 255, 0) 0%,
                            rgba(255, 255, 255, 1) 100%
                        );
                        height: 75px;
                        margin-top: -75px;
                        width: 100%;
                        position: absolute;
                        left: 0;
                    `}
                />
                {renderLabel('Show More')}
            </>
        );
    }

    return (
        <div data-testid='TextExpandComponent'>
            <div
                css={css`
                    overflow: hidden;
                `}
                ref={setRef}
                style={style}
            >
                {children}
            </div>
            {labelExpand}
        </div>
    );
});
