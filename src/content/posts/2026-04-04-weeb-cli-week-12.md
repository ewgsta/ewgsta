---
layout: blog
title: "Weeb CLI Week 12: Architectural Reorganization"
description: "Docker optimizations and centralized documentation structures."
date: 2026-04-04T12:00:00.000Z
---
With the introduction of the REST API, the repository started getting a bit cluttered. This week was a "spring cleaning" phase, focusing heavily on DevOps, containerization, and repository hygiene to make life easier for contributors and self-hosters alike.

### What's New?
- Centralized all markdown and examples into a dedicated `/docs` directory.
- Optimized Docker configurations.
- Updated automated AUR deployment scripts.

### Under the Hood
I deprecated the standalone `Dockerfile.restful` and migrated the configuration to a more standard `docker-compose.yml` inline setup. This ensures that users spinning up the API server have a reproducible environment. 

The Docker image was heavily optimized. By utilizing multi-stage builds and utilizing `python:3.11-alpine`, I reduced the final image size from ~800MB down to ~150MB. I also ensured that the container runs under a non-root user for enhanced security when deployed on public-facing servers.

