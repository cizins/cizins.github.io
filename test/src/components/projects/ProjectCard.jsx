export default function ProjectCard({ project }) {
  return (
    <article className="group relative overflow-hidden border border-white/[0.14] transition-colors hover:border-[#8FA8FF]/40">
      <div className="relative aspect-[4/3] overflow-hidden bg-[#111111]">
        <img
          src={project.thumbnail}
          alt={project.title}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/70 via-transparent to-transparent" />
      </div>
      <div className="p-8 md:p-10 flex flex-col justify-between h-full">
        <div>
          {/* Metadata: Chinese Primary, English Secondary */}
          <div className="flex items-baseline gap-2 text-xs text-[#666666] flex-wrap">
            <span className="text-[#A5A5A5] font-medium">專案 {String(project.id).split('-').pop().padStart(2, '0')}</span>
            <span className="text-[10px] tracking-[0.18em] uppercase">PROJECT {String(project.id).split('-').pop().padStart(2, '0')}</span>
            <span>/</span>
            <span className="font-mono">{project.year}</span>
            <span>/</span>
            <span className="text-[#A5A5A5]">{project.categoryZh || '網頁作品'}</span>
            <span className="text-[10px] tracking-[0.15em] uppercase">{project.category}</span>
          </div>

          {/* Title */}
          <h3 className="mt-4 font-display text-3xl md:text-4xl leading-tight text-[#F5F3EE]">
            {project.title}
          </h3>
          {project.titleEn && (
            <span className="mt-1 block text-[11px] tracking-[0.2em] text-[#666666] uppercase font-light">
              {project.titleEn}
            </span>
          )}

          {/* Description */}
          <p className="mt-3 text-sm text-[#A5A5A5] leading-relaxed font-light">
            {project.subtitle || project.description}
          </p>

          {/* Tech Tags */}
          <div className="mt-6 flex gap-2 flex-wrap">
            {project.technologies.map((t) => (
              <span key={t} className="border border-white/[0.14] px-2.5 py-1 text-xs text-[#A5A5A5]">
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Action Button: Chinese Primary + English Secondary */}
        <div className="mt-8 pt-6 border-t border-white/[0.08] flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs font-medium text-[#F5F3EE] group-hover:text-[#8FA8FF] transition-colors">
              查看作品
            </span>
            <span className="text-[9px] tracking-[0.2em] text-[#666666] uppercase">
              VIEW PROJECT
            </span>
          </div>
          <span className="text-sm text-[#666666] group-hover:text-[#8FA8FF] group-hover:translate-x-1 transition-all">
            →
          </span>
        </div>
      </div>
    </article>
  )
}
