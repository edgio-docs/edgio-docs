---
title: Multipart State Transitions
---
Both multipart uploads and multipart pieces follow well-defined state transitions.

## Multipart State Transitions  {/*multipart-state-transitions*/}
Following are the possible state transitions:

NEW -> ABORT

NEW -> DELETED

NEW -> READY

NEW -> EXPIRED

READY -> ABORT

READY -> COMPLETE

COMPLETE -> JOIN

JOIN -> FAILED

JOIN -> SUCCESS

SUCCESS -> DELETED

ABORT -> DELETED

FAILED -> DELETED

FAILED -> EXPIRED

EXPIRED (goes directly to EXPIRED state)

## Multipart Piece State Transitions  {/*multipart-piece-state-transitions*/}
Following are the possible state transitions:

NEW -> JOIN

NEW -> ERROR

NEW -> ABORT

NEW -> EXPIRED

NEW -> SKIPPED

ABORT -> SKIPPED

ABORT -> DELETED

ABORT -> ERROR

SUCCESS -> SKIPPED

SUCCESS -> DELETED

SUCCESS -> ERROR

JOIN -> SUCCESS

JOIN -> FAILED

FAILED -> ERROR

FAILED -> EXPIRED

FAILED -> SKIPPED

EXPIRED (goes directly to EXPIRED state)

SKIPPED (goes directly to SKIPPED state)
