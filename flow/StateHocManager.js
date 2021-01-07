import React, { Children, Component } from 'react';
import { changeCssProperty, cx } from '../libs/styledComponent';
import { MapClasseNames } from '../styles/constants';
import buildChildrenContentAndImageRegistry from './buildChildrenContentAndImageRegistry';
import getMoveRateFromMouseXAndWidth from './getMoveRateFromMouseXAndWidth';

export default component => {
    return class StateManagerHOC extends Component {
        posX1 = 0;
        posX2 = 0;
        imagesSize = 0;

        constructor(props) {
            console.log("Construction of the state Manager - image-slider")
            super(props);
            console.log(props);
            const {
                // Props Of Image Slider
                classNames,
                images,
            } = props;

            this.imagesSize = images && images.length || 0;

            console.log("Handling Errors ...");
            // Handle Warnings
            console.log("Handling Warnings ...");

            // Must Move this funcion
            this.state = {
                // ** States of Image Slider
                ...buildChildrenContentAndImageRegistry(
                    classNames,
                    images,
                    this.onSlideStart,
                    this.onSlideEnd,
                    this.onSlideMove,
                ),
                currentPosition: 0,
            };
        }

        onSlideStart = (pos, size) => e => {
            e.preventDefault();

            if (e.type == 'touchstart') {
                this.posX1 = e.touches[0].clientX;
            } else {
                this.posX1 = e.clientX;
                document.onmouseup = this.onSlideEnd(pos, size);
                document.onmousemove = this.onSlideMove(pos, size);
            }
        };

        onSlideMove = (pos, size) => e => {
            if (e.type == 'touchstart') {
                this.posX2 = this.posX1 - e.touches[0].clientX;
            } else {
                this.posX2 = this.posX1 - e.clientX;
            }
            const moveRate = getMoveRateFromMouseXAndWidth(this.posX2, e.path[0].width);
            if (
                !(pos === 0 && moveRate >= 0)
                && !(pos === size - 1 && moveRate < 0)
            ) {
                changeCssProperty(
                    MapClasseNames.slideContainer, {
                    "left": (moveRate - (pos * 100)) + "%",
                }
                );
            }
        }

        onSlideEnd = (pos, size) => e => {
            const endMoveRate = getMoveRateFromMouseXAndWidth(this.posX2, e.path[0].width);
            let translateRate = 0;
            if (endMoveRate > 25) {
                translateRate = 100;
            } else if (endMoveRate < - 25) {
                translateRate = -100;
            }
            // ? I can show alert to notify it's the last or first slide
            if (
                !(pos === 0 && translateRate > 0)
                && !(pos === size - 1 && translateRate < 0)
            ) {
                changeCssProperty(
                    MapClasseNames.slideContainer, {
                    "left": (translateRate - (pos * 100)) + "%",
                }
                );

                this.setState({
                    currentPosition: pos,
                });
            }
            document.onmouseup = null;
            document.onmousemove = null;
        }

        moveSlideTo = (nextPos) => {
            changeCssProperty(
                MapClasseNames.slideContainer, {
                "left": (- (nextPos * 100)) + "%",
            }
            );
            this.setState({
                currentPosition: nextPos,
            });
        };

        moveNext = () => {
            const {currentPosition} = this.state;
            this.moveSlideTo(
                Math.min(
                    this.imagesSize - 1,
                    currentPosition + 1,
                )
            );
        };

        movePrev = () => {
            const {currentPosition} = this.state;
            this.moveSlideTo(
                Math.max(
                    0,
                    currentPosition - 1,
                )
            );
        };

        shouldComponentUpdate() {
            // the compareProps Must move it here
            return true;
        }

        render() {
            console.log("Render the state manager ...");
            const {
                childrenContent,
                currentPosition,
            } = this.state;

            // Here it doesn't contain design logics
            // Only passing methods and params that manage the states
            return (
                React.createElement(
                    component,
                    {
                        ...this.props,
                        childrenContent,
                        currentPosition,
                        moveSlideToDot: this.moveSlideTo,
                        moveNext: this.moveNext,
                        movePrev: this.movePrev,
                    }
                )
            );
        }
    };
};
