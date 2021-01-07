import React from 'react';
import { cx } from '../libs/styledComponent';
import { MapClasseNames } from '../styles/constants';

export default (
    classNames,
    images,
    onSlideStart,
    onSlideEnd,
    onSlideMove,
) => {
    const imageRegistry = {};

    const childrenContent = images.map((image, index) => {
        const imageSignature = "imageN" + Math.floor(Math.random().toFixed(3) * 1000);
        imageRegistry[imageSignature] = image;
        return (
            React.createElement(
                (() => (<button
                    className={cx(
                        MapClasseNames.slideContainer,
                        classNames && classNames.slideContainer || "",
                    )}
                    // Must Add Also the support of firefox and other browsers
                    onMouseDown={onSlideStart(index, images.length)}
                    onTouchStart={onSlideStart(index, images.length)}
                    onTouchEnd={onSlideEnd(index, images.length)}
                    onTouchMove={onSlideMove(index, images.length)}
                >
                    <img
                        className={cx(
                            MapClasseNames.slide,
                            classNames && classNames.slide || "",
                        )}
                        src={image}
                        loading={"lazy"}
                    />
                </button>)),
                {
                    key: imageSignature,
                    imageSignature,
                }
            )
        );
    });
    return {
        imageRegistry,
        childrenContent
    };

};
