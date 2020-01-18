import React, { Component } from 'react';
import LeftArrow from './img/left-arrow.svg';
import RightArrow from './img/right-arrow.svg';
import Pause from './img/pause.svg';
import Play from './img/play.svg';

const iconStyle = {
    display: 'inline-block',
    width: '18px',
};

const imgStyle = { height: '18px' };

class ImageSlider extends Component {
    constructor(props) {
        super(props);
        const { images, canSlide, timeSliding } = props;
        if (images && images.length > 0) {
            const timing = timeSliding ? timeSliding : 2.5;
            let idInterval = 0;
            if (canSlide === undefined || canSlide === true) {
                idInterval = setInterval(() => {
                    this.slideNextPicture();
                }, timing * 1000);
            }
            this.state = {
                currentImage: images[0],
                numberImages: images.length,
                indexImage: 0,
                canSlide: false,
                timing,
                idInterval
            };
        }
    }

    componentWillUnmount() {
        const { idInterval } = this.state;
        clearInterval(idInterval);
    }

    startSliding = () => {
        const { idInterval, timing } = this.state;
        clearInterval(idInterval);
        this.setState({
            idInterval: setInterval(() => {
                this.slideNextPicture();
            }, timing * 1000),
            canSlide: false,
        });
    }

    resetSliding = () => {
        const { idInterval } = this.state;
        clearInterval(idInterval);
        this.setState({
            canSlide: true,
        });
    }

    slideNextPicture = () => {
        const { indexImage, numberImages } = this.state;
        const newIndex = (indexImage + 1) % numberImages;
        const { images } = this.props;
        this.setState({
            currentImage: images[newIndex],
            indexImage: newIndex,
        });
    }

    slidePrevPicture = () => {
        const { indexImage, numberImages } = this.state;
        const newIndex = ((indexImage - 1) + numberImages) % numberImages;
        const { images } = this.props;
        this.setState({
            currentImage: images[newIndex],
            indexImage: newIndex,
        });
    }

    render() {
        const { children, height } = this.props;
        const { currentImage, canSlide } = this.state;
        const containerHeight = height ? height : "100%";
        const imageHeight = "calc(" + containerHeight + " - 25px)";
        return (
            <div style={{
                width: '100%',
                overflow: 'hidden',
                textAlign: 'center',
                height: containerHeight
            }}>
                <div
                    onClick={
                        !canSlide ?
                        this.resetSliding
                        : this.startSliding
                    }
                    style={{
                        backgroundImage: `url(${currentImage})`,
                        width: '100%',
                        zIndex: 1,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: '100%',
                        height: '400px',
                        backgroundPosition: '50% 50%',
                        textAlign: 'left',
                        height: imageHeight
                    }}>
                    {children}
                </div>
                { canSlide &&
                <div
                    style={iconStyle}
                    onClick={this.slidePrevPicture}>
                    <img style={imgStyle} src={LeftArrow} alt="left-arrow" />
                </div>
                }
                { !canSlide &&
                <div
                    style={iconStyle}
                    onClick={this.resetSliding}>
                    <img style={imgStyle} src={Pause} alt="pause" />
                </div>
                }
                {
                    canSlide && <div
                        style={Object.assign({}, iconStyle, { marginTop: '1px', verticalAlign: 'top' })}
                        onClick={this.startSliding}>
                        <img style={imgStyle} src={Play} alt="play" />
                    </div>
                }
                { canSlide && <div
                    style={iconStyle}
                    onClick={this.slideNextPicture}>
                    <img style={imgStyle} src={RightArrow} alt="right-arrow" />
                </div>}
            </div>
        );
    }
}

export default ImageSlider;


/* Component Done By Mehdi Boumhicha at 06:35 20/08/2018 */

/* Component Updated By Mehdi Boumhicha at 24/12/2019 */
