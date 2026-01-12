import React, { useState } from 'react'
import { certificates, type Certificate } from '../entities/Certificate'
import { experiences, type Experience } from '../entities/Experience';
import { div } from 'framer-motion/client';

const History: React.FC = () => {

  const [selectedCer, setSelectedCer] = useState<Certificate | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const handleClick = (cer: Certificate) => {
    if (selectedCer?.title === cer.title) {
      closeModal();
    } else {
      openModal(cer);
    }
  };

  const openModal = (cer: Certificate) => {
    setSelectedCer(cer);
    // DOM이 생성된 뒤에 opacity transition 시작
    setTimeout(() => setIsVisible(true), 10);
  };

  const closeModal = () => {
    setIsVisible(false); // 페이드 아웃
    setTimeout(() => setSelectedCer(null), 300); // transition 끝난 뒤 제거
  };

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
            <p>이과계열</p>
          </div>
        </div>
        <div className="work">
          <h2 className='headline'>Experience</h2>
          {experiences?.slice().reverse().map((exp, idx) => (
            <div key={idx} className='experience-item'>
              <h3 className='subline'>{exp.title}</h3>
              <div className="date-info">
                <p>{exp.date}</p>
              </div>
              <p>{exp.purpose}</p>
            </div>
          ))}
        </div>
        <div className="certificate">
          <h2 className='headline'>Certificate 🖱️</h2>
          {certificates?.map((cer, idx) => (
            <div key={idx} className='certificate-item'
              onClick={() => handleClick(cer)} style={{ cursor: 'pointer' }}>
              <h3 className='subline'>{cer.title}</h3>
              <div className="date-info">
                <p>{cer.date}</p>
                <p>{cer.issuer}</p>
              </div>
            </div>
          ))}
        </div>
        {selectedCer && (
          <div
            className={`cer-modal ${isVisible ? "show" : ""}`}
            onClick={closeModal}
          >
            <img
              src={selectedCer.img}
              alt={selectedCer.title}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default History