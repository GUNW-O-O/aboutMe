import React, { useState } from 'react'

type ImgProps = {
  src: string
  alt: string
  className?: string
}

/** 스켈레톤 셸 포함 이미지 — 이미지별 개별 로딩 상태 */
const Img: React.FC<ImgProps> = ({ src, alt, className }) => {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className={`img-shell ${className ?? ''}`}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className={loaded ? 'loaded' : ''}
        onLoad={() => setLoaded(true)}
      />
    </div>
  )
}

export default Img
