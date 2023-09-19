import { Dimensions } from "react-native"
const {width,height} = Dimensions.get('window')

export const scaleFont = (size:number) => {
    const scaleFactor = Math.min(width / 455, height / 966);
    return Math.ceil(size * scaleFactor);
  };