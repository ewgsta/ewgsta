---
layout: blog
title: "Weeb CLI Week 11: RESTful API Mode"
description: "Fully functional REST API server mode with client SDK examples."
date: 2026-03-28T12:00:00.000Z
---
The transformation from a CLI tool into a full-fledged platform is complete. The RESTful API mode is now fully operational! This opens up infinite possibilities for frontend developers to build Web UIs, Mobile Apps, or Desktop clients on top of the Weeb CLI engine.

### What's New?
- Added `serve` mode for a fully RESTful API.
- Created comprehensive SDK examples for Python, Node.js, and React.
- Bumped GitHub Actions runners to the latest environment.

### Under the Hood
The REST API was built using `FastAPI` to take advantage of its native Pydantic validation and auto-generated Swagger/OpenAPI documentation. 

I structured the API into logical routers: `/api/v1/search`, `/api/v1/anime/{slug}`, and `/api/v1/watch/{token}`. 
One of the most complex parts was serving the video stream itself. Because browsers require `Range` headers for seeking within a video, I implemented a custom StreamingResponse generator that chunks the incoming upstream byte stream and properly negotiates HTTP 206 Partial Content requests, allowing seamless scrubbing in HTML5 video players.

