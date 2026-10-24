# Copyright (c) 2026 M.Milde <m.milde@gmail.com>
# Free use; no sale, rebrand, or profit from this software.
# See LICENSE.

"""Compact pixel grids for dashboard + live trainer (weights only on live path)."""

from __future__ import annotations

import torch

PIXEL_COLS = 96
PIXEL_ROWS = 54


def _values_to_uint8_grid(values: torch.Tensor, cols: int, rows: int, *, log_scale: bool = False) -> list[list[int]]:
    flat = values.detach().float().cpu().flatten()
    n = int(flat.numel())
    target = cols * rows
    if n == 0:
        return [[0] * cols for _ in range(rows)]
    idx = torch.linspace(0, max(0, n - 1), target).long().clamp(0, max(0, n - 1))
    sampled = flat[idx]
    if log_scale:
        sampled = torch.log1p(sampled.clamp(min=0))
    mx = float(sampled.max()) or 1.0
    scaled = (sampled / mx * 255).clamp(0, 255).byte()
    return scaled.reshape(rows, cols).tolist()


def weight_grid_from_state_dict(state_dict: dict, *, cols: int = PIXEL_COLS, rows: int = PIXEL_ROWS) -> dict:
    parts: list[torch.Tensor] = []
    total = 0
    for _key, ten in sorted(state_dict.items()):
        total += int(ten.numel())
        parts.append(ten.detach().float().abs().flatten())
    flat = torch.cat(parts) if parts else torch.zeros(1)
    grid = _values_to_uint8_grid(flat, cols, rows, log_scale=False)
    return {
        "cols": cols,
        "rows": rows,
        "grid": grid,
        "total_params": total,
        "tensor_count": len(parts),
        **grid_activity_stats(grid),
    }


def grid_activity_stats(grid: list[list[int]], *, active_threshold: int = 18) -> dict:
    cells = [v for row in grid for v in row]
    total = len(cells) or 1
    active = sum(1 for v in cells if v >= active_threshold)
    dim = sum(1 for v in cells if v < 6)
    mean = sum(cells) / total
    # coarse "cold band": bottom quarter of rows mostly dim
    rows = len(grid)
    cold_rows = 0
    if rows >= 4:
        quarter = max(1, rows // 4)
        for ri in range(rows - quarter, rows):
            row = grid[ri]
            if sum(row) / max(1, len(row)) < 12:
                cold_rows += 1
    return {
        "active_cells_pct": round(100.0 * active / total, 1),
        "dim_cells_pct": round(100.0 * dim / total, 1),
        "mean_level": round(mean, 1),
        "cold_bottom_rows": cold_rows,
    }
