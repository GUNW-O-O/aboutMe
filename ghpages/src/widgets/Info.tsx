import React, { useState } from 'react'
import DecryptedText from '../shared/DecryptText'
import myPhoto from '../assets/gunwoo.jpg'
import CircularText from '../features/CircularText';

const Info: React.FC = () => {

  const [isLoaded, setIsLoaded] = useState(false);


  return (
    <div className="info">
      <div className="bg">
        <div className="introduce">
          <div className="appeal">
            <p><strong>Junior Developer</strong></p>
            <DecryptedText
              text="프로그래머는 기능을 구현하는 사람이고,개발자는 서비스의 전체적인 흐름을 고민하며 개발하고 능동적으로 문제를 해결한다고 생각합니다."
              animateOn="view"
              revealDirection='start'
              useOriginalCharsOnly={true}
              speed={50}
              maxIterations={5}
              sequential={true}
            />
          </div>
          <div className="contact">
            <p><strong>Contact</strong></p>
            <p>Phone : 010-7544-9196</p>
            <p>Email : rhrjsdn12@naver.com</p>
          </div>
        </div>
        <div className="my-img">
          {!isLoaded && (
            <CircularText
              text="INITIALIZING...."
              spinDuration={8}
              onHover="pause"
            />
          )}

          <img
            src={myPhoto}
            alt="profile"
            className={`fade-in ${isLoaded ? 'loaded' : ''}`}
            onLoad={() => setIsLoaded(true)}
            style={{ display: isLoaded ? "block" : "none" }} // 로딩 전에는 안 보이게
          />
        </div>
      </div>
    </div>
  )
}

export default Info