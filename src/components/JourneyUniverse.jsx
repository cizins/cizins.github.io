import { useEffect, useRef, useState } from 'react'

export default function JourneyUniverse() {
  const [shown, setShown] = useState(false)
  const revealRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setShown(true); observer.disconnect(); }
    }, { threshold: 0.08 })
    if (revealRef.current) observer.observe(revealRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={revealRef} className={`transition-all duration-1000 ${shown ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}>
      <section className="w-full min-w-full bg-[#0A0A0A] relative overflow-visible" aria-label="我的路">
        {/* Header */}
        <div className="max-w-3xl mx-auto px-8 pt-14 pb-6 md:pt-20 md:pb-8">
          <h2 className="font-zh text-2xl md:text-3xl lg:text-4xl text-[#F5F3EE] mb-1 tracking-wide leading-tight">我的路</h2>
          <p className="font-en text-[10px] md:text-[11px] text-[#8FA8FF] tracking-[0.3em] uppercase opacity-55">JOURNEY · HOW I GOT HERE</p>
          <p className="font-en text-sm text-[#A5A5A5]/70 mt-3">每一次經歷，都讓我更靠近現在的自己。</p>
        </div>

        {/* Main editorial track */}
        <div className="w-full max-w-3xl mx-auto px-8 md:px-12 pb-24">
          {/* Trace line decorative */}
          <div className="relative w-full h-[2px] md:h-[3px] bg-gradient-to-r from-transparent via-[#F5F3EE]/[0.14] to-transparent mb-12 md:mb-16" aria-hidden="true" />

          {/* 01 */}
          <article className="relative mb-16 md:mb-24 lg:mb-28 pl-8 md:pl-12 border-l border-[#F5F3EE]/[0.10]">
            <div className="absolute -left-[9px] top-0 w-[18px] h-[18px] rounded-full bg-[#F5F3EE]/10 flex items-center justify-center">
              <div className="w-[6px] h-[6px] rounded-full bg-[#F5F3EE]/60" />
            </div>
            <div className="flex flex-col md:flex-row md:items-baseline md:gap-8 mb-4">
              <div className="font-en text-[10px] text-[#8FA8FF] tracking-[0.2em] mb-1 md:mb-0 md:min-w-[2.5rem]">01</div>
              <div>
                <h3 className="font-zh text-xl md:text-2xl text-[#F5F3EE] leading-snug">課堂實作 ESP32</h3>
                <p className="font-en text-[10px] text-[#8FA8FF]/70 tracking-[0.2em] uppercase mt-1">FROM THEORY TO PRACTICE</p>
              </div>
            </div>
            <p className="font-zh text-sm md:text-base text-[#A5A5A5]/85 leading-loose max-w-md">
              從課堂學習走進實際操作，開始理解硬體與軟體如何一起運作。在一次次嘗試與修正中，學著自己找出解決方式。
            </p>
          </article>

          {/* 02 */}
          <article className="relative mb-16 md:mb-24 lg:mb-28 pl-8 md:pl-12 border-l border-[#F5F3EE]/[0.10] md:ml-[10%] md:max-w-[22rem]">
            <div className="absolute -left-[9px] top-0 w-[18px] h-[18px] rounded-full bg-[#F5F3EE]/10 flex items-center justify-center">
              <div className="w-[6px] h-[6px] rounded-full bg-[#F5F3EE]/60" />
            </div>
            <div className="flex flex-col md:flex-row md:items-baseline md:gap-8 mb-4">
              <div className="font-en text-[10px] text-[#8FA8FF] tracking-[0.2em] mb-1 md:mb-0 md:min-w-[2.5rem]">02</div>
              <div>
                <h3 className="font-zh text-xl md:text-2xl text-[#F5F3EE] leading-snug">簡報比賽／腦動開發</h3>
                <p className="font-en text-[10px] text-[#8FA8FF]/70 tracking-[0.2em] uppercase mt-1">CHALLENGE & DISCOVERY</p>
              </div>
            </div>
            <p className="font-zh text-sm md:text-base text-[#A5A5A5]/85 leading-loose max-w-md">
              第一次把想法整理成可以被理解的提案，也第一次面對團隊合作與公開表達。從過程與結果中累積經驗。
            </p>
          </article>

          {/* 03 */}
          <article className="relative mb-16 md:mb-20 pl-8 md:pl-12 border-l border-[#F5F3EE]/[0.10]">
            <div className="absolute -left-[9px] top-0 w-[18px] h-[18px] rounded-full bg-[#F5F3EE]/10 flex items-center justify-center">
              <div className="w-[6px] h-[6px] rounded-full bg-[#F5F3EE]/60" />
            </div>
            <div className="flex flex-col md:flex-row md:items-baseline md:gap-8 mb-4">
              <div className="font-en text-[10px] text-[#8FA8FF] tracking-[0.2em] mb-1 md:mb-0 md:min-w-[2.5rem]">03</div>
              <div>
                <h3 className="font-zh text-xl md:text-2xl text-[#F5F3EE] leading-snug">閱讀心得比賽</h3>
                <p className="font-en text-[10px] text-[#8FA8FF]/70 tracking-[0.2em] uppercase mt-1">REFLECTION & EXPRESSION</p>
              </div>
            </div>
            <p className="font-zh text-sm md:text-base text-[#A5A5A5]/85 leading-loose max-w-md">
              透過《療心咖啡館》的閱讀與分享，開始學著慢下來，理解自己的感受，也用更溫柔的方式理解別人。
              <span className="font-en text-xs text-[#666666] tracking-widest ml-2">· 優等</span>
            </p>
          </article>

          {/* Ending sparse */}
          <div className="pt-10 md:pt-14 border-t border-[#F5F3EE]/[0.08] max-w-md mx-auto">
            <p className="font-zh text-lg md:text-xl text-[#F5F3EE]/80 leading-loose tracking-wide">還在往前</p>
            <p className="font-en text-xs text-[#A5A5A5] tracking-[0.25em] mt-2">STILL MOVING FORWARD</p>
            <p className="font-zh text-sm text-[#A5A5A5]/70 leading-relaxed mt-4">我還在學習，也還在摸索。每一次實作、每一次挑戰、每一次表達，都是我理解自己的一種方式。</p>
            <p className="font-en text-[10px] text-[#666666] tracking-[0.15em] mt-3">THE NEXT POINT HAS YET TO BE WRITTEN.</p>
          </div>
        </div>
      </section>
    </div>
  )
}
