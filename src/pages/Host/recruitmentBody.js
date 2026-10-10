export function toRecruitmentBody(form) {
    const data = Object.fromEntries(new FormData(form));
    return {
        ...data,
        runningTime: Number(data.runningTime),
        recruitTeamCount: Number(data.recruitTeamCount),
        budget: data.budget ? Number(data.budget.replaceAll(',', '')) : undefined,
    };
}
