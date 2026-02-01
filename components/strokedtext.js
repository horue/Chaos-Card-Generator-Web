import Svg, { Text as SvgText, TSpan } from 'react-native-svg';
import { View } from 'react-native';
import { Icon } from '../lists/inlineIcons';

const ICON_TOKENS = {
  '{a}': Icon.Auto,
  '{auto}': Icon.Auto,

  '{q}': Icon.Quick,
  '{quick}': Icon.Quick,

  '{at}': Icon.Ativo,
  '{ativo}': Icon.Ativo,

  '{an}': Icon.Answer,
  '{answer}': Icon.Answer,

  '{1t}': Icon.Opt,
  '{1turno}': Icon.Opt,
};

function parseInline(text) {
  const regex = /\{[^}]+\}/g;
  const parts = [];
  let lastIndex = 0;

  for (const match of text.matchAll(regex)) {
    if (match.index > lastIndex) {
      parts.push({ type: 'text', value: text.slice(lastIndex, match.index) });
    }

    const token = match[0].toLowerCase();
    if (ICON_TOKENS[token]) {
      parts.push({ type: 'icon', Icon: ICON_TOKENS[token] });
    } else {
      parts.push({ type: 'text', value: match[0] });
    }

    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push({ type: 'text', value: text.slice(lastIndex) });
  }

  return parts;
}


export const StrokedText = ({ text, top, left, fontSize, strokeWidth, font }) => {
  const lines = text.split('\n');
  const lineHeight = fontSize * 1.2;

  return (
    <View style={{ top, left, position: 'absolute' }}>
      <Svg width={1500} height={fontSize + 600}>
        {lines.map((line, lineIndex) => {
          const parts = parseInline(line);
          let cursorX = 4;
          const baseY = fontSize + lineIndex * lineHeight;

          return parts.map((part, i) => {
            /* ===== TEXTO ===== */
            if (part.type === 'text') {
              const widthEstimate = part.value.length * fontSize * 0.55;

              const el = (
                <SvgText
                  key={`${lineIndex}-${i}`}
                  x={cursorX}
                  y={baseY}
                  stroke="black"
                  strokeWidth={strokeWidth}
                  fill="white"
                  fontSize={fontSize}
                  fontFamily={font}
                  paintOrder="stroke"
                >
                  {part.value}
                </SvgText>
              );

              cursorX += widthEstimate;
              return el;
            }

            if (part.type === 'icon') {
              const IconComp = part.Icon;

              const iconSize = fontSize;
              const iconY = baseY - iconSize * 0.85;

              const el = (
                <IconComp
                  key={`${lineIndex}-${i}`}
                  x={cursorX}
                  y={iconY}
                  size={iconSize}
                />
              );

              cursorX += iconSize * 2.2 + 6;
              return el;
            }

            return null;
          });
        })}
      </Svg>
    </View>
  );
};
