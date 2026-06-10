// Future endpoints:
// GET /api/feedback/trainers
// GET /api/feedback/experience

export interface TrainerBreakdown {
    very_satisfied: number;
    satisfied:      number;
    neutral:        number;
    dissatisfied:   number;
}

export interface TrainerFeedback {
    id:           string;
    name:         string;
    rating:       number;   // 0–5
    responses:    number;
    satisfaction: number;   // 0–100 percentage
    breakdown:    TrainerBreakdown;
    lastComment:  string;
}

export interface ExperienceMetric {
    key:   string;
    label: string;
    value: number;
    max:   number;
    unit:  string;
}

export interface GymExperienceFeedback {
    nps:     number;
    metrics: ExperienceMetric[];
}