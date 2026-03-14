from __future__ import annotations

from typing import Any

from app.models import BattleEvent

DEFAULT_ANIMATION = {
    "lunge_at": 0.0,
    "impact_at": 0.3,
    "damage_popup_at": 0.5,
    "hp_update_at": 0.7,
    "reset_at": 1.2,
    "next_event_at": 1.5,
}


class EventStreamBuilder:
    def __init__(self) -> None:
        self.events: list[BattleEvent] = []
        self.current_time = 0.0
        self.sequence = 1

    def emit(self, event_type: str, gap: float = 1.5, **data: Any) -> BattleEvent:
        event = BattleEvent(
            seq=self.sequence,
            type=event_type,
            timestamp=round(self.current_time, 2),
            animation=data.pop("animation", DEFAULT_ANIMATION),
            **data,
        )
        self.events.append(event)
        self.sequence += 1
        self.current_time += gap
        return event
