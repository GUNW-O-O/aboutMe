import React, { useState } from 'react'
import DecryptedText from '../shared/DecryptText'
import myPhoto from '../assets/gunwoo.jpg'
import CircularText from '../features/CircularText';
import HrefButton from '../features/HrefButton';

const Info: React.FC = () => {

  const [isLoaded, setIsLoaded] = useState(false);


  return (
    <div className="info">
      <div className="bg">
        <div className="introduce">
          <div className="appeal">
            <h3><strong>집중은 💻🔥 쉴 때는 🎧💻 놀아도 🎧💻</strong></h3>
            <DecryptedText
              text="프로그래머가 단순히 기능을 구현한다면, 저는 서비스 전체의 흐름을 고민하며, 하루 종일 컴퓨터 앞에서도 몰입하며 문제를 해결하는 개발자입니다."
              animateOn="view"
              revealDirection='start'
              useOriginalCharsOnly={true}
              speed={50}
              maxIterations={5}
              sequential={true}
            />
          </div>
          <div className="contact">
            <h3><strong>Contact</strong></h3>
            <p>Email : go971230@gmail.com</p>
          <HrefButton link={"/projects"} text={"프로젝트 🖱️"} />
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