interface ProgressStepsProps {
  /** number of segments to render */
  steps: number;
  /** 0-100 percent complete */
  progress: number;
  /** tailwind bg-* class for filled segments */
  fillClassName: string;
  /** tailwind bg-* class for completed segments */
   completedClassName?: string;
}

export function ProgressSteps({
  steps,
  progress,
  fillClassName,
  completedClassName
}: ProgressStepsProps) {
  const filled = Math.round((progress / 100) * steps);

 return (
  <div className="flex w-full gap-1.5">
    {Array.from({ length: steps }).map((_, i) => {
      const isCompleted =  i < filled - 1 || progress === 100;
      const isCurrent = progress < 100 && i === filled - 1;

      return (
        <div
          key={i}
          className={`h-1.5 flex-1 rounded-full relative overflow-hidden ${
            isCurrent
              ? fillClassName
              : isCompleted
              ? completedClassName ?? fillClassName
              : "bg-muted"
          }`
        }
        >  
          {isCurrent  && (
             <div className="absolute inset-0 overflow-hidden">
    <div className="absolute top-0 left-0 h-full w-8 animate-[shimmer_1.8s_linear_infinite] bg-gradient-to-r from-transparent via-white/70 to-transparent" />
  </div>
          )
          }
        </div>
      );

    })}
    
  </div>
  );
}