import React from 'react'
import myPhoto from '../assets/gunwoo.jpg'
import Img from '../shared/Img'

const About: React.FC = () => {
  return (
    <section className="section" id="about">
      <div className="sec-head">
        <span className="eyebrow">about</span>
        <h2 className="t-display-lg">프로그래머가 아니라 개발자.</h2>
      </div>
      <div className="about-grid">
        <Img src={myPhoto} alt="고건우 프로필 사진" className="photo" />
        <div className="about-text">
          {/* TODO(상담): 소개 문단 확정 */}
          <p className="t-body-md">
            부트캠프에서 팀 프로젝트 3회를 거치며 Spring SSR에서 React SPA 전환까지
            경험했고, 수료 후에도 NestJS·MongoDB 학습 프로젝트와 홀덤 토너먼트 SaaS
            MVP를 만들며 폭을 넓히고 있습니다.
          </p>
          <p className="t-body-md">
            기능이 "돌아가는 것"과 "잘 만들어진 것"의 차이를 문제 해결 과정으로
            증명하는 것을 좋아합니다.
          </p>
          <div className="chips">
            <span className="chip chip-mono">Incheon, KR</span>
            <span className="chip chip-mono">SQLD · ADsP · 웹디자인개발기능사</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
