import React from 'react'

const Footer: React.FC = () => {
  return (
    <footer className="footer" id="contact">
      <div className="inner">
        <div>
          <div style={{ fontWeight: 600, letterSpacing: '-0.3px' }}>고건우</div>
          <div className="mail">go971230@gmail.com</div>
        </div>
        <div className="actions">
          <a
            className="btn-sq ghost"
            href="https://github.com/GUNW-O-O"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a className="btn-sq primary" href="mailto:go971230@gmail.com">
            메일 보내기
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
