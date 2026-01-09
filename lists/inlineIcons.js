import React from 'react';
import Svg, { Rect, Text } from 'react-native-svg';

export class Icon {

  static Base = ({
    label,
    size = 18,
    x = 0,
    y = 0,
    color = '#2700E8',
  }) => (
    <Svg
      width={size * 2.2}
      height={size}
      x={x}
      y={y+2}
      viewBox="0 0 250 90"
    >
      <Rect
        width="250"
        height="90"
        rx="16"
        fill={color}
      />

      <Text
        x="125"
        y="64.2"
        fontFamily='Arial'
        fontSize={50}
        alignmentBaseline='middle'
        fontWeight="bold"
        fill="white"
        textAnchor="middle"
        style={{alignContent: 'center', alignItems: 'center'}}
      >
        {label}
      </Text>
    </Svg>
  );

  /* ===== ÍCONES ===== */

  static Auto = (props) => (
    <Icon.Base label="AUTO" color="#2700E8" {...props} />
  );

  static Quick = (props) => (
    <Icon.Base label="QUICK" color="#53ac00ff" {...props} />
  );

  static Ativo = (props) => (
    <Icon.Base label="ATIVO" color="#E80037" {...props} />
  );

  static Answer = (props) => (
    <Icon.Base label="ANSWER" color="#E85E00" {...props} />
  );

  static Opt = (props) => (
    <Icon.Base label="1/TURNO" color="#E800AA" {...props} />
  );
}




export const ICON_ALIASES = {
  auto: '{AUTO}',
  a: '{AUTO}',

  quick: '{QUICK}',
  q: '{QUICK}',

  answer: '{ANSWER}',
  an: '{ANSWER}',

  ativo: '{ATIVO}',
  at: '{ATIVO}',

  '1turno': '{1/TURNO}',
  '1t': '{1/TURNO}',
};