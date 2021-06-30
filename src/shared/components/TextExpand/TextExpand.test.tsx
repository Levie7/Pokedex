import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { TextExpand } from './TextExpand';

test('renders TextExpand component', () => {
    render(<TextExpand lines={4} />);

    expect(screen.getByTestId('TextExpandComponent')).toBeInTheDocument();
});

test('renders TextExpand with long text', () => {
    let { rerender } = render(<TextExpand lines={1}>L</TextExpand>);

    rerender(
        <TextExpand lines={0}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam et libero a libero
            sagittis fringilla. Cras felis orci, commodo a suscipit pulvinar, dapibus egestas dolor.
            Quisque ut lorem arcu. Donec lorem odio, consectetur vel porta quis, ultricies euismod
            tellus. Cras fermentum odio sapien, eu volutpat augue euismod venenatis. Proin massa
            velit, iaculis vitae ipsum at, feugiat fermentum massa. Praesent condimentum dolor non
            nisi feugiat sodales. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
            commodo massa vel arcu feugiat, et sollicitudin quam finibus. Orci varius natoque
            penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nulla porttitor
            tellus ac ex mollis maximus. In consequat aliquam sapien, a cursus tortor venenatis a.
            Aenean facilisis id elit in sagittis. Vestibulum consequat leo ac velit tempor, id
            imperdiet eros auctor.
        </TextExpand>
    );

    expect(screen.getByText(/Show More/i)).toBeInTheDocument();
});

test('click button show more at TextExpand with long text', () => {
    let { rerender } = render(<TextExpand lines={1}>L</TextExpand>);

    rerender(
        <TextExpand lines={1}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam et libero a libero
            sagittis fringilla. Cras felis orci, commodo a suscipit pulvinar, dapibus egestas dolor.
            Quisque ut lorem arcu. Donec lorem odio, consectetur vel porta quis, ultricies euismod
            tellus. Cras fermentum odio sapien, eu volutpat augue euismod venenatis. Proin massa
            velit, iaculis vitae ipsum at, feugiat fermentum massa. Praesent condimentum dolor non
            nisi feugiat sodales. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
            commodo massa vel arcu feugiat, et sollicitudin quam finibus. Orci varius natoque
            penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nulla porttitor
            tellus ac ex mollis maximus. In consequat aliquam sapien, a cursus tortor venenatis a.
            Aenean facilisis id elit in sagittis. Vestibulum consequat leo ac velit tempor, id
            imperdiet eros auctor.
        </TextExpand>
    );

    let button = screen.getByRole('button');
    fireEvent.click(button);

    expect(screen.getByText(/Hide/i)).toBeInTheDocument();
    expect(screen.queryByText(/Show More/i)).not.toBeInTheDocument();
});
