# Copyright (c) 2026 M.Milde <m.milde@gmail.com>
# Free use; no sale, rebrand, or profit from this software.
# See LICENSE.

"""Write versions/network-live.json for the dashboard (called from trainer)."""

from __future__ import annotations

import json
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parent
LIVE_PATH = ROOT / "versions" / "network-live.json"
WEIGHTS_LIVE_PATH = ROOT / "versions" / "network-live-weights.json"


def _read_live() -> dict:
    if not LIVE_PATH.is_file():
        return {}
    try:
        return json.loads(LIVE_PATH.read_text())
    except json.JSONDecodeError:
        return {}


def write_network_live(
    *,
    status: str,
    meta: dict,
    mean_loss: float | None = None,
    eval_result: dict | None = None,
    checkpoint: str | None = None,
    weight_grid: dict | None = None,
) -> None:
    live = _read_live()
    history = live.get("history") or []
    epoch = int(meta.get("epoch_done") or 0)
    pass_pct = (eval_result or {}).get("pass_pct")
    if epoch:
        if not history or history[-1].get("epoch") != epoch:
            history.append(
                {
                    "epoch": epoch,
                    "loss": mean_loss if mean_loss is not None else meta.get("last_loss"),
                    "pass_pct": pass_pct,
                    "at": datetime.now(timezone.utc).isoformat(),
                }
            )
        elif pass_pct is not None:
            history[-1]["pass_pct"] = pass_pct
            if mean_loss is not None:
                history[-1]["loss"] = mean_loss

    payload = {
        "updatedAt": datetime.now(timezone.utc).isoformat(),
        "status": status,
        "tier": meta.get("tier"),
        "kind": meta.get("kind"),
        "epoch_done": epoch,
        "epochs_planned": meta.get("epochs_planned") or meta.get("epochs"),
        "last_loss": mean_loss if mean_loss is not None else meta.get("last_loss"),
        "pass_pct": pass_pct if pass_pct is not None else live.get("pass_pct"),
        "train_seconds": meta.get("train_seconds"),
        "checkpoint": checkpoint,
        "history": history[-120:],
        "acceptance_bar_pct": 80.0,
        "batch_no": live.get("batch_no"),
        "batches_in_epoch": live.get("batches_in_epoch"),
        "batch_pct": live.get("batch_pct"),
        "running_loss": live.get("running_loss"),
    }
    if weight_grid is not None:
        payload["weight_grid"] = {
            "cols": weight_grid.get("cols"),
            "rows": weight_grid.get("rows"),
            "grid": weight_grid.get("grid"),
            "active_cells_pct": weight_grid.get("active_cells_pct"),
            "updatedAt": datetime.now(timezone.utc).isoformat(),
        }
    LIVE_PATH.parent.mkdir(parents=True, exist_ok=True)
    LIVE_PATH.write_text(json.dumps(payload, indent=2) + "\n")


def write_network_live_pulse(
    *,
    meta: dict,
    epoch: int,
    batch_no: int,
    n_batches: int,
    running_loss: float,
    batch_loss: float | None = None,
    checkpoint: str | None = None,
) -> None:
    live = _read_live()
    history = live.get("history") or []
    batch_pct = round(100.0 * batch_no / max(1, n_batches), 1)
    payload = {
        "updatedAt": datetime.now(timezone.utc).isoformat(),
        "status": "training",
        "tier": meta.get("tier"),
        "kind": meta.get("kind"),
        "epoch_done": max(int(meta.get("epoch_done") or 0), epoch - 1),
        "epoch_in_progress": epoch,
        "epochs_planned": meta.get("epochs_planned") or meta.get("epochs"),
        "batch_no": batch_no,
        "batches_in_epoch": n_batches,
        "batch_pct": batch_pct,
        "running_loss": round(running_loss, 4),
        "batch_loss": round(batch_loss, 4) if batch_loss is not None else None,
        "last_loss": round(running_loss, 4),
        "pass_pct": live.get("pass_pct"),
        "train_seconds": meta.get("train_seconds"),
        "checkpoint": checkpoint,
        "history": history[-120:],
        "acceptance_bar_pct": 80.0,
        "weight_grid": live.get("weight_grid"),
    }
    LIVE_PATH.write_text(json.dumps(payload, indent=2) + "\n")


def write_network_live_weights(state_dict: dict) -> None:
    from network_dashboard_pixels import weight_grid_from_state_dict

    grid = weight_grid_from_state_dict(state_dict)
    WEIGHTS_LIVE_PATH.write_text(
        json.dumps(
            {
                "updatedAt": datetime.now(timezone.utc).isoformat(),
                "weight_grid": {
                    "cols": grid["cols"],
                    "rows": grid["rows"],
                    "grid": grid["grid"],
                    "active_cells_pct": grid["active_cells_pct"],
                    "dim_cells_pct": grid["dim_cells_pct"],
                    "mean_level": grid["mean_level"],
                },
            },
            indent=2,
        )
        + "\n"
    )
    live = _read_live()
    if live:
        live["weight_grid"] = {
            "cols": grid["cols"],
            "rows": grid["rows"],
            "grid": grid["grid"],
            "active_cells_pct": grid["active_cells_pct"],
            "updatedAt": datetime.now(timezone.utc).isoformat(),
        }
        live["updatedAt"] = datetime.now(timezone.utc).isoformat()
        LIVE_PATH.write_text(json.dumps(live, indent=2) + "\n")
