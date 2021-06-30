import * as React from 'react';

import { css } from 'src/core/style';

import CLOSE_IMAGE from 'src/shared/assets/close.png';
import { BACKGROUND } from 'src/shared/styles';

import { Picture } from '../Picture';

const MODAL_BACKDROP = css`
    position: fixed;
    z-index: 1000;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
`;

const MODAL_CONTENT = css`
    z-index: 1001;
    position: fixed;
    margin: 0 auto;
    top: 20%;
    left: 0;
    right: 0;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
    border-radius: 10px;
    max-width: 500px;
    text-align: center;
    box-shadow: rgb(108 114 124 / 35%) 0px 4px 4px 0px;
    -webkit-animation-name: animatetop;
    -webkit-animation-duration: 0.4s;
    animation-name: animatetop;
    animation-duration: 0.4s;
    @-webkit-keyframes animatetop {
        from {
            top: -300px;
            opacity: 0;
        }
        to {
            top: 200px;
            opacity: 1;
        }
    }
    @keyframes animatetop {
        from {
            top: -300px;
            opacity: 0;
        }
        to {
            top: 200px;
            opacity: 1;
        }
    }
    ${BACKGROUND.white};

    @media only screen and (min-width: 600px) {
        top: 40%;
        @-webkit-keyframes animatetop {
            from {
                top: -300px;
                opacity: 0;
            }
            to {
                top: 350px;
                opacity: 1;
            }
        }
        @keyframes animatetop {
            from {
                top: -300px;
                opacity: 0;
            }
            to {
                top: 350px;
                opacity: 1;
            }
        }
    }
`;

interface ModalProps extends React.HTMLProps<any> {
    onClose: () => void;
}

export const Modal = React.memo<ModalProps>(({ children, onClose }) => (
    <div data-testid='ModalComponent'>
        <div css={MODAL_BACKDROP} onClick={onClose} />
        <div className='p-3' css={MODAL_CONTENT}>
            <Picture
                customStyle={css`
                    cursor: pointer;
                    position: absolute;
                    right: 7%;
                `}
                alt='Close'
                src={CLOSE_IMAGE}
                width={15}
                onClick={onClose}
            />
            {children}
        </div>
    </div>
));
