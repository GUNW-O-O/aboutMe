import React, { useState } from 'react'
import { certificates } from '../entities/Certificate'

const History: React.FC = () => {

  const [selectedCer, setSelectedCer] = useState<typeof certificates[0] | null>(null)

  const handleClick = (cer: typeof certificates[0]) => {
    // 이미 열려있는 항목을 다시 클릭하면 닫기
    if (selectedCer?.title === cer.title) {
      setSelectedCer(null)
    } else {
      setSelectedCer(cer)
    }
  }

  return (
    <div className="history">
      <div className="bg">
        <div className="education">
          <h2 className='headline'>Education</h2>
          <h3>부트캠프 수료</h3>
          <div className="date-info">
            <p>2025.03 ~ 2025.09</p>
            <p>더조은컴퓨터아카데미</p>
          </div>
          <h3>동인천 고등학교 졸업</h3>
          <div className="date-info">
            <p>2013 ~ 2016</p>
            <p>이공계열</p>
          </div>
        </div>
        <div className="work">
          <h2 className='headline'>Work Experience</h2>
          <h3>클레스트라 하우저만</h3>
          <div className="date-info">
            <p>2021.11 ~ 2022.04</p>
            <p>사원</p>
          </div>
          <p>Project Manager</p>
          <p>NAVER 1784 System Partition</p>
        </div>
        <div className="certificate">
          <h2 className='headline'>Certificate</h2>
          {certificates?.map((cer, idx) => (
            <div key={idx} className='certificate-item'
              onClick={() => handleClick(cer)} style={{ cursor: 'pointer' }}>
              <h3>{cer.title}</h3>
              <div className="date-info">
                <p>{cer.date}</p>
                <p>{cer.issuer}</p>
              </div>
            </div>
          ))}
        </div>
        {selectedCer && (
          <div
            className="modal"
            onClick={() => setSelectedCer(null)} // 이미지 클릭 시 닫힘
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              background: "rgba(255,255,255,0.95)",
              padding: "20px",
              borderRadius: "12px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
              zIndex: 100,
              cursor: "pointer"
            }}
          >
            <img
              src={selectedCer.img}
              alt={selectedCer.title}
              style={{ width: "500px", height: "auto", display: "block" }}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default History