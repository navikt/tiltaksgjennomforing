# Copilot Instructions for tiltaksgjennomforing

This file describes context specific to this repository. Nav-wide conventions for languages and frameworks come from the installed Copilot instructions.

`AGENTS.md` in the repository root is the main source for this repository. Read it first. It covers the architecture, local setup, build and test commands, patterns, domain glossary, Git workflow and boundaries.

## Repository Overview

Tiltaksgjennomføring is the frontend for [`tiltaksgjennomforing-api`](https://github.com/navikt/tiltaksgjennomforing-api). Participants, employers and Nav advisers use it to create, complete and approve agreements about employment support measures. Decision-makers use it to process funding periods.

The same codebase runs as an internal app for Nav employees and an external app for employers, participants and mentors. See `AGENTS.md` for details.

## Tech Stack

- React and TypeScript, built with Vite
- Express server in `server/`
- Aksel (`@navikt/ds-react`) and Less for UI
- Vitest for tests
- pnpm

## Before Committing

Run `pnpm ts`, `pnpm prettier` and `pnpm test`. CI runs the same checks.

## Reviews

See `copilot-review-instructions.md`
