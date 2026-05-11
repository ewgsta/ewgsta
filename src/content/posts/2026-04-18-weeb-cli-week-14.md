---
layout: blog
title: "Weeb CLI Week 14: CI/CD Modernization"
description: "Dependency bumps and GitHub Actions workflow stabilization."
date: 2026-04-18T12:00:00.000Z
---
Continuous Integration is the backbone of any stable open-source project. This week was entirely dedicated to DevOps. Keeping dependencies up to date ensures we aren't exposed to security vulnerabilities and that our build pipeline doesn't suddenly break due to deprecated actions.

### What's New?
- Bumped `actions/upload-pages-artifact` to v5.
- Updated the Arch User Repository (AUR) deployment action to v4.1.3.
- Stabilized the Python test matrix for 3.10, 3.11, and 3.12.

### Under the Hood
Migrating the GitHub actions required updating our artifact deployment strategies. The new `upload-pages-artifact` v5 utilizes a fundamentally different node architecture under the hood. 

Additionally, deploying to the AUR requires strict verification of `PKGBUILD` checksums. I automated the generation of SHA256 hashes within the CI runner, so whenever a new GitHub Release is cut, the `PKGBUILD` is automatically updated, signed, and pushed to the Arch repository without any manual intervention.

