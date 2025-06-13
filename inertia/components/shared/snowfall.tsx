/* import ReactSnowfall, { type SnowfallProps } from 'react-snowfall'

function getImages() {
  if (typeof window === 'undefined') {
    return []
  }

  const snowflake = document.createElement('img')
  snowflake.src = '/snowflake.png'

  return [snowflake]
}

const Snowfall = ({ style, ...props }: SnowfallProps) => {
  return (
    <ReactSnowfall
      style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 0, ...style }}
      snowflakeCount={200}
      speed={[0.5, 3]}
      wind={[-0.5, 3]}
      radius={[5, 15]}
      rotationSpeed={[0.1, 0.5]}
      images={getImages()}
      {...props}
    />
  )
}

export { Snowfall }
 */
