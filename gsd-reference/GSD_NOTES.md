# GSD Notes (Local Reference)

## Summary

GSD (Get Shit Done) is a spec-driven workflow that structures work into phases with explicit artifacts and verification. It emphasizes short, atomic plans, fresh subagent execution contexts, and clear state tracking.

## Common Commands

- `/gsd:new-project`
- `/gsd:map-codebase`
- `/gsd:create-roadmap`
- `/gsd:discuss-milestone`
- `/gsd:discuss-phase [N]`
- `/gsd:plan-phase [N]`
- `/gsd:execute-plan` or `/gsd:execute-phase [N]`
- `/gsd:verify-work [N]`
- `/gsd:plan-fix [N]`
- `/gsd:progress` / `/gsd:pause-work` / `/gsd:resume-work`
- `/gsd:complete-milestone` / `/gsd:new-milestone`
- `/gsd:add-phase` / `/gsd:insert-phase` / `/gsd:remove-phase`
- `/gsd:refresh-core` / `/gsd:refresh-phase`
- `/gsd:quick`

## Core Artifacts

- `PROJECT.md` — goals, scope, constraints
- `ROADMAP.md` — phase/milestone plan
- `STATE.md` — current status and active phase
- `PLAN.md` — atomic tasks + verification steps
- `SUMMARY.md` — outcomes and changes
- `ISSUES.md` — open problems

## Brownfield Mapping

`/gsd:map-codebase` produces `.planning/codebase/` analysis docs to inform planning and roadmap updates.

## Notes

Keep plans small (max 3 tasks), enforce verification steps, and use subagents for execution to avoid context decay.
