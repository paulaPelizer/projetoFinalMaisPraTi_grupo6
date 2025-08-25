import * as React from 'react'

export type ImgProps = React.ImgHTMLAttributes<HTMLImageElement>
export function Img(props: ImgProps) {
  return <img {...props} />
}
