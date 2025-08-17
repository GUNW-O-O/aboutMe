import React from 'react'

const History: React.FC = () => {
  return (
    <div className="history">
      <div className="bg">
        <div className="education">
          <h2>Education</h2>
          <ul>
            <li>
              <h3>부트캠프 수료</h3>
              <div className="date-info">
                <p>2025.03 ~ 2025.09</p>
                <p>더조은컴퓨터아카데미</p>
              </div>
            </li>
            <li>
              <h3>동인천 고등학교 졸업</h3>
              <div className="date-info">
                <p>2013 ~ 2016</p>
                <p>이공계열</p>
              </div>
            </li>
          </ul>
        </div>
        <div className="work">
          <h2>Work Experience</h2>
          <ul>
            <li>
              <h3>클레스트라 하우저만</h3>
              <div className="date-info">
                <p>2021.11 ~ 2022.04</p>
                <p>사원</p>
              </div>
              <p>Project Manager</p>
              <p>NAVER 1784 System Partition</p>
            </li>
          </ul>
        </div>
        <div className="certificate">
          <h2>Certificate</h2>
          <ul>
            <li>
              <h3>SQLD</h3>
              <div className="date-info">
                <p>2025.06.27</p>
                <p>K-DATA</p>
              </div>
            </li>
            <li>
              <h3>ADsP</h3>
              <div className="date-info">
                <p>2025.06.27</p>
                <p>K-DATA</p>
              </div>
            </li>
            <li>
              <h3>웹디자인 개발 기능사</h3>
              <div className="date-info">
                <p>2025.06.27</p>
                <p>한국산업인력공단</p>
              </div>
            </li>
          </ul>
        </div>

      </div>
    </div>
  )
}

export default History