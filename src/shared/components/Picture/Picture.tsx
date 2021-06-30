import * as React from 'react';

import { CustomStyle } from 'src/core/interfaces/Styles';
import { css, SerializedStyles } from 'src/core/style';

const PICTURE = css`
    position: relative;
`;

const PICTURE_CONTAINED = css`
    width: 100%;
    height: 100%;
`;

const PICTURE_COVER = css`
    object-fit: cover;
`;

const PICTURE_SCALE_DOWN = css`
    object-fit: scale-down;
`;

interface PictureProps
    extends React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> {
    alt: string;
    customStyle?: CustomStyle;
    imgClassName?: string;
    imgCustomStyle?: CustomStyle;
    objectFit?: 'scale-down' | 'cover';
    stretch?: 'container';
}

interface PictureVariant {
    [variant: string]: SerializedStyles;
}

export const Picture = React.memo<PictureProps>(
    ({
        alt,
        customStyle,
        imgClassName,
        imgCustomStyle,
        objectFit,
        src,
        stretch = 'none',
        title,
        ...props
    }) => {
        let pictureStretchStyle: PictureVariant = {
            container: PICTURE_CONTAINED,
        };

        let pictureObjectFitStyle: PictureVariant = {
            cover: PICTURE_COVER,
            'scale-down': PICTURE_SCALE_DOWN,
        };

        return (
            <div css={[PICTURE, customStyle]}>
                <img
                    className={imgClassName}
                    css={[
                        pictureStretchStyle[stretch],
                        objectFit && pictureObjectFitStyle[objectFit],
                        imgCustomStyle,
                    ]}
                    alt={alt}
                    src={src}
                    title={title || alt}
                    data-testid='PictureComponent'
                    {...props}
                />
            </div>
        );
    }
);
