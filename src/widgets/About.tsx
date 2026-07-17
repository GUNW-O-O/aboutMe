import React from 'react'
import myPhoto from '../assets/gunwoo.jpg'
import Img from '../shared/Img'

const About: React.FC = () => {
  return (
    <section className="section" id="about">
      <div className="sec-head" data-reveal>
        <span className="eyebrow">about</span>
        <h2 className="t-display-lg">문제를 스스로 정의하는 개발자, 고건우입니다.</h2>
      </div>
      <div className="about-grid" data-reveal>
        <Img src={myPhoto} alt="고건우 프로필 사진" className="photo" />
        <div className="about-text">
          <p className="t-body-md">
            부트캠프 프로젝트에서는 AI를 활용해 시간을 벌었습니다.
            그렇게 번 시간은 어떻게 구현할 것인가를 판단하고 팀원과 소통하는
            데 썼습니다.
          </p>
          <p className="t-body-md">
            에이전트 코딩을 접하면서 개발을 처음 배우던 때와는 지향점이
            완전히 달라졌습니다. 그래서 제가 무엇을 해야 하는지부터 다시
            생각했습니다.
          </p>
          <p className="t-body-md">
            방향은 정했습니다. 문제를 확정하고, 개발 중에도 맞는 방향인지
            계속 검증하고, 리서치로 더 나은 것을 찾아 들여오는 것. 이건
            사람의 몫이라고 생각합니다. 따로 배울 곳이 없으니
            에이전트 코딩에서 공통으로 지적되는 문제부터 학습 스킬을 직접
            만들어 풀고 있습니다.
          </p>
          <div className="chips">
            <span className="chip chip-mono">Incheon, KR</span>
            <span className="chip">SQLD · ADsP · 웹디자인개발기능사</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
