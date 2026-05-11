---
layout: blog
title: "Weeb CLI Week 16: The Final Polish"
description: "Tracker pending queues, Makefile integration, and PKGBUILD fixes."
date: 2026-05-02T12:00:00.000Z
---
It feels amazing to wrap up this development sprint with version 2.16.3. This week was all about tying up loose ends, ensuring deployment is bulletproof, and finalizing the robust offline tracking queue. Weeb CLI has never been in a better state.

### What's New?
- Finalized the offline tracker pending queue logic.
- Consolidated all build scripts into a unified `Makefile`.
- Fixed dependency typos in the Arch Linux `PKGBUILD`.

### Under the Hood
The offline pending queue is now fully atomic. If the CLI attempts to sync an offline watch record and the network drops mid-request, the SQLite transaction rolls back, guaranteeing that the watch history is never lost or duplicated.

On the tooling side, I replaced a mess of bash scripts with a single, elegant `Makefile`. Commands like `make build`, `make test`, and `make publish` now orchestrate the entire `pyproject.toml` lifecycle. Lastly, resolving the `python-curl_cffi` package name discrepancy in the AUR ensures that Arch Linux users can seamlessly `yay -S weeb-cli` without manual intervention.

