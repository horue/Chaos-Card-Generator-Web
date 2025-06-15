import Svg, { Text as SvgText } from 'react-native-svg';
import { View } from 'react-native';


export const StrokedText = ({ text, top, left, fontSize, strokeWidth }) => (
  <View style={{ top, left, position: 'absolute' }}>
    <Svg height={fontSize + 200} width={1500}>
      <SvgText
        stroke="black"
        strokeWidth={strokeWidth}
        fill="white"
        fontSize={fontSize}
        fontFamily="Mongolian Baiti"
        x={4}
        y={fontSize}
        strokeLinejoin="round"
        strokeLinecap="round"
        paintOrder="stroke"
        fillRule="nonzero"
      >
        {text}
      </SvgText>
    </Svg>
  </View>
);