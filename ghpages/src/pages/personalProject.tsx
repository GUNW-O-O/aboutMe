import React, { useState } from 'react'
import { personalReferences as references } from '../entities/PersonalProjectList' 
import { PersonalProjectObjs as projectObjs } from '../entities/PersonalProject'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import SlideIn from '../shared/SlideIn'
import SlideInOnView from '../shared/SlideInOnView'
import ScrollToTop from '../features/ScrollToTop'
import type { ProjectObj } from '../entities/ProjectObj'

export const PersonalProjectList: React.FC = () => {

  const [project, setProject] = useState<ProjectObj | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [trigger, setTrigger] = useState(0)

  const handleProjectList = (id: number) => {
    setIsLoaded(false)
    if (project?.id === id) {
      setProject(null)
      return
    }
    setTrigger(prev => prev + 1)
    setProject(projectObjs[id - 1])
  }

  const reference = references

  return (
    <>
      <ScrollToTop />
      <div className="project-wrapper">
        <SlideIn delay={0.2} direction="down">
          <div className="project-slider bg">
            <Swiper
              modules={[Navigation, Pagination]}
              navigation
              pagination={{ clickable: true }}
              slidesPerView={1}
            >
              {reference.map((ref) => (
                <SwiperSlide key={ref.id}>
                  <div className="project-card" onClick={() => handleProjectList(ref.id)}>
                    <div className="project-img">
                      <img src={ref.projectLogo} alt={ref.title}/>
                    </div>
                    <div className="project-desc">
                      <h3>{ref.title}</h3>
                      <p>{ref.serviceTarget}</p>
                      <p>{ref.description}</p>
                      <a className='btn' href={ref.repo} target="_blank" rel="noopener noreferrer">Github + PPT</a>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </SlideIn>
        {!project && (
          <>
            <h1 className='headline'>프로젝트를 선택해주세요.</h1>
            <h3>슬라이드는 드래그나, 클릭이 가능합니다</h3>
          </>
        )}
        {project && (
          <div className="project-detail" key={trigger}>
            <SlideIn delay={0.2} direction="down">
              <div className="detail-header bg">
                <div className="title">
                  <h2 className='headline'>{project.title}</h2>
                  <p>{project.description}</p>
                </div>
                <div className="reflection">
                  <h3 className='headline'>배운점</h3>
                  {project.reflections}
                </div>
                <div className="improvements">
                  <h3 className='headline'>개선점</h3>
                  {project.improvements}
                </div>
              </div>
            </SlideIn>
            <div className="detail-footer bg">
              <h2 className='headline'>프로젝트시 겪었던 문제</h2>
              <Swiper
                modules={[Navigation, Pagination]}
                pagination={{ clickable: true }}
                slidesPerView={1}
              >
                {project?.troubles.map((sol, idx) => (
                  <SwiperSlide key={idx}>
                    <div className="project-troubles">
                      <div className="trouble">
                        {sol}
                      </div>
                      <div className="solution">
                        {project?.solution[idx]}
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div className="detail-body">
              <h2 className='headline'>담당 구현부</h2>
              {project?.images.map((img, idx) => (
                <SlideInOnView key={`${project.title}-${idx}`} direction="left">
                  <div key={idx} className="img-box bg">
                    <img src={img} alt={project.imgDesc[idx]}
                      className={`fade-in ${isLoaded ? 'loaded' : ''}`}
                      onLoad={() => setIsLoaded(true)}
                      style={{maxHeight:"600px", objectFit:"contain"}} />
                    <p className="img-desc">{project.imgDesc[idx]}</p>
                  </div>
                </SlideInOnView>
              ))}
              <h2 className='headline'>&lt;/&gt;</h2>
            </div>
          </div>
        )}
      </div>
    </>
  )
}