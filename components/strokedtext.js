import Svg, { Text as SvgText, TSpan } from 'react-native-svg';
import { View } from 'react-native';

export const StrokedText = ({ text, top, left, fontSize, strokeWidth, font }) => {
  const lines = text.split('\n');
  
  return (
    <View style={{ top, left, position: 'absolute' }}>
      <Svg height={fontSize + 600} width={1500}>
        <SvgText
          stroke="black"
          strokeWidth={strokeWidth}
          fill="white"
          fontSize={fontSize}
          fontFamily={font}
          x={4}
          y={fontSize}
          strokeLinejoin="round"
          strokeLinecap="round"
          paintOrder="stroke"
          fillRule="nonzero"
        >
          {lines.map((line, i) => (
            <TSpan key={i} x={4} dy={i === 0 ? 0 : fontSize * 1.2}>
              {line}
            </TSpan>
          ))}
        </SvgText>
      </Svg>
    </View>
  );
};
