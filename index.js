import React, { PureComponent } from 'react';
import NextSvg from './components/NextSvg';
import PrevSvg from './components/PrevSvg';
import StateManagerHOC from './flow/StateHocManager';
import styledComponent, { cx } from './libs/styledComponent';
import { initiateMapClassNames, MapClasseNames } from './styles/constants';
import generateStyles from './styles/generateStyles';



class ImageSliderComponent extends PureComponent {
    refContainer = React.createRef();
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const {
            images,
            // Here I'll have my props of Image Slider.
        } = this.props;
        console.log("Slider did mount");
        console.log(this.refContainer);
        generateStyles({
            imagesSize: images && images.length || 0,
            offsetLeftContainer: this.refContainer.current &&
                this.refContainer.current.offsetLeft || 0,
            offsetWidthContainer: this.refContainer.current &&
                this.refContainer.current.offsetWidth || 0,
        });
    }

    render() {
        // **  We will receive the childrenContent from the state Manager HOC
        // ** It will give Us the current Image
        // ? How we will perform the effect of sliding left and right

        // We Have A width And A window Maybe We will load all images
        // and The Slide is just an overflow 
        // And it's not practical this for term of performance
        // Maybe there's a solution we'll see it right away

        const {
            classNames,
            childrenContent,
            moveSlideToDot,
            moveNext,
            movePrev,
        } = this.props;

        console.log("render the image slider ", this.props);
        return (
            <div
                ref={this.refContainer}
                className={
                    cx(
                        MapClasseNames.slidesContainer, // The generated ClassName
                        classNames && classNames.slidesContainer || "", // The provided className
                    )
                }
            >
                {childrenContent}
                <button
                    type="button"
                    className={MapClasseNames.nextContainer}
                    onClick={moveNext}
                >
                    <NextSvg className={MapClasseNames.next} />
                </button>
                <button
                    type="button"
                    className={MapClasseNames.prevContainer}
                    onClick={movePrev}
                >
                    <PrevSvg className={MapClasseNames.prev} />
                </button>
                <div className={MapClasseNames.dotsContainer}>
                    Dots
                </div>
            </div>
        );
    }
}


/**
 * * 1 - Perform here the StyleSynchronizer.
 * * 2 - Initiate the style sheet with classNames
 * * 3 - Call the HOC : styledComponent
 * * 4 - Call The HOC : StateManagerHOC
 * * 5 - Render the BarComponent
 */
export default class ImageSlider extends PureComponent {
    constructor(props) {
        super(props);
        this.id = Math.floor(Math.random().toFixed(3) * 10000);
        initiateMapClassNames(this.id);
    }

    componentWillUnmount() {
        const element = document.getElementById("emui-style-id-" + this.id);
        if (element) {
            element.parentNode.removeChild(element);
        }
    }

    render() {
        return React.createElement(
            styledComponent({
                [MapClasseNames.slidesContainer]: {
                    "display": "grid",
                    "gridTemplateRows": "100%",
                    "height": "100%",
                    "width": "100%",
                    "overflow": "hidden",
                },
                [MapClasseNames.slideContainer]: {
                    "position": "relative",
                    "transition": "left 0.6s linear",
                    "cursor": "grab"
                },
                [MapClasseNames.slide]: {
                    "height": "100%",
                    "width": "100%",
                },

                [MapClasseNames.nextContainer]: {
                    "position": "absolute",
                    "top": "50%",
                    "opacity": "0.3",
                    "backgroundColor": "white",
                    "transition": "opacity 0.6s liner",
                    "cursor": "pointer",
                    "&:hover": {
                        [MapClasseNames.next]: {
                            "fill": "white",
                        },
                        "backgroundColor": "black",
                        "opacity": "0.8"
                    }
                },
                [MapClasseNames.next]: {
                    "fill": "black",
                },
                [MapClasseNames.prevContainer]: {
                    "position": "absolute",
                    "top": "50%",
                    "opacity": "0.3",
                    "backgroundColor": "white",
                    "transition": "opacity 0.6s liner",
                    "cursor": "pointer",
                    "&:hover": {
                        [MapClasseNames.prev]: {
                            "fill": "white",
                        },
                        "backgroundColor": "black",
                        "opacity": "0.8"
                    }
                },
                [MapClasseNames.prev]: {
                    "fill": "black",
                },
                [MapClasseNames.dotsContainer]: {

                },
                [MapClasseNames.dot]: {

                },
                [MapClasseNames.activeDot]: {

                },
                [MapClasseNames.inactiveDot]: {

                }
            }
            )(
                StateManagerHOC(ImageSliderComponent),
                "emui-style-id-" + this.id,
            ),
            {
                ...this.props,
            }
        );
    }
};
