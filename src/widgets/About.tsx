import React from 'react'
import myPhoto from '../assets/gunwoo.jpg'
import Img from '../shared/Img'

const About: React.FC = () => {
  return (
    <section className="section" id="about">
      <div className="sec-head">
        <span className="eyebrow">about</span>
        <h2 className="t-display-lg">프로그래머가 아니라 개발자, 고건우입니다.</h2>
      </div>
      <div className="about-grid">
        <Img src={myPhoto} alt="고건우 프로필 사진" className="photo" />
        <div className="about-text">
          <p className="t-body-md">
            부트캠프를 거치며 개발이 점점 더 재밌어졌습니다. 팀 프로젝트로 SSR과
            SPA를 직접 구현해봤고, 이후 사이드 프로젝트를 만들 때마다 좋은 개발이란
            무엇인지 나름대로 고민해 왔습니다. 만드는 게 쉬워진 지금일수록, 그
            고민이 더 중요하다고 믿습니다.
          </p>
          <p className="t-body-md">
            당장 돌아가는지보다, 사람이든 AI든 이어받아 고칠 수 있는 코드인지를 더
            신경 씁니다.
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
