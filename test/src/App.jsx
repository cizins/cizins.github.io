import { useRef } from 'react'
import NameParticles from './components/hero/NameParticles.jsx'
import { useScrollProgress } from './hooks/useScrollProgress.js'
import SkillNetwork from './components/skills/SkillNetwork.jsx'
import ProjectCard from './components/projects/ProjectCard.jsx'
import ProjectSequence from './components/projects/ProjectSequence.jsx'
import Timeline from './components/journey/Timeline.jsx'
import Cursor from './components/ui/Cursor.jsx'
import { projects } from './data/projects.js'

export default function App() {
  const aboutRef = useRef(null)
  const aboutProgress = useScrollProgress(aboutRef)

  return (
    <div className="min-h-[100dvh] bg-[#0A0A0A] text-[#F5F3EE] font-sans antialiased selection:bg-[#8FA8FF]/30">
      <Cursor />
      <div className="grain-overlay" aria-hidden="true" />
      
      {/* 頂部導覽列：繁體中文為主，英文小字為輔 */}
      <header className="fixed top-0 left-0 z-50 w-full border-b border-white/[0.14] bg-[#0A0A0A]/80 backdrop-blur-sm">
        <nav className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4 md:px-10" aria-label="主要導覽">
          <a href="#" className="flex items-baseline gap-2 group" aria-label="陳絜歆 首頁">
            <span className="text-lg font-semibold tracking-tight text-[#F5F3EE] group-hover:text-[#8FA8FF] transition-colors">JX</span>
            <span className="text-[10px] tracking-[0.2em] text-[#666666]">陳絜歆</span>
          </a>

          {/* 桌面端章節連結：中文大字 + 英文微型標籤 */}
          <div className="hidden md:flex items-center gap-8 text-left">
            <a href="#about" className="group flex flex-col items-start transition-colors">
              <span className="text-xs font-medium text-[#A5A5A5] group-hover:text-[#F5F3EE] transition-colors">關於我</span>
              <span className="text-[9px] tracking-[0.2em] text-[#666666] uppercase">ABOUT</span>
            </a>
            <a href="#skills" className="group flex flex-col items-start transition-colors">
              <span className="text-xs font-medium text-[#A5A5A5] group-hover:text-[#F5F3EE] transition-colors">技能</span>
              <span className="text-[9px] tracking-[0.2em] text-[#666666] uppercase">SKILLS</span>
            </a>
            <a href="#works" className="group flex flex-col items-start transition-colors">
              <span className="text-xs font-medium text-[#A5A5A5] group-hover:text-[#F5F3EE] transition-colors">作品</span>
              <span className="text-[9px] tracking-[0.2em] text-[#666666] uppercase">PROJECTS</span>
            </a>
            <a href="#journey" className="group flex flex-col items-start transition-colors">
              <span className="text-xs font-medium text-[#A5A5A5] group-hover:text-[#F5F3EE] transition-colors">我的路</span>
              <span className="text-[9px] tracking-[0.2em] text-[#666666] uppercase">JOURNEY</span>
            </a>
            <a href="#contact" className="group flex flex-col items-start transition-colors">
              <span className="text-xs font-medium text-[#A5A5A5] group-hover:text-[#F5F3EE] transition-colors">聯絡</span>
              <span className="text-[9px] tracking-[0.2em] text-[#666666] uppercase">CONTACT</span>
            </a>
          </div>

          {/* 行動端簡易聯絡標記 */}
          <a href="#contact" className="md:hidden flex flex-col items-end group" aria-label="聯絡">
            <span className="text-xs font-medium text-[#A5A5A5] group-hover:text-[#F5F3EE] transition-colors">聯絡</span>
            <span className="text-[9px] tracking-[0.2em] text-[#666666] uppercase">CONTACT</span>
          </a>
        </nav>
      </header>

      <main>
        {/* 起點 / Opening */}
        <section id="opening" className="relative flex h-[100dvh] items-center justify-center overflow-hidden" aria-label="起點">
          <NameParticles />
          <div className="relative z-20 text-center">
            <h1 className="font-display text-[clamp(4rem,12vw,12rem)] font-light leading-[0.85] tracking-tighter text-[#F5F3EE]">
              陳絜歆
            </h1>
            <div className="mt-8 inline-flex flex-col items-center gap-1">
              <span className="text-sm tracking-[0.2em] text-[#F5F3EE]">向下探索</span>
              <span className="text-[10px] tracking-[0.25em] text-[#666666] uppercase font-light">SCROLL TO EXPLORE</span>
            </div>
          </div>
        </section>

        {/* 身份核心 / Identity */}
        <section id="identity" className="mx-auto max-w-[1400px] px-6 py-[8rem] md:px-[5vw] lg:px-[6vw]" aria-label="身份與概念">
          <div className="flex flex-col gap-2">
            <span className="text-xs tracking-[0.25em] text-[#666666] uppercase">01 · IDENTITY · CORE</span>
            <h2 className="font-display text-[clamp(3rem,7vw,7rem)] leading-[0.95] text-[#F5F3EE]">這就是我。</h2>
          </div>
          <div className="mt-8 max-w-2xl">
            <p className="text-[clamp(1rem,1.2vw,1.25rem)] leading-[1.8] text-[#F5F3EE] font-light">
              資工系學生，正在學習如何讓程式不只是「能運作」，而是能被真實感受。
            </p>
            <span className="mt-2 block text-xs tracking-[0.18em] text-[#666666] uppercase font-light">
              COMPUTER SCIENCE STUDENT · CRAFTING PERCEPTIBLE CODE
            </span>
          </div>
        </section>

        {/* 關於我 / About */}
        <section id="about" ref={aboutRef} className="mx-auto max-w-[1400px] px-6 py-[8rem] md:px-[5vw] lg:px-[6vw] border-t border-white/[0.14]" aria-label="關於我">
          <div className="flex flex-col gap-2">
            <span className="text-xs tracking-[0.25em] text-[#666666] uppercase">02 · ABOUT · WHO I AM</span>
            <h2 className="font-display text-[clamp(3rem,7vw,7rem)] leading-[0.95] text-[#F5F3EE]">關於我</h2>
            <p className="mt-2 text-xl text-[#D6D4CE] font-light">我正在成為誰？</p>
          </div>
          <div className="mt-12 grid gap-12 md:grid-cols-3">
            <article style={{ transform: `translateY(${-aboutProgress * 15}px)` }} className="border-t border-white/[0.08] pt-6">
              <div className="flex items-baseline justify-between">
                <h3 className="text-xl font-medium text-[#F5F3EE]">我是誰</h3>
                <span className="text-[10px] tracking-[0.2em] text-[#666666] uppercase">WHO I AM</span>
              </div>
              <p className="mt-4 text-[#D6D4CE] leading-relaxed font-light text-sm md:text-base">
                正在學習程式設計的人，對數位美學、人機互動與介面結構保有持續的好奇心。
              </p>
            </article>
            <article style={{ transform: `translateY(${-aboutProgress * 30}px)` }} className="border-t border-white/[0.08] pt-6">
              <div className="flex items-baseline justify-between">
                <h3 className="text-xl font-medium text-[#F5F3EE]">我在學什麼</h3>
                <span className="text-[10px] tracking-[0.2em] text-[#666666] uppercase">WHAT I'M LEARNING</span>
              </div>
              <p className="mt-4 text-[#D6D4CE] leading-relaxed font-light text-sm md:text-base">
                前端工程架構、Canvas 視覺運算、微動效設計與實驗性網頁互動。
              </p>
            </article>
            <article style={{ transform: `translateY(${-aboutProgress * 45}px)` }} className="border-t border-white/[0.08] pt-6">
              <div className="flex items-baseline justify-between">
                <h3 className="text-xl font-medium text-[#F5F3EE]">我為什麼喜歡</h3>
                <span className="text-[10px] tracking-[0.2em] text-[#666666] uppercase">WHY I CREATE</span>
              </div>
              <p className="mt-4 text-[#D6D4CE] leading-relaxed font-light text-sm md:text-base">
                把抽象的思考與結構，轉化為在螢幕上可被操作、可被真實感受的數位體驗。
              </p>
            </article>
          </div>
        </section>

        {/* 技能星系 / Skills */}
        <section id="skills" className="mx-auto max-w-[1400px] px-6 py-[8rem] md:px-[5vw] lg:px-[6vw] border-t border-white/[0.14]" aria-label="技能星系">
          <div className="flex flex-col gap-2">
            <span className="text-xs tracking-[0.25em] text-[#666666] uppercase">03 · SKILLS · INTERACTIVE NETWORK</span>
            <h2 className="font-display text-[clamp(3rem,7vw,7rem)] leading-[0.95] text-[#F5F3EE]">正在形成的能力</h2>
            <p className="mt-3 text-sm md:text-base text-[#A5A5A5] font-light">
              能力星系網絡 — 這些能力正在慢慢聚集、連結，最後形成屬於自己的能力結構。
            </p>
          </div>
          <div className="mt-12">
            <SkillNetwork />
          </div>
        </section>

        {/* 精選作品 / Works */}
        <section id="works" className="mx-auto max-w-[1400px] px-6 py-[8rem] md:px-[5vw] lg:px-[6vw] border-t border-white/[0.14]" aria-label="精選作品">
          <div className="flex flex-col gap-2">
            <span className="text-xs tracking-[0.25em] text-[#666666] uppercase">04 · PROJECTS · THINGS I HAVE MADE</span>
            <h2 className="font-display text-[clamp(3rem,7vw,7rem)] leading-[0.95] text-[#F5F3EE]">作品</h2>
            <p className="mt-3 text-sm md:text-base text-[#A5A5A5] font-light">
              留下的痕跡 — 記錄想法、實驗與技術探索的實作歷程。
            </p>
          </div>
          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            {projects.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>

          {/* 影格示範區塊 */}
          <div className="mt-16 border-t border-white/[0.14] pt-16" aria-label="序列影格示範">
            <div className="flex items-baseline gap-3 flex-wrap">
              <h3 className="font-display text-2xl md:text-3xl text-[#F5F3EE]">互動影格實驗</h3>
              <span className="text-xs tracking-[0.2em] text-[#666666] uppercase">SEQUENCE DEMO · 01</span>
            </div>
            <p className="mt-3 text-sm text-[#A5A5A5] font-light">
              滾動頁面驅動影格渲染（0 → 60 幀），手機端自適應流暢呈現。
            </p>
            <span className="mt-1 block text-[10px] tracking-[0.18em] text-[#666666] uppercase font-light">
              SCROLL-DRIVEN FRAME KINEMATICS
            </span>
            <div className="mt-8">
              <ProjectSequence frameCount={60} frameUrls={[]} />
            </div>
          </div>
        </section>

        {/* 成長歷程 / Journey */}
        <section id="journey" className="mx-auto max-w-[1400px] px-6 py-[8rem] md:px-[5vw] lg:px-[6vw] border-t border-white/[0.14]" aria-label="我的旅程">
          <div className="flex flex-col gap-2">
            <span className="text-xs tracking-[0.25em] text-[#666666] uppercase">05 · JOURNEY · HOW I GOT HERE</span>
            <h2 className="font-display text-[clamp(3rem,7vw,7rem)] leading-[0.95] text-[#F5F3EE]">我的路</h2>
            <p className="mt-3 text-sm md:text-base text-[#A5A5A5] font-light">
              成長軌跡 — 沿途探索的關鍵節點與思考轉折。
            </p>
          </div>
          <div className="mt-12">
            <Timeline />
          </div>
        </section>

        {/* 未來願景 / Future */}
        <section id="future" className="mx-auto max-w-[1400px] px-6 py-[8rem] md:px-[5vw] lg:px-[6vw] border-t border-white/[0.14]" aria-label="接下來呢">
          <div className="flex flex-col gap-2">
            <span className="text-xs tracking-[0.25em] text-[#666666] uppercase">06 · FUTURE · WHERE I'M GOING</span>
            <h2 className="font-display text-[clamp(3rem,7vw,7rem)] leading-[0.95] text-[#F5F3EE]">接下來呢？</h2>
          </div>
          <p className="mt-8 max-w-2xl text-[clamp(1rem,1.2vw,1.25rem)] leading-[1.8] text-[#F5F3EE] font-light">
            還不知道最後會走到哪裡。<br />但我想帶著好奇，繼續向未知的邊界探索。
          </p>
          <span className="mt-3 block text-xs tracking-[0.18em] text-[#666666] uppercase font-light">
            CONTINUOUS EXPLORATION · EXPANDING HORIZONS
          </span>
        </section>

        {/* 聯絡 / Contact */}
        <section id="contact" className="mx-auto max-w-[1400px] px-6 py-[8rem] md:px-[5vw] lg:px-[6vw] border-t border-white/[0.14]" aria-label="聯絡">
          <div className="flex flex-col gap-2">
            <span className="text-xs tracking-[0.25em] text-[#666666] uppercase">07 · CONTACT · LET'S CONNECT</span>
            <h2 className="font-display text-[clamp(3rem,7vw,7rem)] leading-[0.95] text-[#F5F3EE]">聯絡</h2>
          </div>
          <div className="mt-6">
            <p className="text-xl text-[#F5F3EE] font-light">
              讓我們一起創造些什麼。
            </p>
            <span className="mt-1 block text-xs tracking-[0.2em] text-[#666666] uppercase font-light">
              LET'S CREATE SOMETHING TOGETHER
            </span>
          </div>
          <div className="mt-10 flex flex-wrap gap-8 text-sm">
            <a
              href="mailto:jx0909000006@gmail.com"
              className="group flex flex-col items-start border-b border-white/[0.14] pb-1.5 hover:border-[#8FA8FF] transition-colors"
            >
              <span className="text-sm font-medium text-[#F5F3EE] group-hover:text-[#8FA8FF] transition-colors">電子郵件</span>
              <span className="text-[10px] tracking-[0.18em] text-[#666666] uppercase">EMAIL · jx0909000006@gmail.com</span>
            </a>
            <a
              href="https://github.com/cizins"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-start border-b border-white/[0.14] pb-1.5 hover:border-[#8FA8FF] transition-colors"
            >
              <span className="text-sm font-medium text-[#F5F3EE] group-hover:text-[#8FA8FF] transition-colors">GitHub 主頁</span>
              <span className="text-[10px] tracking-[0.18em] text-[#666666] uppercase">GITHUB · @cizins</span>
            </a>
            <a
              href="#opening"
              className="group flex flex-col items-start border-b border-white/[0.14] pb-1.5 hover:border-[#8FA8FF] transition-colors"
            >
              <span className="text-sm font-medium text-[#F5F3EE] group-hover:text-[#8FA8FF] transition-colors">返回頂端</span>
              <span className="text-[10px] tracking-[0.18em] text-[#666666] uppercase">BACK TO TOP</span>
            </a>
          </div>
        </section>
      </main>

      {/* 頁尾 / Footer */}
      <footer className="border-t border-white/[0.14] bg-[#111111]">
        <div className="mx-auto max-w-[1400px] px-6 py-10 md:px-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <span className="text-lg font-medium text-[#F5F3EE]">陳絜歆</span>
            <span className="ml-3 text-xs text-[#A5A5A5]">我們在某處相遇。</span>
            <span className="ml-2 text-[10px] tracking-[0.18em] text-[#666666] uppercase">SEE YOU SOMEWHERE</span>
          </div>
          <div className="text-left md:text-right">
            <span className="text-xs text-[#A5A5A5]">個人品牌與實驗性作品集</span>
            <span className="ml-2 text-[10px] tracking-widest text-[#666666] uppercase">JX · 2026</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
