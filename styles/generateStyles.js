import { changeCssProperty } from "../libs/styledComponent";
import { MapClasseNames } from "./constants";

export default ({
  imagesSize,
  offsetWidthContainer,
}) => {
  console.log(" Generating the styles of the Image Slider : ");
  changeCssProperty(
    MapClasseNames.slidesContainer,
    {
      "gridTemplateColumns": "repeat("+ imagesSize + ", 100%)",
    }
  );
    // The Value 40 is on relation with the width of next , prev svgs
  changeCssProperty(
    MapClasseNames.nextContainer,
    {
      "marginLeft": offsetWidthContainer - 40,
    }
  );

};
