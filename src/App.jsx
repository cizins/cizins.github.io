import './App.css'
import HeroCanvas from './components/HeroCanvas.jsx'
import useReveal from './hooks/useReveal.js'
import StarField from './components/StarField.jsx'
import SkillsUniverse from './components/SkillsUniverse.jsx'
import JourneyUniverse from './components/JourneyUniverse.jsx'
import CustomCursor from './components/CustomCursor.jsx'

export default function App() {
  const rAbout = useReveal()
  const rSkills = useReveal()
  const rProjects = useReveal()
  const rJourney = useReveal()
  const rContact = useReveal()

  return (
    <>
      <CustomCursor />
      <StarField />
      <main className="relative z-10 w-full min-w-full">
        <section className="hero-section relative h-[88vh] flex items-center justify-center overflow-hidden">
          <HeroCanvas />
          <div className="relative z-10 text-center">
            <h1 className="font-zh text-7xl md:text-9xl tracking-widest text-[#F5F3EE] drop-shadow-[0_0_30px_rgba(143,168,255,0.25)]">
              陳絜歆
            </h1>
            <p className="font-en text-sm md:text-base text-[#A5A5A5] mt-6 tracking-[0.3em] uppercase opacity-70">
              澎湖科大 · 資工二甲
            </p>
          </div>
        </section>

        <div className="w-full h-[10vh] md:h-[14vh] bg-gradient-to-b from-[#0A0A0A] via-[#111] to-[#0A0A0A]" aria-hidden="true"></div>

        <section ref={rAbout.ref} className={`about-section max-w-2xl mx-auto px-8 py-12 md:py-16 transition-all duration-700 ${rAbout.shown ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`} aria-label="關於我">
          <h2 className="font-zh text-3xl md:text-4xl text-[#F5F3EE] mb-2">關於我</h2>
          <p className="font-en text-xs text-[#8FA8FF] tracking-[0.2em] uppercase mb-10 opacity-60">ABOUT · WHO I AM</p>
          <div className="space-y-6 text-[#F5F3EE]/90 leading-loose text-lg font-zh">
            <p>我是陳絜歆，目前就讀澎湖科技大學資訊工程系二年級。</p>
            <p>我正在學習如何將硬體與軟體整合，從 ESP32 實作到系統監控，從簡報比賽到閱讀與表達。我相信每一次實作、每一次嘗試，都在讓我更靠近現在的自己。</p>
          </div>
        </section>

        <section ref={rSkills.ref} className={`relative w-full overflow-visible bg-[#0A0A0A] py-12 md:py-16 transition-all duration-700 ${rSkills.shown ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`} aria-label="能力宇宙">
          <SkillsUniverse />
        </section>

        <section ref={rProjects.ref} className={`projects-section max-w-4xl mx-auto px-8 py-12 md:py-16 transition-all duration-700 ${rProjects.shown ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`} aria-label="作品">
          <h2 className="font-zh text-3xl md:text-4xl text-[#F5F3EE] mb-2">作品</h2>
          <p className="font-en text-xs text-[#8FA8FF] tracking-[0.2em] uppercase mb-10 opacity-60">PROJECTS</p>
          <div className="grid md:grid-cols-2 gap-6">
            <article className="p-6 border border-[#F5F3EE]/14 rounded-2xl bg-[#111111]/40">
              <h3 className="font-zh text-xl text-[#F5F3EE] mb-2">個人網站</h3>
              <p className="text-sm text-[#A5A5A5] leading-relaxed">使用 React + Vite 建置，包含自我介紹與作品展示。</p>
            </article>
            <article className="p-6 border border-[#F5F3EE]/14 rounded-2xl bg-[#111111]/40">
              <h3 className="font-zh text-xl text-[#F5F3EE] mb-2">暫無</h3>
              <p className="text-sm text-[#A5A5A5] leading-relaxed">尚在準備中，將於後續更新。</p>
            </article>
          </div>
        </section>

        <section ref={rJourney.ref} className={`journey-section relative w-full py-16 md:py-20 px-6 md:px-10 overflow-visible bg-[#0A0A0A] transition-all duration-700 ${rJourney.shown ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`} aria-label="我的路">
          <JourneyUniverse />
        </section>

        <section ref={rContact.ref} className={`contact-section max-w-xl mx-auto px-8 py-24 text-center transition-all duration-700 ${rContact.shown ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`} aria-label="聯絡方式">
          <h2 className="font-zh text-3xl md:text-4xl text-[#F5F3EE] mb-2">聯絡</h2>
          <p className="font-en text-xs text-[#8FA8FF] tracking-[0.2em] uppercase mb-10 opacity-60">CONTACT</p>
          <p className="mb-3"><a href="mailto:jx0909000006@gmail.com" className="text-[#F5F3EE]/90 hover:text-[#8FA8FF] transition-colors font-en text-sm">mail:jx0909000006@gmail.com</a></p>
          <p><a href="https://github.com/cizins" className="text-[#F5F3EE]/90 hover:text-[#8FA8FF] transition-colors font-en text-sm" rel="noopener noreferrer">github:cizins</a></p>
        </section>
      </main>
    </>
  )
}
