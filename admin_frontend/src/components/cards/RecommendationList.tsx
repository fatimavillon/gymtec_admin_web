import type { RecommendationSlot } from "@/types/admin";
import { OccupancyBadge } from "@/components/ui/Badge";

interface Props { items: RecommendationSlot[] }

export function RecommendationList({ items }: Props) {
    return (
        <div className="divide-y divide-slate-800">
            {items.map((slot) => (
                <div key={slot.rank} className="flex items-start gap-3 py-3 first:pt-0 last:pb-0">
          <span className="text-xs font-mono font-bold text-slate-600 w-5 flex-shrink-0 mt-0.5">
            #{slot.rank}
          </span>
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm font-semibold text-slate-200">
                {slot.start_time} – {slot.end_time}
              </span>
                            <OccupancyBadge level={slot.level} />
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{slot.reason}</p>
                    </div>
                    <div className="flex-shrink-0 text-right">
                        <p className="text-sm font-bold text-cyan-400">{slot.score}</p>
                        <p className="text-[10px] text-slate-500">score</p>
                    </div>
                </div>
            ))}
        </div>
    );
}