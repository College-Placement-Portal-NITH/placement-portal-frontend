import { ResponsivePie } from '@nivo/pie'
import { PieChartProps } from '../../utils/types'

export default function PieChart({ data }: PieChartProps) {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <ResponsivePie
        data={data}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{
          from: 'color',
          modifiers: [['darker', 0.2]],
        }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: 'color' }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
          from: 'color',
          modifiers: [['darker', 2]],
        }}
        defs={[
          {
            id: 'dots',
            type: 'patternDots',
            background: 'inherit',
            color: 'rgba(255, 255, 255, 0.3)',
            size: 4,
            padding: 1,
            stagger: true,
          },
          {
            id: 'lines',
            type: 'patternLines',
            background: 'inherit',
            color: 'rgba(255, 255, 255, 0.3)',
            rotation: -45,
            lineWidth: 6,
            spacing: 10,
          },
        ]}
        fill={[
          {
            match: {
              id: 'cse',
            },
            id: 'dots',
          },
          {
            match: {
              id: 'ee',
            },
            id: 'dots',
          },
          {
            match: {
              id: 'me',
            },
            id: 'dots',
          },
          {
            match: {
              id: 'ece',
            },
            id: 'lines',
          },
          {
            match: {
              id: 'ce',
            },
            id: 'lines',
          },
        ]}
      />
    </div>
  )
}
