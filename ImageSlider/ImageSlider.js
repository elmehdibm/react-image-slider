import React, { Component } from 'react';
import './ImageSlider.scss';
import LeftArrow from './img/left-arrow.svg';
import RightArrow from './img/right-arrow.svg';
import Pause from './img/pause.svg';
import Play from './img/play.svg';

class ImageSlider extends Component {
    constructor() {
        super();
        this.slideNextPicture = this.slideNextPicture.bind(this);
        this.slidePrevPicture = this.slidePrevPicture.bind(this);
        this.startSliding = this.startSliding.bind(this);
        this.resetSliding = this.resetSliding.bind(this);
    }
    componentWillMount() {
        const { images } = this.props;
        if (images.length > 0) {
            this.state = {
                currentImage: images[0],
                numberImages: images.length,
                indexImage: 0,
                canStart: true,
                idInterval: 0,
            };
        }
        this.startSliding();
    }

    componentWillUnmount() {
        const { idInterval } = this.state;
        clearInterval(idInterval);
    }

    startSliding() {
        const { timeSliding } = this.props;
        const { canStart } = this.state;
        if (canStart) {
            this.setState({
                idInterval: setInterval(() => {
                    this.slideNextPicture();
                }, timeSliding * 1000),
            });
        }
        this.setState({
            canStart: false,
        });
    }

    resetSliding() {
        const { idInterval } = this.state;
        clearInterval(idInterval);
        this.setState({
            canStart: true,
        });
    }

    slideNextPicture() {
        const { indexImage, numberImages } = this.state;
        const newIndex = (indexImage + 1) % numberImages;
        const { images } = this.props;
        this.setState({
            currentImage: images[newIndex],
            indexImage: newIndex,
        });
    }

    slidePrevPicture() {
        const { indexImage, numberImages } = this.state;
        const newIndex = ((indexImage - 1) + numberImages) % numberImages;
        const { images } = this.props;
        this.setState({
            currentImage: images[newIndex],
            indexImage: newIndex,
        });
    }

    render() {
        const { children } = this.props;
        const { currentImage } = this.state;
        return (
            <div className="container-image-slider">
                <img className="container-image-slider__image" src={currentImage} alt="images" />
                {children}
                <div
                    className="container-image-slider__prev"
                    onClick={this.slidePrevPicture}>
                    <img src={LeftArrow} alt="left-arrow" />
                </div>
                <div
                    className="container-image-slider__pause"
                    onClick={this.resetSliding}>
                    <img src={Pause} alt="pause" />
                </div>
                <div
                    className="container-image-slider__play"
                    onClick={this.startSliding}>
                    <img src={Play} alt="play" />
                </div>
                <div
                    className="container-image-slider__next"
                    onClick={this.slideNextPicture}>
                    <img src={RightArrow} alt="right-arrow" />
                </div>
            </div>
        );
    }
}

export default ImageSlider;


/* Component Done By Mehdi Boumhicha at 06:35 20/08/2018 */
