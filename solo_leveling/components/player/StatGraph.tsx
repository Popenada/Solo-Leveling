import { theme } from '@/constants/theme'
import { View } from 'react-native'
import Svg, { Circle, Line, Polygon, Text as SvgText } from 'react-native-svg'

interface Props {
  strength: number
  agility: number
  vitality: number
  intelligence: number
  size?: number
}

const STATS = [
  { key: 'STR', color: '#E24B4A' },
  { key: 'AGI', color: '#1D9E75' },
  { key: 'VIT', color: '#7F77DD' },
  { key: 'INT', color: '#BA7517' },
] as const

// Convert polar coords to cartesian. Offset by -90deg so first point is at top.
function polarToCartesian(cx: number, cy: number, r: number, index: number, total: number) {
  const angle = (Math.PI * 2 * index) / total - Math.PI / 2
  return {
    x: cx + r * Math.cos(angle),
    y: cy + r * Math.sin(angle),
  }
}

export default function StatGraph({ strength, agility, vitality, intelligence, size = 200 }: Props) {
  const values = [strength, agility, vitality, intelligence]
  const MAX = 100
  const cx = size / 2
  const cy = size / 2
  const outerR = size * 0.32
  const labelR = size * 0.42
  const levels = [0.25, 0.5, 0.75, 1]

  // Build the filled polygon points from stat values
  const polygonPoints = values
    .map((v, i) => {
      const r = (Math.min(v, MAX) / MAX) * outerR
      const pt = polarToCartesian(cx, cy, r, i, values.length)
      return `${pt.x},${pt.y}`
    })
    .join(' ')

  return (
    <View style={{ width: size, height: size }}>
      <Svg width={size} height={size}>
        {/* Background grid rings */}
        {levels.map((level) =>
          values.map((_, i) => {
            const r = outerR * level
            const from = polarToCartesian(cx, cy, r, i, values.length)
            const to = polarToCartesian(cx, cy, r, (i + 1) % values.length, values.length)
            return (
              <Line
                key={`grid-${level}-${i}`}
                x1={from.x} y1={from.y}
                x2={to.x} y2={to.y}
                stroke="rgba(99,71,255,0.2)"
                strokeWidth={1}
              />
            )
          })
        )}

        {/* Axis lines from center to each vertex */}
        {values.map((_, i) => {
          const pt = polarToCartesian(cx, cy, outerR, i, values.length)
          return (
            <Line
              key={`axis-${i}`}
              x1={cx} y1={cy}
              x2={pt.x} y2={pt.y}
              stroke="rgba(99,71,255,0.25)"
              strokeWidth={1}
            />
          )
        })}

        {/* Filled stat polygon */}
        <Polygon
          points={polygonPoints}
          fill="rgba(99,71,255,0.25)"
          stroke={theme.colors.purple}
          strokeWidth={2}
        />

        {/* Vertex dots */}
        {values.map((v, i) => {
          const r = (Math.min(v, MAX) / MAX) * outerR
          const pt = polarToCartesian(cx, cy, r, i, values.length)
          return (
            <Circle
              key={`dot-${i}`}
              cx={pt.x} cy={pt.y} r={4}
              fill={STATS[i].color}
              stroke={theme.colors.bg}
              strokeWidth={1.5}
            />
          )
        })}

        {/* Stat labels */}
        {STATS.map((stat, i) => {
          const pt = polarToCartesian(cx, cy, labelR, i, STATS.length)
          return (
            <SvgText
              key={`label-${i}`}
              x={pt.x} y={pt.y}
              textAnchor="middle"
              alignmentBaseline="middle"
              fill={stat.color}
              fontSize={10}
              fontWeight="700"
              fontFamily={theme.fonts.display}
            >
              {stat.key}
            </SvgText>
          )
        })}

        {/* Center dot */}
        <Circle cx={cx} cy={cy} r={3} fill={theme.colors.purple} />
      </Svg>
    </View>
  )
}
