import React, { useState } from 'react'
import { references } from '../entities/ProjectList'
import { projectObjs, type ProjectObj } from '../entities/ProjectObj'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import SlideIn from '../shared/SlideIn'
import SlideInOnView from '../shared/SlideInOnView'
import ScrollToTop from '../features/ScrollToTop'
import CircularText from '../features/CircularText'

const ProjectList: React.FC = () => {

  const [project, setProject] = useState<ProjectObj | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [trigger, setTrigger] = useState(0);
  const [loadedImages, setLoadedImages] = useState<boolean[]>([]);

  const handleImageLoad = (idx: number) => {
    setLoadedImages(prev => {
      const next = [...prev]
      next[idx] = true
      return next
    })
  }


  const handleProjectList = (id: number) => {
    if (project?.id === id) {
      setProject(null)
      return
    }
    setLoadedImages([])
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
                      <img src={ref.projectLogo} alt={ref.title} className={`fade-in ${isLoaded ? 'loaded' : 'dn'}`} onLoad={() => setIsLoaded(true)} />
                        <CircularText
                          text="INITIALIZING...."
                          spinDuration={8}
                          onHover="pause"
                          className={`${isLoaded ? 'dn' : ''}`}
                        />
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
            <h1 className='headline'>프로젝트를 클릭해주세요.</h1>
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
                  <h3 className='headline'>담당역할</h3>
                  {project.responsibilities}
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
              <h2 className='headline'>&lt;담당구현부&gt;</h2>
              {project?.images.map((img, idx) => (
                <SlideInOnView key={`${project.title}-${idx}`} direction="left">
                  <div className="img-box bg">
                    <img
                      src={img}
                      alt={project.imgDesc[idx]}
                      className={`fade-in ${loadedImages[idx] ? 'loaded' : 'dn'}`}
                      onLoad={() => handleImageLoad(idx)}
                    />
                    <CircularText
                      text="INITIALIZING...."
                      spinDuration={8}
                      onHover="pause"
                      className={`${loadedImages[idx] ? 'dn' : ''}`}
                    />
                    <p className="img-desc">{project.imgDesc[idx]}</p>
                  </div>
                </SlideInOnView>
              ))}
              <h2 className='headline'>&lt;/담당구현부&gt;</h2>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default ProjectList