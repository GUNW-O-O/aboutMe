import React, { useState } from 'react'
import '../App.css'
import myPhoto from '../assets/gunwoo.jpg'
// import ProfileCard from '../shared/ProfileCard'
import Skills from '../widgets/Skills'
import History from '../widgets/History'
import ProjectCard from '../widgets/ProjectCard'


const About: React.FC = () => {

  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      <div className="about">
        <div className="container">
          <div className="title">
            <h2>개발자 고건우 입니다.</h2>
          </div>
          <div className="info">
            <div className="bg">
              <div className="introduce">
                <div className="appeal">
                  <p><strong>Junior Developer</strong></p>
                  <p>프로그래머는 기능을 구현하는 사람이고,
                    개발자는 서비스의 전체적인 흐름을 고민하며
                    개발하고 능동적으로 문제를 해결한다고 생각합니다.</p>
                </div>
                <div className="contact">
                  <p><strong>Contact</strong></p>
                  <p>Phone : 010-7544-9196</p>
                  <p>Email : rhrjsdn12@naver.com</p>
                </div>
              </div>
              <div className="my-img">
                {/* <ProfileCard
                name="GUNWOO KO"
                title="FullStack Developer"
                handle="GUNW-O-O"
                status="Ready"
                contactText="Contact Me"
                avatarUrl={myPhoto}
                showUserInfo={true}
                enableTilt={true}
                enableMobileTilt={false}
                onContactClick={() => console.log('Contact clicked')}
              /> */}
                <img src={myPhoto} alt="profile"
                className={`fade-in ${isLoaded ? 'loaded' : ''}`}
                onLoad={() => setIsLoaded(true)} />
              </div>
            </div>
          </div>
          <div className="skills">
            <div className="bg">
              <h2>Skills</h2>
              <div className="stacks">
                <Skills />
              </div>
            </div>
          </div>
          <History />
          <ProjectCard />
        </div>
      </div>
    </>
  )
}

export default About